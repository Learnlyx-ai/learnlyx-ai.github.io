import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addReview, getReviews } from "@/lib/server/accountStore";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

export async function GET() {
  return NextResponse.json({ ok: true, reviews: await getReviews() });
}

export async function POST(request: Request) {
  const username = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!username) {
    return NextResponse.json(
      { ok: false, message: "Please sign in before posting a review." },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const review = await addReview(username, Number(body?.rating), String(body?.message ?? ""));
  if (!review) {
    return NextResponse.json(
      { ok: false, message: "Use a rating from 1 to 5 and a review between 3 and 500 characters." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, review }, { status: 201 });
}
