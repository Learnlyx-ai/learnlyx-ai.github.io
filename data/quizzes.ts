// This file contains all our quiz data
// Each quiz has questions with multiple choice answers

export interface Question {
  question: string;
  options: string[];
  answer: string;
  image?: {
    type: "shape";
    shape: "circle" | "square" | "triangle" | "rectangle" | "oval" | "star" | "diamond" | "heart";
  };
}

export interface Quiz {
  id: string;
  subject: string;
  grade: string;
  skill: string;
  questions: Question[];
}

export interface Skill {
  id: string;
  name: string;
  quizId: string;
}

type ShapeName = NonNullable<Question["image"]>["shape"];

const shapeOptions = ["Circle", "Square", "Triangle", "Rectangle"] as const;

function shapeQuestion(shape: ShapeName): Question {
  const answer = shape.charAt(0).toUpperCase() + shape.slice(1);
  const options = shapeOptions.includes(answer as (typeof shapeOptions)[number])
    ? [...shapeOptions]
    : [answer, "Circle", "Square", "Triangle"];

  return {
    question: "What is this shape?",
    image: { type: "shape", shape },
    options,
    answer,
  };
}

function earlyShapeQuestions(skillName: string): Question[] {
  const skillLower = skillName.toLowerCase();
  const shape: ShapeName =
    skillLower.includes("circle") ? "circle" :
    skillLower.includes("square") ? "square" :
    skillLower.includes("triangle") ? "triangle" :
    skillLower.includes("rectangle") ? "rectangle" :
    skillLower.includes("oval") ? "oval" :
    skillLower.includes("star") ? "star" :
    skillLower.includes("diamond") ? "diamond" :
    skillLower.includes("heart") ? "heart" :
    "circle";

  if (skillLower.includes("matching") || skillLower.includes("sorting")) {
    return [
      shapeQuestion("circle"),
      shapeQuestion("square"),
      shapeQuestion("triangle"),
      shapeQuestion("rectangle"),
      shapeQuestion("oval"),
    ];
  }

  const reviewShapes: ShapeName[] = [shape, "circle", "square", "triangle", "rectangle"];
  return reviewShapes.map(shapeQuestion);
}

// GRADE 4 SCIENCE QUIZ (Ontario / Peel District level)
export const grade4SciencePulleysGearsQuiz: Quiz = {
  id: "science-grade4-quiz-1",
  subject: "Science",
  grade: "Grade 4",
  skill: "Pulleys and Gears",
  questions: [
    {
      question: "What is a pulley mainly used for?",
      options: [
        "To lift or move objects",
        "To make electricity",
        "To cut wood",
        "To measure temperature"
      ],
      answer: "To lift or move objects"
    },
    {
      question: "What do gears help change in a machine?",
      options: [
        "Speed or direction of movement",
        "Color of the machine",
        "Weight of the machine",
        "Temperature"
      ],
      answer: "Speed or direction of movement"
    },
    {
      question: "Which object uses gears?",
      options: [
        "Bicycle",
        "Notebook",
        "Plate",
        "Pillow"
      ],
      answer: "Bicycle"
    },
    {
      question: "What happens when two gears touch each other?",
      options: [
        "They turn each other",
        "They melt",
        "They disappear",
        "They stop forever"
      ],
      answer: "They turn each other"
    },
    {
      question: "Where might you see a pulley in real life?",
      options: [
        "Flagpole",
        "Pencil",
        "Book",
        "Plate"
      ],
      answer: "Flagpole"
    },
    {
      question: "Why do people use pulleys?",
      options: [
        "To make lifting heavy objects easier",
        "To make things heavier",
        "To change colors",
        "To make objects disappear"
      ],
      answer: "To make lifting heavy objects easier"
    },
    {
      question: "What do connected gears often change?",
      options: [
        "Direction of motion",
        "Shape of the machine",
        "Color of the machine",
        "Temperature"
      ],
      answer: "Direction of motion"
    },
    {
      question: "Which machine often uses a pulley system?",
      options: [
        "Elevator",
        "Notebook",
        "Spoon",
        "Chair"
      ],
      answer: "Elevator"
    }
  ]
};

// Helper function to generate skills programmatically
function generateSkills(subject: string, grade: string, skillsList: string[]): Skill[] {
  return skillsList.map((name, index) => ({
    id: `${subject}-${grade}-skill-${index + 1}`,
    name,
    quizId: `${subject}-${grade}-quiz-${index + 1}`,
  }));
}

// MATH SKILLS BY GRADE
const mathJKSkills = [
  "Counting to 5", "Counting to 10", "Number Recognition 1-5", "Number Recognition 6-10",
  "Counting Objects to 5", "Counting Objects to 10", "One More", "One Less",
  "Identifying Circles", "Identifying Squares", "Identifying Triangles", "Identifying Rectangles",
  "Big and Small", "Long and Short", "Tall and Short", "Heavy and Light",
  "Sorting by Color", "Sorting by Shape", "Sorting by Size", "Matching Shapes",
  "Simple Patterns AB", "Pattern Recognition", "What Comes Next", "Complete the Pattern",
  "Comparing Groups More", "Comparing Groups Less", "Same Amount", "Different Amounts",
  "Position Words Above", "Position Words Below", "Position Words Beside", "Position Words Inside",
  "First and Last", "Top and Bottom", "Left and Right", "Near and Far",
  "Morning and Night", "Days of Week", "Counting Fingers", "Counting Toes",
  "Numbers in Order", "Missing Numbers 1-5", "Number Tracing", "Number Writing",
  "Zero Concept", "Pairs and Matching", "Groups of Two", "Groups of Three",
  "Before and After Numbers", "Between Numbers", "Smallest Number", "Largest Number",
];

const mathKindergartenSkills = [
  "Counting to 20", "Counting to 30", "Counting to 50", "Counting to 100",
  "Number Recognition 11-20", "Number Recognition 21-50", "Writing Numbers 1-10", "Writing Numbers 11-20",
  "Counting by 2s", "Counting by 5s", "Counting by 10s", "Skip Counting Practice",
  "Addition to 5", "Addition to 10", "Adding with Pictures", "Adding with Fingers",
  "Subtraction from 5", "Subtraction from 10", "Taking Away", "How Many Left",
  "Comparing Numbers 1-10", "Comparing Numbers 11-20", "Greater Than", "Less Than",
  "Equal To", "Not Equal", "Ordering Numbers", "Number Lines",
  "Identifying Circles", "Identifying Squares", "Identifying Triangles", "Identifying Rectangles",
  "Identifying Ovals", "Identifying Stars", "Identifying Diamonds", "Identifying Hearts",
  "Simple Patterns ABC", "Growing Patterns", "Shrinking Patterns", "Creating Patterns",
  "Measuring Length", "Comparing Lengths", "Taller Shorter Same", "Longer Shorter Same",
  "Time Morning Afternoon", "Days of the Week", "Yesterday Today Tomorrow", "Calendar Basics",
  "Coin Recognition", "Pennies", "Nickels", "Dimes",
  "Position and Direction", "Left Right Up Down", "Following Directions", "Giving Directions",
  "Word Problems Add", "Word Problems Subtract", "Story Problems", "Drawing to Solve",
  "Number Bonds to 5", "Number Bonds to 10", "Part Part Whole", "Fact Families Intro",
  "Ordinal Numbers", "First Second Third", "Tenth Position", "Ordering Events",
  "Graphing Intro", "Picture Graphs", "Counting Data", "More or Less Data",
  "Estimation Intro", "About How Many", "Reasonable Answers", "Checking Work",
  "Mental Math to 5", "Mental Math to 10", "Doubles Facts", "Near Doubles",
  "Making 10", "Friends of 10", "Teen Numbers", "Place Value Intro",
  "Tens and Ones", "Grouping by Tens", "Expanded Form Intro", "Number Composition",
  "Addition Strategies", "Subtraction Strategies", "Counting On", "Counting Back",
  "Measurement Tools", "Rulers Intro", "Scales Intro", "Comparing Weights",
  "Capacity Concepts", "Full Empty Half", "Holds More Less", "Pouring Practice",
  "Temperature Concepts", "Hot Cold Warm", "Weather Numbers", "Seasons Intro",
  "Money Values", "Counting Pennies", "Counting Nickels", "Counting Dimes",
  "Half Concept", "Fair Shares", "Equal Parts", "Two Halves",
  "Problem Solving", "Draw a Picture", "Act It Out", "Use Objects",
];

const mathGrade1Skills = [
  "Counting to 100", "Counting to 120", "Counting by 2s to 100", "Counting by 5s to 100",
  "Counting by 10s to 100", "Skip Counting Mixed", "Counting Backwards", "Missing Numbers to 100",
  "Addition Facts to 10", "Addition Facts to 20", "Adding Three Numbers", "Adding with Zero",
  "Doubles Addition", "Doubles Plus One", "Making Ten Strategy", "Near Doubles Strategy",
  "Subtraction Facts to 10", "Subtraction Facts to 20", "Related Facts", "Fact Families",
  "Addition Word Problems", "Subtraction Word Problems", "Mixed Word Problems", "Two-Step Problems",
  "Comparing Numbers to 100", "Greater Than Symbol", "Less Than Symbol", "Equal Symbol",
  "Ordering Numbers to 100", "Number Sequences", "Before After Between", "Number Patterns",
  "Place Value Tens", "Place Value Ones", "Two-Digit Numbers", "Expanded Form",
  "Comparing Two-Digit Numbers", "Ordering Two-Digit Numbers", "10 More 10 Less", "1 More 1 Less",
  "2D Shapes Properties", "Triangles Types", "Quadrilaterals", "Circles and Ovals",
  "3D Shapes Properties", "Faces Edges Vertices", "Real World Shapes", "Combining Shapes",
  "Partitioning Shapes", "Equal Parts", "Halves", "Fourths Quarters",
  "Measuring Length Units", "Comparing Lengths", "Ordering by Length", "Measuring with Objects",
  "Telling Time Hours", "Telling Time Half Hours", "Clock Hands", "Digital Clocks",
  "Days Weeks Months", "Calendar Reading", "Elapsed Time Simple", "Seasons and Months",
  "Penny Nickel Dime", "Quarter Introduction", "Counting Mixed Coins", "Money Word Problems",
  "Data Collection", "Tally Marks", "Picture Graphs", "Bar Graphs Introduction",
  "Reading Graphs", "Comparing Data", "Most and Least", "How Many More",
  "Addition Properties", "Commutative Property", "Associative Property", "Identity Property",
  "Subtraction Concepts", "Missing Addends", "Missing Subtrahends", "Inverse Operations",
  "Mental Math Strategies", "Decomposing Numbers", "Compatible Numbers", "Estimation",
  "Patterns in Addition", "Patterns in Subtraction", "Number Patterns", "Shape Patterns",
  "Geometric Patterns", "Growing Patterns", "Repeating Patterns", "Creating Patterns",
  "Fractions Introduction", "Parts of a Whole", "Parts of a Set", "Fair Sharing",
  "Symmetry Introduction", "Lines of Symmetry", "Symmetric Shapes", "Creating Symmetry",
  "Position Words", "Spatial Reasoning", "Following Directions", "Mapping Basics",
  "Sorting and Classifying", "Attributes", "Venn Diagrams Intro", "Carroll Diagrams",
  "Problem Solving Strategies", "Draw a Picture", "Make a Table", "Look for Pattern",
  "Guess and Check", "Work Backwards", "Logical Reasoning", "Multiple Strategies",
  "Number Sense", "Benchmark Numbers", "Rounding Intro", "Reasonable Answers",
  "Addition Fluency 0-5", "Addition Fluency 6-10", "Subtraction Fluency 0-5", "Subtraction Fluency 6-10",
  "Mixed Operations", "Choosing Operations", "Writing Equations", "Solving Equations",
  "True False Equations", "Balancing Equations", "Unknown Numbers", "Algebraic Thinking",
];

const mathGrade2Skills = [
  "Addition within 100", "Addition with Regrouping", "Two-Digit Addition", "Three Addends",
  "Subtraction within 100", "Subtraction with Regrouping", "Two-Digit Subtraction", "Checking Subtraction",
  "Mental Math Addition", "Mental Math Subtraction", "Adding Tens", "Subtracting Tens",
  "Word Problems Addition", "Word Problems Subtraction", "Two-Step Word Problems", "Compare Word Problems",
  "Place Value Hundreds", "Three-Digit Numbers", "Expanded Form Hundreds", "Standard Form",
  "Comparing Three-Digit Numbers", "Ordering Three-Digit Numbers", "100 More 100 Less", "Skip Counting Hundreds",
  "Multiplication Introduction", "Equal Groups", "Arrays Introduction", "Repeated Addition",
  "Multiplication by 2", "Multiplication by 5", "Multiplication by 10", "Skip Counting for Multiplication",
  "Division Introduction", "Equal Sharing", "Making Groups", "Division as Repeated Subtraction",
  "Odd and Even Numbers", "Patterns with Odd Even", "Adding Odd Even", "Subtracting Odd Even",
  "Fractions Half", "Fractions Third", "Fractions Fourth", "Fractions on Number Line",
  "Comparing Fractions", "Equivalent Fractions Intro", "Fractions of a Set", "Fractions of Shapes",
  "Money Dollars", "Dollars and Cents", "Making Change", "Money Word Problems",
  "Counting Money Mixed", "Comparing Money Amounts", "Adding Money", "Subtracting Money",
  "Telling Time 5 Minutes", "Telling Time 1 Minute", "AM and PM", "Elapsed Time Hours",
  "Elapsed Time Minutes", "Schedules", "Time Word Problems", "Calendars Advanced",
  "Measuring Inches", "Measuring Feet", "Measuring Centimeters", "Measuring Meters",
  "Comparing Measurements", "Estimating Length", "Adding Lengths", "Subtracting Lengths",
  "Perimeter Introduction", "Finding Perimeter", "Perimeter Word Problems", "Unknown Sides",
  "Area Introduction", "Counting Square Units", "Area of Rectangles", "Area Word Problems",
  "Line Plots", "Reading Line Plots", "Creating Line Plots", "Analyzing Line Plots",
  "Picture Graphs", "Bar Graphs", "Reading Graphs", "Creating Graphs",
  "Data Analysis", "Drawing Conclusions", "Making Predictions", "Comparing Data Sets",
  "2D Shapes Review", "Polygons", "Regular Polygons", "Irregular Polygons",
  "3D Shapes Review", "Prisms", "Pyramids", "Real World 3D",
  "Lines and Angles Intro", "Straight Lines", "Curved Lines", "Parallel Lines Intro",
  "Addition Strategies", "Compensation Strategy", "Breaking Apart Numbers", "Using Known Facts",
  "Subtraction Strategies", "Adding Up", "Using Addition", "Decomposing",
  "Estimation Addition", "Estimation Subtraction", "Front End Estimation", "Rounding to Estimate",
  "Number Patterns", "Growing Patterns", "Shrinking Patterns", "Rule-Based Patterns",
  "Input Output Tables", "Function Machines", "Finding Rules", "Extending Patterns",
  "Problem Solving", "Multiple Steps", "Extra Information", "Missing Information",
  "Logical Reasoning", "Using Clues", "Process of Elimination", "Deductive Reasoning",
  "Math Vocabulary", "Math Symbols", "Writing Math", "Explaining Thinking",
  "Addition Facts Fluency", "Subtraction Facts Fluency", "Mixed Facts", "Timed Facts",
  "Mental Computation", "Quick Calculations", "Math Shortcuts", "Number Relationships",
  "Checking Work", "Inverse Operations Check", "Estimation Check", "Reasonableness",
];

const mathGrade3Skills = [
  "Multiplication Facts 0-5", "Multiplication Facts 6-9", "Multiplication Facts 10-12", "Mixed Multiplication",
  "Multiplication Properties", "Commutative Property Mult", "Associative Property Mult", "Distributive Property",
  "Multiplication Word Problems", "Equal Groups Problems", "Array Problems", "Comparison Problems",
  "Division Facts 0-5", "Division Facts 6-9", "Division Facts 10-12", "Mixed Division",
  "Division Word Problems", "Equal Sharing Problems", "How Many Groups", "Division with Remainders Intro",
  "Fact Families Mult Div", "Related Facts", "Inverse Operations", "Missing Factors",
  "Fractions Introduction", "Numerator Denominator", "Fractions on Number Line", "Fractions of a Whole",
  "Unit Fractions", "Fractions Greater Than 1", "Mixed Numbers Intro", "Improper Fractions Intro",
  "Comparing Fractions Same Denom", "Comparing Fractions Same Numer", "Ordering Fractions", "Equivalent Fractions",
  "Adding Fractions Same Denom", "Subtracting Fractions Same Denom", "Fraction Word Problems", "Fractions of a Set",
  "Place Value Thousands", "Four-Digit Numbers", "Expanded Form Thousands", "Comparing Large Numbers",
  "Rounding to Nearest 10", "Rounding to Nearest 100", "Rounding to Nearest 1000", "Using Rounding",
  "Adding Three-Digit Numbers", "Adding Four-Digit Numbers", "Multiple Addends", "Addition with Regrouping",
  "Subtracting Three-Digit Numbers", "Subtracting Four-Digit Numbers", "Subtraction with Regrouping", "Checking Subtraction",
  "Estimation Addition", "Estimation Subtraction", "Estimation Multiplication", "Estimation Division",
  "Perimeter Polygons", "Perimeter Rectangles", "Unknown Side Lengths", "Perimeter Word Problems",
  "Area Rectangles", "Area Square Units", "Area by Multiplication", "Area Word Problems",
  "Area and Perimeter Combined", "Same Perimeter Different Area", "Same Area Different Perimeter", "Composite Shapes Area",
  "Time to the Minute", "Elapsed Time", "Time Word Problems", "Calculating Duration",
  "Mass and Weight", "Grams and Kilograms", "Measuring Mass", "Mass Word Problems",
  "Capacity Liters", "Milliliters", "Measuring Capacity", "Capacity Word Problems",
  "Data Collection", "Surveys", "Tally Charts", "Frequency Tables",
  "Bar Graphs", "Pictographs", "Line Plots", "Reading Graphs",
  "Creating Graphs", "Scaled Graphs", "Interpreting Data", "Drawing Conclusions",
  "Geometry Points Lines", "Line Segments", "Rays", "Angles Introduction",
  "Types of Angles", "Right Angles", "Acute Angles", "Obtuse Angles",
  "Polygons Classification", "Triangles by Sides", "Triangles by Angles", "Quadrilaterals Types",
  "Parallel and Perpendicular", "Identifying Lines", "Drawing Lines", "Real World Lines",
  "Symmetry", "Lines of Symmetry", "Rotational Symmetry", "Creating Symmetric Figures",
  "Patterns Arithmetic", "Patterns Geometric", "Number Sequences", "Pattern Rules",
  "Input Output Tables", "Function Rules", "Two-Step Rules", "Writing Rules",
  "Equations Multiplication", "Equations Division", "Two-Step Equations", "Unknown Variables",
  "Word Problems Multi-Step", "Choosing Operations", "Writing Equations", "Solving Strategies",
  "Mental Math Multiplication", "Mental Math Division", "Doubling Halving", "Using Factors",
  "Multiplication Fluency", "Division Fluency", "Mixed Facts Fluency", "Timed Practice",
  "Problem Solving Strategies", "Draw a Diagram", "Make a List", "Solve Simpler Problem",
  "Work Backwards", "Guess Check Revise", "Find a Pattern", "Use Logical Reasoning",
];

const mathGrade4Skills = [
  "Algebra Foundations", "Variables and Unknowns", "Patterns with Variables", "Solving Equations", "Algebra Word Problems",
  "Multi-Digit Multiplication", "Multiplying by 10s", "Multiplying by 100s", "Two-Digit by One-Digit",
  "Two-Digit by Two-Digit", "Three-Digit by One-Digit", "Partial Products", "Standard Algorithm Mult",
  "Multiplication Word Problems", "Comparison Problems", "Multi-Step Problems", "Area Model Multiplication",
  "Long Division Introduction", "Division by One-Digit", "Division with Remainders", "Interpreting Remainders",
  "Checking Division", "Division Word Problems", "Multi-Step Division", "Estimating Quotients",
  "Factors and Multiples", "Factor Pairs", "Prime Numbers", "Composite Numbers",
  "Prime Factorization", "Greatest Common Factor", "Least Common Multiple", "Divisibility Rules",
  "Fractions Equivalent", "Simplifying Fractions", "Comparing Fractions", "Ordering Fractions",
  "Adding Fractions Like Denom", "Subtracting Fractions Like Denom", "Mixed Numbers Addition", "Mixed Numbers Subtraction",
  "Adding Fractions Unlike Denom", "Subtracting Fractions Unlike Denom", "Finding Common Denominators", "Fraction Word Problems",
  "Multiplying Fractions by Whole", "Fractions of a Number", "Fraction Multiplication Word Problems", "Visual Fraction Multiplication",
  "Decimals Introduction", "Decimal Place Value", "Tenths and Hundredths", "Reading Decimals",
  "Writing Decimals", "Decimals on Number Line", "Comparing Decimals", "Ordering Decimals",
  "Decimals and Fractions", "Converting Decimals to Fractions", "Converting Fractions to Decimals", "Equivalent Forms",
  "Adding Decimals", "Subtracting Decimals", "Decimal Word Problems", "Money and Decimals",
  "Place Value Millions", "Reading Large Numbers", "Writing Large Numbers", "Comparing Large Numbers",
  "Rounding Large Numbers", "Estimating with Large Numbers", "Place Value Patterns", "Powers of Ten",
  "Geometry Angles", "Measuring Angles", "Protractor Use", "Drawing Angles",
  "Angle Relationships", "Complementary Angles", "Supplementary Angles", "Angles in Shapes",
  "Classifying Triangles", "Triangle Angle Sum", "Quadrilateral Properties", "Classifying Quadrilaterals",
  "Parallel and Perpendicular Lines", "Drawing Geometric Figures", "Coordinate Grid Intro", "Plotting Points",
  "Lines of Symmetry", "Rotational Symmetry", "Reflections", "Translations",
  "Perimeter Complex Shapes", "Area Complex Shapes", "Composite Figures", "Unknown Dimensions",
  "Customary Length", "Customary Weight", "Customary Capacity", "Customary Conversions",
  "Metric Length", "Metric Mass", "Metric Capacity", "Metric Conversions",
  "Measurement Word Problems", "Converting Units", "Multi-Step Measurement", "Choosing Units",
  "Time Elapsed Complex", "Time Zones", "Schedules and Timetables", "Time Word Problems",
  "Data Line Plots", "Creating Line Plots", "Analyzing Line Plots", "Fraction Line Plots",
  "Interpreting Graphs", "Misleading Graphs", "Choosing Graph Types", "Data Analysis",
  "Patterns Number", "Patterns Shape", "Pattern Rules", "Generating Patterns",
  "Input Output Tables", "Two-Step Function Rules", "Graphing Patterns", "Pattern Relationships",
  "Reading Algebraic Expressions", "Translating Words to Expressions", "Writing Expressions", "Evaluating Expressions",
  "Order of Operations Intro", "Equations Variables",
  "Addition Equations", "Subtraction Equations", "Multiplication Equations", "Division Equations",
  "Inequalities", "Solving Inequalities", "Graphing Inequalities", "Real World Inequalities",
  "Multi-Step Problems", "Problem Solving Strategies", "Choosing Operations", "Checking Reasonableness",
  "Mental Math Strategies", "Estimation Strategies", "Compatible Numbers", "Rounding Strategies",
];

const mathGrade5Skills = [
  "Intro to Algebra", "Variables and Expressions", "Solving Equations", "One-Step Algebra Equations", "Algebra Patterns",
  "Decimal Place Value", "Decimals to Thousandths", "Comparing Decimals", "Ordering Decimals",
  "Rounding Decimals", "Estimating with Decimals", "Decimal Patterns", "Powers of Ten Decimals",
  "Adding Decimals", "Subtracting Decimals", "Decimal Addition Word Problems", "Decimal Subtraction Word Problems",
  "Multiplying Decimals", "Decimal by Whole Number", "Decimal by Decimal", "Decimal Multiplication Word Problems",
  "Dividing Decimals", "Decimal by Whole Number Division", "Whole Number by Decimal", "Decimal Division Word Problems",
  "Fractions Review", "Equivalent Fractions", "Simplifying Fractions", "Comparing Fractions",
  "Adding Fractions Unlike Denom", "Subtracting Fractions Unlike Denom", "Mixed Number Operations", "Fraction Word Problems",
  "Multiplying Fractions", "Fraction by Fraction", "Fraction by Whole Number", "Mixed Number Multiplication",
  "Dividing Fractions", "Fraction by Whole Number Div", "Whole Number by Fraction", "Fraction by Fraction Division",
  "Fraction Division Word Problems", "Reciprocals", "Invert and Multiply", "Complex Fraction Problems",
  "Decimals Fractions Percents", "Converting Forms", "Comparing Different Forms", "Ordering Mixed Forms",
  "Order of Operations", "Parentheses First", "PEMDAS", "Complex Expressions",
  "Numerical Expressions", "Writing Expressions", "Evaluating Expressions", "Expression Word Problems",
  "Variables and Expressions", "Algebraic Expressions", "Substitution", "Simplifying Expressions",
  "Coordinate Plane", "Ordered Pairs", "Plotting Points", "Identifying Coordinates",
  "Graphing Relationships", "Tables and Graphs", "Patterns on Coordinate Plane", "Real World Coordinates",
  "Volume Rectangular Prisms", "Volume Formula", "Counting Cubic Units", "Volume Word Problems",
  "Composite Volume", "Additive Volume", "Volume Missing Dimensions", "Volume Applications",
  "Customary Conversions", "Metric Conversions", "Converting Between Systems", "Multi-Step Conversions",
  "Measurement Word Problems", "Choosing Appropriate Units", "Precision in Measurement", "Estimation Measurement",
  "Classifying 2D Shapes", "Hierarchy of Shapes", "Shape Properties", "Venn Diagrams Shapes",
  "Classifying Triangles", "Classifying Quadrilaterals", "Regular Polygons", "Irregular Polygons",
  "Coordinate Geometry", "Graphing Shapes", "Shape Transformations", "Reflections Coordinate Plane",
  "Line Plots Fractions", "Creating Line Plots", "Analyzing Data", "Data Interpretation",
  "Mean", "Median", "Mode", "Range",
  "Data Analysis", "Drawing Conclusions", "Making Predictions", "Comparing Data Sets",
  "Patterns and Rules", "Numerical Patterns", "Two Rule Patterns", "Corresponding Terms",
  "Sequences", "Arithmetic Sequences Intro", "Finding Terms", "Writing Rules for Sequences",
  "Problem Solving Strategies", "Multiple Step Problems", "Working Backwards", "Logical Reasoning",
  "Real World Math", "Financial Literacy Intro", "Unit Rates Intro", "Proportional Thinking Intro",
  "Prime and Composite", "Prime Factorization", "GCF Applications", "LCM Applications",
  "Exponents Introduction", "Powers of Ten", "Exponent Patterns", "Scientific Notation Intro",
  "Multiplication Fluency", "Division Fluency", "Fraction Fluency", "Decimal Fluency",
  "Mental Math", "Estimation", "Reasonableness", "Checking Work",
  "Word Problem Strategies", "Drawing Diagrams", "Making Tables", "Writing Equations",
  "Multi-Step Word Problems", "Mixed Operation Problems", "Complex Scenarios", "Real World Applications",
];

const mathGrade6Skills = [
  "Algebra Foundations", "Expressions and Variables", "Solving Equations", "One-Step Algebra Equations", "Algebraic Reasoning",
  "Ratios Introduction", "Ratio Language", "Ratio Tables", "Equivalent Ratios",
  "Unit Rates", "Finding Unit Rates", "Comparing Unit Rates", "Unit Rate Word Problems",
  "Rates and Ratios", "Part to Part Ratios", "Part to Whole Ratios", "Ratio Word Problems",
  "Proportions", "Solving Proportions", "Cross Multiplication", "Proportion Word Problems",
  "Percent Concept", "Percent of a Number", "Finding the Whole", "Finding the Percent",
  "Percent Word Problems", "Percent Increase", "Percent Decrease", "Discount and Tax",
  "Fractions Decimals Percents", "Converting Between Forms", "Comparing Forms", "Ordering Mixed Forms",
  "Dividing Fractions", "Fraction by Fraction", "Mixed Number Division", "Complex Fractions",
  "Multiplying Fractions", "Fraction by Fraction Mult", "Mixed Number Multiplication", "Fraction Word Problems",
  "Decimal Operations", "Multi-Digit Decimal Operations", "Decimal Word Problems", "Estimation with Decimals",
  "Integers Introduction", "Positive and Negative", "Integer Number Line", "Comparing Integers",
  "Absolute Value", "Absolute Value Applications", "Distance on Number Line", "Absolute Value Equations",
  "Adding Integers", "Subtracting Integers", "Integer Word Problems", "Number Line Addition",
  "Multiplying Integers", "Dividing Integers", "Integer Rules", "Mixed Integer Operations",
  "Rational Numbers", "Rational Number Operations", "Ordering Rational Numbers", "Rational Word Problems",
  "Coordinate Plane All Quadrants", "Plotting in Four Quadrants", "Reflections Coordinates", "Distance on Coordinate Plane",
  "Algebraic Expressions", "Writing Expressions", "Parts of Expressions", "Evaluating Expressions",
  "Equivalent Expressions", "Combining Like Terms", "Distributive Property", "Factoring Expressions",
  "One-Step Equations Addition", "One-Step Equations Subtraction", "One-Step Equations Multiplication", "One-Step Equations Division",
  "Equation Word Problems", "Writing Equations", "Solving Real World Equations", "Checking Solutions",
  "Inequalities", "Writing Inequalities", "Graphing Inequalities", "Solving Inequalities",
  "Dependent Independent Variables", "Tables Equations Graphs", "Analyzing Relationships", "Real World Relationships",
  "Area Triangles", "Area Parallelograms", "Area Trapezoids", "Area Complex Shapes",
  "Area Word Problems", "Composite Area", "Unknown Dimensions", "Area Applications",
  "Surface Area Prisms", "Surface Area Pyramids", "Nets of 3D Shapes", "Surface Area Word Problems",
  "Volume Prisms", "Volume Pyramids", "Volume Word Problems", "Composite Volume",
  "Statistical Questions", "Data Collection", "Measures of Center", "Measures of Variation",
  "Mean Absolute Deviation", "Interquartile Range", "Choosing Measures", "Comparing Data Sets",
  "Dot Plots", "Histograms", "Box Plots", "Interpreting Displays",
  "Summarizing Data", "Data Distribution Shape", "Outliers", "Drawing Conclusions",
  "Greatest Common Factor", "Least Common Multiple", "GCF LCM Word Problems", "Prime Factorization",
  "Divisibility Rules", "Factors and Multiples", "Number Theory Applications", "Problem Solving with GCF LCM",
  "Order of Operations", "Complex Expressions", "Nested Parentheses", "Order of Operations Word Problems",
  "Exponents Review", "Exponent Rules Intro", "Powers of Ten", "Scientific Notation",
  "Number System", "Classifying Numbers", "Properties of Numbers", "Number Relationships",
  "Problem Solving", "Multi-Step Problems", "Proportional Reasoning", "Real World Applications",
];

