export type Level = {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  access: "Free" | "Paid";
  duration: string;
  topics: string[];
  modules: {
    title: string;
    format: string;
    duration: string;
    locked: boolean;
  }[];
};

export const levels: Level[] = [
  {
    id: "foundations",
    number: "Level 1",
    title: "Foundations",
    description: "Build the mental operating system behind logic, bias detection, and clean assumptions.",
    outcome: "You stop reacting to questions and start structuring them.",
    access: "Free",
    duration: "2 weeks",
    topics: ["Logic families", "Bias recognition", "Assumption testing", "Mental models for clarity"],
    modules: [
      { title: "How arguments fail", format: "Interactive lesson", duration: "18 min", locked: false },
      { title: "Bias map drill", format: "Timer challenge", duration: "12 min", locked: false },
      { title: "Assumption ladder", format: "Pause & Think", duration: "14 min", locked: false }
    ]
  },
  {
    id: "problem-solving",
    number: "Level 2",
    title: "Problem Solving",
    description: "Move from abstract logic into structured breakdowns, interpretation, and prioritization.",
    outcome: "You learn to separate noise, evidence, and decision-relevant variables.",
    access: "Paid",
    duration: "3 weeks",
    topics: ["GAI framework", "Data interpretation", "Constraint logic", "Hypothesis decomposition"],
    modules: [
      { title: "GAI in business questions", format: "Framework studio", duration: "22 min", locked: false },
      { title: "Data signal extraction", format: "MCQ + TITA", duration: "16 min", locked: true },
      { title: "Structured drill set", format: "Timed set", duration: "25 min", locked: true }
    ]
  },
  {
    id: "decision-frameworks",
    number: "Level 3",
    title: "Decision Frameworks",
    description: "Learn how high-stakes choices are framed using risk, incentives, economics, and trees.",
    outcome: "You become faster at evaluating trade-offs under uncertainty.",
    access: "Paid",
    duration: "3 weeks",
    topics: ["Decision trees", "Expected value", "Risk framing", "Microeconomic thinking"],
    modules: [
      { title: "Decision tree lab", format: "Simulator", duration: "20 min", locked: false },
      { title: "Risk and upside", format: "Case walkthrough", duration: "18 min", locked: true },
      { title: "Economic lens sprint", format: "Timer challenge", duration: "15 min", locked: true }
    ]
  },
  {
    id: "case-studies",
    number: "Level 4",
    title: "Case Studies",
    description: "Apply structured thinking to consulting-style, founder-style, and operator-style decisions.",
    outcome: "You practice making calls when the answer is not obvious.",
    access: "Paid",
    duration: "4 weeks",
    topics: ["Market entry", "Pricing", "Operations", "Strategic prioritization"],
    modules: [
      { title: "Growth slowdown case", format: "Boardroom case", duration: "24 min", locked: false },
      { title: "Pricing redesign case", format: "Pause & Think", duration: "20 min", locked: true },
      { title: "Operations recovery case", format: "Final challenge", duration: "28 min", locked: true }
    ]
  }
];

export const dashboardStats = [
  { label: "Levels started", value: "3/4" },
  { label: "Modules completed", value: "18" },
  { label: "Current streak", value: "11 days" },
  { label: "Certificates", value: "1 earned" }
];

export const caseStudy = {
  title: "Should a premium D2C brand cut prices to restore growth?",
  problem:
    "A direct-to-consumer personal care brand saw growth slow from 42% to 11% in two quarters. Leadership wants to reduce prices by 15% to drive conversions, but margins are already under pressure.",
  pausePrompt:
    "Before looking at the analysis, decide which variable matters most: price elasticity, retention quality, acquisition economics, or product-market fit drift.",
  options: [
    "A. Cut prices immediately to improve funnel conversion",
    "B. Diagnose whether acquisition or repeat behavior is the true bottleneck",
    "C. Launch new SKUs to expand the total addressable market"
  ],
  analysis: [
    "Traffic quality declined after the team broadened paid targeting, which raised top-funnel volume but lowered conversion intent.",
    "Repeat purchase rates remain strong, suggesting product-market fit is intact.",
    "A blanket price cut would improve short-term conversion while damaging contribution margin and premium brand signaling."
  ],
  solution:
    "Option B is strongest. The real issue is acquisition efficiency, not pricing power. Tightening channel targeting and improving landing-page qualification protects margins while restoring higher-intent conversions.",
  takeaways: [
    "Separate symptoms from causes before choosing an intervention.",
    "Price is a blunt lever when the root problem is traffic quality.",
    "Premium positioning should be defended unless evidence clearly says otherwise."
  ]
};

export const testimonials = [
  {
    quote:
      "This feels less like a prep course and more like a decision gym. I started using the frameworks in client calls within two weeks.",
    name: "Raghav M.",
    role: "Strategy Analyst, Bengaluru"
  },
  {
    quote:
      "The Pause & Think format forced me to slow down and structure. That changed how I approached CAT DILR and live business problems.",
    name: "Naina S.",
    role: "MBA Aspirant, Delhi"
  }
];

export const credibility = [
  "IIM Bangalore",
  "14+ Years of Teaching and Advisory Experience",
  "CAT Logic + Case Interview + Business Thinking"
];
