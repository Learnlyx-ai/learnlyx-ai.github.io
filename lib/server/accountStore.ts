import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export interface ProgressData {
  completedQuizzes: string[];
  quizStars: Record<string, number>;
}

export interface SubscriptionData {
  isActive: boolean;
  plan: "ai-teacher-pro";
  amountUsdPerMonth: number;
  startedAt: string | null;
  renewsAt: string | null;
}

export interface StoredUser {
  username: string;
  email?: string;
  passwordHash: string;
  progress: ProgressData;
  subscription?: SubscriptionData;
}

export interface LearnerReview {
  id: string;
  username: string;
  rating: number;
  message: string;
  createdAt: string;
}

interface AccountDB {
  users: StoredUser[];
  reviews?: LearnerReview[];
}

const DB_PATH = path.join(process.cwd(), "data", "accounts.json");

const defaultProgress: ProgressData = {
  completedQuizzes: [],
  quizStars: {},
};

const defaultSubscription: SubscriptionData = {
  isActive: false,
  plan: "ai-teacher-pro",
  amountUsdPerMonth: 10,
  startedAt: null,
  renewsAt: null,
};

function getDefaultDB(): AccountDB {
  return { users: [], reviews: [] };
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function ensureDBFile() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(getDefaultDB(), null, 2), "utf8");
  }
}

async function readDB(): Promise<AccountDB> {
  await ensureDBFile();
  const raw = await fs.readFile(DB_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as AccountDB;
    if (!parsed || !Array.isArray(parsed.users)) {
      return getDefaultDB();
    }
    return { ...parsed, reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [] };
  } catch {
    return getDefaultDB();
  }
}

async function writeDB(db: AccountDB) {
  await ensureDBFile();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function createUser(username: string, password: string, email?: string): Promise<{ ok: boolean; message: string }> {
  const normalized = username.trim().toLowerCase();
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPassword = password.trim();
  if (!normalized || !normalizedPassword) {
    return { ok: false, message: "Username and password are required." };
  }

  const db = await readDB();
  const exists = db.users.some((u) => u.username === normalized || (normalizedEmail && u.email === normalizedEmail));
  if (exists) {
    return { ok: false, message: "Username or email already exists." };
  }

  db.users.push({
    username: normalized,
    ...(normalizedEmail ? { email: normalizedEmail } : {}),
    passwordHash: hashPassword(normalizedPassword),
    progress: { ...defaultProgress },
    subscription: { ...defaultSubscription },
  });
  await writeDB(db);
  return { ok: true, message: "Account created." };
}

export async function validateUser(username: string, password: string): Promise<boolean> {
  const normalized = username.trim().toLowerCase();
  const normalizedPassword = password.trim();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return false;
  return user.passwordHash === hashPassword(normalizedPassword);
}

export async function validateCredentials(login: string, password: string): Promise<StoredUser | null> {
  const normalized = login.trim().toLowerCase();
  const normalizedPassword = password.trim();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized || u.email === normalized);
  if (!user || user.passwordHash !== hashPassword(normalizedPassword)) return null;
  return user;
}

export async function hasUser(username: string): Promise<boolean> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  return db.users.some((u) => u.username === normalized);
}

export async function getProgress(username: string): Promise<ProgressData> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return { ...defaultProgress };
  return {
    completedQuizzes: Array.isArray(user.progress?.completedQuizzes)
      ? user.progress.completedQuizzes
      : [],
    quizStars: user.progress?.quizStars ?? {},
  };
}

export async function getSubscription(username: string): Promise<SubscriptionData | null> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return null;

  const sub = user.subscription ?? defaultSubscription;
  return {
    isActive: Boolean(sub.isActive),
    plan: "ai-teacher-pro",
    amountUsdPerMonth: 10,
    startedAt: sub.startedAt ?? null,
    renewsAt: sub.renewsAt ?? null,
  };
}

export async function activateSubscription(username: string): Promise<SubscriptionData | null> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return null;

  const now = new Date();
  const renews = new Date(now);
  renews.setDate(renews.getDate() + 30);

  user.subscription = {
    isActive: true,
    plan: "ai-teacher-pro",
    amountUsdPerMonth: 10,
    startedAt: now.toISOString(),
    renewsAt: renews.toISOString(),
  };

  await writeDB(db);
  return user.subscription;
}

export async function cancelSubscription(username: string): Promise<SubscriptionData | null> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return null;

  user.subscription = {
    ...defaultSubscription,
  };
  await writeDB(db);
  return user.subscription;
}

export async function completeQuiz(username: string, quizId: string, stars: number): Promise<ProgressData | null> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return null;

  const safeStars = Math.max(1, Math.min(3, stars));
  const existing = user.progress.quizStars[quizId] || 0;
  const bestStars = Math.max(existing, safeStars);

  if (!user.progress.completedQuizzes.includes(quizId)) {
    user.progress.completedQuizzes.push(quizId);
  }
  user.progress.quizStars[quizId] = bestStars;

  await writeDB(db);
  return user.progress;
}

export async function resetProgress(username: string): Promise<ProgressData | null> {
  const normalized = username.trim().toLowerCase();
  const db = await readDB();
  const user = db.users.find((u) => u.username === normalized);
  if (!user) return null;
  user.progress = { ...defaultProgress };
  await writeDB(db);
  return user.progress;
}

export async function getReviews(): Promise<LearnerReview[]> {
  const db = await readDB();
  return [...(db.reviews ?? [])]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 50);
}

export async function addReview(
  username: string,
  rating: number,
  message: string
): Promise<LearnerReview | null> {
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedMessage = message.trim().replace(/\s+/g, " ");
  const db = await readDB();

  if (!db.users.some((user) => user.username === normalizedUsername)) return null;
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return null;
  if (normalizedMessage.length < 3 || normalizedMessage.length > 500) return null;

  const review: LearnerReview = {
    id: crypto.randomUUID(),
    username: normalizedUsername,
    rating,
    message: normalizedMessage,
    createdAt: new Date().toISOString(),
  };

  db.reviews = [review, ...(db.reviews ?? [])];
  await writeDB(db);
  return review;
}