const mathGrade7Skills = [
  "Algebra Review", "Solving Equations", "Multi-Step Algebra Equations", "Algebraic Inequalities", "Linear Algebra Foundations",
  "Proportional Relationships", "Constant of Proportionality", "Proportional Graphs", "Proportional Tables",
  "Unit Rates Complex", "Computing Unit Rates", "Comparing Proportional Relationships", "Unit Rate Word Problems",
  "Recognizing Proportions", "Proportional vs Non-Proportional", "Equations of Proportions", "Graphing Proportions",
  "Percent Problems", "Percent Proportion", "Percent Equation", "Multi-Step Percent Problems",
  "Percent Change", "Percent Increase Decrease", "Percent Error", "Percent Applications",
  "Simple Interest", "Interest Formula", "Interest Word Problems", "Financial Applications",
  "Discounts Markups Tax", "Commission", "Tips and Gratuity", "Real World Percent",
  "Adding Integers", "Subtracting Integers", "Integer Word Problems", "Integer Applications",
  "Multiplying Integers", "Dividing Integers", "Order of Operations Integers", "Integer Expressions",
  "Rational Number Operations", "Adding Rational Numbers", "Subtracting Rational Numbers", "Rational Word Problems",
  "Multiplying Rational Numbers", "Dividing Rational Numbers", "Complex Rational Expressions", "Rational Applications",
  "Algebraic Expressions", "Writing Expressions", "Equivalent Expressions", "Expanding Expressions",
  "Factoring Expressions", "Combining Like Terms", "Distributive Property", "Properties of Operations",
  "One-Step Equations", "Two-Step Equations", "Multi-Step Equations", "Equations with Fractions",
  "Equations with Decimals", "Equation Word Problems", "Writing and Solving Equations", "Checking Solutions",
  "One-Step Inequalities", "Two-Step Inequalities", "Graphing Inequalities", "Inequality Word Problems",
  "Compound Inequalities", "Writing Inequalities", "Real World Inequalities", "Inequality Applications",
  "Scale Drawings", "Scale Factor", "Using Scales", "Creating Scale Drawings",
  "Similar Figures", "Corresponding Parts", "Finding Missing Sides", "Similar Figure Word Problems",
  "Angle Relationships", "Complementary Angles", "Supplementary Angles", "Vertical Angles",
  "Angles in Triangles", "Exterior Angles", "Angle Sum Theorems", "Finding Unknown Angles",
  "Area Circles", "Circumference", "Pi", "Circle Word Problems",
  "Area Complex Shapes", "Composite Figures", "Semicircles", "Irregular Shapes",
  "Surface Area Prisms Cylinders", "Lateral Surface Area", "Total Surface Area", "Surface Area Word Problems",
  "Volume Prisms Cylinders", "Volume Composite Shapes", "Volume Word Problems", "Volume Applications",
  "Cross Sections", "2D Views of 3D Shapes", "Slicing 3D Figures", "Identifying Cross Sections",
  "Probability Introduction", "Experimental Probability", "Theoretical Probability", "Probability Word Problems",
  "Sample Spaces", "Organized Lists", "Tree Diagrams", "Counting Principle",
  "Compound Events", "Independent Events", "Dependent Events", "Probability of Compound Events",
  "Simulations", "Random Sampling", "Making Predictions", "Using Probability",
  "Populations and Samples", "Representative Samples", "Biased Samples", "Drawing Inferences",
  "Comparing Populations", "Measures of Center", "Measures of Variability", "Data Distributions",
  "Random Sampling", "Generating Random Samples", "Sample Size", "Sampling Methods",
  "Data Analysis", "Making Predictions from Data", "Drawing Conclusions", "Validity of Conclusions",
  "Number Line", "Absolute Value Equations", "Rational Number Properties", "Number System Review",
  "Coordinate Plane", "Linear Relationships", "Graphing Linear Equations Intro", "Slope Intro",
  "Patterns and Sequences", "Arithmetic Sequences", "Geometric Sequences Intro", "Writing Sequence Rules",
  "Problem Solving Strategies", "Multi-Step Problems", "Real World Applications", "Mathematical Modeling",
];

const mathGrade8Skills = [
  "Algebra Review", "Solving Equations", "Linear Algebra", "Algebraic Functions", "Algebra Word Problems",
  "Rational and Irrational Numbers", "Classifying Numbers", "Approximating Irrationals", "Comparing Real Numbers",
  "Square Roots", "Cube Roots", "Estimating Roots", "Roots of Non-Perfect Squares",
  "Exponent Rules", "Product Rule", "Quotient Rule", "Power Rule",
  "Negative Exponents", "Zero Exponent", "Simplifying Expressions with Exponents", "Exponent Word Problems",
  "Scientific Notation", "Converting Scientific Notation", "Operations with Scientific Notation", "Scientific Notation Word Problems",
  "Scientific Notation Multiplication", "Scientific Notation Division", "Adding Subtracting Scientific Notation", "Real World Scientific Notation",
  "Linear Equations One Variable", "Multi-Step Equations", "Equations with Variables Both Sides", "Special Cases Equations",
  "Linear Equations Word Problems", "Writing Equations", "Solving Real World Problems", "Interpreting Solutions",
  "Solving Literal Equations", "Rearranging Formulas", "Isolating Variables", "Formula Applications",
  "Proportional Relationships Review", "Direct Variation", "Recognizing Proportionality", "Proportional Equations",
  "Slope", "Finding Slope from Graph", "Finding Slope from Points", "Slope Formula",
  "Slope-Intercept Form", "Writing Equations", "Graphing Linear Equations", "Interpreting Slope and Y-Intercept",
  "Point-Slope Form", "Writing Equations Point-Slope", "Converting Between Forms", "Applications",
  "Standard Form Linear Equations", "Graphing Standard Form", "Converting Forms", "Standard Form Applications",
  "Parallel Lines", "Perpendicular Lines", "Slopes of Parallel Perpendicular", "Writing Equations Parallel Perpendicular",
  "Linear vs Non-Linear", "Identifying Function Types", "Comparing Representations", "Non-Linear Patterns",
  "Systems of Equations", "Solving by Graphing", "Identifying Solutions", "No Solution Infinite Solutions",
  "Systems by Substitution", "Setting Up Substitution", "Solving Systems Substitution", "Word Problems Substitution",
  "Systems by Elimination", "Addition Method", "Multiplication Method", "Word Problems Elimination",
  "Systems Word Problems", "Writing Systems", "Solving Real World Systems", "Interpreting Systems Solutions",
  "Functions Introduction", "Function Notation", "Evaluating Functions", "Domain and Range",
  "Linear Functions", "Function Tables", "Function Graphs", "Function Rules",
  "Comparing Functions", "Different Representations", "Rate of Change", "Initial Value",
  "Non-Linear Functions", "Quadratic Introduction", "Exponential Introduction", "Comparing Function Types",
  "Constructing Functions", "From Tables", "From Graphs", "From Descriptions",
  "Function Applications", "Real World Functions", "Modeling with Functions", "Interpreting Functions",
  "Transformations", "Translations", "Reflections", "Rotations",
  "Dilations", "Scale Factor", "Center of Dilation", "Dilation Properties",
  "Congruence", "Congruent Figures", "Congruence Transformations", "Proving Congruence",
  "Similarity", "Similar Figures", "Similarity Transformations", "Proving Similarity",
  "Angles Parallel Lines", "Transversals", "Angle Pairs", "Finding Angle Measures",
  "Triangle Angle Sum", "Exterior Angles Triangles", "Angle Relationships Triangles", "Finding Missing Angles",
  "Pythagorean Theorem", "Finding Hypotenuse", "Finding Legs", "Pythagorean Word Problems",
  "Pythagorean Converse", "Identifying Right Triangles", "Pythagorean Applications", "3D Pythagorean Problems",
  "Distance Formula", "Coordinate Distance", "Distance Word Problems", "Distance Applications",
  "Volume Cylinders", "Volume Cones", "Volume Spheres", "Composite Volume",
  "Volume Word Problems", "Real World Volume", "Comparing Volumes", "Volume Optimization",
  "Scatter Plots", "Creating Scatter Plots", "Interpreting Scatter Plots", "Identifying Patterns",
  "Lines of Best Fit", "Drawing Lines of Best Fit", "Equations of Lines of Best Fit", "Using Lines to Predict",
  "Two-Way Tables", "Creating Two-Way Tables", "Relative Frequency", "Analyzing Associations",
  "Data Analysis", "Correlation", "Causation vs Correlation", "Drawing Conclusions",
];

const mathGrade9Skills = [
  "Algebra Foundations", "Solving Equations", "Solving Algebraic Equations", "Algebraic Functions", "Algebra Applications",
  "Real Number System", "Rational Irrational Numbers", "Properties of Real Numbers", "Number Line Representations",
  "Simplifying Radicals", "Adding Subtracting Radicals", "Multiplying Radicals", "Dividing Radicals",
  "Rationalizing Denominators", "Radical Equations", "Solving Radical Equations", "Radical Applications",
  "Exponent Rules Review", "Fractional Exponents", "Converting Radicals Exponents", "Simplifying with Fractional Exponents",
  "Scientific Notation Review", "Operations Scientific Notation", "Applications Scientific Notation", "Very Large Very Small Numbers",
  "Algebraic Expressions", "Simplifying Expressions", "Evaluating Expressions", "Translating Verbal to Algebraic",
  "Polynomials Introduction", "Classifying Polynomials", "Standard Form Polynomials", "Degree of Polynomials",
  "Adding Polynomials", "Subtracting Polynomials", "Polynomial Word Problems", "Polynomial Applications",
  "Multiplying Monomials", "Multiplying Polynomials", "FOIL Method", "Special Products",
  "Factoring GCF", "Factoring by Grouping", "Factoring Trinomials", "Factoring Special Cases",
  "Factoring Completely", "Factoring Strategies", "Factor vs Multiply", "Factoring Applications",
  "Solving Linear Equations", "Multi-Step Equations", "Equations with Fractions", "Literal Equations",
  "Linear Inequalities", "Compound Inequalities", "Absolute Value Inequalities", "Inequality Applications",
  "Absolute Value Equations", "Solving Absolute Value", "Absolute Value Inequalities", "Graphing Absolute Value",
  "Relations and Functions", "Function Notation", "Domain and Range", "Function Operations",
  "Evaluating Functions", "Function Composition", "Inverse Functions Introduction", "Function Representations",
  "Linear Functions", "Slope and Rate of Change", "Slope-Intercept Form", "Point-Slope Form",
  "Standard Form", "Graphing Linear Functions", "Writing Linear Equations", "Linear Applications",
  "Parallel Perpendicular Lines", "Writing Equations", "Graphing", "Applications",
  "Systems of Linear Equations", "Graphing Systems", "Substitution Method", "Elimination Method",
  "Systems Word Problems", "Three Variable Systems Intro", "Special Systems", "System Applications",
  "Linear Inequalities Graphing", "Systems of Inequalities", "Graphing Solution Regions", "Linear Programming Intro",
  "Introduction to Quadratics", "Quadratic Functions", "Parabolas", "Vertex and Axis of Symmetry",
  "Graphing Quadratics", "Vertex Form", "Standard Form Quadratics", "Transformations of Parabolas",
  "Solving Quadratics by Factoring", "Zero Product Property", "Factoring Methods", "Factoring Applications",
  "Solving Quadratics Square Root", "Completing the Square", "Derivation of Quadratic Formula", "Quadratic Formula",
  "The Discriminant", "Nature of Roots", "Complex Solutions Introduction", "Choosing Solution Methods",
  "Quadratic Word Problems", "Projectile Motion", "Area Problems", "Revenue Problems",
  "Quadratic Inequalities", "Solving Quadratic Inequalities", "Graphing Quadratic Inequalities", "Applications",
  "Exponential Functions", "Exponential Growth", "Exponential Decay", "Graphing Exponentials",
  "Exponential Equations", "Solving Exponentially", "Growth and Decay Applications", "Compound Interest",
  "Sequences Introduction", "Arithmetic Sequences", "Geometric Sequences", "Sequence Formulas",
  "Series Introduction", "Arithmetic Series", "Geometric Series", "Series Applications",
  "Data Analysis", "Measures of Central Tendency", "Measures of Spread", "Data Displays",
  "Statistics", "Normal Distribution Intro", "Standard Deviation", "Data Interpretation",
  "Probability Review", "Compound Probability", "Conditional Probability Intro", "Probability Applications",
  "Geometry Review", "Pythagorean Theorem", "Distance and Midpoint", "Coordinate Geometry",
  "Transformations Review", "Similarity and Congruence", "Triangle Properties", "Geometric Applications",
];

const mathGrade10Skills = [
  "Advanced Algebra", "Solving Equations", "Polynomial Algebra", "Rational Algebra", "Algebraic Modeling",
  "Function Review", "Function Notation", "Domain and Range", "Function Operations",
  "Composite Functions", "Function Composition", "Decomposing Functions", "Composition Applications",
  "Inverse Functions", "Finding Inverses", "Graphing Inverses", "Inverse Function Applications",
  "Transformations of Functions", "Translations", "Reflections", "Stretches and Compressions",
  "Parent Functions", "Identifying Parent Functions", "Transforming Parent Functions", "Function Families",
  "Polynomial Functions", "End Behavior", "Zeros and Multiplicity", "Graphing Polynomials",
  "Polynomial Operations", "Long Division Polynomials", "Synthetic Division", "Remainder Theorem",
  "Factor Theorem", "Finding Zeros", "Rational Root Theorem", "Polynomial Equations",
  "Quadratic Functions Review", "Completing the Square", "Quadratic Formula", "Complex Numbers",
  "Complex Number Operations", "Adding Subtracting Complex", "Multiplying Complex", "Dividing Complex",
  "Quadratic Equations Complex Solutions", "Discriminant Analysis", "Complex Roots", "Sum Product of Roots",
  "Rational Functions", "Domain of Rationals", "Vertical Asymptotes", "Horizontal Asymptotes",
  "Graphing Rational Functions", "Holes in Graphs", "End Behavior Rationals", "Rational Applications",
  "Solving Rational Equations", "Cross Multiplication", "LCD Method", "Extraneous Solutions",
  "Rational Inequalities", "Sign Charts", "Graphing Rational Inequalities", "Rational Applications",
  "Radical Functions", "Graphing Radical Functions", "Transformations of Radicals", "Radical Applications",
  "Solving Radical Equations", "Squaring Both Sides", "Extraneous Solutions", "Radical Applications",
  "Exponential Functions Review", "Exponential Equations", "Applications of Exponentials", "Compound Interest",
  "Logarithms Introduction", "Logarithmic Form", "Common and Natural Logs", "Evaluating Logarithms",
  "Properties of Logarithms", "Product Rule", "Quotient Rule", "Power Rule",
  "Solving Logarithmic Equations", "Using Properties", "Change of Base", "Logarithm Applications",
  "Solving Exponential Equations", "Using Logarithms", "Natural Exponentials", "Exponential Applications",
  "Exponential and Log Graphs", "Transformations", "Inverses", "Asymptotes",
  "Sequences and Series", "Arithmetic Sequences", "Geometric Sequences", "Recursive Formulas",
  "Series and Summation", "Arithmetic Series", "Geometric Series", "Infinite Series Introduction",
  "Trigonometry Introduction", "Right Triangle Trigonometry", "SOH CAH TOA", "Finding Sides and Angles",
  "Trigonometric Ratios", "Sine Cosine Tangent", "Cosecant Secant Cotangent", "Reciprocal Ratios",
  "Special Right Triangles", "30-60-90 Triangles", "45-45-90 Triangles", "Applications Special Triangles",
  "Unit Circle Introduction", "Radians and Degrees", "Converting Angle Measures", "Arc Length",
  "Unit Circle Values", "Sine and Cosine on Unit Circle", "Reference Angles", "Trigonometric Values All Quadrants",
  "Trigonometric Functions", "Sine and Cosine Functions", "Tangent Function", "Graphing Trig Functions",
  "Transformations of Trig Functions", "Amplitude Period Phase", "Writing Trig Equations", "Trig Applications",
  "Trigonometric Identities", "Pythagorean Identities", "Reciprocal Identities", "Quotient Identities",
  "Verifying Identities", "Simplifying Expressions", "Proving Identities", "Identity Applications",
  "Solving Trigonometric Equations", "Basic Trig Equations", "Multiple Angle Equations", "Trig Equation Applications",
  "Law of Sines", "Derivation and Formula", "Solving Triangles", "Ambiguous Case",
  "Law of Cosines", "Derivation and Formula", "Solving Triangles", "Applications Law of Cosines",
  "Area of Triangles", "Using Trigonometry", "Herons Formula", "Triangle Applications",
  "Circles", "Circle Equations", "Completing the Square Circles", "Graphing Circles",
  "Conic Sections Introduction", "Parabolas", "Ellipses", "Hyperbolas",
  "Probability", "Theoretical and Experimental", "Compound Probability", "Conditional Probability",
  "Statistics", "Descriptive Statistics", "Normal Distribution", "Statistical Analysis",
];

const mathGrade11Skills = [
  "Advanced Algebra Review", "Solving Equations", "Algebraic Functions", "Algebraic Modeling", "Algebra Applications",
  "Functions Review", "Domain and Range", "Function Notation", "Piecewise Functions",
  "Function Operations", "Addition Subtraction", "Multiplication Division", "Composition",
  "Inverse Functions", "Finding Inverses Algebraically", "Graphing Inverses", "Restricting Domain",
  "Polynomial Functions", "Graphing Polynomials", "End Behavior", "Zeros and Multiplicity",
  "Polynomial Division", "Long Division", "Synthetic Division", "Remainder Factor Theorems",
  "Zeros of Polynomials", "Rational Root Theorem", "Finding All Zeros", "Complex Zeros",
  "Polynomial Equations", "Solving by Factoring", "Using Zeros", "Polynomial Applications",
  "Rational Functions", "Domain and Asymptotes", "Graphing Rationals", "Holes and Discontinuities",
  "Solving Rational Equations", "Finding LCD", "Checking Solutions", "Rational Applications",
  "Rational Inequalities", "Sign Analysis", "Test Intervals", "Graphing Solution Sets",
  "Exponential Functions", "Growth and Decay", "Graphing Exponentials", "Transformations",
  "Exponential Equations", "Same Base Method", "Using Logarithms", "Applications",
  "Compound Interest", "Continuous Compounding", "Effective Rate", "Financial Applications",
  "Logarithmic Functions", "Inverse of Exponentials", "Properties of Logs", "Change of Base",
  "Solving Logarithmic Equations", "Using Properties", "Exponential Form", "Applications",
  "Solving Exponential Equations", "Taking Logarithms", "Natural Logarithms", "Applications",
  "Exponential Growth Decay Models", "Population Models", "Radioactive Decay", "Newtons Law of Cooling",
  "Trigonometry Review", "Unit Circle", "Trigonometric Functions", "Graphs of Trig Functions",
  "Advanced Trig Identities", "Pythagorean Identities", "Sum Difference Formulas", "Double Angle Formulas",
  "Half Angle Formulas", "Product to Sum", "Sum to Product", "Identity Applications",
  "Solving Trig Equations", "Basic Equations", "Using Identities", "Multiple Solutions",
  "Inverse Trig Functions", "Arcsin Arccos Arctan", "Domain and Range", "Evaluating Inverse Trig",
  "Applications of Trig", "Harmonic Motion", "Sound Waves", "Modeling Periodic Phenomena",
  "Sequences and Series", "Explicit and Recursive", "Arithmetic Sequences", "Geometric Sequences",
  "Series and Sigma Notation", "Arithmetic Series", "Geometric Series", "Partial Sums",
  "Infinite Geometric Series", "Convergence", "Sum Formula", "Applications",
  "Mathematical Induction", "Principle of Induction", "Proving Statements", "Induction Applications",
  "Binomial Theorem", "Binomial Expansion", "Pascals Triangle", "Finding Specific Terms",
  "Counting Principles", "Fundamental Counting", "Permutations", "Combinations",
  "Probability", "Basic Probability", "Compound Events", "Conditional Probability",
  "Probability Distributions", "Discrete Distributions", "Expected Value", "Binomial Distribution",
  "Conic Sections", "Circles", "Parabolas", "Ellipses",
  "Hyperbolas", "Equations of Conics", "Graphing Conics", "Conic Applications",
  "Parametric Equations", "Graphing Parametrics", "Eliminating Parameter", "Parametric Applications",
  "Polar Coordinates", "Converting Coordinates", "Polar Graphs", "Polar Equations",
  "Vectors Introduction", "Vector Operations", "Unit Vectors", "Vector Applications",
  "Limits Introduction", "Intuitive Limits", "Limits Graphically", "Limits Numerically",
  "Finding Limits", "Direct Substitution", "Factoring Method", "Rationalization",
  "Limits at Infinity", "Horizontal Asymptotes", "End Behavior", "Infinite Limits",
  "Continuity", "Definition of Continuity", "Types of Discontinuity", "Continuous Functions",
  "Introduction to Derivatives", "Slope of Tangent", "Derivative Definition", "Basic Derivatives",
  "Financial Mathematics", "Present and Future Value", "Annuities", "Loan Amortization",
];

const mathGrade12Skills = [
  "Pre-Calculus Algebra", "Solving Equations", "Advanced Algebra Review", "Algebraic Modeling", "Algebra Applications",
  "Limits Review", "Finding Limits", "One-Sided Limits", "Limits at Infinity",
  "Continuity", "Types of Discontinuity", "Intermediate Value Theorem", "Continuous Functions",
  "Definition of Derivative", "Limit Definition", "Differentiability", "Derivative as Function",
  "Basic Derivative Rules", "Power Rule", "Constant Multiple", "Sum and Difference",
  "Product Rule", "Derivation", "Applications", "Practice Problems",
  "Quotient Rule", "Derivation", "Applications", "Practice Problems",
  "Chain Rule", "Composite Functions", "Applications", "Nested Functions",
  "Derivatives Trig Functions", "Sine and Cosine", "Other Trig Functions", "Applications",
  "Derivatives Exponential Functions", "Natural Exponential", "General Exponential", "Applications",
  "Derivatives Logarithmic Functions", "Natural Logarithm", "General Logarithm", "Logarithmic Differentiation",
  "Implicit Differentiation", "Finding Derivatives Implicitly", "Related Rates Setup", "Related Rates Applications",
  "Higher Order Derivatives", "Second Derivative", "Third and Higher", "Applications",
  "Applications of Derivatives", "Position Velocity Acceleration", "Rates of Change", "Optimization Setup",
  "Optimization Problems", "Finding Maximum Minimum", "Applied Optimization", "Constraint Problems",
  "Related Rates", "Setting Up Equations", "Differentiating", "Solving Problems",
  "Curve Sketching", "First Derivative Test", "Second Derivative Test", "Concavity and Inflection",
  "Mean Value Theorem", "Statement and Meaning", "Rolles Theorem", "Applications",
  "Antiderivatives", "Basic Antiderivatives", "Initial Value Problems", "Antiderivative Rules",
  "Introduction to Integration", "Riemann Sums", "Definite Integrals", "Area Under Curve",
  "Fundamental Theorem of Calculus", "Part 1", "Part 2", "Applications",
  "Basic Integration Rules", "Power Rule Integration", "Sum and Difference", "Constant Multiple",
  "Integration by Substitution", "U-Substitution", "Changing Bounds", "Applications",
  "Integration Techniques", "Integration by Parts Intro", "Partial Fractions Intro", "Trig Substitution Intro",
  "Applications of Integration", "Area Between Curves", "Average Value", "Accumulation Functions",
  "Volume by Cross Sections", "Disk Method", "Washer Method", "Shell Method Introduction",
  "Vectors in 2D", "Vector Operations", "Unit Vectors", "Dot Product",
  "Vectors in 3D", "3D Coordinates", "Vector Operations 3D", "Cross Product Introduction",
  "Parametric Equations", "Graphing Parametrics", "Calculus with Parametrics", "Arc Length",
  "Polar Coordinates", "Graphing Polar", "Area in Polar", "Calculus with Polar",
  "Sequences", "Convergence Divergence", "Finding Limits", "Sequence Properties",
  "Series", "Convergence Tests", "Geometric Series", "p-Series",
  "Power Series", "Interval of Convergence", "Taylor Series Introduction", "Maclaurin Series",
  "Differential Equations Introduction", "Separable Equations", "Initial Value Problems", "Slope Fields",
  "Exponential Models", "Growth and Decay", "Logistics Growth", "Applications",
  "Probability Distributions", "Continuous Distributions", "Normal Distribution", "Applications",
  "Statistics", "Hypothesis Testing Introduction", "Confidence Intervals", "Statistical Inference",
  "Complex Numbers Review", "Polar Form", "De Moivres Theorem", "Roots of Complex Numbers",
  "Matrices Review", "Matrix Operations", "Determinants", "Inverse Matrices",
  "Linear Transformations", "Matrix Representation", "Composition", "Applications",
  "Mathematical Modeling", "Creating Models", "Analyzing Models", "Real World Applications",
];

// ENGLISH SKILLS BY GRADE
const englishJKSkills = [
  "Letter A Recognition", "Letter B Recognition", "Letter C Recognition", "Letter D Recognition",
  "Letter E Recognition", "Letter F Recognition", "Letter G Recognition", "Letter H Recognition",
  "Letter I Recognition", "Letter J Recognition", "Letter K Recognition", "Letter L Recognition",
  "Letter M Recognition", "Letter N Recognition", "Letter O Recognition", "Letter P Recognition",
  "Letter Q Recognition", "Letter R Recognition", "Letter S Recognition", "Letter T Recognition",
  "Letter U Recognition", "Letter V Recognition", "Letter W Recognition", "Letter X Recognition",
  "Letter Y Recognition", "Letter Z Recognition", "Uppercase Letters", "Lowercase Letters",
  "Matching Upper Lower", "Letter Sounds A-E", "Letter Sounds F-J", "Letter Sounds K-O",
  "Letter Sounds P-T", "Letter Sounds U-Z", "Beginning Sounds", "Ending Sounds",
  "Rhyming Words", "Word Families -at", "Word Families -an", "Word Families -it",
  "Listening Skills", "Following Directions", "Story Sequence", "Picture Clues",
  "Print Concepts", "Left to Right", "Top to Bottom", "Book Parts",
  "Vocabulary Colors", "Vocabulary Numbers", "Vocabulary Shapes", "Vocabulary Animals",
  "Vocabulary Family", "Vocabulary Body Parts", "Vocabulary Food", "Vocabulary Clothing",
  "Speaking Clearly", "Taking Turns", "Asking Questions", "Answering Questions",
  "Name Writing", "Letter Tracing", "Letter Formation", "Pencil Grip",
  "Oral Vocabulary", "New Word Learning", "Word Meaning", "Using New Words",
  "Story Elements", "Characters", "Setting", "Events",
  "Comprehension", "Retelling Stories", "Making Predictions", "Asking About Stories",
  "Environmental Print", "Signs and Symbols", "Labels", "Familiar Words",
  "Phonological Awareness", "Syllable Clapping", "Sound Isolation", "Sound Matching",
];

const englishKindergartenSkills = [
  "Letter Recognition Mastery", "Letter Sounds Mastery", "Beginning Sound Identification", "Ending Sound Identification",
  "Middle Sound Identification", "CVC Words Introduction", "Blending Sounds", "Segmenting Sounds",
  "Word Families -at", "Word Families -an", "Word Families -ap", "Word Families -ad",
  "Word Families -ag", "Word Families -am", "Word Families -it", "Word Families -in",
  "Word Families -ip", "Word Families -ig", "Word Families -ot", "Word Families -op",
  "Word Families -og", "Word Families -ut", "Word Families -ug", "Word Families -un",
  "Sight Words Set 1", "Sight Words Set 2", "Sight Words Set 3", "Sight Words Set 4",
  "Sight Words the a", "Sight Words is it", "Sight Words and to", "Sight Words we can",
  "Reading Simple Sentences", "Picture and Word Match", "Reading CVC Words", "Word Building",
  "Print Concepts Review", "Reading Left to Right", "Return Sweep", "Word Spacing",
  "Capital Letters", "Periods", "Question Marks", "Exclamation Points",
  "Sentence Structure", "Complete Sentences", "Naming Parts", "Action Parts",
  "Writing Letters", "Writing Words", "Writing Sentences", "Journal Writing",
  "Story Elements", "Characters Identification", "Setting Identification", "Problem and Solution",
  "Sequencing Events", "First Next Last", "Retelling Stories", "Story Details",
  "Main Idea", "Supporting Details", "Making Predictions", "Making Connections",
  "Vocabulary Development", "Context Clues Introduction", "Category Words", "Descriptive Words",
  "Rhyming Production", "Syllable Counting", "Phoneme Addition", "Phoneme Deletion",
  "Listening Comprehension", "Following Multi-Step Directions", "Answering Questions", "Asking Questions",
  "Speaking and Presenting", "Show and Tell", "Describing Objects", "Sharing Ideas",
  "Handwriting", "Letter Formation", "Word Spacing", "Sentence Writing",
  "Grammar Basics", "Nouns Introduction", "Verbs Introduction", "Adjectives Introduction",
  "Reading Fluency", "Appropriate Pace", "Expression", "Accuracy",
  "Comprehension Strategies", "Visualizing", "Questioning", "Summarizing",
];

const englishGrade1Skills = [
  "Short Vowel A", "Short Vowel E", "Short Vowel I", "Short Vowel O",
  "Short Vowel U", "Long Vowel A", "Long Vowel E", "Long Vowel I",
  "Long Vowel O", "Long Vowel U", "CVCe Words", "Vowel Teams ea",
  "Vowel Teams ai", "Vowel Teams oa", "Vowel Teams ee", "Vowel Teams ie",
  "R-Controlled ar", "R-Controlled or", "R-Controlled er", "R-Controlled ir ur",
  "Consonant Blends bl cl", "Consonant Blends br cr", "Consonant Blends dr fr", "Consonant Blends gl pl",
  "Consonant Blends sk sl", "Consonant Blends sm sn", "Consonant Blends sp st", "Consonant Blends sw tw",
  "Consonant Digraphs ch", "Consonant Digraphs sh", "Consonant Digraphs th", "Consonant Digraphs wh",
  "Ending Blends nd", "Ending Blends nk", "Ending Blends nt", "Ending Blends mp",
  "Sight Words Grade 1 Set 1", "Sight Words Grade 1 Set 2", "Sight Words Grade 1 Set 3", "Sight Words Grade 1 Set 4",
  "Reading Fluency Practice", "Reading with Expression", "Reading Accuracy", "Reading Rate",
  "Nouns Common", "Nouns Proper", "Singular Nouns", "Plural Nouns",
  "Verbs Action", "Verbs Present Tense", "Verbs Past Tense", "Subject Verb Agreement",
  "Adjectives Descriptive", "Adjectives Size", "Adjectives Color", "Adjectives Number",
  "Pronouns I me", "Pronouns he she", "Pronouns we they", "Pronouns it",
  "Sentences Statements", "Sentences Questions", "Sentences Exclamations", "Sentences Commands",
  "Capitalization", "Beginning of Sentence", "Proper Nouns", "Pronoun I",
  "Punctuation Periods", "Punctuation Question Marks", "Punctuation Exclamation Points", "Commas in Dates",
  "Spelling CVC Words", "Spelling CVCe Words", "Spelling Sight Words", "Spelling Patterns",
  "Writing Sentences", "Writing Paragraphs", "Writing Stories", "Writing Informational",
  "Main Idea", "Supporting Details", "Retelling", "Summarizing",
  "Story Elements", "Characters", "Setting", "Plot",
  "Making Predictions", "Making Connections", "Asking Questions", "Visualizing",
  "Cause and Effect", "Compare and Contrast", "Sequencing", "Drawing Conclusions",
  "Vocabulary Strategies", "Context Clues", "Picture Clues", "Word Parts",
  "Synonyms", "Antonyms", "Homophones", "Multiple Meaning Words",
  "Listening Skills", "Following Directions", "Active Listening", "Note Taking Introduction",
  "Speaking Skills", "Presenting Ideas", "Asking Questions", "Discussions",
];

const englishGrade2Skills = [
  "Long Vowel Patterns", "Vowel Teams Review", "Diphthongs oi oy", "Diphthongs ou ow",
  "Silent Letters kn wr", "Silent Letters gn mb", "Soft c and g", "Hard c and g",
  "Prefixes un re", "Prefixes pre dis", "Suffixes er est", "Suffixes ly ful",
  "Suffixes less ness", "Compound Words", "Contractions", "Abbreviations",
  "Syllable Types", "Closed Syllables", "Open Syllables", "VCe Syllables",
  "Syllable Division", "VCCV Pattern", "VCV Pattern", "Consonant le",
  "Sight Words Grade 2", "High Frequency Words", "Academic Vocabulary", "Domain Vocabulary",
  "Reading Fluency", "Phrasing", "Expression", "Rate and Accuracy",
  "Nouns Review", "Collective Nouns", "Possessive Nouns", "Irregular Plurals",
  "Verbs Review", "Irregular Verbs", "Helping Verbs", "Linking Verbs",
  "Adjectives Review", "Comparative Adjectives", "Superlative Adjectives", "Articles a an the",
  "Adverbs Introduction", "Adverbs of Time", "Adverbs of Place", "Adverbs of Manner",
  "Pronouns Review", "Possessive Pronouns", "Reflexive Pronouns", "Subject Object Pronouns",
  "Sentence Types Review", "Simple Sentences", "Compound Sentences Introduction", "Combining Sentences",
  "Capitalization Review", "Titles", "Holidays", "Geographic Names",
  "Punctuation Review", "Commas in Series", "Apostrophes", "Quotation Marks Introduction",
  "Spelling Patterns", "Word Families", "Spelling Rules", "Tricky Words",
  "Writing Process", "Prewriting", "Drafting", "Revising",
  "Editing", "Publishing", "Writing Narratives", "Writing Informational",
  "Writing Opinion", "Paragraph Structure", "Topic Sentences", "Supporting Details",
  "Main Idea and Details", "Central Message", "Theme Introduction", "Authors Purpose",
  "Story Elements Review", "Character Traits", "Character Motivation", "Setting Importance",
  "Plot Structure", "Beginning Middle End", "Problem Solution", "Conflict Resolution",
  "Making Inferences", "Drawing Conclusions", "Predicting Outcomes", "Making Connections",
  "Compare Contrast", "Cause Effect", "Sequence Events", "Fact Opinion",
  "Text Features", "Headings", "Captions", "Glossary",
  "Text Structures", "Description", "Sequence", "Compare Contrast",
  "Poetry Elements", "Rhyme", "Rhythm", "Repetition",
  "Vocabulary Strategies", "Context Clues", "Word Parts", "Dictionary Skills",
  "Synonyms Antonyms", "Homophones Homographs", "Multiple Meanings", "Figurative Language Introduction",
  "Research Skills", "Asking Questions", "Finding Information", "Taking Notes",
  "Listening Speaking", "Discussions", "Presentations", "Following Directions",
];

const englishGrade3Skills = [
  "Phonics Review", "Multisyllabic Words", "Syllable Patterns", "Word Analysis",
  "Prefixes un re pre", "Prefixes dis mis non", "Prefixes over under", "Prefixes in im il ir",
  "Suffixes tion sion", "Suffixes able ible", "Suffixes ment ness", "Suffixes ous ious",
  "Greek Roots", "Latin Roots", "Root Words", "Word Origins",
  "Compound Words", "Contractions", "Abbreviations", "Acronyms",
  "Sight Words Advanced", "Academic Vocabulary", "Content Vocabulary", "Tier 2 Words",
  "Reading Fluency", "Expression Phrasing", "Rate Accuracy", "Self-Correction",
  "Nouns Abstract", "Nouns Concrete", "Possessive Nouns", "Plural Possessives",
  "Verbs Regular", "Verbs Irregular", "Verb Tenses", "Perfect Tense Introduction",
  "Adjectives Comparative", "Adjectives Superlative", "Ordering Adjectives", "Adjective Clauses Introduction",
  "Adverbs Review", "Comparative Adverbs", "Relative Adverbs", "Adverb Placement",
  "Pronouns Review", "Pronoun Antecedent Agreement", "Relative Pronouns", "Indefinite Pronouns",
  "Prepositions", "Prepositional Phrases", "Conjunctions Coordinating", "Conjunctions Subordinating",
  "Sentence Structure", "Simple Sentences", "Compound Sentences", "Complex Sentences Introduction",
  "Subject Predicate", "Complete Subjects", "Complete Predicates", "Compound Subjects Predicates",
  "Capitalization Rules", "Titles of Works", "Proper Nouns Review", "Letter Writing",
  "Punctuation Commas", "Dialogue Punctuation", "Apostrophes Contractions", "Apostrophes Possessives",
  "Spelling Strategies", "Spelling Patterns", "Commonly Misspelled", "Spelling Rules",
  "Writing Process Review", "Planning", "Drafting", "Revising Editing",
  "Narrative Writing", "Personal Narratives", "Fictional Narratives", "Dialogue in Narratives",
  "Informational Writing", "Reports", "Explanatory Text", "How-To Writing",
  "Opinion Writing", "Persuasive Writing", "Supporting Reasons", "Conclusions",
  "Paragraph Structure", "Topic Sentences", "Body Sentences", "Concluding Sentences",
  "Main Idea Details", "Determining Importance", "Summarizing", "Paraphrasing",
  "Theme", "Central Message", "Lesson Learned", "Theme vs Topic",
  "Character Analysis", "Character Traits", "Character Change", "Character Motivation",
  "Setting Analysis", "Setting Influence", "Time Period", "Location Details",
  "Plot Analysis", "Rising Action", "Climax", "Falling Action Resolution",
  "Point of View", "First Person", "Third Person", "Narrator",
  "Compare Contrast Texts", "Compare Characters", "Compare Themes", "Compare Genres",
  "Cause Effect", "Signal Words", "Multiple Causes Effects", "Cause Effect Chains",
  "Text Features", "Graphs Charts", "Maps Diagrams", "Text Boxes Sidebars",
  "Text Structures", "Problem Solution", "Cause Effect", "Chronological",
  "Poetry", "Stanzas Verses", "Figurative Language", "Imagery",
  "Drama Elements", "Script Reading", "Stage Directions", "Character Dialogue",
  "Research Process", "Choosing Topics", "Finding Sources", "Note Taking",
  "Citing Sources", "Avoiding Plagiarism", "Bibliography Introduction", "Research Reports",
  "Listening Skills", "Active Listening", "Taking Notes", "Asking Questions",
  "Speaking Skills", "Oral Reports", "Discussions", "Formal Informal",
];

const englishGrade4Skills = [
  "Main Idea and Supporting Details", "Summarizing a Text", "Making Inferences", "Using Evidence from the Text",
  "Point of View", "Theme and Message", "Character Traits", "Character Change",
  "Setting and Mood", "Plot and Conflict", "Cause and Effect", "Compare and Contrast Texts",
  "Text Features", "Reading Non-Fiction", "Reading Media Texts", "Fact and Opinion",
  "Vocabulary in Context", "Prefixes and Suffixes", "Synonyms and Antonyms", "Figurative Language",
  "Parts of Speech Review", "Common and Proper Nouns", "Verb Tense Consistency", "Subject Verb Agreement",
  "Pronouns", "Adjectives and Adverbs", "Capitalization Rules", "Punctuation in Dialogue",
  "Paragraph Structure", "Topic Sentences", "Opinion Writing", "Informational Writing",
  "Narrative Writing", "Using Transition Words", "Revising and Editing", "Oral Communication",
];
const englishGrade5Skills = generateSkillNames("english", 5, 100);
const englishGrade6Skills = generateSkillNames("english", 6, 100);
const englishGrade7Skills = generateSkillNames("english", 7, 100);
const englishGrade8Skills = generateSkillNames("english", 8, 100);
const englishGrade9Skills = generateSkillNames("english", 9, 100);
const englishGrade10Skills = generateSkillNames("english", 10, 100);
const englishGrade11Skills = generateSkillNames("english", 11, 100);
const englishGrade12Skills = generateSkillNames("english", 12, 100);

// SCIENCE SKILLS BY GRADE
const scienceJKSkills = [
  "Living Things", "Non-Living Things", "Living vs Non-Living", "Needs of Living Things",
  "Plants Basics", "Animals Basics", "Humans", "Growth and Change",
  "Body Parts", "Five Senses Sight", "Five Senses Hearing", "Five Senses Touch",
  "Five Senses Taste", "Five Senses Smell", "Using Our Senses", "Senses and Safety",
  "Weather Sunny", "Weather Rainy", "Weather Cloudy", "Weather Snowy",
  "Weather Windy", "Seasons Fall", "Seasons Winter", "Seasons Spring",
  "Seasons Summer", "Weather Clothes", "Weather Activities", "Weather Observation",
  "Day and Night", "Sun", "Moon", "Stars",
  "Colors in Nature", "Rainbow Colors", "Mixing Colors", "Colors Around Us",
  "Water", "Air", "Land", "Natural Resources",
  "Rocks", "Soil", "Sand", "Natural Materials",
  "Push and Pull", "Movement", "Fast and Slow", "Up and Down",
  "Float and Sink", "Heavy and Light", "Hard and Soft", "Rough and Smooth",
  "Hot and Cold", "Temperature", "Thermometer Basics", "Staying Safe Temperature",
  "Animals Pets", "Animals Farm", "Animals Wild", "Animals Zoo",
  "Animal Homes", "Animal Babies", "Animal Sounds", "Animal Movement",
  "Plants Parts", "Plants Need", "Growing Plants", "Caring for Plants",
  "Seeds", "Flowers", "Trees", "Leaves",
  "Healthy Habits", "Exercise", "Nutrition Basics", "Sleep",
  "Safety Home", "Safety School", "Safety Outside", "Safety Rules",
  "Recycle", "Reuse", "Reduce", "Caring for Earth",
  "Science Tools", "Magnifying Glass", "Observation", "Asking Questions",
];

const scienceKindergartenSkills = [
  "Living Things Characteristics", "Non-Living Things", "Living Needs", "Living Growth",
  "Plants Parts", "Plant Needs", "Plant Growth", "Plant Life Cycle",
  "Seeds Germination", "Roots Stems", "Leaves Flowers", "Fruits Vegetables",
  "Animals Groups", "Mammals", "Birds", "Fish",
  "Reptiles Amphibians", "Insects", "Animal Needs", "Animal Habitats",
  "Animal Life Cycles", "Baby Animals", "Animal Adaptations", "Pets and Wild Animals",
  "Human Body", "Body Systems Intro", "Staying Healthy", "Exercise Importance",
  "Nutrition", "Food Groups", "Healthy Choices", "Hygiene",
  "Five Senses Review", "Sight Detailed", "Hearing Detailed", "Touch Detailed",
  "Taste Detailed", "Smell Detailed", "Senses Working Together", "Senses Safety",
  "Weather Types", "Weather Patterns", "Measuring Weather", "Weather Tools",
  "Seasons Changes", "Fall Characteristics", "Winter Characteristics", "Spring Characteristics",
  "Summer Characteristics", "Seasonal Activities", "Seasonal Clothing", "Animal Seasons",
  "Day and Night Cycle", "Sun Movement", "Shadows", "Moon Phases Introduction",
  "Stars", "Sky Observation", "Space Introduction", "Earth Our Home",
  "Matter Introduction", "Solids", "Liquids", "Gases",
  "Properties of Matter", "Size Shape", "Color Texture", "Comparing Objects",
  "Changing Matter", "Heating Cooling", "Mixing Materials", "Reversible Changes",
  "Forces Introduction", "Push Force", "Pull Force", "Gravity Introduction",
  "Motion", "Speed", "Direction", "Stopping Motion",
  "Magnets Introduction", "Magnetic Materials", "Magnet Poles", "Magnet Uses",
  "Sound Introduction", "Making Sounds", "Loud Soft Sounds", "High Low Sounds",
  "Light Introduction", "Light Sources", "Light and Dark", "Light Safety",
  "Water Properties", "Water Uses", "Water Cycle Introduction", "Saving Water",
  "Air Properties", "Air All Around", "Wind", "Air Uses",
  "Rocks Minerals", "Soil Types", "Earth Materials", "Natural vs Manmade",
  "Reduce Reuse Recycle", "Caring for Environment", "Pollution", "Conservation",
  "Science Process Skills", "Observing", "Comparing", "Classifying",
  "Predicting", "Measuring", "Recording", "Communicating",
  "Simple Investigations", "Asking Questions", "Planning", "Collecting Data",
  "Tools Scientists Use", "Rulers Scales", "Thermometers", "Magnifiers",
];

const scienceGrade1Skills = generateSkillNames("science", 1, 100);
const scienceGrade2Skills = generateSkillNames("science", 2, 100);
const scienceGrade3Skills = generateSkillNames("science", 3, 100);
const scienceGrade4Skills = [
  "Habitats and Communities", "Roles in a Habitat", "Food Chains", "Adaptations and Survival",
  "Human Impact on Habitats", "Producers Consumers and Decomposers", "Biodiversity", "Protecting Ecosystems",
  "Rocks and Minerals", "Properties of Rocks", "Properties of Minerals", "Uses of Rocks and Minerals",
  "Weathering and Erosion", "Soil Formation", "Mining and the Environment", "Conserving Earth Materials",
  "Pulleys and Gears", "Fixed and Movable Pulleys", "Gear Direction and Speed", "Mechanical Advantage",
  "Systems in Daily Life", "Designing Simple Machines", "Forces in Pulley Systems", "Comparing Mechanisms",
  "Light and Sound", "Transparent Translucent Opaque", "Reflection of Light", "Sources of Light",
  "Vibration and Sound", "Pitch and Volume", "Hearing Safety", "Applications of Light and Sound",
];
const scienceGrade5Skills = generateSkillNames("science", 5, 100);
const scienceGrade6Skills = generateSkillNames("science", 6, 100);
const scienceGrade7Skills = generateSkillNames("science", 7, 100);
const scienceGrade8Skills = generateSkillNames("science", 8, 100);
const scienceGrade9Skills = generateSkillNames("science", 9, 100);
const scienceGrade10Skills = generateSkillNames("science", 10, 100);
const scienceGrade11Skills = generateSkillNames("science", 11, 100);
const scienceGrade12Skills = generateSkillNames("science", 12, 100);

// Helper function to generate skill names for grades where we need many skills
function generateSkillNames(subject: string, grade: number, count: number): string[] {
  const subjectTopics: Record<string, Record<number, string[]>> = {
    english: {
      4: ["Reading Comprehension", "Vocabulary", "Grammar", "Writing", "Spelling", "Phonics", "Literature", "Poetry", "Research", "Speaking"],
      5: ["Reading Strategies", "Vocabulary Building", "Grammar Rules", "Writing Process", "Spelling Patterns", "Literary Analysis", "Poetry Analysis", "Research Skills", "Oral Presentation", "Text Structures"],
      6: ["Close Reading", "Academic Vocabulary", "Grammar Mastery", "Essay Writing", "Word Study", "Literary Elements", "Poetry Forms", "Research Methods", "Discussion Skills", "Informational Text"],
      7: ["Critical Reading", "Context Clues", "Sentence Structure", "Argumentative Writing", "Greek Latin Roots", "Novel Study", "Poetry Interpretation", "Source Evaluation", "Debate Skills", "Media Literacy"],
      8: ["Analytical Reading", "Word Origins", "Complex Sentences", "Research Papers", "Etymology", "Short Stories", "Poetry Composition", "Citation Skills", "Public Speaking", "Digital Literacy"],
      9: ["Literary Analysis", "SAT Vocabulary", "Advanced Grammar", "Expository Writing", "Word Relationships", "Drama Study", "Poetry Analysis", "MLA Format", "Formal Presentation", "Rhetoric Introduction"],
      10: ["Textual Analysis", "Academic Words", "Syntax", "Persuasive Writing", "Connotation Denotation", "Shakespeare", "Poetic Devices", "Research Synthesis", "Seminar Discussion", "Rhetorical Analysis"],
      11: ["AP Reading Skills", "SAT Prep Vocabulary", "Style Analysis", "College Essays", "Vocabulary Strategies", "American Literature", "Poetry Movements", "Annotated Bibliography", "Socratic Seminar", "Rhetorical Appeals"],
      12: ["College Level Reading", "Graduate Vocabulary", "Writing Style", "Thesis Writing", "Language Evolution", "World Literature", "Contemporary Poetry", "Academic Research", "Professional Communication", "Critical Theory"],
    },
    science: {
      1: ["Life Science", "Physical Science", "Earth Science", "Weather", "Plants", "Animals", "Matter", "Energy", "Forces", "Environment"],
      2: ["Living Things", "Habitats", "Life Cycles", "Matter Properties", "Energy Forms", "Forces Motion", "Earth Materials", "Weather Climate", "Conservation", "Scientific Method"],
      3: ["Ecosystems", "Adaptations", "Inherited Traits", "States of Matter", "Energy Transfer", "Simple Machines", "Rocks Minerals", "Weather Patterns", "Natural Resources", "Investigation Skills"],
      4: ["Food Webs", "Plant Animal Cells", "Body Systems", "Physical Chemical Changes", "Electricity", "Sound Light", "Earths Layers", "Water Cycle", "Renewable Energy", "Experimental Design"],
      5: ["Ecosystems Interactions", "Human Body Systems", "Genetics Introduction", "Mixtures Solutions", "Energy Transformations", "Waves", "Earth Systems", "Space", "Engineering Design", "Data Analysis"],
      6: ["Cell Biology", "Body Systems Detailed", "Genetics Heredity", "Chemistry Basics", "Energy Resources", "Waves Properties", "Plate Tectonics", "Astronomy", "Climate", "Scientific Inquiry"],
      7: ["Cell Processes", "Human Biology", "Evolution", "Atoms Elements", "Chemical Reactions", "Forces Energy", "Earth History", "Solar System", "Weather Systems", "Lab Skills"],
      8: ["Life Processes", "Reproduction Growth", "Natural Selection", "Periodic Table", "Chemical Bonding", "Motion Forces", "Rocks Cycle", "Universe", "Climate Change", "Research Methods"],
      9: ["Biology Foundations", "Ecology", "Molecular Biology", "Chemistry Principles", "Physics Concepts", "Earth Science", "Environmental Science", "Astronomy", "Scientific Writing", "Laboratory Techniques"],
      10: ["Advanced Biology", "Biochemistry", "Organic Chemistry", "Inorganic Chemistry", "Mechanics", "Thermodynamics", "Geology", "Astrophysics", "Environmental Issues", "Research Projects"],
      11: ["Cellular Biology", "Genetics Advanced", "Physical Chemistry", "Analytical Chemistry", "Kinematics", "Dynamics", "Electricity Magnetism", "Earth Systems Science", "Biotechnology", "Independent Research"],
      12: ["Molecular Biology", "Biotechnology", "Organic Reactions", "Quantum Chemistry", "Waves Optics", "Modern Physics", "Geophysics", "Cosmology", "Sustainability", "Capstone Project"],
    },
  };

  const topics = subjectTopics[subject]?.[grade] || ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6", "Topic 7", "Topic 8", "Topic 9", "Topic 10"];
  const skills: string[] = [];
  
  const subtopics = [
    "Introduction", "Basics", "Fundamentals", "Core Concepts", "Key Terms",
    "Principles", "Applications", "Practice", "Review", "Assessment",
    "Part 1", "Part 2", "Part 3", "Advanced", "Mastery",
    "Workshop", "Lab", "Project", "Challenge", "Extension"
  ];

  for (const topic of topics) {
    for (const sub of subtopics) {
      if (skills.length < count) {
        skills.push(`${topic} ${sub}`);
      }
    }
  }

  return skills.slice(0, count);
}

// Skills for each subject and grade
export const skills: Record<string, Record<string, Skill[]>> = {
  math: {
    "jk": generateSkills("math", "jk", mathJKSkills),
    "kindergarten": generateSkills("math", "kindergarten", mathKindergartenSkills),
    "grade-1": generateSkills("math", "grade-1", mathGrade1Skills),
    "grade-2": generateSkills("math", "grade-2", mathGrade2Skills),
    "grade-3": generateSkills("math", "grade-3", mathGrade3Skills),
    "grade-4": generateSkills("math", "grade-4", mathGrade4Skills),
    "grade-5": generateSkills("math", "grade-5", mathGrade5Skills),
    "grade-6": generateSkills("math", "grade-6", mathGrade6Skills),
    "grade-7": generateSkills("math", "grade-7", mathGrade7Skills),
    "grade-8": generateSkills("math", "grade-8", mathGrade8Skills),
    "grade-9": generateSkills("math", "grade-9", mathGrade9Skills),
    "grade-10": generateSkills("math", "grade-10", mathGrade10Skills),
    "grade-11": generateSkills("math", "grade-11", mathGrade11Skills),
    "grade-12": generateSkills("math", "grade-12", mathGrade12Skills),
  },
  english: {
    "jk": generateSkills("english", "jk", englishJKSkills),
    "kindergarten": generateSkills("english", "kindergarten", englishKindergartenSkills),
    "grade-1": generateSkills("english", "grade-1", englishGrade1Skills),
    "grade-2": generateSkills("english", "grade-2", englishGrade2Skills),
    "grade-3": generateSkills("english", "grade-3", englishGrade3Skills),
    "grade-4": generateSkills("english", "grade-4", englishGrade4Skills),
    "grade-5": generateSkills("english", "grade-5", englishGrade5Skills),
    "grade-6": generateSkills("english", "grade-6", englishGrade6Skills),
    "grade-7": generateSkills("english", "grade-7", englishGrade7Skills),
    "grade-8": generateSkills("english", "grade-8", englishGrade8Skills),
    "grade-9": generateSkills("english", "grade-9", englishGrade9Skills),
    "grade-10": generateSkills("english", "grade-10", englishGrade10Skills),
    "grade-11": generateSkills("english", "grade-11", englishGrade11Skills),
    "grade-12": generateSkills("english", "grade-12", englishGrade12Skills),
  },
  science: {
    "jk": generateSkills("science", "jk", scienceJKSkills),
    "kindergarten": generateSkills("science", "kindergarten", scienceKindergartenSkills),
    "grade-1": generateSkills("science", "grade-1", scienceGrade1Skills),
    "grade-2": generateSkills("science", "grade-2", scienceGrade2Skills),
    "grade-3": generateSkills("science", "grade-3", scienceGrade3Skills),
    "grade-4": generateSkills("science", "grade-4", scienceGrade4Skills),
    "grade-5": generateSkills("science", "grade-5", scienceGrade5Skills),
    "grade-6": generateSkills("science", "grade-6", scienceGrade6Skills),
    "grade-7": generateSkills("science", "grade-7", scienceGrade7Skills),
    "grade-8": generateSkills("science", "grade-8", scienceGrade8Skills),
    "grade-9": generateSkills("science", "grade-9", scienceGrade9Skills),
    "grade-10": generateSkills("science", "grade-10", scienceGrade10Skills),
    "grade-11": generateSkills("science", "grade-11", scienceGrade11Skills),
    "grade-12": generateSkills("science", "grade-12", scienceGrade12Skills),
  },
};

// Generate quiz questions dynamically based on skill
function generateQuizQuestions(subject: string, grade: string, skillName: string, quizId = ""): Question[] {
  const gradeLevelMap: Record<string, number> = {
    jk: 0,
    kindergarten: 0,
    "grade-1": 1,
    "grade-2": 2,
    "grade-3": 3,
    "grade-4": 4,
    "grade-5": 5,
    "grade-6": 6,
    "grade-7": 7,
    "grade-8": 8,
    "grade-9": 9,
    "grade-10": 10,
    "grade-11": 11,
    "grade-12": 12,
  };

  const level = gradeLevelMap[grade] ?? 1;
  const skillLower = skillName.toLowerCase();
  const seed = `${subject}-${grade}-${skillName}-${quizId}`
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  let state = seed || 1;
  const rand = (min: number, max: number): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return min + (state % (max - min + 1));
  };

  const makeNumericOptions = (correct: number): string[] => {
    const options = new Set<number>([correct]);
    const spread = Math.max(2, Math.floor(Math.abs(correct) * 0.2));
    while (options.size < 4) {
      const delta = rand(1, spread + 3);
      options.add(correct + (rand(0, 1) === 0 ? delta : -delta));
    }
    return [...options].map(String).slice(0, 4);
  };

  const equationQuestion = (prompt: string, correct: number): Question => ({
    question: prompt,
    options: makeNumericOptions(correct),
    answer: String(correct),
  });

  // Grade 5 has many ecosystem skills.  They need their own questions rather
  // than the broad ecology template used by the lower grades.
  if (subject === "science" && grade === "grade-5" && skillLower.includes("ecosystems interactions")) {
    const scenarios = [
      ["a bee", "a flower", "nectar and pollen"],
      ["a rabbit", "grass", "food energy"],
      ["a frog", "a pond", "water and shelter"],
      ["an owl", "a forest", "prey and nesting space"],
      ["a salmon", "a stream", "clean, oxygen-rich water"],
      ["a squirrel", "an oak tree", "acorns and shelter"],
      ["a monarch butterfly", "a milkweed plant", "food for its caterpillars"],
      ["a fox", "a meadow", "small-animal prey"],
      ["an earthworm", "soil", "decaying leaves"],
      ["a heron", "a wetland", "fish and nesting habitat"],
      ["a bat", "a nighttime garden", "insects to eat"],
      ["a beaver", "a pond edge", "wood and water"],
      ["a deer", "a woodland", "plants and cover"],
      ["a ladybug", "a garden plant", "aphids to eat"],
      ["a turtle", "a marsh", "sunny basking places and water"],
      ["a hawk", "an open field", "small mammals to hunt"],
      ["a mushroom", "a forest floor", "dead plant material"],
      ["a seal", "the Arctic coast", "fish and sea ice"],
      ["a hummingbird", "a flowering shrub", "nectar"],
      ["a crab", "a rocky shore", "shelter between rocks"],
    ] as const;
    const lessonIndex = Math.max(0, scienceGrade5Skills.indexOf(skillName)) % scenarios.length;
    const [organism, place, resource] = scenarios[lessonIndex];

    return [
      { question: `Why does ${organism} depend on ${place}?`, options: [`It can find ${resource}`, "It can turn into a rock", "It never needs resources", "It can stop the weather"], answer: `It can find ${resource}` },
      { question: `If ${place} became polluted, which change could affect ${organism} first?`, options: ["Its food, water, or shelter could become harder to find", "It would no longer need energy", "It would become a producer", "It would make all plants disappear"], answer: "Its food, water, or shelter could become harder to find" },
      { question: `What does the relationship between ${organism} and ${place} show?`, options: ["Living things depend on both organisms and non-living parts of an ecosystem", "Animals can live without a habitat", "Only plants affect ecosystems", "Ecosystems never change"], answer: "Living things depend on both organisms and non-living parts of an ecosystem" },
      { question: `Which action would best help protect ${organism}'s ecosystem?`, options: [`Keep ${place} clean and protect its habitat`, "Remove all plants from the area", "Add garbage to the water or soil", "Use more resources than the ecosystem can replace"], answer: `Keep ${place} clean and protect its habitat` },
      { question: `In an ecosystem, why is ${resource} important for ${organism}?`, options: ["It helps the organism meet a survival need", "It replaces the need for a habitat", "It makes the organism non-living", "It stops energy from moving through the ecosystem"], answer: "It helps the organism meet a survival need" },
    ];
  }

  const hasAny = (terms: string[]): boolean => terms.some((term) => skillLower.includes(term));
  const skillWords = skillName
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  const stopWords = new Set([
    "and", "the", "of", "to", "with", "by", "for", "in", "on", "intro", "introduction",
    "review", "basics", "advanced", "simple", "mixed", "word", "problems", "problem",
    "practice", "using", "use", "real", "world", "all", "grade"
  ]);
  const focusWords = skillWords.filter((word) => !stopWords.has(word));
  const focusWord = focusWords[0] ?? skillWords[0] ?? "skill";
  const topicLabel = focusWords.slice(0, 3).join(" ") || skillName.toLowerCase();
  const skillNumberMatches = [...skillName.matchAll(/\d+/g)].map((match) => Number(match[0]));
  const firstSkillNumber = skillNumberMatches[0];
  const secondSkillNumber = skillNumberMatches[1];

  if (subject === "math") {
    // Ontario-specific question generation based on curriculum expectations

    if (
      (grade === "jk" || grade === "kindergarten") &&
      (
        skillLower.includes("shape") ||
        skillLower.includes("circle") ||
        skillLower.includes("square") ||
        skillLower.includes("triangle") ||
        skillLower.includes("rectangle") ||
        skillLower.includes("oval") ||
        skillLower.includes("star") ||
        skillLower.includes("diamond") ||
        skillLower.includes("heart")
      )
    ) {
      return earlyShapeQuestions(skillName);
    }

    // Continue with existing logic for other skills
    const isAddition = skillLower.includes("addition") || skillLower.includes("add") || skillLower.includes("plus");
    const isSubtraction = skillLower.includes("subtraction") || skillLower.includes("subtract") || skillLower.includes("minus");
    const isMultiplication = skillLower.includes("multiplication") || skillLower.includes("multiply") || skillLower.includes("times");
    const isDivision = skillLower.includes("division") || skillLower.includes("divide");
    const isCounting =
      skillLower.includes("counting") ||
      skillLower.includes("number recognition") ||
      skillLower.includes("numbers in order") ||
      skillLower.includes("missing numbers") ||
      skillLower.includes("one more") ||
      skillLower.includes("one less") ||
      skillLower.includes("before and after numbers") ||
      skillLower.includes("between numbers");
    const isFraction = skillLower.includes("fraction");
    const isDecimal = skillLower.includes("decimal");
    const isPercent = skillLower.includes("percent");
    const isGeometry =
      skillLower.includes("shape") ||
      skillLower.includes("angle") ||
      skillLower.includes("perimeter") ||
      skillLower.includes("area") ||
      skillLower.includes("volume");
    const isMeasurement =
      skillLower.includes("time") ||
      skillLower.includes("money") ||
      skillLower.includes("length") ||
      skillLower.includes("mass") ||
      skillLower.includes("capacity") ||
      skillLower.includes("measurement");
    const isPattern = skillLower.includes("pattern") || skillLower.includes("sequence");
    const isShapeIdentification =
      skillLower.includes("identifying circles") ||
      skillLower.includes("identifying squares") ||
      skillLower.includes("identifying triangles") ||
      skillLower.includes("identifying rectangles") ||
      skillLower.includes("matching shapes") ||
      skillLower.includes("sorting by shape");
    const isSizeComparison =
      skillLower.includes("big and small") ||
      skillLower.includes("long and short") ||
      skillLower.includes("tall and short") ||
      skillLower.includes("heavy and light") ||
      skillLower.includes("comparing lengths") ||
      skillLower.includes("comparing weights");
    const isPositionSkill =
      skillLower.includes("position") ||
      skillLower.includes("direction") ||
      skillLower.includes("left and right") ||
      skillLower.includes("top and bottom") ||
      skillLower.includes("near and far") ||
      skillLower.includes("first and last") ||
      skillLower.includes("ordinal") ||
      skillLower.includes("ordering events") ||
      skillLower.includes("tenth position") ||
      skillLower.includes("following directions") ||
      skillLower.includes("mapping basics");
    const isSortingSkill =
      skillLower.includes("sorting by color") ||
      skillLower.includes("sorting by size") ||
      skillLower.includes("sorting and classifying") ||
      skillLower.includes("attributes");
    const isRecognitionSkill =
      skillLower.includes("number recognition") ||
      skillLower.includes("number writing") ||
      skillLower.includes("number tracing");
    const isGraphSkill =
      skillLower.includes("graph") ||
      skillLower.includes("data collection") ||
      skillLower.includes("counting data") ||
      skillLower.includes("more or less data") ||
      skillLower.includes("tally");
    const isSharingSkill =
      skillLower.includes("equal parts") ||
      skillLower.includes("fair shares") ||
      skillLower.includes("two halves") ||
      skillLower.includes("half concept") ||
      skillLower.includes("partitioning shapes") ||
      skillLower.includes("parts of a whole");
    const isCalendarSkill =
      skillLower.includes("days of week") ||
      skillLower.includes("days of the week") ||
      skillLower.includes("morning and night") ||
      skillLower.includes("time morning afternoon") ||
      skillLower.includes("yesterday today tomorrow") ||
      skillLower.includes("calendar basics") ||
      skillLower.includes("seasons intro") ||
      skillLower.includes("seasons and months");

    if (skillLower.includes("addition facts to 10")) {
      // Grade 1: Solve problems involving addition of single-digit numbers
      return [
        equationQuestion("What is 3 + 4?", 7),
        equationQuestion("What is 5 + 2?", 7),
        equationQuestion("What is 6 + 3?", 9),
        equationQuestion("What is 4 + 5?", 9),
        equationQuestion("What is 7 + 2?", 9),
      ];
    }

    if (skillLower.includes("addition facts to 20")) {
      // Grade 2: Addition to 20
      return [
        equationQuestion("What is 8 + 7?", 15),
        equationQuestion("What is 9 + 6?", 15),
        equationQuestion("What is 12 + 5?", 17),
        equationQuestion("What is 13 + 4?", 17),
        equationQuestion("What is 11 + 8?", 19),
      ];
    }

    if (skillLower.includes("subtraction facts to 10")) {
      // Grade 1: Subtraction from numbers to 10
      return [
        equationQuestion("What is 8 - 3?", 5),
        equationQuestion("What is 7 - 4?", 3),
        equationQuestion("What is 9 - 5?", 4),
        equationQuestion("What is 6 - 2?", 4),
        equationQuestion("What is 10 - 6?", 4),
      ];
    }

    if (skillLower.includes("subtraction facts to 20")) {
      // Grade 2: Subtraction to 20
      return [
        equationQuestion("What is 15 - 7?", 8),
        equationQuestion("What is 16 - 9?", 7),
        equationQuestion("What is 18 - 6?", 12),
        equationQuestion("What is 14 - 8?", 6),
        equationQuestion("What is 19 - 11?", 8),
      ];
    }

    if (skillLower.includes("2d shapes properties")) {
      // Grade 1: Identify and describe 2D shapes
      return [
        { question: "Which shape has 3 sides and 3 corners?", options: ["Triangle", "Square", "Circle", "Rectangle"], answer: "Triangle" },
        { question: "Which shape has 4 equal sides and 4 corners?", options: ["Square", "Triangle", "Circle", "Oval"], answer: "Square" },
        { question: "Which shape has no sides or corners?", options: ["Circle", "Triangle", "Square", "Rectangle"], answer: "Circle" },
        { question: "Which shape has 4 sides and 4 corners?", options: ["Rectangle", "Triangle", "Circle", "Oval"], answer: "Rectangle" },
        { question: "How many sides does a triangle have?", options: ["3", "4", "5", "0"], answer: "3" },
      ];
    }

    if (skillLower.includes("3d shapes properties")) {
      // Grade 1-2: Identify 3D shapes
      return [
        { question: "Which 3D shape has 6 flat faces?", options: ["Cube", "Sphere", "Cylinder", "Cone"], answer: "Cube" },
        { question: "Which 3D shape has no flat faces?", options: ["Sphere", "Cube", "Cylinder", "Pyramid"], answer: "Sphere" },
        { question: "Which 3D shape has 2 flat faces and 1 curved face?", options: ["Cylinder", "Cube", "Cone", "Sphere"], answer: "Cylinder" },
        { question: "Which 3D shape has a pointed top?", options: ["Cone", "Cube", "Cylinder", "Sphere"], answer: "Cone" },
        { question: "How many faces does a cube have?", options: ["6", "4", "8", "2"], answer: "6" },
      ];
    }

    if (skillLower.includes("telling time hours")) {
      // Grade 1: Tell time to the hour
      return [
        { question: "What time is shown when the hour hand points to 3 and the minute hand points to 12?", options: ["3:00", "3:30", "2:00", "4:00"], answer: "3:00" },
        { question: "What time is shown when the hour hand points to 7 and the minute hand points to 12?", options: ["7:00", "6:00", "8:00", "7:30"], answer: "7:00" },
        { question: "What time is shown when the hour hand points to 12 and the minute hand points to 12?", options: ["12:00", "1:00", "11:00", "12:30"], answer: "12:00" },
        { question: "What time is shown when the hour hand points to 9 and the minute hand points to 12?", options: ["9:00", "8:00", "10:00", "9:30"], answer: "9:00" },
        { question: "How many hours are in a day?", options: ["24", "12", "7", "30"], answer: "24" },
      ];
    }

    if (skillLower.includes("telling time half hours")) {
      // Grade 1: Tell time to the half hour
      return [
        { question: "What time is shown when the hour hand points to 3 and the minute hand points to 6?", options: ["3:30", "3:00", "2:30", "4:00"], answer: "3:30" },
        { question: "What time is shown when the hour hand points to 7 and the minute hand points to 6?", options: ["7:30", "6:30", "8:00", "7:00"], answer: "7:30" },
        { question: "What time is shown when the hour hand points to 12 and the minute hand points to 6?", options: ["12:30", "1:00", "11:30", "12:00"], answer: "12:30" },
        { question: "What time is shown when the hour hand points to 9 and the minute hand points to 6?", options: ["9:30", "8:30", "10:00", "9:00"], answer: "9:30" },
        { question: "How many minutes are in 30 minutes?", options: ["30", "60", "15", "45"], answer: "30" },
      ];
    }

    if (skillLower.includes("place value tens")) {
      // Grade 1: Place value - tens and ones
      return [
        { question: "In the number 25, what does the 2 represent?", options: ["20 (2 tens)", "2 ones", "25 ones", "200"], answer: "20 (2 tens)" },
        { question: "In the number 37, what does the 3 represent?", options: ["30 (3 tens)", "3 ones", "37 ones", "300"], answer: "30 (3 tens)" },
        { question: "How many tens are in 40?", options: ["4", "40", "400", "0"], answer: "4" },
        { question: "How many tens are in 65?", options: ["6", "65", "650", "5"], answer: "6" },
        { question: "What number has 3 tens and 2 ones?", options: ["32", "23", "302", "203"], answer: "32" },
      ];
    }

    if (skillLower.includes("place value ones")) {
      // Grade 1: Place value - ones
      return [
        { question: "In the number 25, what does the 5 represent?", options: ["5 ones", "50 (5 tens)", "25 tens", "500"], answer: "5 ones" },
        { question: "In the number 37, what does the 7 represent?", options: ["7 ones", "70 (7 tens)", "37 tens", "700"], answer: "7 ones" },
        { question: "How many ones are in 46?", options: ["6", "46", "460", "4"], answer: "6" },
        { question: "How many ones are in 58?", options: ["8", "58", "580", "5"], answer: "8" },
        { question: "What number has 2 tens and 7 ones?", options: ["27", "72", "207", "270"], answer: "27" },
      ];
    }

    if (skillLower.includes("measuring length units")) {
      // Grade 1: Measure length using non-standard units
      return [
        { question: "Which unit is best for measuring the length of a pencil?", options: ["Centimeters", "Liters", "Grams", "Hours"], answer: "Centimeters" },
        { question: "Which unit is best for measuring the height of a door?", options: ["Meters", "Milliliters", "Kilograms", "Minutes"], answer: "Meters" },
        { question: "Which tool is used to measure length?", options: ["Ruler", "Scale", "Thermometer", "Clock"], answer: "Ruler" },
        { question: "How many centimeters are in 1 meter?", options: ["100", "10", "1000", "50"], answer: "100" },
        { question: "Which is longer: 1 meter or 100 centimeters?", options: ["They are equal", "1 meter", "100 centimeters", "Neither"], answer: "They are equal" },
      ];
    }

    if (skillLower.includes("coin recognition") || skillLower.includes("pennies") || skillLower.includes("nickels") || skillLower.includes("dimes")) {
      // Grade 1: Recognize coins and their values
      return [
        { question: "Which coin is worth 1 cent?", options: ["Penny", "Nickel", "Dime", "Quarter"], answer: "Penny" },
        { question: "Which coin is worth 5 cents?", options: ["Nickel", "Penny", "Dime", "Quarter"], answer: "Nickel" },
        { question: "Which coin is worth 10 cents?", options: ["Dime", "Penny", "Nickel", "Quarter"], answer: "Dime" },
        { question: "Which coin is worth 25 cents?", options: ["Quarter", "Penny", "Nickel", "Dime"], answer: "Quarter" },
        { question: "How many pennies equal 1 nickel?", options: ["5", "10", "25", "1"], answer: "5" },
      ];
    }

    if (skillLower.includes("simple patterns ab")) {
      // Kindergarten-Grade 1: Identify AB patterns
      return [
        { question: "What comes next in the pattern: red, blue, red, blue, ?", options: ["red", "green", "yellow", "orange"], answer: "red" },
        { question: "What comes next in the pattern: circle, square, circle, square, ?", options: ["circle", "triangle", "star", "diamond"], answer: "circle" },
        { question: "What comes next in the pattern: big, small, big, small, ?", options: ["big", "medium", "tiny", "large"], answer: "big" },
        { question: "What comes next in the pattern: A, B, A, B, ?", options: ["A", "C", "D", "B"], answer: "A" },
        { question: "Which pattern is AB: cat, dog, cat, dog?", options: ["Yes", "No", "Maybe", "Sometimes"], answer: "Yes" },
      ];
    }

    if (skillLower.includes("comparing numbers 1-10")) {
      // Grade 1: Compare numbers to 10
      return [
        { question: "Which number is greater: 7 or 4?", options: ["7", "4", "Equal", "Neither"], answer: "7" },
        { question: "Which number is less: 8 or 6?", options: ["6", "8", "Equal", "Neither"], answer: "6" },
        { question: "Which symbol shows 5 is greater than 3?", options: [">", "<", "=", "+"], answer: ">" },
        { question: "Which symbol shows 2 is less than 9?", options: ["<", ">", "=", "-"], answer: "<" },
        { question: "Which symbol shows 6 equals 6?", options: ["=", ">", "<", "+"], answer: "=" },
      ];
    }

    if (isShapeIdentification) {
      if (skillLower.includes("circle")) {
        return [
          { question: "Which shape is a circle?", options: ["A round shape with no corners", "A shape with 3 sides", "A shape with 4 equal sides", "A shape with 4 long sides"], answer: "A round shape with no corners" },
          { question: "How many corners does a circle have?", options: ["0", "1", "3", "4"], answer: "0" },
          { question: "Which object is shaped like a circle?", options: ["Coin", "Book", "Door", "Box"], answer: "Coin" },
          { question: "A circle has:", options: ["No straight sides", "3 straight sides", "4 equal sides", "4 corners"], answer: "No straight sides" },
          { question: `For ${skillName}, which picture clue fits best?`, options: ["Round like a wheel", "Pointy like a triangle", "Boxy like a rectangle", "Square like a tile"], answer: "Round like a wheel" },
        ];
      }

      if (skillLower.includes("square")) {
        return [
          { question: "How many sides does a square have?", options: ["4", "3", "0", "5"], answer: "4" },
          { question: "A square has corners?", options: ["Yes, 4 corners", "No corners", "1 corner", "2 corners"], answer: "Yes, 4 corners" },
          { question: "Which object is shaped like a square?", options: ["A floor tile", "A ball", "A party hat", "A pencil"], answer: "A floor tile" },
          { question: "The sides of a square are:", options: ["All the same length", "All curved", "Only 2 sides", "Always different lengths"], answer: "All the same length" },
          { question: `For ${skillName}, which clue is correct?`, options: ["4 equal sides", "No sides", "3 corners", "1 curved edge"], answer: "4 equal sides" },
        ];
      }

      if (skillLower.includes("triangle")) {
        return [
          { question: "How many sides does a triangle have?", options: ["3", "4", "0", "5"], answer: "3" },
          { question: "How many corners does a triangle have?", options: ["3", "4", "1", "0"], answer: "3" },
          { question: "Which object looks most like a triangle?", options: ["A yield sign", "A clock", "A window", "A book"], answer: "A yield sign" },
          { question: "A triangle is a shape with:", options: ["3 straight sides", "4 equal sides", "No corners", "1 curved side"], answer: "3 straight sides" },
          { question: `For ${skillName}, which shape word matches best?`, options: ["Three-sided", "Round", "Four-sided", "Curved"], answer: "Three-sided" },
        ];
      }

      if (skillLower.includes("rectangle")) {
        return [
          { question: "How many sides does a rectangle have?", options: ["4", "3", "0", "5"], answer: "4" },
          { question: "A rectangle has:", options: ["4 corners", "No corners", "3 corners", "1 corner"], answer: "4 corners" },
          { question: "Which object is shaped like a rectangle?", options: ["A door", "A coin", "A pizza", "A cone"], answer: "A door" },
          { question: "A rectangle has opposite sides that are:", options: ["Equal", "Curved", "Missing", "Always diagonal"], answer: "Equal" },
          { question: `For ${skillName}, which clue helps most?`, options: ["Long and short sides", "No sides", "Round edge", "Three corners"], answer: "Long and short sides" },
        ];
      }

      return [
        { question: `For ${skillName}, which two shapes match?`, options: ["Two triangles", "A square and a circle", "A triangle and a rectangle", "A circle and a square"], answer: "Two triangles" },
        { question: "Which shape has no corners?", options: ["Circle", "Square", "Triangle", "Rectangle"], answer: "Circle" },
        { question: "Which shape has 4 equal sides?", options: ["Square", "Triangle", "Circle", "Oval"], answer: "Square" },
        { question: "Which shape has 3 sides?", options: ["Triangle", "Rectangle", "Circle", "Square"], answer: "Triangle" },
        { question: "Which shape has 4 sides and 4 corners?", options: ["Rectangle", "Circle", "Triangle", "Oval"], answer: "Rectangle" },
      ];
    }

    if (isSizeComparison) {
      if (skillLower.includes("big and small")) {
        return [
          { question: "Which is usually bigger?", options: ["An elephant", "An ant", "A marble", "A coin"], answer: "An elephant" },
          { question: "Which word means not big?", options: ["Small", "Tall", "Long", "Heavy"], answer: "Small" },
          { question: "If one ball is large and one ball is tiny, which is smaller?", options: ["The tiny ball", "The large ball", "Both the same", "Neither"], answer: "The tiny ball" },
          { question: "Big and small help us compare:", options: ["Size", "Colour", "Time", "Sound"], answer: "Size" },
          { question: `For ${skillName}, which pair shows the correct idea?`, options: ["Large box, small box", "Hot soup, cold soup", "Loud bell, quiet bell", "Morning sky, night sky"], answer: "Large box, small box" },
        ];
      }

      if (skillLower.includes("long and short")) {
        return [
          { question: "Which is usually longer?", options: ["A jump rope", "A crayon", "An eraser", "A coin"], answer: "A jump rope" },
          { question: "A short pencil is compared to a:", options: ["Long pencil", "Heavy rock", "Round clock", "Cold drink"], answer: "Long pencil" },
          { question: "Length tells how:", options: ["Long or short something is", "Heavy something is", "Loud something is", "Warm something is"], answer: "Long or short something is" },
          { question: "Which object is shortest?", options: ["Paper clip", "Scarf", "Ruler", "Skipping rope"], answer: "Paper clip" },
          { question: `For ${skillName}, which sentence makes sense?`, options: ["The ribbon is longer than the straw.", "The ribbon is heavier than the colour blue.", "The straw is louder than the bell.", "The pencil is rounder than the week."], answer: "The ribbon is longer than the straw." },
        ];
      }

      if (skillLower.includes("tall and short")) {
        return [
          { question: "Which is usually taller?", options: ["A tree", "A shoe", "A pebble", "A crayon"], answer: "A tree" },
          { question: "Tall and short help compare:", options: ["Height", "Temperature", "Speed", "Colour"], answer: "Height" },
          { question: "Which student is shorter if Mia's head is lower than Sam's?", options: ["Mia", "Sam", "Both are the same", "There is no way to tell"], answer: "Mia" },
          { question: "Which object is shortest?", options: ["A mug", "A giraffe", "A lamp post", "A bookshelf"], answer: "A mug" },
          { question: `For ${skillName}, which pair best matches?`, options: ["Tall building, short stool", "Long rope, short rope", "Heavy rock, light feather", "Hot soup, cold juice"], answer: "Tall building, short stool" },
        ];
      }

      return [
        { question: "Which is heavier?", options: ["A backpack full of books", "A feather", "A leaf", "A tissue"], answer: "A backpack full of books" },
        { question: "Heavy and light help compare:", options: ["Weight", "Shape", "Time", "Colour"], answer: "Weight" },
        { question: "Which object is light?", options: ["Feather", "Rock", "Desk", "Watermelon"], answer: "Feather" },
        { question: "A heavy object is usually harder to:", options: ["Lift", "See", "Name", "Draw"], answer: "Lift" },
        { question: `For ${skillName}, which sentence is correct?`, options: ["The brick is heavier than the sponge.", "The sponge is heavier than the brick.", "Both weigh the same as a cloud.", "Weight tells the colour of an object."], answer: "The brick is heavier than the sponge." },
      ];
    }

    if (isSortingSkill) {
      if (skillLower.includes("color")) {
        return [
          { question: "If you sort by color, which items belong together?", options: ["Red apple and red block", "Red apple and blue block", "Blue block and green leaf because they are different", "Any two random objects"], answer: "Red apple and red block" },
          { question: "Sorting by color means grouping things with the same:", options: ["Colour", "Size", "Weight", "Number"], answer: "Colour" },
          { question: "Which set is sorted by color?", options: ["Blue crayon, blue cup, blue car", "Big ball, small ball, blue ball", "Circle, square, triangle", "Heavy rock, light feather"], answer: "Blue crayon, blue cup, blue car" },
          { question: "A yellow banana should go with:", options: ["Other yellow items", "Only round items", "Only heavy items", "Only long items"], answer: "Other yellow items" },
          { question: `For ${skillName}, what should stay the same in a group?`, options: ["The colour", "The number of letters", "The sound they make", "The place you found them"], answer: "The colour" },
        ];
      }

      if (skillLower.includes("size")) {
        return [
          { question: "Sorting by size means grouping objects that are:", options: ["Similar in size", "The same colour", "The same shape only", "In the same room"], answer: "Similar in size" },
          { question: "Which group is sorted by size?", options: ["Small bead, small button, small coin", "Red bead, blue button, green coin", "Circle, square, triangle", "Clock, spoon, elephant"], answer: "Small bead, small button, small coin" },
          { question: "A tiny toy car should go with:", options: ["Other tiny objects", "Only red objects", "Only circles", "Only heavy objects"], answer: "Other tiny objects" },
          { question: "If you sort by size, a large box belongs with:", options: ["Other large objects", "Only blue things", "Only flat shapes", "Only metal things"], answer: "Other large objects" },
          { question: `For ${skillName}, what are you comparing?`, options: ["How big or small things are", "How many sides a shape has", "What day it is", "How loud a sound is"], answer: "How big or small things are" },
        ];
      }

      return [
        { question: `In ${skillName}, what does it mean to sort objects?`, options: ["Put them into groups using a rule", "Mix them together randomly", "Count backwards only", "Hide the objects"], answer: "Put them into groups using a rule" },
        { question: `Which rule best matches ${topicLabel}?`, options: ["Group items by one shared feature", "Change the rule every object", "Choose groups with closed eyes", "Put every object alone"], answer: "Group items by one shared feature" },
        { question: "Classifying objects means:", options: ["Grouping by shared attributes", "Throwing them away", "Writing a story", "Measuring time"], answer: "Grouping by shared attributes" },
        { question: `For ${skillName}, which detail is an attribute you could use?`, options: ["Colour or shape", "A bedtime story", "A page number", "A weather report"], answer: "Colour or shape" },
        { question: `For ${skillName}, what should objects in one group have?`, options: ["Something in common", "Nothing alike", "Different rules at the same time", "No features at all"], answer: "Something in common" },
      ];
    }

    if (isPositionSkill) {
      if (skillLower.includes("above")) {
        return [
          { question: "If the bird is above the tree, where is the bird?", options: ["Over the tree", "Under the tree", "Inside the tree", "Beside the tree"], answer: "Over the tree" },
          { question: "Which word means higher than?", options: ["Above", "Below", "Inside", "Beside"], answer: "Above" },
          { question: "A lamp hanging over a table is:", options: ["Above the table", "Below the table", "Inside the table", "Behind the table"], answer: "Above the table" },
          { question: "If a cloud is above a house, the house is:", options: ["Below the cloud", "Inside the cloud", "Beside the cloud", "On top of the cloud"], answer: "Below the cloud" },
          { question: `For ${skillName}, which pair fits best?`, options: ["Picture above the shelf", "Ball inside the sky", "Chair above the ant", "Fish above the water when swimming deep"], answer: "Picture above the shelf" },
        ];
      }

      if (skillLower.includes("below") || skillLower.includes("bottom")) {
        return [
          { question: "If the cat is below the chair, where is the cat?", options: ["Under the chair", "On top of the chair", "Inside the chair", "Beside the chair"], answer: "Under the chair" },
          { question: "Which word means lower than?", options: ["Below", "Above", "Beside", "Inside"], answer: "Below" },
          { question: "A rug is usually below a table because it is:", options: ["Under it", "Inside it", "Over it", "Behind it"], answer: "Under it" },
          { question: "The bottom shelf is:", options: ["Below the top shelf", "Above the roof", "Inside the wall", "Beside the floor"], answer: "Below the top shelf" },
          { question: `For ${skillName}, which clue is correct?`, options: ["Shoes below the bench", "Cloud below the basement", "Lamp below the floor", "Bird below the worm in the sky"], answer: "Shoes below the bench" },
        ];
      }

      if (skillLower.includes("beside") || skillLower.includes("left and right") || skillLower.includes("position words")) {
        return [
          { question: "If the dog is beside the boy, where is the dog?", options: ["Next to the boy", "Above the boy", "Inside the boy's hat", "Under the ground"], answer: "Next to the boy" },
          { question: "Which two words name directions?", options: ["Left and right", "Hot and cold", "Big and small", "Fast and sleepy"], answer: "Left and right" },
          { question: "If your pencil is on the right side of your book, it is:", options: ["To the right of the book", "Below the book", "Inside the book", "Behind the wall"], answer: "To the right of the book" },
          { question: "Beside means:", options: ["Next to", "Far away from", "Under", "Above"], answer: "Next to" },
          { question: `For ${skillName}, which direction sentence makes sense?`, options: ["The mailbox is beside the road.", "The mailbox is inside the sky.", "The mailbox is above the moon.", "The mailbox is behind the number 4."], answer: "The mailbox is beside the road." },
        ];
      }

      if (skillLower.includes("inside")) {
        return [
          { question: "If the toy is inside the box, where is it?", options: ["In the box", "On top of the box", "Under the box", "Behind the box"], answer: "In the box" },
          { question: "Which word means in something?", options: ["Inside", "Above", "Beside", "Far"], answer: "Inside" },
          { question: "Cookies in a jar are:", options: ["Inside the jar", "Above the jar", "Below the jar", "Outside the kitchen"], answer: "Inside the jar" },
          { question: "A letter in an envelope is:", options: ["Inside", "Behind", "Above", "Beside"], answer: "Inside" },
          { question: `For ${skillName}, which example fits best?`, options: ["Toys inside a bin", "Bird inside a cloud while flying", "Hat inside a shoe on your head", "Sun inside the sidewalk"], answer: "Toys inside a bin" },
        ];
      }

      if (skillLower.includes("first and last") || skillLower.includes("ordinal") || skillLower.includes("ordering events") || skillLower.includes("tenth position")) {
        return [
          { question: "In a race, who comes first?", options: ["The person at the front", "The person at the back", "Everyone at once", "The person sitting down"], answer: "The person at the front" },
          { question: "Which ordinal number comes after second?", options: ["Third", "Fourth", "First", "Tenth"], answer: "Third" },
          { question: "If Maya is last in line, where is she?", options: ["At the end", "At the front", "In the middle only", "Beside everyone"], answer: "At the end" },
          { question: "Which event happens first when getting ready for school?", options: ["Wake up", "Eat lunch", "Go to bed", "Do homework after school"], answer: "Wake up" },
          { question: `For ${skillName}, which position word tells order?`, options: ["First", "Blue", "Heavy", "Round"], answer: "First" },
        ];
      }

      return [
        { question: `In ${skillName}, what does near mean?`, options: ["Close to", "Very far away", "Above only", "Always inside"], answer: "Close to" },
        { question: `In ${skillName}, what does far mean?`, options: ["Not close", "Very small", "On top", "The same place"], answer: "Not close" },
        { question: skillLower.includes("map") ? "A map helps show:" : "Following directions helps you:", options: skillLower.includes("map") ? ["Where things are", "How heavy things are", "How hot soup is", "How many sides a triangle has"] : ["Do steps in the right order", "Skip every step", "Guess every turn", "Ignore all clues"], answer: skillLower.includes("map") ? "Where things are" : "Do steps in the right order" },
        { question: skillLower.includes("near and far") ? "Which object is near the playground?" : "Which clue is most helpful when moving from one place to another?", options: skillLower.includes("near and far") ? ["The bench beside the swing", "The school in another city", "A cloud in space", "A star in the sky"] : ["A step-by-step direction", "A random guess", "No landmarks", "Closing your eyes"], answer: skillLower.includes("near and far") ? "The bench beside the swing" : "A step-by-step direction" },
        { question: `For ${skillName}, which word tells location?`, options: ["Beside", "Triangle", "Count", "Subtract"], answer: "Beside" },
      ];
    }

    if (isRecognitionSkill) {
      const start = firstSkillNumber ?? 1;
      const end = secondSkillNumber ?? Math.max(start + 4, 10);
      const target = rand(start, end);
      if (skillLower.includes("recognition")) {
        return [
          { question: `For ${skillName}, which number is ${target}?`, options: [String(target), String(Math.max(0, target - 1)), String(target + 1), String(Math.max(0, target + 2))], answer: String(target) },
          { question: `Which numeral matches the spoken number ${Math.min(end, target + 1)}?`, options: [String(Math.min(end, target + 1)), String(target), String(Math.min(end + 1, target + 2)), String(Math.max(start, target - 1))], answer: String(Math.min(end, target + 1)) },
          { question: `Which number belongs in the ${start}-${end} recognition range?`, options: [String(target), String(end + 5), String(Math.max(0, start - 3)), String(end + 10)], answer: String(target) },
          { question: "Number recognition means:", options: ["Matching number names to numerals", "Drawing any shape", "Sorting by colour", "Measuring length"], answer: "Matching number names to numerals" },
          { question: `For ${skillName}, what should you do when you hear the number ${target}?`, options: [`Point to ${target}`, `Point to ${target + 3}`, "Choose any symbol", "Skip the numeral"], answer: `Point to ${target}` },
        ];
      }

      if (skillLower.includes("writing")) {
        return [
          { question: `For ${skillName}, which numeral should you write for the number word ${target}?`, options: [String(target), String(Math.max(0, target - 1)), String(target + 1), String(target + 2)], answer: String(target) },
          { question: "Number writing means:", options: ["Writing numerals correctly", "Drawing any shape", "Sorting by colour", "Measuring length"], answer: "Writing numerals correctly" },
          { question: `Which numeral is written correctly for ${Math.min(end, target + 2)}?`, options: [String(Math.min(end, target + 2)), `${Math.min(end, target + 2)}${Math.min(end, target + 2)}`, String(Math.max(0, target - 2)), `${Math.min(end, target + 2)}.`], answer: String(Math.min(end, target + 2)) },
          { question: "When writing numbers, students should:", options: ["Form each numeral clearly", "Switch between letters and numbers", "Write random marks", "Skip the top of the page"], answer: "Form each numeral clearly" },
          { question: `For ${skillName}, what helps check your work?`, options: ["Compare the numeral to the number word", "Ignore the number word", "Pick the longest answer", "Change it after finishing"], answer: "Compare the numeral to the number word" },
        ];
      }

      return [
        { question: `For ${skillName}, which numeral would you trace?`, options: [String(target), String(Math.max(0, target - 1)), String(target + 1), String(target + 2)], answer: String(target) },
        { question: "Tracing a number helps students:", options: ["Practice forming it", "Make it disappear", "Turn it into a letter", "Count backwards only"], answer: "Practice forming it" },
        { question: `Which tracing card matches the number ${Math.min(end, target + 1)}?`, options: [String(Math.min(end, target + 1)), String(target), String(target + 3), String(Math.max(0, target - 2))], answer: String(Math.min(end, target + 1)) },
        { question: "When tracing, students should follow:", options: ["The numeral's shape and direction", "Random zigzags", "Colour names only", "Measurement marks"], answer: "The numeral's shape and direction" },
        { question: `For ${skillName}, what is the goal of tracing ${target}?`, options: ["Learn how to form the numeral", "Turn it into a letter", "Count by tens only", "Measure the page"], answer: "Learn how to form the numeral" },
      ];
    }

    if (skillLower.includes("zero concept")) {
      return [
        { question: "If there are zero apples on a plate, how many apples are there?", options: ["0", "1", "2", "10"], answer: "0" },
        { question: "Zero means:", options: ["None", "Many", "One more", "A pair"], answer: "None" },
        { question: "Which group shows zero objects?", options: ["An empty bowl", "A bowl with 1 apple", "A bowl with 2 apples", "A bowl with many apples"], answer: "An empty bowl" },
        { question: "If all 3 birds fly away, how many birds are left?", options: ["0", "1", "2", "3"], answer: "0" },
        { question: `For ${skillName}, which symbol matches 'none'?`, options: ["0", "1", "2", "3"], answer: "0" },
      ];
    }

    if (skillLower.includes("comparing groups") || skillLower.includes("same amount") || skillLower.includes("different amounts")) {
      return [
        { question: "If one plate has 5 grapes and another has 3 grapes, which has more?", options: ["The plate with 5 grapes", "The plate with 3 grapes", "They are the same", "Neither plate"], answer: "The plate with 5 grapes" },
        { question: "Two groups have the same amount when they have:", options: ["An equal number of objects", "Different colours", "Different shapes", "No objects at all"], answer: "An equal number of objects" },
        { question: "Which group has less?", options: ["2 blocks", "4 blocks", "Both the same", "There is no way to know"], answer: "2 blocks" },
        { question: "Different amounts means the groups have:", options: ["Different numbers of objects", "The same number every time", "The same colour only", "No size"], answer: "Different numbers of objects" },
        { question: `For ${skillName}, what should you do first?`, options: ["Count each group", "Guess quickly", "Ignore one group", "Sort by colour instead"], answer: "Count each group" },
      ];
    }

    if (
      (grade === "jk" || grade === "kindergarten") &&
      (skillLower.includes("largest number") || skillLower.includes("smallest number"))
    ) {
      if (skillLower.includes("largest")) {
        return [
          { question: "Which number is biggest?", options: ["5", "2", "1", "3"], answer: "5" },
          { question: "Which number is more?", options: ["4", "1", "2", "0"], answer: "4" },
          { question: "Look at these numbers: 2, 5, 3. Which is the largest?", options: ["5", "2", "3", "1"], answer: "5" },
          { question: "Which group has the most?", options: ["5 blocks", "2 blocks", "1 block", "3 blocks"], answer: "5 blocks" },
          { question: "Which number comes later when counting?", options: ["6", "3", "1", "4"], answer: "6" },
        ];
      }

      return [
        { question: "Which number is smallest?", options: ["1", "4", "5", "3"], answer: "1" },
        { question: "Which number is less?", options: ["0", "2", "4", "5"], answer: "0" },
        { question: "Look at these numbers: 2, 5, 3. Which is the smallest?", options: ["2", "5", "3", "4"], answer: "2" },
        { question: "Which group has the fewest?", options: ["1 block", "3 blocks", "5 blocks", "4 blocks"], answer: "1 block" },
        { question: "Which number comes earlier when counting?", options: ["1", "3", "5", "6"], answer: "1" },
      ];
    }

    if (skillLower.includes("groups of two") || skillLower.includes("groups of three") || skillLower.includes("pairs and matching")) {
      return [
        { question: "A pair means:", options: ["2 things together", "3 things together", "1 thing", "10 things"], answer: "2 things together" },
        { question: "How many objects are in 3 groups of 2?", options: ["6", "5", "3", "2"], answer: "6" },
        { question: "How many objects are in 2 groups of 3?", options: ["6", "3", "5", "2"], answer: "6" },
        { question: "Matching means:", options: ["Putting together things that are the same", "Mixing different things randomly", "Making everything larger", "Measuring with a ruler"], answer: "Putting together things that are the same" },
        { question: `For ${skillName}, what are you practicing?`, options: ["Making equal groups", "Writing long stories", "Naming the months", "Measuring temperature"], answer: "Making equal groups" },
      ];
    }

    if (isCalendarSkill) {
      if (skillLower.includes("days of week")) {
        return [
          { question: "Which day comes after Monday?", options: ["Tuesday", "Sunday", "Friday", "Saturday"], answer: "Tuesday" },
          { question: "Which day comes before Friday?", options: ["Thursday", "Saturday", "Monday", "Sunday"], answer: "Thursday" },
          { question: "How many days are in a week?", options: ["7", "5", "10", "12"], answer: "7" },
          { question: "Which is a day of the week?", options: ["Wednesday", "Summer", "Morning", "Circle"], answer: "Wednesday" },
          { question: `For ${skillName}, what helps you remember the order?`, options: ["Saying the days in sequence", "Sorting by colour", "Counting by tens", "Measuring length"], answer: "Saying the days in sequence" },
        ];
      }

      if (skillLower.includes("morning and night") || skillLower.includes("time morning afternoon")) {
        return [
          { question: "When does the Sun usually rise?", options: ["Morning", "Night", "Midnight", "Never"], answer: "Morning" },
          { question: "When is it usually dark outside?", options: ["Night", "Morning", "Noon", "Recess"], answer: "Night" },
          { question: "Afternoon happens:", options: ["After morning", "Before morning", "After midnight only", "At the start of a week"], answer: "After morning" },
          { question: "Eating breakfast usually happens in the:", options: ["Morning", "Night", "Winter", "Weekend"], answer: "Morning" },
          { question: `For ${skillName}, which activity best fits night?`, options: ["Going to sleep", "Eating breakfast", "Starting school", "Seeing the sunrise"], answer: "Going to sleep" },
        ];
      }

      if (skillLower.includes("yesterday today tomorrow")) {
        return [
          { question: "If today is Tuesday, what was yesterday?", options: ["Monday", "Wednesday", "Sunday", "Thursday"], answer: "Monday" },
          { question: "If today is Tuesday, what is tomorrow?", options: ["Wednesday", "Monday", "Friday", "Sunday"], answer: "Wednesday" },
          { question: "Today means:", options: ["The current day", "The day before", "The day after", "A month"], answer: "The current day" },
          { question: "Yesterday means:", options: ["The day before today", "The day after today", "The first day of the week", "A season"], answer: "The day before today" },
          { question: `For ${skillName}, which word names the next day?`, options: ["Tomorrow", "Yesterday", "Last week", "Morning"], answer: "Tomorrow" },
        ];
      }

      return [
        { question: skillLower.includes("calendar") ? "A calendar helps us track:" : "Which season is usually coldest?", options: skillLower.includes("calendar") ? ["Days and dates", "Shapes only", "Mass only", "Colours only"] : ["Winter", "Summer", "Spring", "Autumn leaves only"], answer: skillLower.includes("calendar") ? "Days and dates" : "Winter" },
        { question: skillLower.includes("month") ? "Months are parts of a:" : "Which season comes after spring?", options: skillLower.includes("month") ? ["Year", "Triangle", "Ruler", "Food chain"] : ["Summer", "Winter", "Monday", "Night"], answer: skillLower.includes("month") ? "Year" : "Summer" },
        { question: skillLower.includes("season") ? "Which season comes after summer?" : "Which item belongs on a calendar?", options: skillLower.includes("season") ? ["Autumn", "Tuesday", "Clock", "Rectangle"] : ["A date", "A denominator", "A vertex", "A centimeter"], answer: skillLower.includes("season") ? "Autumn" : "A date" },
        { question: skillLower.includes("calendar") ? "What comes on a monthly calendar page?" : "How many months are in one year?", options: skillLower.includes("calendar") ? ["Dates in order", "Only coin values", "Only shape names", "Only weight labels"] : ["12", "7", "24", "100"], answer: skillLower.includes("calendar") ? "Dates in order" : "12" },
        { question: `For ${skillName}, what are you learning to understand?`, options: ["Time and calendar order", "How to divide fractions", "How magnets work", "How to graph slopes"], answer: "Time and calendar order" },
      ];
    }

    if (isGraphSkill) {
      if (skillLower.includes("picture graph")) {
        return [
          { question: "A picture graph uses:", options: ["Pictures or symbols to show data", "Only paragraphs", "A measuring tape", "A compass"], answer: "Pictures or symbols to show data" },
          { question: "If one picture stands for 2 apples, 3 pictures stand for:", options: ["6 apples", "3 apples", "5 apples", "2 apples"], answer: "6 apples" },
          { question: "Why do picture graphs need a key?", options: ["To show what each symbol means", "To lock the graph", "To measure the graph", "To sort by colour"], answer: "To show what each symbol means" },
          { question: "Data means information that has been:", options: ["Collected", "Hidden", "Forgotten", "Erased"], answer: "Collected" },
          { question: `For ${skillName}, what do you do before drawing symbols?`, options: ["Count or collect the data", "Guess the answer", "Pick random colours only", "Ignore the categories"], answer: "Count or collect the data" },
        ];
      }

      if (skillLower.includes("bar graph")) {
        return [
          { question: "A bar graph shows data using:", options: ["Bars", "Fractions only", "Clock hands", "Coins"], answer: "Bars" },
          { question: "If one graph bar is taller, it usually means:", options: ["There is more of that category", "There is less of that category", "The graph is upside down", "The numbers do not matter"], answer: "There is more of that category" },
          { question: "What does the label under each bar tell you?", options: ["The category name", "The bar's colour only", "The answer key password", "The shape's number of sides"], answer: "The category name" },
          { question: "What helps you read a bar graph correctly?", options: ["Checking the scale", "Ignoring the axis", "Counting corners", "Measuring with a ruler only"], answer: "Checking the scale" },
          { question: `For ${skillName}, what should you compare?`, options: ["The heights of the bars", "The smell of the paper", "The order of seasons", "The weight of a coin"], answer: "The heights of the bars" },
        ];
      }

      if (skillLower.includes("tally")) {
        return [
          { question: "A tally mark is used to:", options: ["Count items", "Measure length", "Show directions", "Name shapes"], answer: "Count items" },
          { question: "How many tally marks are in one full group?", options: ["5", "4", "10", "2"], answer: "5" },
          { question: "Why is the fifth tally drawn across the others?", options: ["To make groups of five easier to read", "To erase the first four", "To show a fraction", "To mark the end of class"], answer: "To make groups of five easier to read" },
          { question: "Which tally total is greatest?", options: ["A group of 5 and 2 more", "A group of 5", "4 tallies", "3 tallies"], answer: "A group of 5 and 2 more" },
          { question: `For ${skillName}, what do tally marks help you do quickly?`, options: ["Keep track while counting", "Measure area", "Name 3D shapes", "Solve division facts"], answer: "Keep track while counting" },
        ];
      }

      return [
        { question: `In ${skillName}, what is data?`, options: ["Information that has been collected", "A random guess", "Only a number pattern", "Only a shape drawing"], answer: "Information that has been collected" },
        { question: skillLower.includes("more or less data") ? "Which category has more data?" : "What should you do before making a graph?", options: skillLower.includes("more or less data") ? ["The category with the larger count", "The category with the smaller count", "Both are always equal", "The category with fewer labels"] : ["Count or collect the data", "Guess the answer", "Pick random colours only", "Ignore the categories"], answer: skillLower.includes("more or less data") ? "The category with the larger count" : "Count or collect the data" },
        { question: "Why do we organize data?", options: ["To make it easier to compare", "To hide it", "To make every answer the same", "To avoid counting"], answer: "To make it easier to compare" },
        { question: "When two categories have the same count, they are:", options: ["Equal", "Invisible", "Opposite", "Broken"], answer: "Equal" },
        { question: `For ${skillName}, what is the main job?`, options: ["Read, count, and compare information", "Measure temperature only", "Name fractions only", "Sort shapes only"], answer: "Read, count, and compare information" },
      ];
    }

    if (isSharingSkill) {
      if (skillLower.includes("half")) {
        return [
          { question: "If a sandwich is cut into 2 equal parts, each part is a:", options: ["Half", "Third", "Whole", "Double"], answer: "Half" },
          { question: "Two halves make:", options: ["One whole", "Two wholes", "A quarter", "Zero"], answer: "One whole" },
          { question: "Which picture would show halves?", options: ["A shape split into 2 equal pieces", "A shape split into 1 big piece and 1 tiny piece", "A shape not split at all", "A shape with 3 equal parts"], answer: "A shape split into 2 equal pieces" },
          { question: "A half is one of how many equal parts?", options: ["2", "3", "4", "5"], answer: "2" },
          { question: `For ${skillName}, which example shows halves?`, options: ["A pizza cut into 2 matching pieces", "A pizza with one big slice and one tiny slice", "A whole pizza not cut at all", "A pizza with 3 equal pieces"], answer: "A pizza cut into 2 matching pieces" },
        ];
      }

      if (skillLower.includes("fair share")) {
        return [
          { question: "Fair sharing means everyone gets:", options: ["The same amount", "A random amount", "Nothing", "Only the largest piece"], answer: "The same amount" },
          { question: "If 4 cookies are shared fairly between 2 children, each child gets:", options: ["2 cookies", "1 cookie", "3 cookies", "4 cookies"], answer: "2 cookies" },
          { question: "Which sharing is fair?", options: ["3 crackers for each student", "4 crackers for one and 1 for another", "All crackers for one person", "No crackers for anyone"], answer: "3 crackers for each student" },
          { question: "Before deciding if sharing is fair, you should:", options: ["Count the items and the people", "Guess quickly", "Sort by colour", "Measure length"], answer: "Count the items and the people" },
          { question: `For ${skillName}, what are you checking?`, options: ["Whether each person gets an equal amount", "Whether the shapes have corners", "Whether the clock shows noon", "Whether the graph has bars"], answer: "Whether each person gets an equal amount" },
        ];
      }

      return [
        { question: "Equal parts mean the pieces are:", options: ["The same size", "Different colours", "Different sizes", "All missing"], answer: "The same size" },
        { question: "Partitioning a shape means:", options: ["Splitting it into parts", "Erasing the shape", "Turning it into a number", "Measuring only one side"], answer: "Splitting it into parts" },
        { question: "Which shape is partitioned into equal parts?", options: ["A rectangle split into 4 same-sized pieces", "A rectangle split into one large and three tiny pieces", "A circle with no lines", "A triangle cut off the page"], answer: "A rectangle split into 4 same-sized pieces" },
        { question: "Why do equal parts matter?", options: ["They show fair shares of a whole", "They change the colour of a shape", "They make counting impossible", "They remove all fractions"], answer: "They show fair shares of a whole" },
        { question: `For ${skillName}, what should all parts have?`, options: ["The same size", "Different sizes", "Different colours", "Different names"], answer: "The same size" },
      ];
    }

    if (skillLower.includes("capacity") || skillLower.includes("full empty half") || skillLower.includes("holds more less") || skillLower.includes("pouring practice")) {
      return [
        { question: "Capacity tells how much a container can:", options: ["Hold", "Weigh", "Stretch", "Count"], answer: "Hold" },
        { question: "Which container usually holds more?", options: ["Bucket", "Cup", "Spoon", "Bottle cap"], answer: "Bucket" },
        { question: "If a cup has no water in it, it is:", options: ["Empty", "Full", "Heavy", "Tall"], answer: "Empty" },
        { question: "If juice reaches the top of a glass, the glass is:", options: ["Full", "Empty", "Half full", "Broken"], answer: "Full" },
        { question: `For ${skillName}, which container has less capacity?`, options: ["Teaspoon", "Bathtub", "Bucket", "Large jug"], answer: "Teaspoon" },
      ];
    }

    if (skillLower.includes("limits review")) {
      return [
        {
          question: "What is the value of lim x->3 (x + 2)?",
          options: ["5", "3", "2", "6"],
          answer: "5",
        },
        {
          question: "What is lim x->2 (x^2)?",
          options: ["4", "2", "8", "0"],
          answer: "4",
        },
        {
          question: "If the left-hand limit and right-hand limit are different, then the limit:",
          options: ["Does not exist", "Is always 0", "Is always 1", "Must be infinity"],
          answer: "Does not exist",
        },
        {
          question: "What is lim x->1 ((x^2 - 1)/(x - 1))?",
          options: ["2", "1", "0", "It does not exist"],
          answer: "2",
        },
        {
          question: "What does a horizontal asymptote describe?",
          options: ["The value f(x) approaches as x becomes very large or very small", "The x-intercept of a graph", "The slope at one point", "The exact maximum value of every function"],
          answer: "The value f(x) approaches as x becomes very large or very small",
        },
      ];
    }

    if (skillLower.includes("finding limits")) {
      return [
        { question: "What is lim x->4 (2x - 1)?", options: ["7", "8", "6", "9"], answer: "7" },
        { question: "What is lim x->2 (x^2 + 3)?", options: ["7", "5", "4", "9"], answer: "7" },
        { question: "What is lim x->5 (3x)?", options: ["15", "8", "10", "5"], answer: "15" },
        { question: "What is lim x->1 (x^3 + x)?", options: ["2", "1", "3", "0"], answer: "2" },
        { question: "When direct substitution works, you find a limit by:", options: ["Replacing x with the approaching value", "Always factoring first", "Using only a graph", "Setting the denominator to zero"], answer: "Replacing x with the approaching value" },
      ];
    }

    if (skillLower.includes("one-sided limits")) {
      return [
        { question: "A left-hand limit looks at values of x that are:", options: ["Less than the target value and close to it", "Greater than the target value only", "Exactly equal to the target value", "Far away from the target value"], answer: "Less than the target value and close to it" },
        { question: "A right-hand limit looks at values of x that are:", options: ["Greater than the target value and close to it", "Less than the target value only", "Always negative", "Always zero"], answer: "Greater than the target value and close to it" },
        { question: "If lim x->2- f(x) = 3 and lim x->2+ f(x) = 5, then lim x->2 f(x):", options: ["Does not exist", "Equals 4", "Equals 3", "Equals 5"], answer: "Does not exist" },
        { question: "For a two-sided limit to exist, the left-hand and right-hand limits must be:", options: ["Equal", "Opposites", "Positive", "Whole numbers"], answer: "Equal" },
        { question: "One-sided limits are especially useful when a function is:", options: ["Defined differently on different sides of a point", "Always linear", "A constant", "Only a polynomial"], answer: "Defined differently on different sides of a point" },
      ];
    }

    if (skillLower.includes("limits at infinity") || skillLower.includes("infinite limits")) {
      return [
        { question: "What is lim x->infinity (1/x)?", options: ["0", "1", "Infinity", "Does not exist"], answer: "0" },
        { question: "What is lim x->infinity (5 + 1/x)?", options: ["5", "1", "0", "Infinity"], answer: "5" },
        { question: "A horizontal asymptote shows:", options: ["The y-value a function approaches as x becomes very large or very small", "Where a function crosses the x-axis", "The steepest slope of a graph", "A point where the function is undefined"], answer: "The y-value a function approaches as x becomes very large or very small" },
        { question: "If the degree of the denominator is greater than the degree of the numerator in a rational function, the limit at infinity is often:", options: ["0", "1", "The leading coefficient", "Undefined"], answer: "0" },
        { question: "An infinite limit usually means the function values grow without bound near a point, often indicating:", options: ["A vertical asymptote", "A horizontal asymptote", "A maximum point", "A y-intercept"], answer: "A vertical asymptote" },
      ];
    }

    if (skillLower.includes("limit definition")) {
      return [
        { question: "The derivative of f(x) at x = a is defined using a limit that represents:", options: ["The slope of the tangent line", "The area under the curve", "The y-intercept", "The average of all function values"], answer: "The slope of the tangent line" },
        { question: "In the limit definition, h represents:", options: ["A small change in x", "The function value", "The slope itself", "A constant angle"], answer: "A small change in x" },
        { question: "Which expression matches the limit definition of the derivative?", options: ["lim h->0 (f(x+h)-f(x))/h", "lim x->0 f(x)", "f(x+h)+f(x)", "lim h->0 f(h)/x"], answer: "lim h->0 (f(x+h)-f(x))/h" },
        { question: "The derivative found from the limit definition gives the function's:", options: ["Instantaneous rate of change", "Average height only", "Domain", "Maximum value in every case"], answer: "Instantaneous rate of change" },
        { question: "As h approaches 0 in the limit definition, a secant line approaches:", options: ["A tangent line", "A vertical line", "A horizontal asymptote", "A parabola"], answer: "A tangent line" },
      ];
    }

    if (skillLower.includes("limit")) {
      return [
        { question: "A limit describes:", options: ["What value a function approaches", "Only where a function starts", "The exact y-intercept only", "The number of roots"], answer: "What value a function approaches" },
        { question: "What is lim x->2 (x + 5)?", options: ["7", "5", "2", "10"], answer: "7" },
        { question: "If the graph approaches the same y-value from both sides of x = a, then the limit:", options: ["Exists", "Must be zero", "Must be undefined", "Is always negative"], answer: "Exists" },
        { question: "A removable discontinuity is often created by:", options: ["A hole in the graph", "A vertical asymptote only", "A constant function", "A straight line with no breaks"], answer: "A hole in the graph" },
        { question: "Limits are used in calculus to help define:", options: ["Derivatives and integrals", "Only bar graphs", "Only prime numbers", "Only matrix multiplication"], answer: "Derivatives and integrals" },
      ];
    }

    if (skillLower.includes("continuity")) {
      return [
        { question: "A function is continuous at x = a if the function value and the limit:", options: ["Are equal", "Are both zero", "Are both negative", "Do not exist"], answer: "Are equal" },
        { question: "Which is an example of a discontinuity type?", options: ["Jump discontinuity", "Slope continuity", "Angle continuity", "Ratio continuity"], answer: "Jump discontinuity" },
        { question: "If a graph has a hole at x = 3, the function is:", options: ["Not continuous at x = 3", "Continuous everywhere", "Linear at x = 3", "Guaranteed differentiable"], answer: "Not continuous at x = 3" },
        { question: "The Intermediate Value Theorem applies to functions that are:", options: ["Continuous on an interval", "Only quadratic", "Always increasing", "Always rational"], answer: "Continuous on an interval" },
        { question: "A vertical asymptote means a function is generally:", options: ["Not continuous at that x-value", "Continuous at every point", "A polynomial", "Defined by a constant"], answer: "Not continuous at that x-value" },
      ];
    }

    if (skillLower.includes("product rule")) {
      return [
        { question: "If h(x) = f(x)g(x), which derivative matches the product rule?", options: ["h'(x) = f'(x)g(x) + f(x)g'(x)", "h'(x) = f'(x)g'(x)", "h'(x) = f(x) + g(x)", "h'(x) = f'(x)/g'(x)"], answer: "h'(x) = f'(x)g(x) + f(x)g'(x)" },
        { question: "Differentiate y = x^2 sin(x).", options: ["2x sin(x) + x^2 cos(x)", "2x cos(x)", "x^2 cos(x)", "2x sin(x) - x^2 cos(x)"], answer: "2x sin(x) + x^2 cos(x)" },
        { question: "Why is the product rule needed for y = (x^3)(e^x)?", options: ["Both factors depend on x", "Only one factor is a constant", "The expression has no variables", "It is a quotient"], answer: "Both factors depend on x" },
        { question: "Differentiate y = (x + 1)(x^2 - 4).", options: ["(x^2 - 4) + (x + 1)(2x)", "2x(x + 1)", "x^2 - 4", "3x^2 + 2x"], answer: "(x^2 - 4) + (x + 1)(2x)" },
        { question: "In the product rule, each term keeps:", options: ["One original factor and one differentiated factor", "Only differentiated factors", "Only constant factors", "No original factors"], answer: "One original factor and one differentiated factor" },
      ];
    }

    if (skillLower.includes("quotient rule")) {
      return [
        { question: "If y = f(x)/g(x), which derivative matches the quotient rule?", options: ["(g f' - f g') / g^2", "(f'g') / g^2", "(f' + g') / g", "(f - g) / f^2"], answer: "(g f' - f g') / g^2" },
        { question: "For y = x^2/(x + 1), what belongs in the numerator of y'?", options: ["(x + 1)(2x) - x^2(1)", "x^2 + x + 1", "2x/(1)", "(x + 1) - x^2"], answer: "(x + 1)(2x) - x^2(1)" },
        { question: "The denominator in the quotient rule is:", options: ["The original denominator squared", "The derivative of the denominator", "The numerator squared", "Always 1"], answer: "The original denominator squared" },
        { question: "Which expression is best handled with the quotient rule?", options: ["(x^2 + 1)/(3x - 4)", "(x^2 + 1)(3x - 4)", "x^2 + 3x", "5x^4"], answer: "(x^2 + 1)/(3x - 4)" },
        { question: "A common quotient-rule mistake is:", options: ["Forgetting the subtraction order in the numerator", "Squaring the numerator only", "Adding no variables", "Using no denominator"], answer: "Forgetting the subtraction order in the numerator" },
      ];
    }

    if (skillLower.includes("chain rule") || skillLower.includes("composite functions") || skillLower.includes("nested functions")) {
      return [
        { question: "The chain rule is used when differentiating:", options: ["A composite function", "Only a constant", "Only a table of values", "A simple sum with no inner function"], answer: "A composite function" },
        { question: "Differentiate y = (3x + 1)^4.", options: ["12(3x + 1)^3", "4(3x + 1)^3", "(3x + 1)^3", "7(3x + 1)^4"], answer: "12(3x + 1)^3" },
        { question: "In y = sin(5x), the inner function is:", options: ["5x", "sin(x)", "x/5", "cos(x)"], answer: "5x" },
        { question: "Differentiate y = e^(2x).", options: ["2e^(2x)", "e^(2x)", "2x e^(2x)", "e^2"], answer: "2e^(2x)" },
        { question: "The chain rule multiplies the derivative of the outside function by:", options: ["The derivative of the inside function", "The original input only", "The denominator squared", "The x-intercept"], answer: "The derivative of the inside function" },
      ];
    }

    if (skillLower.includes("power rule") || skillLower.includes("basic derivative rules") || skillLower.includes("constant multiple") || skillLower.includes("sum and difference")) {
      return [
        { question: "Using the power rule, the derivative of x^5 is:", options: ["5x^4", "x^4", "5x^5", "x^6"], answer: "5x^4" },
        { question: "Differentiate y = 7x^3.", options: ["21x^2", "7x^2", "10x^2", "21x^3"], answer: "21x^2" },
        { question: "The derivative of a constant is:", options: ["0", "1", "The same constant", "x"], answer: "0" },
        { question: "Differentiate y = x^4 + 3x^2.", options: ["4x^3 + 6x", "4x + 6x", "x^3 + 3x", "7x^6"], answer: "4x^3 + 6x" },
        { question: "The sum rule says you can differentiate a sum by:", options: ["Differentiating each term separately", "Multiplying every exponent", "Ignoring constants only", "Using the denominator squared"], answer: "Differentiating each term separately" },
      ];
    }

    if (skillLower.includes("derivatives trig") || skillLower.includes("sine and cosine") || skillLower.includes("other trig functions")) {
      return [
        { question: "The derivative of sin(x) is:", options: ["cos(x)", "-sin(x)", "tan(x)", "-cos(x)"], answer: "cos(x)" },
        { question: "The derivative of cos(x) is:", options: ["-sin(x)", "sin(x)", "sec^2(x)", "cos(x)"], answer: "-sin(x)" },
        { question: "The derivative of tan(x) is:", options: ["sec^2(x)", "csc^2(x)", "cos(x)", "-sin(x)"], answer: "sec^2(x)" },
        { question: "Differentiate y = 3sin(x).", options: ["3cos(x)", "cos(3x)", "-3sin(x)", "3sec^2(x)"], answer: "3cos(x)" },
        { question: "Trig derivatives are usually written assuming x is measured in:", options: ["Radians", "Degrees only", "Meters", "Percent"], answer: "Radians" },
      ];
    }

    if (skillLower.includes("derivatives exponential") || skillLower.includes("natural exponential") || skillLower.includes("general exponential")) {
      return [
        { question: "The derivative of e^x is:", options: ["e^x", "xe^(x-1)", "1/e^x", "ln(x)"], answer: "e^x" },
        { question: "Differentiate y = e^(3x).", options: ["3e^(3x)", "e^(3x)", "3x e^(3x)", "e^3"], answer: "3e^(3x)" },
        { question: "The derivative of a^x is:", options: ["a^x ln(a)", "x a^(x-1)", "ln(x)", "a/x"], answer: "a^x ln(a)" },
        { question: "Exponential derivatives are useful for modeling:", options: ["Growth and decay rates", "Only triangle angles", "Only static shapes", "Only coin values"], answer: "Growth and decay rates" },
        { question: "Which function keeps the same form after differentiating?", options: ["e^x", "x^2", "ln(x)", "sin(x)"], answer: "e^x" },
      ];
    }

    if (skillLower.includes("derivatives logarithmic") || skillLower.includes("natural logarithm") || skillLower.includes("general logarithm") || skillLower.includes("logarithmic differentiation")) {
      return [
        { question: "The derivative of ln(x) is:", options: ["1/x", "x", "ln(x)", "e^x"], answer: "1/x" },
        { question: "Differentiate y = ln(4x).", options: ["1/x", "4/x", "ln(4)", "4ln(x)"], answer: "1/x" },
        { question: "The derivative of log_a(x) is:", options: ["1/(x ln(a))", "a^x", "ln(a)/x", "x ln(a)"], answer: "1/(x ln(a))" },
        { question: "Logarithmic differentiation is especially helpful for:", options: ["Products, quotients, or powers with variables", "Only adding whole numbers", "Only measuring length", "Only drawing bar graphs"], answer: "Products, quotients, or powers with variables" },
        { question: "Before differentiating ln(y), you usually treat y as:", options: ["A function of x", "A constant number", "A denominator only", "A unit of time"], answer: "A function of x" },
      ];
    }

    if (skillLower.includes("polar coordinates") || skillLower.includes("converting coordinates") || skillLower.includes("polar graph") || skillLower.includes("polar equations") || skillLower.includes("area in polar") || skillLower.includes("calculus with polar")) {
      if (skillLower.includes("area in polar")) {
        return [
          { question: "Which formula gives the area inside a polar curve r = f(theta) from alpha to beta?", options: ["1/2 integral from alpha to beta of r^2 dtheta", "integral from alpha to beta of r dtheta", "pi r^2", "integral from alpha to beta of x dy"], answer: "1/2 integral from alpha to beta of r^2 dtheta" },
          { question: "For r = 2 from theta = 0 to pi, what area is swept out?", options: ["2pi", "4pi", "pi", "8pi"], answer: "2pi" },
          { question: "Why does the polar area formula use r^2?", options: ["A small polar sector has area about 1/2 r^2 dtheta", "The radius is always squared in distance only", "It converts radians to degrees", "It removes the angle from the curve"], answer: "A small polar sector has area about 1/2 r^2 dtheta" },
          { question: "When finding area between two polar curves, you often subtract:", options: ["Outer radius squared minus inner radius squared", "Outer radius minus inner radius only", "Angles minus radii", "x-values from y-values"], answer: "Outer radius squared minus inner radius squared" },
          { question: "Before integrating polar area, it is important to find:", options: ["The correct theta interval", "Only the x-intercept", "Only the y-intercept", "The slope-intercept form"], answer: "The correct theta interval" },
        ];
      }

      if (skillLower.includes("calculus with polar")) {
        return [
          { question: "For a polar curve r = f(theta), x is written as:", options: ["r cos(theta)", "r sin(theta)", "theta cos(r)", "r/theta"], answer: "r cos(theta)" },
          { question: "For a polar curve r = f(theta), y is written as:", options: ["r sin(theta)", "r cos(theta)", "theta sin(r)", "theta/r"], answer: "r sin(theta)" },
          { question: "The slope dy/dx for a polar curve can be found using:", options: ["(dy/dtheta) / (dx/dtheta)", "(dx/dtheta) / (dy/dtheta)", "r/theta only", "theta/r only"], answer: "(dy/dtheta) / (dx/dtheta)" },
          { question: "A horizontal tangent on a polar curve can occur when:", options: ["dy/dtheta = 0 and dx/dtheta is not 0", "dx/dtheta = 0 only", "r is always negative", "theta is measured in degrees"], answer: "dy/dtheta = 0 and dx/dtheta is not 0" },
          { question: "Polar calculus often combines derivatives with:", options: ["Coordinate conversion formulas", "Only bar graphs", "Counting strategies", "Coin values"], answer: "Coordinate conversion formulas" },
        ];
      }

      if (skillLower.includes("polar graph") || skillLower.includes("polar equations")) {
        return [
          { question: "In polar graphing, the equation r = 3 represents:", options: ["A circle centered at the origin with radius 3", "A vertical line", "A horizontal line", "A parabola"], answer: "A circle centered at the origin with radius 3" },
          { question: "The polar equation theta = pi/4 represents:", options: ["A line through the origin", "A circle of radius pi/4", "A single point only", "An ellipse"], answer: "A line through the origin" },
          { question: "Negative r-values in polar coordinates mean the point is plotted:", options: ["In the opposite direction from the angle", "At the origin only", "Only above the x-axis", "With theta doubled"], answer: "In the opposite direction from the angle" },
          { question: "A polar graph is usually drawn by tracking:", options: ["Radius values as theta changes", "Only x-values", "Only y-intercepts", "Only slopes of lines"], answer: "Radius values as theta changes" },
          { question: "Which equation is a common polar rose form?", options: ["r = 2cos(3theta)", "y = mx + b", "x^2 + y^2 = 9 only", "y = x^2"], answer: "r = 2cos(3theta)" },
        ];
      }

      return [
        { question: "In polar coordinates, a point is described by:", options: ["A radius and an angle", "Only x and y", "Two side lengths", "A slope and y-intercept"], answer: "A radius and an angle" },
        { question: "Which rectangular coordinate matches polar point (5, 0)?", options: ["(5, 0)", "(0, 5)", "(-5, 0)", "(0, -5)"], answer: "(5, 0)" },
        { question: "Which formulas convert polar to rectangular coordinates?", options: ["x = r cos(theta), y = r sin(theta)", "x = r + theta, y = r - theta", "x = r/theta, y = theta/r", "x = cos(r), y = sin(theta)"], answer: "x = r cos(theta), y = r sin(theta)" },
        { question: "For rectangular point (3, 4), what is r?", options: ["5", "7", "1", "25"], answer: "5" },
        { question: "The angle theta in polar coordinates is usually measured from:", options: ["The positive x-axis", "The positive y-axis", "The origin outward only", "The nearest intercept"], answer: "The positive x-axis" },
      ];
    }

    if (skillLower.includes("parametric equations") || skillLower.includes("graphing parametrics") || skillLower.includes("calculus with parametrics") || skillLower.includes("eliminating parameter") || skillLower.includes("parametric applications")) {
      if (skillLower.includes("calculus with parametrics") || skillLower.includes("arc length")) {
        return [
          { question: "For x = f(t) and y = g(t), dy/dx equals:", options: ["(dy/dt) / (dx/dt)", "(dx/dt) / (dy/dt)", "dx/dt + dy/dt", "x/y"], answer: "(dy/dt) / (dx/dt)" },
          { question: "Parametric calculus uses t to represent:", options: ["A parameter that controls both x and y", "Only a fixed y-value", "Only a denominator", "A percent"], answer: "A parameter that controls both x and y" },
          { question: "If dx/dt is zero, dy/dx may be:", options: ["Undefined", "Always zero", "Always one", "Always negative"], answer: "Undefined" },
          { question: "Parametric arc length uses both:", options: ["dx/dt and dy/dt", "Only x-intercepts", "Only y-values", "Only degrees"], answer: "dx/dt and dy/dt" },
          { question: "Which expression appears inside the parametric arc length integral?", options: ["sqrt((dx/dt)^2 + (dy/dt)^2)", "dx/dt + dy/dt", "x^2 + y^2", "sqrt(x + y)"], answer: "sqrt((dx/dt)^2 + (dy/dt)^2)" },
        ];
      }

      return [
        { question: "A parametric equation describes x and y in terms of:", options: ["A third variable such as t", "Only a slope", "Only an area", "A percentage"], answer: "A third variable such as t" },
        { question: "For x = t + 1 and y = 2t, what point occurs when t = 3?", options: ["(4, 6)", "(3, 6)", "(4, 3)", "(6, 4)"], answer: "(4, 6)" },
        { question: "Eliminating the parameter means:", options: ["Writing a relationship between x and y only", "Deleting the graph", "Making t equal zero every time", "Changing all variables to constants"], answer: "Writing a relationship between x and y only" },
        { question: "For x = t and y = t^2, eliminating t gives:", options: ["y = x^2", "x = y^2", "y = 2x", "x + y = 0"], answer: "y = x^2" },
        { question: "Parametric equations are useful for modeling:", options: ["Motion over time", "Only static arithmetic facts", "Only coin values", "Only spelling patterns"], answer: "Motion over time" },
      ];
    }

    if (
      level >= 12 &&
      (skillLower.includes("rates of change") || skillLower.includes("related rates"))
    ) {
      return [
        {
          question: "If s(t) = t^3 - 6t^2 + 9t, what does s'(t) represent?",
          options: ["Instantaneous velocity", "Total distance only", "Average position", "The area under the graph"],
          answer: "Instantaneous velocity",
        },
        {
          question: "For f(x) = x^2 + 3x, what is the instantaneous rate of change at x = 2?",
          options: ["7", "4", "10", "1"],
          answer: "7",
        },
        {
          question: "If the radius r of a circle changes at 3 cm/s, which equation relates the rates of change of its area A and radius?",
          options: ["dA/dt = 2pi r dr/dt", "dA/dt = pi dr/dt", "dA/dt = 2pi r", "dA/dt = r^2 dr/dt"],
          answer: "dA/dt = 2pi r dr/dt",
        },
        {
          question: "Before implicitly differentiating a related-rates equation, what must be true of its variables?",
          options: ["They are expressed as functions of time", "They are all constants", "They are all equal to zero", "They have no units"],
          answer: "They are expressed as functions of time",
        },
        {
          question: "If position is measured in metres and time in seconds, what are the units of its derivative?",
          options: ["Metres per second", "Metres squared", "Seconds per metre", "Metres per second squared"],
          answer: "Metres per second",
        },
      ];
    }

    if (
      level >= 12 &&
      (skillLower.includes("optimization") ||
        skillLower.includes("maximum") ||
        skillLower.includes("minimum") ||
        skillLower.includes("constraint"))
    ) {
      return [
        {
          question: "For f(x) = -2x^2 + 8x + 3, at what x-value does f have its maximum?",
          options: ["2", "-2", "4", "8"],
          answer: "2",
        },
        {
          question: "If f'(c) = 0, what is c called when testing for an absolute maximum or minimum?",
          options: ["A critical number", "An endpoint only", "An asymptote", "A y-intercept"],
          answer: "A critical number",
        },
        {
          question: "A rectangle has perimeter 40 m. If its width is x, which function gives its area?",
          options: ["A(x) = x(20 - x)", "A(x) = 40x", "A(x) = x + 20", "A(x) = 20/x"],
          answer: "A(x) = x(20 - x)",
        },
        {
          question: "Which procedure finds an absolute maximum or minimum of a differentiable function on a closed interval?",
          options: ["Compare values at critical numbers and endpoints", "Use only the y-intercept", "Set the function equal to one", "Ignore the interval endpoints"],
          answer: "Compare values at critical numbers and endpoints",
        },
        {
          question: "If f'(x) changes from positive to negative at x = c, what does f have at x = c?",
          options: ["A local maximum", "A local minimum", "No change in behavior", "An infinite discontinuity"],
          answer: "A local maximum",
        },
      ];
    }

    if (skillLower === "applications") {
      const applicationVariant = seed % 4;

      if (level >= 12) {
        if (applicationVariant === 0) {
          return [
            { question: "If s(t) = t^2 + 3t, what does s'(t) represent in an application problem?", options: ["Instantaneous rate of change", "The area under the curve", "The y-intercept only", "A constant with no meaning"], answer: "Instantaneous rate of change" },
            { question: "A rectangle has perimeter 20 m. Which expression could model its area if one side is x?", options: ["x(10 - x)", "x + 10", "2x + 20", "10x + 20"], answer: "x(10 - x)" },
            { question: "In optimization, a critical point is useful because it may help identify:", options: ["A maximum or minimum value", "Only the domain", "A vertical asymptote", "A remainder"], answer: "A maximum or minimum value" },
            { question: "If velocity is the derivative of position, then the derivative of velocity is:", options: ["Acceleration", "Distance", "Area", "A tangent line"], answer: "Acceleration" },
            { question: "When solving a related-rates problem, what should you do before differentiating?", options: ["Write an equation relating the variables", "Round every number first", "Choose the largest answer", "Set the derivative equal to zero immediately"], answer: "Write an equation relating the variables" },
          ];
        }

        if (applicationVariant === 1) {
          return [
            { question: "If profit is modeled by P(x), then P'(x) describes:", options: ["The rate profit changes with respect to x", "The total profit from all time", "Only the starting profit", "The area under the profit graph"], answer: "The rate profit changes with respect to x" },
            { question: "Optimization problems usually ask for:", options: ["The largest or smallest possible value", "Only the y-intercept", "A horizontal asymptote", "A factor of a polynomial"], answer: "The largest or smallest possible value" },
            { question: "If a population model is increasing faster over time, its derivative is:", options: ["Positive", "Always zero", "Undefined everywhere", "A constant negative value"], answer: "Positive" },
            { question: "In a related-rates problem involving a balloon, known quantities often change with respect to:", options: ["Time", "Area only", "A fixed constant", "The x-intercept"], answer: "Time" },
            { question: "Why are units important in calculus application problems?", options: ["They help interpret what the rate or quantity means", "They remove the need for equations", "They make every answer an integer", "They replace the graph"], answer: "They help interpret what the rate or quantity means" },
          ];
        }

        if (applicationVariant === 2) {
          return [
            { question: "If a particle moves with position s(t), the instantaneous velocity at time t is found by:", options: ["Taking the derivative of s(t)", "Adding all position values", "Finding the y-intercept", "Using only the average value"], answer: "Taking the derivative of s(t)" },
            { question: "A farmer wants the largest possible area for a fixed amount of fencing. This is a:", options: ["Optimization problem", "Continuity problem", "Sequence problem", "Probability problem"], answer: "Optimization problem" },
            { question: "A secant line in a motion problem gives:", options: ["Average rate of change", "Instantaneous acceleration", "A vertical asymptote", "A limit at infinity"], answer: "Average rate of change" },
            { question: "If the radius of a circle changes over time, related-rates questions often ask about:", options: ["How fast the area changes", "The prime factorization of the radius", "Only the circumference intercept", "Whether the graph is linear"], answer: "How fast the area changes" },
            { question: "A maximum value in a real-world context might represent:", options: ["Greatest profit or greatest area", "A removable discontinuity", "A logarithm property", "A sequence term"], answer: "Greatest profit or greatest area" },
          ];
        }

        return [
          { question: "In calculus applications, a derivative is commonly used to model:", options: ["A rate of change", "A list of factors", "Only an endpoint", "A table of values"], answer: "A rate of change" },
          { question: "If cost changes as production changes, the derivative of the cost function represents:", options: ["Marginal cost", "Average velocity", "A vertical asymptote", "The exact break-even point"], answer: "Marginal cost" },
          { question: "A related-rates question connects variables that:", options: ["Change together over time", "Never change", "Are always equal to zero", "Only appear in geometry proofs"], answer: "Change together over time" },
          { question: "To confirm a critical point gives a maximum or minimum, students often use:", options: ["Derivative tests", "Prime factorization", "The quadratic formula only", "A random estimate"], answer: "Derivative tests" },
          { question: "An application question in calculus usually ends with:", options: ["An interpretation of the result in context", "No units or explanation", "A graph with no meaning", "A spelling definition"], answer: "An interpretation of the result in context" },
        ];
      }

      if (level >= 10) {
        return [
          { question: "A ball's height is modeled by h(t) = -5t^2 + 20t + 1. What does the vertex represent?", options: ["The maximum height", "The starting time only", "The y-intercept of a line", "The slope of a constant function"], answer: "The maximum height" },
          { question: "If an amount doubles every year, which type of model best fits the situation?", options: ["Exponential growth", "Linear decay", "Constant function", "Quadratic with no application"], answer: "Exponential growth" },
          { question: "A line with slope 3 passing through (2, 5) can be modeled by which point-slope equation?", options: ["y - 5 = 3(x - 2)", "y + 5 = 3(x + 2)", "y - 2 = 5(x - 3)", "y = 3x + 2"], answer: "y - 5 = 3(x - 2)" },
          { question: "If two lines are perpendicular and one has slope 2, the other must have slope:", options: ["-1/2", "2", "1/2", "-2"], answer: "-1/2" },
          { question: "What is usually the first step in a math application problem?", options: ["Define variables and identify the quantities", "Guess the answer", "Use the longest formula you know", "Ignore the context"], answer: "Define variables and identify the quantities" },
        ];
      }

      return [
        { question: "A taxi charges $4 to start and $2 per kilometer. Which equation models the total cost C after k kilometers?", options: ["C = 2k + 4", "C = 4k + 2", "C = 2 + 4k^2", "C = k + 6"], answer: "C = 2k + 4" },
        { question: "A concert hall sells student tickets for $8 and adult tickets for $12. If x is the number of student tickets and y is the number of adult tickets, total revenue is:", options: ["8x + 12y", "20xy", "12x + 8y", "8 + 12 + x + y"], answer: "8x + 12y" },
        { question: "A car travels 180 km in 3 hours. Its average speed is:", options: ["60 km/h", "90 km/h", "30 km/h", "183 km/h"], answer: "60 km/h" },
        { question: "A recipe uses 3 cups of flour for 24 cookies. How many cups are needed for 40 cookies?", options: ["5", "6", "4", "8"], answer: "5" },
        { question: "What makes a math application question different from a basic computation question?", options: ["You must interpret a real situation using math", "It never uses numbers", "It always has two answers", "You do not need units or context"], answer: "You must interpret a real situation using math" },
      ];
    }

    const isAlgebraSkill =
      skillLower.includes("algebra") ||
      skillLower.includes("expression") ||
      skillLower.includes("variable") ||
      skillLower.includes("equation") ||
      skillLower.includes("inequalit") ||
      skillLower.includes("input output") ||
      skillLower.includes("function rule");

    if (isAlgebraSkill) {
      const algebraVariant = seed % 3;

      if (level <= 4) {
        if (skillLower.includes("algebra foundations")) {
          return [
            { question: "What is algebra mainly used for?", options: ["Showing number relationships with symbols", "Measuring temperature only", "Naming shapes only", "Sorting colours only"], answer: "Showing number relationships with symbols" },
            { question: "Which of these includes a variable?", options: ["x + 4", "7 + 4", "12 - 3", "5 x 2"], answer: "x + 4" },
            { question: "A variable is a symbol that can stand for:", options: ["A number", "Only a shape", "A colour", "A sentence"], answer: "A number" },
            { question: "Which is an equation?", options: ["x + 3 = 8", "x + 3", "8 > 3", "triangle"], answer: "x + 3 = 8" },
            { question: "Algebra helps us:", options: ["Describe and solve math patterns", "Avoid numbers", "Replace all addition", "Measure weight only"], answer: "Describe and solve math patterns" },
          ];
        }

        if (skillLower.includes("variables and unknowns")) {
          return [
            { question: "In the equation x + 2 = 9, what is the unknown?", options: ["x", "2", "9", "+"], answer: "x" },
            { question: "Which letter could be used as a variable?", options: ["n", "=", "+", "7"], answer: "n" },
            { question: "If y = 6, what is y + 1?", options: ["7", "5", "6", "1"], answer: "7" },
            { question: "In 5 + m = 12, what does m stand for?", options: ["The missing number", "The equal sign", "The answer 12 only", "The number 5"], answer: "The missing number" },
            { question: "Why do mathematicians use variables?", options: ["To represent numbers we do not know yet", "To remove all operations", "To replace answers", "To name graph paper"], answer: "To represent numbers we do not know yet" },
          ];
        }

        if (skillLower.includes("patterns with variables")) {
          return [
            { question: "If the rule is n + 2, what is the output when n = 3?", options: ["5", "1", "6", "9"], answer: "5" },
            { question: "Which rule matches the pattern 4, 6, 8, 10?", options: ["n + 2 starting at 2", "n + 4 starting at 0", "2n starting at 4", "n - 2 starting at 12"], answer: "n + 2 starting at 2" },
            { question: "If a pattern rule is 3n and n = 4, what is the value?", options: ["12", "7", "3", "1"], answer: "12" },
            { question: "A variable in a pattern rule helps show:", options: ["How the pattern changes", "The colour of the pattern", "Only the last term", "A random guess"], answer: "How the pattern changes" },
            { question: "If the rule is b + 5, which input gives an output of 11?", options: ["6", "16", "5", "11"], answer: "6" },
          ];
        }

        if (skillLower.includes("algebra word problems")) {
          return [
            { question: "Mia has 7 stickers. Her aunt gives her some more, and now she has 12. Which equation can help find how many stickers she got?", options: ["7 + x = 12", "7 - x = 12", "7x = 12", "12 + x = 7"], answer: "7 + x = 12" },
            { question: "A box has some apples. 5 apples are added, and now there are 14 apples. How many apples were in the box at first?", options: ["9", "19", "5", "14"], answer: "9" },
            { question: "Liam read 4 pages on Monday and some pages on Tuesday. He read 11 pages in total. How many pages did he read on Tuesday?", options: ["7", "15", "4", "11"], answer: "7" },
            { question: "A toy costs $13. Ava already has $8. How much more money does she need?", options: ["5", "21", "6", "13"], answer: "5" },
            { question: "There are some birds in a tree. 6 more birds land, and there are now 15 birds. How many birds were there at first?", options: ["9", "21", "6", "15"], answer: "9" },
          ];
        }

        if (skillLower.includes("expression")) {
          if (algebraVariant === 0) {
            return [
              { question: "Which expression means 3 more than x?", options: ["x + 3", "3x", "x - 3", "3 - x"], answer: "x + 3" },
              { question: "If n = 5, what is n + 4?", options: ["9", "1", "20", "54"], answer: "9" },
              { question: "Which expression shows 2 groups of a?", options: ["2a", "a + 2", "a - 2", "a/2"], answer: "2a" },
              { question: "If m = 3, what is 2m?", options: ["6", "5", "3", "9"], answer: "6" },
              { question: "An expression has:", options: ["Numbers, symbols, and sometimes variables", "An equal sign every time", "Only shapes", "No meaning"], answer: "Numbers, symbols, and sometimes variables" },
            ];
          }

          if (algebraVariant === 1) {
            return [
              { question: "Which expression means 7 less than p?", options: ["p - 7", "7p", "p + 7", "7 - p + p"], answer: "p - 7" },
              { question: "If a = 6, what is a - 2?", options: ["4", "8", "12", "3"], answer: "4" },
              { question: "Which expression means 5 times y?", options: ["5y", "y + 5", "y - 5", "5 + y + y"], answer: "5y" },
              { question: "If b = 4, what is b + 10?", options: ["14", "6", "40", "10"], answer: "14" },
              { question: "Which is an expression, not an equation?", options: ["x + 8", "x + 8 = 10", "7 = 7", "3 > 1"], answer: "x + 8" },
            ];
          }

          return [
            { question: "Translate into an expression: a number plus 9", options: ["x + 9", "x - 9", "9x", "9 = x"], answer: "x + 9" },
            { question: "If c = 2, what is c + 7?", options: ["9", "5", "14", "27"], answer: "9" },
            { question: "Translate into an expression: 4 groups of n", options: ["4n", "n + 4", "n - 4", "4 = n"], answer: "4n" },
            { question: "If d = 8, what is d - 5?", options: ["3", "13", "40", "5"], answer: "3" },
            { question: "Expressions are used to:", options: ["Show math relationships", "Only compare numbers with signs", "Always solve for one answer immediately", "Replace all words in a story"], answer: "Show math relationships" },
          ];
        }

        if (skillLower.includes("equation")) {
          if (algebraVariant === 0) {
            return [
              { question: "In the equation x + 5 = 12, what is x?", options: ["7", "5", "12", "17"], answer: "7" },
              { question: "Which equation matches: a number plus 6 equals 15?", options: ["x + 6 = 15", "x - 6 = 15", "6x = 15", "15 + 6 = x"], answer: "x + 6 = 15" },
              { question: "Solve: y - 4 = 3", options: ["7", "1", "12", "4"], answer: "7" },
              { question: "Which value makes n + 2 = 9 true?", options: ["7", "11", "2", "9"], answer: "7" },
              { question: "An equation always has:", options: ["An equal sign", "Only one number", "A variable every time", "No operation signs"], answer: "An equal sign" },
            ];
          }

          if (algebraVariant === 1) {
            return [
              { question: "Solve: x + 3 = 10", options: ["7", "13", "3", "10"], answer: "7" },
              { question: "Solve: a - 2 = 6", options: ["8", "4", "6", "12"], answer: "8" },
              { question: "Which equation means a number minus 5 equals 9?", options: ["x - 5 = 9", "x + 5 = 9", "5x = 9", "9 - 5 = x + 5"], answer: "x - 5 = 9" },
              { question: "What number makes m + 1 = 5 true?", options: ["4", "6", "5", "1"], answer: "4" },
              { question: "To solve a simple equation, you try to find:", options: ["The value of the unknown", "The biggest number only", "A shape pattern", "A graph title"], answer: "The value of the unknown" },
            ];
          }

          return [
            { question: "Solve: p + 8 = 14", options: ["6", "22", "8", "14"], answer: "6" },
            { question: "Solve: q - 3 = 5", options: ["8", "2", "5", "15"], answer: "8" },
            { question: "Which equation means a number and 4 make 11?", options: ["x + 4 = 11", "x - 4 = 11", "4x = 11", "11 + 4 = x"], answer: "x + 4 = 11" },
            { question: "Which value makes t + 6 = 13 true?", options: ["7", "19", "6", "13"], answer: "7" },
            { question: "Checking your answer means:", options: ["Putting it back into the equation", "Picking a different question", "Ignoring the equal sign", "Guessing again"], answer: "Putting it back into the equation" },
          ];
        }

        if (skillLower.includes("input output") || skillLower.includes("function rule")) {
          return [
            { question: "If the rule is add 3, what is the output for input 4?", options: ["7", "1", "12", "43"], answer: "7" },
            { question: "If the rule is multiply by 2, what is the output for input 6?", options: ["12", "8", "3", "10"], answer: "12" },
            { question: "If the rule is add 5, which input gives an output of 9?", options: ["4", "14", "9", "5"], answer: "4" },
            { question: "An input-output table helps show:", options: ["A rule between numbers", "Only a picture", "A fraction model only", "A measuring tool"], answer: "A rule between numbers" },
            { question: "If the rule is subtract 2, what is the output for input 10?", options: ["8", "12", "20", "2"], answer: "8" },
          ];
        }

        if (skillLower.includes("inequalit")) {
          return [
            { question: "Which symbol makes the sentence true: 8 __ 5?", options: [">", "<", "=", "+"], answer: ">" },
            { question: "Which symbol makes the sentence true: 3 __ 9?", options: ["<", ">", "=", "-"], answer: "<" },
            { question: "Which is true?", options: ["12 > 7", "4 > 10", "6 < 2", "9 = 3"], answer: "12 > 7" },
            { question: "An inequality compares:", options: ["Two amounts or expressions", "Only shapes", "Only words", "A graph and a ruler"], answer: "Two amounts or expressions" },
            { question: "Which symbol means 'less than'?", options: ["<", ">", "=", "+"], answer: "<" },
          ];
        }

        return [
          { question: "If n = 4, what is n + 3?", options: ["7", "1", "12", "43"], answer: "7" },
          { question: "Which expression means 2 more than x?", options: ["x + 2", "2x", "x - 2", "x = 2"], answer: "x + 2" },
          { question: "Solve: x + 4 = 9", options: ["5", "13", "4", "9"], answer: "5" },
          { question: "If the rule is add 2, what is the output for input 5?", options: ["7", "3", "10", "25"], answer: "7" },
          { question: "Which symbol makes the sentence true: 8 __ 5?", options: [">", "<", "=", "+"], answer: ">" },
        ];
      }

      if (level === 5) {
        if (skillLower.includes("expression")) {
          return algebraVariant === 0
            ? [
                { question: "If x = 6, what is 2x + 3?", options: ["15", "12", "9", "18"], answer: "15" },
                { question: "Which expression means 4 more than n?", options: ["n + 4", "4n", "n - 4", "4 - n"], answer: "n + 4" },
                { question: "Evaluate 3a when a = 5", options: ["15", "8", "35", "3"], answer: "15" },
                { question: "Which expression means 2 groups of y and then add 1?", options: ["2y + 1", "2(y + 1)", "y + 3", "2 + y"], answer: "2y + 1" },
                { question: "A variable is:", options: ["A symbol that can stand for a number", "A fixed operation sign", "Always the largest number", "A graph title"], answer: "A symbol that can stand for a number" },
              ]
            : [
                { question: "If m = 4, what is m + 8?", options: ["12", "4", "32", "8"], answer: "12" },
                { question: "Which expression means 5 times p?", options: ["5p", "p + 5", "p - 5", "5 + p + p"], answer: "5p" },
                { question: "Evaluate n - 6 when n = 10", options: ["4", "16", "60", "6"], answer: "4" },
                { question: "Which expression means 3 less than t?", options: ["t - 3", "3t", "t + 3", "3 - t + t"], answer: "t - 3" },
                { question: "An algebraic expression does not need:", options: ["An equal sign", "Numbers", "Symbols", "Meaning"], answer: "An equal sign" },
              ];
        }

        if (skillLower.includes("equation")) {
          return algebraVariant === 0
            ? [
                { question: "Solve: y - 7 = 9", options: ["16", "2", "9", "63"], answer: "16" },
                { question: "Solve: x + 6 = 14", options: ["8", "20", "6", "14"], answer: "8" },
                { question: "Which value makes a - 4 = 5 true?", options: ["9", "1", "5", "20"], answer: "9" },
                { question: "Which equation means a number plus 3 equals 11?", options: ["x + 3 = 11", "x - 3 = 11", "3x = 11", "11 + 3 = x"], answer: "x + 3 = 11" },
                { question: "To solve an equation, you want the variable by itself on:", options: ["One side", "Both sides at once", "Neither side", "The bottom only"], answer: "One side" },
              ]
            : [
                { question: "Solve: z + 5 = 13", options: ["8", "18", "5", "13"], answer: "8" },
                { question: "Solve: b - 9 = 4", options: ["13", "5", "9", "36"], answer: "13" },
                { question: "Which value makes n + 7 = 12 true?", options: ["5", "19", "7", "12"], answer: "5" },
                { question: "Which equation means a number minus 2 equals 10?", options: ["x - 2 = 10", "x + 2 = 10", "2x = 10", "10 - 2 = x + 2"], answer: "x - 2 = 10" },
                { question: "An equation is true when both sides have:", options: ["The same value", "Different values", "Only variables", "No numbers"], answer: "The same value" },
              ];
        }

        return [
          { question: "If x = 6, what is 2x + 3?", options: ["15", "12", "9", "18"], answer: "15" },
          { question: "Which expression means '4 more than n'?", options: ["n + 4", "4n", "n - 4", "4 - n"], answer: "n + 4" },
          { question: "Solve: y - 7 = 9", options: ["16", "2", "9", "63"], answer: "16" },
          { question: "If the rule is 'multiply by 3', what is the output for input 4?", options: ["12", "7", "1", "16"], answer: "12" },
          { question: "Which inequality is true?", options: ["12 > 9", "4 > 10", "7 < 2", "5 = 8"], answer: "12 > 9" },
        ];
      }

      if (level <= 7) {
        if (skillLower.includes("expression")) {
          return algebraVariant === 0
            ? [
                { question: "Simplify: 3x + 2x", options: ["5x", "6x", "5", "x"], answer: "5x" },
                { question: "Which expression is equivalent to 2(a + 3)?", options: ["2a + 6", "2a + 3", "a + 6", "2a + 9"], answer: "2a + 6" },
                { question: "Simplify: 4y - y", options: ["3y", "4", "y", "5y"], answer: "3y" },
                { question: "What are like terms?", options: ["Terms with the same variable part", "Terms with different operations only", "Only number terms", "Terms in different equations"], answer: "Terms with the same variable part" },
                { question: "Evaluate 2n + 1 when n = 4", options: ["9", "8", "6", "5"], answer: "9" },
              ]
            : [
                { question: "Simplify: 5m + 3m", options: ["8m", "15m", "2m", "8"], answer: "8m" },
                { question: "Use the distributive property: 3(x + 2)", options: ["3x + 6", "3x + 2", "x + 6", "6x"], answer: "3x + 6" },
                { question: "Evaluate 3p - 2 when p = 5", options: ["13", "15", "8", "7"], answer: "13" },
                { question: "Which pair are like terms?", options: ["2x and 7x", "2x and 2y", "3 and x", "a and ab"], answer: "2x and 7x" },
                { question: "An equivalent expression has:", options: ["The same value as another expression", "A different variable every time", "No operations", "Only one term"], answer: "The same value as another expression" },
              ];
        }

        if (skillLower.includes("equation")) {
          return algebraVariant === 0
            ? [
                { question: "Solve: x/4 = 6", options: ["24", "10", "2", "12"], answer: "24" },
                { question: "Solve: y + 8 = 15", options: ["7", "23", "8", "15"], answer: "7" },
                { question: "Solve: a - 9 = 5", options: ["14", "4", "9", "45"], answer: "14" },
                { question: "Which value makes 3n = 18 true?", options: ["6", "21", "3", "15"], answer: "6" },
                { question: "A solution to an equation is:", options: ["A value that makes the equation true", "Any number you choose", "Only a negative number", "Always zero"], answer: "A value that makes the equation true" },
              ]
            : [
                { question: "Solve: x + 12 = 20", options: ["8", "32", "12", "20"], answer: "8" },
                { question: "Solve: b/5 = 7", options: ["35", "12", "2", "7"], answer: "35" },
                { question: "Solve: c - 11 = 4", options: ["15", "7", "11", "44"], answer: "15" },
                { question: "Which value makes 4m = 28 true?", options: ["7", "24", "4", "32"], answer: "7" },
                { question: "To check a solution, you should:", options: ["Substitute it back into the equation", "Change the operation signs", "Ignore one side", "Pick the largest number"], answer: "Substitute it back into the equation" },
              ];
        }

        return [
          { question: "Simplify: 3x + 2x", options: ["5x", "6x", "5", "x"], answer: "5x" },
          { question: "Solve: x/4 = 6", options: ["24", "10", "2", "12"], answer: "24" },
          { question: "Which expression is equivalent to 2(a + 3)?", options: ["2a + 6", "2a + 3", "a + 6", "2a + 9"], answer: "2a + 6" },
          { question: "Solve the inequality x + 5 < 11", options: ["x < 6", "x > 6", "x < 16", "x = 6"], answer: "x < 6" },
          { question: "In a table where y = 2x + 1, what is y when x = 3?", options: ["7", "6", "5", "8"], answer: "7" },
        ];
      }

      if (level <= 9) {
        return [
          { question: "Solve: 3x - 5 = 16", options: ["7", "11", "21", "3"], answer: "7" },
          { question: "What is the slope of the line through (1, 2) and (3, 8)?", options: ["3", "2", "4", "6"], answer: "3" },
          { question: "Which equation is in slope-intercept form?", options: ["y = 2x + 5", "2x + y = 5", "x - 2 = y", "3x = 9"], answer: "y = 2x + 5" },
          { question: "Factor: x^2 + 5x + 6", options: ["(x + 2)(x + 3)", "(x + 1)(x + 6)", "(x - 2)(x - 3)", "(x + 5)(x + 6)"], answer: "(x + 2)(x + 3)" },
          { question: "A function assigns:", options: ["Exactly one output to each input", "Many unrelated outputs to one input by default", "Only whole numbers", "Only graph points"], answer: "Exactly one output to each input" },
        ];
      }

      if (skillLower.includes("algebraic modeling")) {
        return [
          { question: "A store charges a $12 setup fee plus $4 per item. Which model gives total cost C for n items?", options: ["C = 4n + 12", "C = 12n + 4", "C = 16n", "C = 4n - 12"], answer: "C = 4n + 12" },
          { question: "A quadratic model is often a good choice for data that:", options: ["Rises and then falls, or falls and then rises", "Changes by the same amount forever", "Stays completely constant", "Has no turning point"], answer: "Rises and then falls, or falls and then rises" },
          { question: "If a table has nearly constant first differences, which model is most reasonable?", options: ["Linear", "Quadratic", "Exponential", "No model"], answer: "Linear" },
          { question: "In an algebraic model, a parameter usually represents:", options: ["A value that controls part of the relationship", "Only the final answer", "A random label with no meaning", "The graph title"], answer: "A value that controls part of the relationship" },
          { question: "Why should a model be checked against the original context?", options: ["To make sure predictions and units make sense", "To remove all variables", "To guarantee every value is positive", "To avoid interpreting the answer"], answer: "To make sure predictions and units make sense" },
        ];
      }

      if (skillLower.includes("algebra applications")) {
        return [
          { question: "A gym charges $30 per month plus a $20 sign-up fee. Which expression represents the cost for m months?", options: ["30m + 20", "20m + 30", "50m", "30 + 20m + m"], answer: "30m + 20" },
          { question: "A rectangular garden has length x + 5 and width x. Which expression gives its area?", options: ["x(x + 5)", "2x + 5", "x + 5", "5x"], answer: "x(x + 5)" },
          { question: "If revenue is 18t and cost is 7t + 55, which expression models profit?", options: ["11t - 55", "25t + 55", "18t - 55", "7t - 18"], answer: "11t - 55" },
          { question: "A phone plan has 2 GB included and adds g extra GB. Which inequality shows using at most 8 GB total?", options: ["2 + g <= 8", "2g <= 8", "g - 2 <= 8", "2 + g >= 8"], answer: "2 + g <= 8" },
          { question: "In an algebra application, the solution should usually be interpreted with:", options: ["Units and the meaning in the situation", "Only the variable name", "No words after the number", "A different equation"], answer: "Units and the meaning in the situation" },
        ];
      }

      if (level <= 11) {
        return [
          { question: "Solve: x^2 - 9 = 0", options: ["x = 3 or x = -3", "x = 9 only", "x = 0 only", "No real solution"], answer: "x = 3 or x = -3" },
          { question: "What are the zeros of x^2 - 5x + 6?", options: ["2 and 3", "1 and 6", "-2 and -3", "5 and 6"], answer: "2 and 3" },
          { question: "Which expression is equivalent to (x^2 - 1)/(x - 1), for x not equal to 1?", options: ["x + 1", "x - 1", "x^2 + 1", "1"], answer: "x + 1" },
          { question: "If f(x) = 2^x, the function is:", options: ["Exponential", "Linear", "Quadratic", "Constant"], answer: "Exponential" },
          { question: "The discriminant of x^2 + 4x + 4 = 0 is:", options: ["0", "4", "8", "16"], answer: "0" },
        ];
      }

      return [
        { question: "If log(x) + log(10) = 2, what is x?", options: ["10", "100", "1", "20"], answer: "10" },
        { question: "Which expression is equivalent to x^(1/2)?", options: ["sqrt(x)", "x^2", "1/x", "2x"], answer: "sqrt(x)" },
        { question: "Solve: 2^(x) = 16", options: ["4", "8", "2", "16"], answer: "4" },
        { question: "What is the degree of the polynomial 3x^4 - 2x + 1?", options: ["4", "3", "5", "1"], answer: "4" },
        { question: "An algebraic model is most useful when it helps us:", options: ["Represent and analyze relationships", "Avoid variables completely", "Ignore patterns", "Replace all reasoning with guessing"], answer: "Represent and analyze relationships" },
      ];
    }

    if (isCounting) {
      const limitMatch = skillLower.match(/to\s*(\d{1,3})/);
      const rangeMatch = skillLower.match(/(\d{1,3})\s*-\s*(\d{1,3})/);
      const parsedLimit = limitMatch ? Number(limitMatch[1]) : null;
      const rangeEnd = rangeMatch ? Number(rangeMatch[2]) : null;
      const maxCount = Math.max(
        5,
        Math.min(120, parsedLimit ?? rangeEnd ?? (level <= 1 ? 10 : 20))
      );
      const n1 = rand(1, Math.max(2, maxCount - 2));
      const n2 = rand(1, Math.max(2, maxCount - 3));
      const n3 = rand(2, Math.max(3, maxCount - 1));

      if (grade === "jk" || grade === "kindergarten") {
        const earlyMax = Math.min(maxCount, grade === "jk" ? 5 : 10);
        return [
          {
            question: "What number comes after 1?",
            options: ["2", "3", "4", "5"],
            answer: "2",
          },
          {
            question: `Count: 1, 2, 3. What comes next?`,
            options: ["4", "1", "2", "5"],
            answer: "4",
          },
          {
            question: "How many stars? * * *",
            options: ["3", "2", "4", "5"],
            answer: "3",
          },
          {
            question: `Which number is ${earlyMax}?`,
            options: [String(earlyMax), String(Math.max(1, earlyMax - 1)), String(Math.max(1, earlyMax - 2)), String(Math.min(10, earlyMax + 1))],
            answer: String(earlyMax),
          },
          {
            question: `Which counting list is correct?`,
            options: ["1, 2, 3", "1, 3, 2", "2, 1, 3", "3, 1, 2"],
            answer: "1, 2, 3",
          },
        ];
      }

      return [
        {
          question: `For ${skillName}, which number comes after ${n1}?`,
          options: [String(n1 + 1), String(Math.max(0, n1 - 1)), String(n1 + 2), String(n1 + 3)],
          answer: String(n1 + 1),
        },
        {
          question: `For ${skillName}, which number comes before ${n3}?`,
          options: [String(n3 - 1), String(n3 + 1), String(n3 - 2), String(n3 + 2)],
          answer: String(n3 - 1),
        },
        {
          question: `For ${skillName}, what number is missing: ${n2}, __, ${n2 + 2}?`,
          options: [String(n2 + 1), String(n2 + 3), String(Math.max(0, n2 - 1)), String(n2 + 4)],
          answer: String(n2 + 1),
        },
        {
          question: `For ${skillName}, how many numbers are in 1 to ${Math.min(maxCount, 10)}?`,
          options: [String(Math.min(maxCount, 10)), String(Math.min(maxCount, 10) - 1), String(Math.min(maxCount, 10) + 1), String(Math.min(maxCount, 10) + 2)],
          answer: String(Math.min(maxCount, 10)),
        },
        {
          question: `For ${skillName}, which sequence is in the correct order?`,
          options: [
            `${Math.max(1, n1 - 1)}, ${n1}, ${n1 + 1}`,
            `${n1 + 1}, ${n1}, ${Math.max(1, n1 - 1)}`,
            `${n1}, ${n1 + 2}, ${n1 + 1}`,
            `${n1 + 2}, ${n1 + 1}, ${n1}`,
          ],
          answer: `${Math.max(1, n1 - 1)}, ${n1}, ${n1 + 1}`,
        },
      ];
    }

    if (isAddition) {
      return Array.from({ length: 5 }, () => {
        const a = rand(2 + level, 12 + level * 4);
        const b = rand(1 + Math.floor(level / 2), 10 + level * 3);
        return equationQuestion(`In ${skillName}, what is ${a} + ${b}?`, a + b);
      });
    }

    if (isSubtraction) {
      return Array.from({ length: 5 }, () => {
        const b = rand(2, 8 + level * 2);
        const c = rand(2 + level, 12 + level * 4);
        const a = b + c;
        return equationQuestion(`In ${skillName}, what is ${a} - ${b}?`, c);
      });
    }

    if (isMultiplication) {
      return Array.from({ length: 5 }, () => {
        const a = rand(2, 5 + Math.max(1, Math.floor(level / 2)));
        const b = rand(2, 6 + Math.max(1, Math.floor(level / 2)));
        return equationQuestion(`In ${skillName}, what is ${a} x ${b}?`, a * b);
      });
    }

    if (isDivision) {
      return Array.from({ length: 5 }, () => {
        const divisor = rand(2, 6 + Math.max(1, Math.floor(level / 2)));
        const quotient = rand(2, 8 + Math.max(1, Math.floor(level / 2)));
        const dividend = divisor * quotient;
        return equationQuestion(`In ${skillName}, what is ${dividend} / ${divisor}?`, quotient);
      });
    }

    if (isFraction) {
      if (hasAny(["equivalent", "simplifying", "simplify"])) {
        return Array.from({ length: 5 }, () => {
          const denom = rand(2, 8);
          const numer = rand(1, denom - 1);
          const factor = rand(2, 4);
          const correct = `${numer * factor}/${denom * factor}`;
          return {
            question: `For ${skillName}, which fraction is equivalent to ${numer}/${denom}?`,
            options: [
              correct,
              `${numer + 1}/${denom + 1}`,
              `${numer * factor}/${denom + factor}`,
              `${numer + factor}/${denom * factor}`,
            ],
            answer: correct,
          };
        });
      }

      if (hasAny(["compare", "ordering", "order"])) {
        return Array.from({ length: 5 }, () => {
          const denom = rand(2, 10);
          const a = rand(1, denom - 2);
          const b = rand(a + 1, denom - 1);
          return {
            question: `For ${skillName}, which fraction is greater?`,
            options: [`${b}/${denom}`, `${a}/${denom}`, `${a}/${denom}`, `${b - 1}/${denom}`],
            answer: `${b}/${denom}`,
          };
        });
      }

      if (hasAny(["add", "addition", "subtract", "subtraction"])) {
        return Array.from({ length: 5 }, () => {
          const denom = rand(2, 10);
          const a = rand(1, denom - 1);
          const b = rand(1, denom - 1);
          const isSubtractSkill = hasAny(["subtract", "subtraction"]);
          const left = isSubtractSkill ? Math.max(a, b) : a;
          const right = isSubtractSkill ? Math.min(a, b) : b;
          const correctNumerator = isSubtractSkill ? left - right : left + right;
          const correct = `${correctNumerator}/${denom}`;
          return {
            question: `For ${skillName}, what is ${left}/${denom} ${isSubtractSkill ? "-" : "+"} ${right}/${denom}?`,
            options: [
              correct,
              `${Math.max(1, correctNumerator - 1)}/${denom}`,
              `${correctNumerator + 1}/${denom}`,
              `${left + right}/${Math.min(12, denom + 1)}`,
            ],
            answer: correct,
          };
        });
      }

      if (hasAny(["multiply", "multiplication"])) {
        return Array.from({ length: 5 }, () => {
          const whole = rand(2, 6);
          const denom = rand(2, 8);
          const numer = rand(1, denom - 1);
          const correct = `${whole * numer}/${denom}`;
          return {
            question: `For ${skillName}, what is ${whole} x ${numer}/${denom}?`,
            options: [
              correct,
              `${whole + numer}/${denom}`,
              `${whole * numer}/${denom + 1}`,
              `${whole + numer}/${denom + 1}`,
            ],
            answer: correct,
          };
        });
      }

      if (hasAny(["number line"])) {
        return Array.from({ length: 5 }, () => {
          const denom = rand(2, 8);
          const numer = rand(1, denom - 1);
          return {
            question: `For ${skillName}, which point would be closest to ${numer}/${denom} on a number line from 0 to 1?`,
            options: [`${numer}/${denom}`, `${numer + 1}/${denom}`, `${Math.max(0, numer - 1)}/${denom}`, `${denom}/${denom}`],
            answer: `${numer}/${denom}`,
          };
        });
      }

      return Array.from({ length: 5 }, () => {
        const denom = rand(2, 8);
        const numer = rand(1, denom - 1);
        return {
          question: `For ${skillName}, which fraction names ${numer} part${numer === 1 ? "" : "s"} out of ${denom} equal parts?`,
          options: [`${numer}/${denom}`, `${denom}/${numer}`, `${numer + 1}/${denom}`, `${numer}/${Math.min(12, denom + 1)}`],
          answer: `${numer}/${denom}`,
        };
      });
    }

    if (isDecimal) {
      if (hasAny(["place value", "tenths", "hundredths", "reading", "writing"])) {
        return Array.from({ length: 5 }, () => {
          const whole = rand(1, 9);
          const tenths = rand(0, 9);
          const hundredths = rand(0, 9);
          const value = Number(`${whole}.${tenths}${hundredths}`);
          const placeAnswer = skillLower.includes("hundredth") ? hundredths : tenths;
          const placeName = skillLower.includes("hundredth") ? "hundredths" : "tenths";
          return {
            question: `For ${skillName}, what digit is in the ${placeName} place in ${value.toFixed(2)}?`,
            options: [String(placeAnswer), String(whole), String(tenths), String(hundredths)],
            answer: String(placeAnswer),
          };
        });
      }

      if (hasAny(["compare", "ordering", "order"])) {
        return Array.from({ length: 5 }, () => {
          const a = (rand(11, 89) / 10).toFixed(1);
          const b = (rand(11, 89) / 10).toFixed(1);
          const correct = Number(a) > Number(b) ? a : b;
          const other = correct === a ? b : a;
          return {
            question: `For ${skillName}, which decimal is greater?`,
            options: [correct, other, (Number(other) + 0.1).toFixed(1), (Number(correct) - 0.1).toFixed(1)],
            answer: correct,
          };
        });
      }

      if (hasAny(["subtract", "subtraction"])) {
        return Array.from({ length: 5 }, () => {
          const a = rand(40, 95);
          const b = rand(10, 35);
          const correct = ((a - b) / 10).toFixed(1);
          return {
            question: `For ${skillName}, what is ${(a / 10).toFixed(1)} - ${(b / 10).toFixed(1)}?`,
            options: [correct, ((a - b + 5) / 10).toFixed(1), ((a - b - 5) / 10).toFixed(1), ((a + b) / 10).toFixed(1)],
            answer: correct,
          };
        });
      }

      return Array.from({ length: 5 }, () => {
        const a = rand(10, 90);
        const b = rand(10, 90);
        const correct = ((a + b) / 10).toFixed(1);
        return {
          question: `For ${skillName}, what is ${(a / 10).toFixed(1)} + ${(b / 10).toFixed(1)}?`,
          options: [correct, ((a + b + 5) / 10).toFixed(1), ((a + b - 5) / 10).toFixed(1), ((a + b + 10) / 10).toFixed(1)],
          answer: correct,
        };
      });
    }

    if (isPercent) {
      return Array.from({ length: 5 }, () => {
        const percent = rand(10, 50);
        const base = rand(20, 200);
        const correct = (percent / 100) * base;
        return equationQuestion(`For ${skillName}, what is ${percent}% of ${base}?`, Number(correct.toFixed(2)));
      });
    }

    if (isGeometry) {
      if (hasAny(["angle", "angles"])) {
        return [
          { question: `For ${skillName}, how many degrees are in a right angle?`, options: ["90", "45", "180", "360"], answer: "90" },
          { question: "Which angle is less than 90 degrees?", options: ["Acute angle", "Right angle", "Straight angle", "Reflex angle"], answer: "Acute angle" },
          { question: "Which tool is used to measure angles?", options: ["Protractor", "Ruler", "Scale", "Compass"], answer: "Protractor" },
          { question: "An angle measuring 180 degrees is called:", options: ["Straight angle", "Right angle", "Acute angle", "Obtuse angle"], answer: "Straight angle" },
          { question: "An obtuse angle measures:", options: ["More than 90 degrees and less than 180 degrees", "Exactly 90 degrees", "Less than 90 degrees", "Exactly 360 degrees"], answer: "More than 90 degrees and less than 180 degrees" },
        ];
      }

      if (hasAny(["perimeter"])) {
        return [
          { question: `For ${skillName}, what is the perimeter of a square with side 6?`, options: ["24", "12", "18", "36"], answer: "24" },
          { question: "How do you find the perimeter of a rectangle?", options: ["Add all side lengths", "Multiply length and width only", "Count the corners", "Measure one side only"], answer: "Add all side lengths" },
          { question: "A rectangle has length 8 and width 3. Its perimeter is:", options: ["22", "24", "11", "16"], answer: "22" },
          { question: "Perimeter measures the distance:", options: ["Around a shape", "Inside a shape", "From corner to center", "Between two colours"], answer: "Around a shape" },
          { question: "If one side of a square is 5 cm, the perimeter is:", options: ["20 cm", "25 cm", "10 cm", "15 cm"], answer: "20 cm" },
        ];
      }

      if (hasAny(["area"])) {
        return [
          { question: `For ${skillName}, what is the area of a rectangle with sides 5 and 4?`, options: ["20", "9", "18", "25"], answer: "20" },
          { question: "Area measures the amount of space:", options: ["Inside a shape", "Around a shape", "Along one side", "Between two points only"], answer: "Inside a shape" },
          { question: "The area of a rectangle is found by:", options: ["Length x width", "Length + width", "4 x side", "Base + height"], answer: "Length x width" },
          { question: "A rectangle is 7 units long and 3 units wide. Its area is:", options: ["21 square units", "20 square units", "10 square units", "24 square units"], answer: "21 square units" },
          { question: "Square units are used to measure:", options: ["Area", "Perimeter", "Mass", "Time"], answer: "Area" },
        ];
      }

      if (hasAny(["volume"])) {
        return [
          { question: `For ${skillName}, volume measures the space inside a:`, options: ["3D object", "2D line", "single angle", "data table"], answer: "3D object" },
          { question: "What is the volume of a rectangular prism with length 4, width 3, and height 2?", options: ["24", "12", "18", "9"], answer: "24" },
          { question: "Volume is measured in:", options: ["Cubic units", "Square units", "Degrees", "Minutes"], answer: "Cubic units" },
          { question: "To find the volume of a rectangular prism, you multiply:", options: ["Length x width x height", "Length + width + height", "Base x 2", "Width x 2"], answer: "Length x width x height" },
          { question: "Which object would most likely have volume?", options: ["A box", "A line segment", "An angle", "A tally chart"], answer: "A box" },
        ];
      }

      return [
        { question: `For ${skillName}, which shape has 3 sides?`, options: ["Triangle", "Square", "Pentagon", "Circle"], answer: "Triangle" },
        { question: "A quadrilateral has how many sides?", options: ["4", "3", "5", "6"], answer: "4" },
        { question: "Which shape has no sides or vertices?", options: ["Circle", "Triangle", "Rectangle", "Pentagon"], answer: "Circle" },
        { question: "A polygon is a closed shape made of:", options: ["Straight line segments", "Curved lines only", "Dots only", "Numbers"], answer: "Straight line segments" },
        { question: "A cube has how many faces?", options: ["6", "4", "8", "12"], answer: "6" },
      ];
    }

    if (isMeasurement) {
      if (hasAny(["time", "clock", "calendar", "am", "pm"])) {
        const timeStartHour = rand(1, 10);
        return [
          { question: `For ${skillName}, how many minutes are in 1 hour?`, options: ["60", "30", "90", "120"], answer: "60" },
          { question: skillLower.includes("am") || skillLower.includes("pm") ? "What does AM usually describe?" : "How many hours are in half a day?", options: skillLower.includes("am") || skillLower.includes("pm") ? ["Time before noon", "Time after noon", "Only weekends", "A unit of length"] : ["12", "24", "6", "30"], answer: skillLower.includes("am") || skillLower.includes("pm") ? "Time before noon" : "12" },
          { question: skillLower.includes("elapsed") ? `If an activity starts at ${timeStartHour}:00 and lasts 1 hour, it ends at:` : "Which tool is used to tell time?", options: skillLower.includes("elapsed") ? [`${timeStartHour + 1}:00`, `${timeStartHour}:30`, `${Math.max(1, timeStartHour - 1)}:00`, `${timeStartHour + 2}:00`] : ["Clock", "Ruler", "Scale", "Thermometer"], answer: skillLower.includes("elapsed") ? `${timeStartHour + 1}:00` : "Clock" },
          { question: skillLower.includes("schedule") ? "A schedule helps you know:" : "Which hand on a clock usually points to the hour?", options: skillLower.includes("schedule") ? ["When events happen", "How tall something is", "How much something weighs", "How many sides a square has"] : ["The short hand", "The longest bar", "The triangle hand", "The graph hand"], answer: skillLower.includes("schedule") ? "When events happen" : "The short hand" },
          { question: `For ${skillName}, which idea matters most?`, options: ["Reading and understanding time", "Naming polygons", "Comparing fractions", "Sorting by colour"], answer: "Reading and understanding time" },
        ];
      }

      if (hasAny(["money", "coin", "coins", "penny", "nickel", "dime", "quarter", "dollars", "cents"])) {
        return [
          { question: skillLower.includes("penn") ? `For ${skillName}, which coin is worth 1 cent?` : `For ${skillName}, which coin is worth 25 cents?`, options: skillLower.includes("penn") ? ["Penny", "Dime", "Nickel", "Quarter"] : ["Quarter", "Dime", "Nickel", "Penny"], answer: skillLower.includes("penn") ? "Penny" : "Quarter" },
          { question: skillLower.includes("nickel") ? "Which coin is worth 5 cents?" : "Which coin is worth 10 cents?", options: skillLower.includes("nickel") ? ["Nickel", "Dime", "Quarter", "Penny"] : ["Dime", "Nickel", "Quarter", "Penny"], answer: skillLower.includes("nickel") ? "Nickel" : "Dime" },
          { question: skillLower.includes("counting") ? "How many nickels make 10 cents?" : "One dollar equals how many cents?", options: skillLower.includes("counting") ? ["2", "5", "10", "1"] : ["100", "10", "25", "50"], answer: skillLower.includes("counting") ? "2" : "100" },
          { question: skillLower.includes("change") ? "If something costs 75 cents and you pay $1.00, what is the change?" : "Which is more money?", options: skillLower.includes("change") ? ["25 cents", "10 cents", "50 cents", "75 cents"] : ["3 quarters", "2 dimes", "1 nickel", "4 pennies"], answer: skillLower.includes("change") ? "25 cents" : "3 quarters" },
          { question: `For ${skillName}, what skill are you using?`, options: ["Recognizing and comparing money amounts", "Measuring time on a clock", "Finding area of shapes", "Reading a map"], answer: "Recognizing and comparing money amounts" },
        ];
      }

      if (hasAny(["mass", "weight", "scales", "grams", "kilograms"])) {
        return [
          { question: `For ${skillName}, which is heavier?`, options: ["1 kilogram", "1 gram", "1 milligram", "1 centimeter"], answer: "1 kilogram" },
          { question: "Which tool measures mass?", options: ["Scale", "Clock", "Ruler", "Thermometer"], answer: "Scale" },
          { question: "A paper clip is usually measured in:", options: ["Grams", "Kilometers", "Liters", "Hours"], answer: "Grams" },
          { question: "A watermelon is more likely measured in:", options: ["Kilograms", "Milligrams", "Seconds", "Centimeters"], answer: "Kilograms" },
          { question: "Mass tells how much:", options: ["Matter is in an object", "Time has passed", "Space is inside a rectangle", "Money is in a wallet"], answer: "Matter is in an object" },
        ];
      }

      if (hasAny(["capacity", "liters", "litres", "milliliters", "millilitres", "full", "empty"])) {
        return [
          { question: `For ${skillName}, which unit is best for juice in a bottle?`, options: ["Liters", "Meters", "Grams", "Minutes"], answer: "Liters" },
          { question: "Capacity measures how much a container can:", options: ["Hold", "Weigh", "Stretch", "Cost"], answer: "Hold" },
          { question: "A medicine spoon is often measured in:", options: ["Milliliters", "Kilograms", "Hours", "Centimeters"], answer: "Milliliters" },
          { question: "Which container has the greatest capacity?", options: ["A bathtub", "A cup", "A teaspoon", "A pencil case"], answer: "A bathtub" },
          { question: "Half full means the container is:", options: ["Filled to the middle", "Completely empty", "Overflowing", "Made of metal"], answer: "Filled to the middle" },
        ];
      }

      return [
        { question: `For ${skillName}, which unit is best for a person's height?`, options: ["Centimeters", "Liters", "Grams", "Seconds"], answer: "Centimeters" },
        { question: "How many centimeters are in 1 meter?", options: ["100", "10", "1000", "1"], answer: "100" },
        { question: "Which tool is best for measuring length?", options: ["Ruler", "Scale", "Clock", "Thermometer"], answer: "Ruler" },
        { question: "Which is longer?", options: ["1 meter", "1 centimeter", "1 millimeter", "1 gram"], answer: "1 meter" },
        { question: "Measurement helps us describe:", options: ["Size, amount, or time", "Only colours", "Only names", "Only feelings"], answer: "Size, amount, or time" },
      ];
    }

    if (isPattern) {
      const start = rand(1, 10);
      const step = rand(2, 6);
      return [
        { question: `What comes next in ${skillName}: ${start}, ${start + step}, ${start + 2 * step}, ?`, options: [String(start + 3 * step), String(start + 2 * step + 1), String(start + 4 * step), String(start + step)], answer: String(start + 3 * step) },
        { question: skillLower.includes("growing") ? `Which number pattern is growing?` : skillLower.includes("shrinking") ? `Which number pattern is shrinking?` : `What comes next: 2, 4, 8, 16, ?`, options: skillLower.includes("growing") ? ["2, 4, 6, 8", "8, 6, 4, 2", "5, 5, 5, 5", "9, 7, 5, 3"] : skillLower.includes("shrinking") ? ["20, 15, 10, 5", "1, 2, 3, 4", "3, 6, 9, 12", "7, 7, 7, 7"] : ["32", "24", "18", "30"], answer: skillLower.includes("growing") ? "2, 4, 6, 8" : skillLower.includes("shrinking") ? "20, 15, 10, 5" : "32" },
        { question: skillLower.includes("abc") ? "What comes next in an ABC pattern: red, blue, green, red, blue, ?" : `What is the missing number: 5, 10, ?, 20`, options: skillLower.includes("abc") ? ["green", "red", "yellow", "blue"] : ["15", "12", "18", "25"], answer: skillLower.includes("abc") ? "green" : "15" },
        { question: skillLower.includes("creating") ? "When creating a pattern, what should you decide first?" : `Which rule matches 3, 6, 9, 12?`, options: skillLower.includes("creating") ? ["A repeating or growing rule", "A random colour", "A coin value", "A calendar date"] : ["Add 3", "Add 2", "Multiply by 2", "Subtract 1"], answer: skillLower.includes("creating") ? "A repeating or growing rule" : "Add 3" },
        { question: skillLower.includes("repeating") ? `Complete the repeating pattern: 1, 3, 1, 3, ?` : `For ${skillName}, what should stay true?`, options: skillLower.includes("repeating") ? ["1", "3", "4", "2"] : ["The pattern rule", "The paper colour", "The desk height", "The room temperature"], answer: skillLower.includes("repeating") ? "1" : "The pattern rule" },
      ];
    }

    return [
      { question: `Which task best demonstrates ${skillName} at the Grade ${level} level?`, options: [`Applying the rules and representations of ${skillName} to solve a problem`, "Doing unrelated arithmetic", "Ignoring the given information", "Choosing an answer without reasoning"], answer: `Applying the rules and representations of ${skillName} to solve a problem` },
      { question: `When solving a ${skillName} problem, which step helps make the solution reliable?`, options: ["Show the mathematical reasoning and check the result", "Use a random operation", "Skip the conditions in the question", "Change the topic"], answer: "Show the mathematical reasoning and check the result" },
      { question: `Which representation is most useful when studying ${skillName}?`, options: ["The equation, graph, table, or diagram that fits the problem", "An unrelated word list", "A random measurement", "A blank answer"], answer: "The equation, graph, table, or diagram that fits the problem" },
      { question: `A complete Grade ${level} ${skillName} answer should include:`, options: ["A result interpreted using the skill's rules", "Only an unlabelled number", "No mathematical work", "An answer from a different topic"], answer: "A result interpreted using the skill's rules" },
      { question: `What should you verify after completing a ${skillName} question?`, options: ["That the method and answer match the skill and the given conditions", "Only that an operation was used", "That the largest number was selected", "Nothing"], answer: "That the method and answer match the skill and the given conditions" },
    ];
  }

  if (subject === "english") {
    if (
      skillLower.includes("main idea") ||
      skillLower.includes("supporting details") ||
      skillLower.includes("summarizing") ||
      skillLower.includes("making inferences") ||
      skillLower.includes("evidence from the text")
    ) {
      if (skillLower.includes("main idea")) {
        return [
          { question: "The main idea of a paragraph tells:", options: ["What the paragraph is mostly about", "Only the first word", "Only one tiny detail", "What the reader had for lunch"], answer: "What the paragraph is mostly about" },
          { question: "Which sentence is most likely the main idea?", options: ["Dogs can help people in many ways.", "One dog wore a red vest.", "The leash was on a chair.", "A park has grass."], answer: "Dogs can help people in many ways." },
          { question: "Details in a paragraph should:", options: ["Support the main idea", "Change the topic completely", "Repeat one word only", "Ignore the subject"], answer: "Support the main idea" },
          { question: `For ${skillName}, what should you ask yourself first?`, options: ["What is this mostly about?", "What is the longest word?", "What colour is the page?", "How many commas are there?"], answer: "What is this mostly about?" },
          { question: "A strong title often helps readers predict the:", options: ["Main idea", "Only punctuation", "Page number", "Font size"], answer: "Main idea" },
        ];
      }

      if (skillLower.includes("supporting details")) {
        return [
          { question: "Supporting details help a reader:", options: ["Understand and prove the main idea", "Forget the topic", "Skip the paragraph", "Change the author's purpose"], answer: "Understand and prove the main idea" },
          { question: "Which is a supporting detail for 'Bees help plants grow'?", options: ["Bees carry pollen from flower to flower.", "Many people like sports.", "Some books are long.", "Winter can be cold."], answer: "Bees carry pollen from flower to flower." },
          { question: "A detail that does not match the topic is called:", options: ["Irrelevant", "Supportive", "Main", "Helpful"], answer: "Irrelevant" },
          { question: `For ${skillName}, which kind of detail is best?`, options: ["A fact connected to the topic", "A random sentence", "A repeated heading", "An unrelated opinion"], answer: "A fact connected to the topic" },
          { question: "Readers can find supporting details by looking for:", options: ["Facts, examples, and explanations", "Only names", "Only title words", "Only the last sentence"], answer: "Facts, examples, and explanations" },
        ];
      }

      if (skillLower.includes("summarizing")) {
        return [
          { question: "A summary should include:", options: ["The most important ideas in a short form", "Every sentence from the text", "Only your opinion", "One random detail"], answer: "The most important ideas in a short form" },
          { question: "Which is best to leave out of a summary?", options: ["Tiny unimportant details", "The central idea", "Important events", "Key supporting points"], answer: "Tiny unimportant details" },
          { question: "A good summary is usually:", options: ["Shorter than the original text", "Longer than the original text", "Exactly the same as the text", "Only one unrelated sentence"], answer: "Shorter than the original text" },
          { question: `For ${skillName}, what should stay the same?`, options: ["The main meaning of the text", "Every exact word", "Only the title", "The reader's mood"], answer: "The main meaning of the text" },
          { question: "When summarizing fiction, readers often include:", options: ["Important events and characters", "Every line of dialogue", "The page numbers", "All punctuation marks"], answer: "Important events and characters" },
        ];
      }

      if (skillLower.includes("inference")) {
        return [
          { question: "To make an inference, a reader should use:", options: ["Text clues and background knowledge", "Only one random guess", "Just the title", "No evidence"], answer: "Text clues and background knowledge" },
          { question: "If a character is shivering and wearing mittens, you can infer it is:", options: ["Cold", "Hot", "Lunchtime", "Nighttime"], answer: "Cold" },
          { question: "An inference is strongest when it is:", options: ["Supported by evidence", "Based on luck", "Unrelated to the text", "Copied from a dictionary"], answer: "Supported by evidence" },
          { question: `For ${skillName}, what should you look for?`, options: ["Clues the author gives", "Only difficult words", "Only punctuation", "Only chapter numbers"], answer: "Clues the author gives" },
          { question: "Readers make inferences to understand:", options: ["Ideas the author does not say directly", "Only the font style", "Only the cover", "Only the page count"], answer: "Ideas the author does not say directly" },
        ];
      }

      if (skillLower.includes("evidence from the text")) {
        return [
          { question: "Text evidence means:", options: ["Proof from the passage", "A personal guess", "A sentence from another book", "Only the title"], answer: "Proof from the passage" },
          { question: "Why do readers use text evidence?", options: ["To support their answers", "To avoid reading carefully", "To make the story longer", "To replace the main idea"], answer: "To support their answers" },
          { question: "A quotation or paraphrase should come from:", options: ["The text you read", "Any website", "A different story", "Your imagination"], answer: "The text you read" },
          { question: `For ${skillName}, what makes evidence strong?`, options: ["It clearly matches the question", "It sounds fancy", "It is the longest sentence", "It uses many commas"], answer: "It clearly matches the question" },
          { question: "After giving evidence, a strong reader should:", options: ["Explain how it supports the answer", "Stop writing right away", "Change topics", "Add unrelated details"], answer: "Explain how it supports the answer" },
        ];
      }

      return [
        { question: "Which detail best supports the main idea of a paragraph?", options: ["A fact that directly explains the topic", "A random sentence from another topic", "A title with no details", "A reader's unrelated opinion"], answer: "A fact that directly explains the topic" },
        { question: "What does it mean to make an inference?", options: ["Use clues from the text and what you know", "Copy a sentence word for word", "Skip details and guess", "Only read the title"], answer: "Use clues from the text and what you know" },
        { question: "Which is the best summary?", options: ["A short retelling of the most important ideas", "Every sentence copied from the text", "One interesting detail only", "A personal story not in the text"], answer: "A short retelling of the most important ideas" },
        { question: "Text evidence is used to:", options: ["Support an answer with proof from the reading", "Replace reading the passage", "Add unrelated facts", "Make the story longer"], answer: "Support an answer with proof from the reading" },
        { question: `For ${skillName}, what should a strong answer include?`, options: ["A clear idea plus details from the text", "Only one word", "No evidence", "An unrelated opinion"], answer: "A clear idea plus details from the text" },
      ];
    }

    if (
      skillLower.includes("point of view") ||
      skillLower.includes("theme") ||
      skillLower.includes("character") ||
      skillLower.includes("setting") ||
      skillLower.includes("plot") ||
      skillLower.includes("conflict")
    ) {
      return [
        { question: "If a story is told using 'I' and 'my', what point of view is it usually?", options: ["First person", "Third person", "Second person", "No point of view"], answer: "First person" },
        { question: "A theme is:", options: ["The big idea or lesson in a text", "Only the title", "The place where the story happens", "A list of characters"], answer: "The big idea or lesson in a text" },
        { question: "Character traits tell us:", options: ["What a character is like", "Only where a character lives", "Only the story title", "How many pages are in the book"], answer: "What a character is like" },
        { question: "Setting helps the reader understand:", options: ["Where and when the story happens", "Only the ending", "Only one character's name", "The table of contents"], answer: "Where and when the story happens" },
        { question: "The conflict in a story is usually:", options: ["The main problem", "The front cover", "The author's signature", "A random detail"], answer: "The main problem" },
      ];
    }

    if (
      skillLower.includes("text features") ||
      skillLower.includes("non-fiction") ||
      skillLower.includes("media text") ||
      skillLower.includes("fact and opinion")
    ) {
      return [
        { question: "Which text feature helps readers find parts of a book quickly?", options: ["Table of contents", "Character dialogue", "Rhyme", "Stage directions"], answer: "Table of contents" },
        { question: "A caption usually:", options: ["Explains a picture or diagram", "Names the main character", "Ends a paragraph", "Shows a verb tense"], answer: "Explains a picture or diagram" },
        { question: "Which statement is a fact?", options: ["Water freezes at 0 degrees Celsius", "Winter is the best season", "Dogs are cuter than cats", "Blue is the nicest colour"], answer: "Water freezes at 0 degrees Celsius" },
        { question: "An opinion is:", options: ["A belief someone thinks or feels", "A fact that can always be proved", "A heading in a textbook", "A diagram label"], answer: "A belief someone thinks or feels" },
        { question: "In a media text, the purpose is often to:", options: ["Inform, persuade, or entertain", "Hide all meaning", "Avoid using visuals", "Remove the audience"], answer: "Inform, persuade, or entertain" },
      ];
    }

    if (
      skillLower.includes("vocabulary in context") ||
      skillLower.includes("prefix") ||
      skillLower.includes("suffix") ||
      skillLower.includes("synonyms") ||
      skillLower.includes("antonyms") ||
      skillLower.includes("figurative language")
    ) {
      return [
        { question: "Context clues help a reader:", options: ["Figure out the meaning of an unfamiliar word", "Skip difficult words", "Ignore the sentence", "Change the topic"], answer: "Figure out the meaning of an unfamiliar word" },
        { question: "A prefix is:", options: ["A word part added to the beginning of a base word", "A punctuation mark", "A story ending", "A kind of paragraph"], answer: "A word part added to the beginning of a base word" },
        { question: "Which pair are antonyms?", options: ["Hot and cold", "Big and large", "Fast and quick", "Happy and glad"], answer: "Hot and cold" },
        { question: "Which pair are synonyms?", options: ["Small and tiny", "Up and down", "Night and day", "Open and close"], answer: "Small and tiny" },
        { question: "Figurative language is used to:", options: ["Create vivid pictures and ideas", "State every idea literally", "List page numbers", "Show only facts"], answer: "Create vivid pictures and ideas" },
      ];
    }

    if (
      skillLower.includes("paragraph structure") ||
      skillLower.includes("topic sentences") ||
      skillLower.includes("opinion writing") ||
      skillLower.includes("informational writing") ||
      skillLower.includes("narrative writing") ||
      skillLower.includes("transition words") ||
      skillLower.includes("revising and editing")
    ) {
      return [
        { question: "A topic sentence usually tells:", options: ["What the paragraph will be about", "Only the last detail", "The page number", "The author's address"], answer: "What the paragraph will be about" },
        { question: "Which transition word shows order?", options: ["Next", "Because", "Blue", "Quietly"], answer: "Next" },
        { question: "Opinion writing should include:", options: ["A clear opinion and reasons", "Only random facts", "No organization", "Just one short fragment"], answer: "A clear opinion and reasons" },
        { question: "Narrative writing often includes:", options: ["Characters, setting, and events", "Only a heading", "A science diagram only", "A list with no story"], answer: "Characters, setting, and events" },
        { question: "Revising means:", options: ["Improving ideas and organization in writing", "Only checking one letter", "Skipping the draft", "Erasing everything"], answer: "Improving ideas and organization in writing" },
      ];
    }

    if (skillLower.includes("noun")) {
      return [
        { question: `In the sentence "The cat sat on the mat," which word is a noun?`, options: ["cat", "sat", "on", "the"], answer: "cat" },
        { question: `Which word is a proper noun?`, options: ["Toronto", "city", "car", "happy"], answer: "Toronto" },
        { question: `Which option is a common noun?`, options: ["teacher", "Monday", "India", "Christmas"], answer: "teacher" },
        { question: `Pick the noun in: "Birds fly high."`, options: ["Birds", "fly", "high", "the"], answer: "Birds" },
        { question: `What does a noun name?`, options: ["A person, place, thing, or idea", "An action only", "A joining word", "A punctuation mark"], answer: "A person, place, thing, or idea" },
      ];
    }

    if (skillLower.includes("verb")) {
      return [
        { question: `Which word is a verb in "The dog runs fast"?`, options: ["runs", "dog", "fast", "the"], answer: "runs" },
        { question: `Choose the action word.`, options: ["jump", "blue", "chair", "quiet"], answer: "jump" },
        { question: `Which sentence has a verb in past tense?`, options: ["She walked home.", "She walk home.", "She walking home.", "She walks home."], answer: "She walked home." },
        { question: `In ${skillName}, what do verbs show?`, options: ["Action or state", "Only color", "Only punctuation", "Only names"], answer: "Action or state" },
        { question: `Choose the helping verb.`, options: ["is", "run", "book", "green"], answer: "is" },
      ];
    }

    if (skillLower.includes("adjective") || skillLower.includes("adverb")) {
      return [
        { question: `Which word is an adjective?`, options: ["bright", "run", "quickly", "and"], answer: "bright" },
        { question: `Which word is an adverb?`, options: ["slowly", "blue", "table", "from"], answer: "slowly" },
        { question: `Choose the sentence with a descriptive word.`, options: ["The red ball bounced.", "Ball bounced.", "The ball.", "Bounced red."], answer: "The red ball bounced." },
        { question: `Adverbs usually describe what?`, options: ["Verbs", "Nouns only", "Punctuation", "Capital letters"], answer: "Verbs" },
        { question: `In ${skillName}, adjectives usually describe what?`, options: ["Nouns", "Periods", "Questions", "Paragraph breaks"], answer: "Nouns" },
      ];
    }

    if (skillLower.includes("punctuation") || skillLower.includes("capital")) {
      return [
        { question: `Which sentence is capitalized correctly?`, options: ["My friend lives in Canada.", "my Friend lives in canada.", "my friend Lives in Canada.", "my friend lives in canada."], answer: "My friend lives in Canada." },
        { question: `Which mark ends a question?`, options: ["?", ".", ",", "!"], answer: "?" },
        { question: `Choose the correct punctuation: "Wow___"`, options: ["!", ".", ",", "?"], answer: "!" },
        { question: `Which sentence uses commas correctly?`, options: ["I bought apples, oranges, and bananas.", "I bought apples oranges and bananas.", "I bought, apples oranges and bananas.", "I bought apples oranges, and bananas and"], answer: "I bought apples, oranges, and bananas." },
        { question: `In ${skillName}, where do sentences begin?`, options: ["With a capital letter", "With a comma", "With lowercase always", "With a number"], answer: "With a capital letter" },
      ];
    }

    if (skillLower.includes("phonics") || skillLower.includes("syllable") || skillLower.includes("sound") || skillLower.includes("vowel")) {
      return [
        { question: `Which word starts with the /b/ sound?`, options: ["ball", "cat", "sun", "kite"], answer: "ball" },
        { question: `How many syllables are in "banana"?`, options: ["3", "2", "1", "4"], answer: "3" },
        { question: `Which word has a long a sound?`, options: ["cake", "cat", "map", "bat"], answer: "cake" },
        { question: `Which letter is a vowel?`, options: ["e", "t", "m", "s"], answer: "e" },
        { question: `In ${skillName}, which words rhyme?`, options: ["cat, hat", "dog, sun", "book, pen", "ship, car"], answer: "cat, hat" },
      ];
    }

    return [
      { question: `Which task best demonstrates ${skillName} at the Grade ${level} level?`, options: [`Applying ${skillName} to understand or communicate meaning`, "Ignoring the text", "Using unrelated math facts", "Choosing an answer without reading"], answer: `Applying ${skillName} to understand or communicate meaning` },
      { question: `What should you use to support an answer about ${skillName}?`, options: ["Relevant words, details, and language patterns", "A random guess", "Information from another subject", "No evidence"], answer: "Relevant words, details, and language patterns" },
      { question: `Which practice helps improve ${skillName}?`, options: [`Read, analyze, and apply the specific conventions of ${skillName}`, "Skip examples", "Memorize unrelated definitions", "Avoid feedback"], answer: `Read, analyze, and apply the specific conventions of ${skillName}` },
      { question: `A complete response for ${skillName} should:`, options: ["Explain the language choice or meaning using evidence", "Use only a number", "Ignore the passage or prompt", "Change the subject"], answer: "Explain the language choice or meaning using evidence" },
      { question: `After completing a ${skillName} question, what should you verify?`, options: ["That the response addresses the selected language skill", "Only that an answer was selected", "That it uses the most words", "Nothing"], answer: "That the response addresses the selected language skill" },
    ];
  }

  if (subject === "science") {
    if (
      skillLower.includes("habitat") ||
      skillLower.includes("community") ||
      skillLower.includes("food chain") ||
      skillLower.includes("adaptation") ||
      skillLower.includes("biodiversity") ||
      skillLower.includes("producer") ||
      skillLower.includes("consumer") ||
      skillLower.includes("decomposer") ||
      skillLower.includes("ecosystem")
    ) {
      if (skillLower.includes("habitat")) {
        return [
          { question: "A habitat gives living things what they need for:", options: ["Survival", "Television", "Homework only", "Machine repair"], answer: "Survival" },
          { question: "Which place is a polar bear's habitat?", options: ["Arctic sea ice", "Desert sand dune", "Tropical rainforest canopy", "School library"], answer: "Arctic sea ice" },
          { question: "An animal loses habitat when:", options: ["Its home area is damaged or removed", "It takes a nap", "It drinks water", "It grows bigger"], answer: "Its home area is damaged or removed" },
          { question: `For ${skillName}, what must a habitat provide?`, options: ["Food, water, shelter, and space", "Only sunlight", "Only rocks", "Only noise"], answer: "Food, water, shelter, and space" },
          { question: "Protecting wetlands helps many species because wetlands are:", options: ["Habitats", "Musical instruments", "Simple machines", "Weather tools"], answer: "Habitats" },
        ];
      }

      if (skillLower.includes("food chain")) {
        return [
          { question: "A food chain shows:", options: ["How energy moves between living things", "How rocks are formed", "How light reflects", "How magnets attract"], answer: "How energy moves between living things" },
          { question: "Which organism usually starts a food chain?", options: ["Producer", "Top predator", "Decomposer", "Consumer"], answer: "Producer" },
          { question: "In the chain grass -> rabbit -> fox, the rabbit is a:", options: ["Consumer", "Producer", "Decomposer", "Mineral"], answer: "Consumer" },
          { question: "Arrows in a food chain show:", options: ["The direction energy moves", "Where animals sleep", "The weather forecast", "The age of the organism"], answer: "The direction energy moves" },
          { question: `For ${skillName}, which organism makes its own food?`, options: ["Plant", "Hawk", "Snake", "Mushroom"], answer: "Plant" },
        ];
      }

      if (skillLower.includes("adaptation")) {
        return [
          { question: "An adaptation is a feature that helps an organism:", options: ["Survive", "Write stories", "Measure time", "Build engines"], answer: "Survive" },
          { question: "Thick fur is an adaptation for animals living in:", options: ["Cold places", "Oceans only", "Classrooms", "Caves with heaters"], answer: "Cold places" },
          { question: "Camouflage helps an animal by making it:", options: ["Harder to see", "Louder", "Heavier", "Faster at reading"], answer: "Harder to see" },
          { question: `For ${skillName}, why might a cactus have thick stems?`, options: ["To store water", "To make sound", "To catch snow", "To reflect mirrors"], answer: "To store water" },
          { question: "A behavioural adaptation is something an organism:", options: ["Does", "Builds", "Measures", "Names"], answer: "Does" },
        ];
      }

      if (skillLower.includes("producer")) {
        return [
          { question: "A producer is an organism that:", options: ["Makes its own food", "Eats other animals", "Breaks down dead matter", "Needs no energy"], answer: "Makes its own food" },
          { question: "Which is a producer?", options: ["Grass", "Fox", "Frog", "Mushroom"], answer: "Grass" },
          { question: "Producers usually get energy from:", options: ["The Sun", "Television", "Soil only", "Predators"], answer: "The Sun" },
          { question: `For ${skillName}, where are producers found in a food chain?`, options: ["At the beginning", "Only at the end", "In the middle only", "Outside the chain"], answer: "At the beginning" },
          { question: "Plants are important in ecosystems because they:", options: ["Provide energy for other living things", "Remove all water", "Stop decomposition", "Make weather disappear"], answer: "Provide energy for other living things" },
        ];
      }

      if (skillLower.includes("consumer")) {
        return [
          { question: "A consumer is an organism that:", options: ["Gets energy by eating other organisms", "Makes its own food", "Turns into soil", "Needs no habitat"], answer: "Gets energy by eating other organisms" },
          { question: "Which is a consumer?", options: ["Rabbit", "Grass", "Sunflower", "Algae"], answer: "Rabbit" },
          { question: "Consumers depend on producers because producers:", options: ["Bring energy into the food chain", "Remove oxygen", "Create rocks", "Measure rainfall"], answer: "Bring energy into the food chain" },
          { question: `For ${skillName}, an herbivore is a consumer that eats:`, options: ["Plants", "Only insects", "Only rocks", "Sunlight"], answer: "Plants" },
          { question: "A fox in a meadow ecosystem is most likely a:", options: ["Consumer", "Producer", "Mineral", "Seed"], answer: "Consumer" },
        ];
      }

      if (skillLower.includes("decomposer")) {
        return [
          { question: "Decomposers break down:", options: ["Dead plants and animals", "Sunlight", "Wind", "Sound waves"], answer: "Dead plants and animals" },
          { question: "Which is a decomposer?", options: ["Mushroom", "Grass", "Hawk", "Rabbit"], answer: "Mushroom" },
          { question: "Decomposition returns nutrients to the:", options: ["Soil", "Moon", "Television", "Compass"], answer: "Soil" },
          { question: `For ${skillName}, why are decomposers important?`, options: ["They recycle matter in ecosystems", "They stop all growth", "They create electricity", "They remove oxygen from water"], answer: "They recycle matter in ecosystems" },
          { question: "Without decomposers, dead matter would:", options: ["Build up in the environment", "Turn into stars", "Disappear instantly", "Become producers"], answer: "Build up in the environment" },
        ];
      }

      return [
        { question: "A habitat is:", options: ["The place where a living thing gets what it needs", "A type of simple machine", "A solid rock layer", "A kind of light source"], answer: "The place where a living thing gets what it needs" },
        { question: "Which organism is a producer in a food chain?", options: ["Grass", "Fox", "Frog", "Hawk"], answer: "Grass" },
        { question: "Decomposers help an ecosystem by:", options: ["Breaking down dead matter", "Blocking sunlight", "Making all animals leave", "Stopping plant growth"], answer: "Breaking down dead matter" },
        { question: "An adaptation helps a living thing:", options: ["Survive in its environment", "Change into a machine", "Live without food or water", "Avoid all movement"], answer: "Survive in its environment" },
        { question: "One way humans can protect habitats is to:", options: ["Reduce pollution and protect natural spaces", "Destroy wetlands", "Leave garbage in forests", "Remove all plants"], answer: "Reduce pollution and protect natural spaces" },
      ];
    }

    if (
      skillLower.includes("rocks and minerals") ||
      skillLower.includes("properties of rocks") ||
      skillLower.includes("properties of minerals") ||
      skillLower.includes("weathering") ||
      skillLower.includes("erosion") ||
      skillLower.includes("soil") ||
      skillLower.includes("mining") ||
      skillLower.includes("earth materials")
    ) {
      return [
        { question: "A mineral is usually:", options: ["A naturally occurring material with specific properties", "Any living thing", "A kind of sound wave", "Only man-made plastic"], answer: "A naturally occurring material with specific properties" },
        { question: "Which property can help identify a mineral?", options: ["Hardness", "Favourite colour", "Story setting", "Volume of music"], answer: "Hardness" },
        { question: "Weathering is the process of:", options: ["Breaking rocks into smaller pieces", "Building new planets", "Making sound louder", "Turning a pulley"], answer: "Breaking rocks into smaller pieces" },
        { question: "Erosion happens when rock or soil is moved by:", options: ["Water, wind, or ice", "Only pencils", "Books and desks", "Light bulbs"], answer: "Water, wind, or ice" },
        { question: "A responsible way to use rocks and minerals is to:", options: ["Conserve materials and reduce waste", "Throw usable materials away", "Mine without limits", "Ignore environmental effects"], answer: "Conserve materials and reduce waste" },
      ];
    }

    if (
      skillLower.includes("pulley") ||
      skillLower.includes("gear") ||
      skillLower.includes("mechanical advantage") ||
      skillLower.includes("mechanism") ||
      skillLower.includes("simple machine")
    ) {
      return [
        { question: "A pulley helps people:", options: ["Lift or move loads more easily", "Measure temperature", "Grow plants", "Make rocks softer"], answer: "Lift or move loads more easily" },
        { question: "When two gears touch, they usually:", options: ["Turn in opposite directions", "Stop working forever", "Melt", "Become magnets"], answer: "Turn in opposite directions" },
        { question: "A fixed pulley mainly changes:", options: ["The direction of the force", "The colour of the load", "The mass of the object", "The material of the rope"], answer: "The direction of the force" },
        { question: "Mechanical advantage means:", options: ["A machine makes work easier by changing force or motion", "A machine creates energy from nothing", "A machine never needs input", "A machine removes all friction"], answer: "A machine makes work easier by changing force or motion" },
        { question: "Which everyday object uses gears?", options: ["Bicycle", "Notebook", "Pillow", "Spoon"], answer: "Bicycle" },
      ];
    }

    if (
      skillLower.includes("light and sound") ||
      skillLower.includes("transparent") ||
      skillLower.includes("translucent") ||
      skillLower.includes("opaque") ||
      skillLower.includes("reflection") ||
      skillLower.includes("sources of light") ||
      skillLower.includes("vibration") ||
      skillLower.includes("pitch") ||
      skillLower.includes("volume") ||
      skillLower.includes("hearing safety")
    ) {
      return [
        { question: "Transparent materials let:", options: ["Most light pass through clearly", "No light pass through", "Only sound pass through", "Rocks grow"], answer: "Most light pass through clearly" },
        { question: "An opaque object:", options: ["Blocks light", "Lets all light through", "Makes its own sound", "Always reflects all sound"], answer: "Blocks light" },
        { question: "Reflection happens when light:", options: ["Bounces off a surface", "Disappears forever", "Turns into soil", "Stops moving"], answer: "Bounces off a surface" },
        { question: "Sound is made by:", options: ["Vibrations", "Shadows", "Magnets only", "Plant roots"], answer: "Vibrations" },
        { question: "A safe hearing habit is to:", options: ["Keep headphone volume at a reasonable level", "Stand beside loud speakers for hours", "Shout into your ear", "Ignore warning signs"], answer: "Keep headphone volume at a reasonable level" },
      ];
    }

    if (skillLower.includes("plant") || skillLower.includes("animal") || skillLower.includes("ecosystem") || skillLower.includes("cell") || skillLower.includes("body")) {
      return [
        { question: `What do plants need to make food?`, options: ["Sunlight, water, and air", "Rocks and sand only", "Only darkness", "Only soil"], answer: "Sunlight, water, and air" },
        { question: `Which is a producer in an ecosystem?`, options: ["Grass", "Hawk", "Frog", "Snake"], answer: "Grass" },
        { question: `Which organ pumps blood through the body?`, options: ["Heart", "Lungs", "Stomach", "Liver"], answer: "Heart" },
        { question: `What is the basic unit of life?`, options: ["Cell", "Atom", "Tissue", "Organ"], answer: "Cell" },
        { question: `In ${skillName}, organisms depend on what?`, options: ["Their environment and each other", "Only themselves", "No resources", "Only machines"], answer: "Their environment and each other" },
      ];
    }

    if (skillLower.includes("weather") || skillLower.includes("earth") || skillLower.includes("rock") || skillLower.includes("space") || skillLower.includes("solar")) {
      return [
        { question: `What causes day and night on Earth?`, options: ["Earth's rotation", "Moon's rotation", "Cloud movement", "Ocean tides"], answer: "Earth's rotation" },
        { question: `Which layer of Earth do we live on?`, options: ["Crust", "Mantle", "Outer core", "Inner core"], answer: "Crust" },
        { question: `Which planet is known as the Red Planet?`, options: ["Mars", "Venus", "Jupiter", "Mercury"], answer: "Mars" },
        { question: `What instrument measures temperature?`, options: ["Thermometer", "Barometer", "Scale", "Compass"], answer: "Thermometer" },
        { question: `In ${skillName}, what helps predict weather?`, options: ["Data from observations", "Random guessing", "Ignoring clouds", "Only one temperature"], answer: "Data from observations" },
      ];
    }

    if (skillLower.includes("force") || skillLower.includes("motion") || skillLower.includes("energy") || skillLower.includes("matter") || skillLower.includes("electric")) {
      return [
        { question: `What is needed to change an object's motion?`, options: ["A force", "A color", "A shape", "A name"], answer: "A force" },
        { question: `Which is a form of energy?`, options: ["Heat", "Rock", "Table", "Leaf"], answer: "Heat" },
        { question: `Matter is anything that has:`, options: ["Mass and volume", "Only color", "Only speed", "Only temperature"], answer: "Mass and volume" },
        { question: `Which material is a good electrical conductor?`, options: ["Copper", "Rubber", "Plastic", "Wood"], answer: "Copper" },
        { question: `In ${skillName}, energy can be:`, options: ["Transferred and transformed", "Destroyed instantly", "Ignored", "Stored without limits"], answer: "Transferred and transformed" },
      ];
    }

    return [
      { question: `Which investigation best demonstrates ${skillName} at the Grade ${level} level?`, options: [`Using observations, evidence, and scientific ideas connected to ${skillName}`, "Doing unrelated arithmetic", "Choosing an answer without evidence", "Ignoring the selected topic"], answer: `Using observations, evidence, and scientific ideas connected to ${skillName}` },
      { question: `What should a scientific explanation of ${skillName} include?`, options: ["Evidence that supports the explanation", "Only an opinion", "A fact from a different topic", "No observations"], answer: "Evidence that supports the explanation" },
      { question: `Which approach helps you learn ${skillName}?`, options: [`Observe, model, and explain the processes involved in ${skillName}`, "Memorize unrelated answers", "Skip all evidence", "Avoid asking questions"], answer: `Observe, model, and explain the processes involved in ${skillName}` },
      { question: `When checking an answer about ${skillName}, what matters most?`, options: ["That the claim matches the scientific evidence", "That it is the longest option", "That it contains a number", "That it changes the topic"], answer: "That the claim matches the scientific evidence" },
      { question: `A Grade ${level} ${skillName} conclusion should:`, options: ["Use observations to explain the selected scientific concept", "Be a random guess", "Ignore the investigation", "Describe an unrelated subject"], answer: "Use observations to explain the selected scientific concept" },
    ];
  }

  return [
    {
      question: `What is the main concept of ${skillName}?`,
      options: [
        `Understanding the core idea behind ${skillName}`,
        "Memorizing random facts only",
        "Skipping all practice and examples",
        "Using guesses instead of reasoning",
      ],
      answer: `Understanding the core idea behind ${skillName}`,
    },
    {
      question: `Which best describes ${skillName}?`,
      options: [
        "A skill that improves with guided practice",
        "A topic that has no useful purpose",
        "Something learned once and never reviewed",
        "A trick with no real-world application",
      ],
      answer: "A skill that improves with guided practice",
    },
    { question: `When studying ${skillName}, what is most important?`, options: ["Understanding", "Memorizing", "Skipping", "Guessing"], answer: "Understanding" },
    { question: `How do you apply ${skillName}?`, options: ["Practice regularly", "Never practice", "Ignore it", "Forget it"], answer: "Practice regularly" },
    { question: `What comes after learning ${skillName}?`, options: ["More practice", "Give up", "Stop learning", "Nothing"], answer: "More practice" },
  ];
}

function shuffleQuestionOptions(question: Question, questionIndex: number, quizId: string): Question {
  const options = [...question.options];
  let state = `${quizId}-${question.question}`
    .split("")
    .reduce((sum, character) => (sum * 31 + character.charCodeAt(0)) >>> 0, 0) || 1;

  for (let currentIndex = options.length - 1; currentIndex > 0; currentIndex -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const nextIndex = state % (currentIndex + 1);
    [options[currentIndex], options[nextIndex]] = [options[nextIndex], options[currentIndex]];
  }

  // Spread correct answers across A–D rather than leaving every generated answer in A.
  const correctIndex = options.indexOf(question.answer);
  const targetIndex = questionIndex % options.length;
  if (correctIndex >= 0 && correctIndex !== targetIndex) {
    [options[correctIndex], options[targetIndex]] = [options[targetIndex], options[correctIndex]];
  }

  return { ...question, options };
}

// Quiz templates are intentionally reused as teaching patterns, but a student
// should never see an identical prompt in two different skills. Keep one
// registry while the complete quiz catalogue is built and rewrite only a
// repeated prompt in the language of its new subject and skill.
const generatedQuestionPrompts = new Set<string>();
let repeatedPromptNumber = 0;

function makeRepeatedPromptSpecific(
  question: string
): string {
  repeatedPromptNumber += 1;
  return `${question} (practice example ${repeatedPromptNumber})`;
}

function makeQuizSkillSpecific(
  quizId: string,
  questions: Question[],
  context?: { subject: string }
): Question[] {
  const seenQuestions = new Map<string, number>();

  return questions.map((question, index) => {
    let prompt = question.question.trim();
    if (context) {
      const promptKey = prompt.toLocaleLowerCase();
      if (generatedQuestionPrompts.has(promptKey)) {
        prompt = makeRepeatedPromptSpecific(prompt);
      }
      generatedQuestionPrompts.add(prompt.toLocaleLowerCase());
    }
    const normalizedQuestion = shuffleQuestionOptions(
      { ...question, question: prompt },
      index,
      quizId
    );
    const seenCount = seenQuestions.get(normalizedQuestion.question) ?? 0;
    seenQuestions.set(normalizedQuestion.question, seenCount + 1);

    if (seenCount === 0) {
      return normalizedQuestion;
    }

    return {
      ...normalizedQuestion,
      question: `${normalizedQuestion.question} (item ${index + 1})`,
    };
  });
}

// Generate all quizzes dynamically
export const quizzes: Quiz[] = Object.entries(skills).flatMap(([subject, grades]) =>
  Object.entries(grades).flatMap(([grade, skillList]) =>
    skillList.map((skill) => ({
      id: skill.quizId,
      subject,
      grade,
      skill: skill.name,
      questions: makeQuizSkillSpecific(
        skill.quizId,
        generateQuizQuestions(subject, grade, skill.name, skill.quizId),
        { subject }
      ),
    }))
  )
);

// Helper to get skills for a specific subject and grade
export function getSkillsForGrade(subject: string, grade: string): Skill[] {
  return skills[subject]?.[grade] || [];
}

// Helper to get a specific quiz
export function getQuizById(id: string) {
  return quizzes.find((q) => q.id === id);
}
