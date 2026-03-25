
export type LessonQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type LessonTopic = {
  title: string;
  summary: string;
  pausePrompt: string;
  questions: LessonQuestion[];
};

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
    title: "Logical Thinking Foundations",
    description: "Decision sources, logic types, assumptions, and cognitive biases from the foundation section of the PDF.",
    outcome: "You learn to separate instinct, habit, and analysis before trusting a conclusion.",
    access: "Free",
    duration: "4 topics",
    topics: ["Decision Sources", "Logic Types", "Statements & Assumptions", "Cognitive Biases"],
    modules: [
      { title: "Decision Sources", format: "Teaching note", duration: "Topic 1", locked: false },
      { title: "Logic Types", format: "Teaching note", duration: "Topic 2", locked: false },
      { title: "Statements & Assumptions", format: "Teaching note", duration: "Topic 3", locked: false },
      { title: "Cognitive Biases", format: "Teaching note", duration: "Topic 4", locked: false }
    ]
  },
  {
    id: "problem-solving",
    number: "Level 2",
    title: "Problem Solving & Data Reasoning",
    description: "Problem framing, structured solving, data traps, and reasoning patterns as described in the PDF.",
    outcome: "You learn to frame the real question, decompose it, and avoid common interpretation mistakes.",
    access: "Paid",
    duration: "4 topics",
    topics: ["Problem Framing (GAI)", "Structured Solving", "Data Interpretation", "Reasoning Patterns"],
    modules: [
      { title: "Problem Framing (GAI)", format: "Teaching note", duration: "Topic 1", locked: false },
      { title: "Structured Solving", format: "Teaching note", duration: "Topic 2", locked: false },
      { title: "Data Interpretation", format: "Teaching note", duration: "Topic 3", locked: false },
      { title: "Reasoning Patterns", format: "Teaching note", duration: "Topic 4", locked: false }
    ]
  },
  {
    id: "decision-frameworks",
    number: "Level 3",
    title: "Decision Making & Economic Reasoning",
    description: "Decision trees, expected value, risk categories, and personal finance logic from the PDF's decision framework section.",
    outcome: "You learn to evaluate uncertain choices with structure instead of intuition alone.",
    access: "Paid",
    duration: "4 topics",
    topics: ["Decision Trees", "Expected Value", "Risk (Known vs Unknown)", "Personal Finance Logic"],
    modules: [
      { title: "Decision Trees", format: "Teaching note", duration: "Topic 1", locked: false },
      { title: "Expected Value", format: "Teaching note", duration: "Topic 2", locked: false },
      { title: "Risk (Known vs Unknown)", format: "Teaching note", duration: "Topic 3", locked: false },
      { title: "Personal Finance Logic", format: "Teaching note", duration: "Topic 4", locked: false }
    ]
  },
  {
    id: "case-studies",
    number: "Level 4",
    title: "Case-Based Business Decision Making",
    description: "Case orientation, structuring, data and insight, and integrated business decisions from the portfolio in the PDF.",
    outcome: "You learn to separate symptoms from core decisions and synthesize logic, data, risk, and flexibility.",
    access: "Paid",
    duration: "4 topics",
    topics: ["Case Orientation", "Case Structuring", "Data & Insight", "Integrated Cases"],
    modules: [
      { title: "Case Orientation", format: "Teaching note", duration: "Topic 1", locked: false },
      { title: "Case Structuring", format: "Teaching note", duration: "Topic 2", locked: false },
      { title: "Data & Insight", format: "Teaching note", duration: "Topic 3", locked: false },
      { title: "Integrated Cases", format: "Teaching note", duration: "Topic 4", locked: false }
    ]
  }
];

export const levelLessons: Record<string, LessonTopic[]> = {
  foundations: [
    {
      title: "Decision Sources",
      summary:
        "The PDF distinguishes emotional, habitual, and logical decisions. Emotional decisions are fast but impulsive, habitual decisions save effort but can become stale, and logical decisions optimize outcomes through evidence and structured evaluation.",
      pausePrompt: "Before answering, ask which decision source is driving the choice and what its likely blind spot is.",
      questions: [
        {
          prompt: "A manager gathers evidence, compares alternatives, and follows a structured thought process before choosing a vendor. Which decision source best fits the PDF?",
          options: ["Emotional", "Habitual", "Logical", "Social"],
          correctIndex: 2,
          explanation: "The PDF describes logical decisions as deliberate, evidence-based, and systematic. This manager is not reacting emotionally or acting on autopilot."
        },
        {
          prompt: "Which situation is most clearly a habitual decision rather than a logical one?",
          options: [
            "Running a cost-benefit analysis before investing",
            "Taking the same route every day without reconsidering alternatives",
            "Comparing education options using pros and cons",
            "Evaluating multiple perspectives before acting"
          ],
          correctIndex: 1,
          explanation: "The PDF defines habitual decisions as autopilot choices based on routine. Repeating the same route without conscious evaluation is the clearest example."
        }
      ]
    },
    {
      title: "Logic Types",
      summary:
        "The PDF covers deductive, inductive, abductive, and analogical logic. Deduction moves from general rule to certain conclusion, induction generalizes from observations, abduction picks the most likely explanation, and analogy transfers insight from a similar case.",
      pausePrompt: "Pause before solving and identify whether the reasoning moves from rule, pattern, explanation, or analogy.",
      questions: [
        {
          prompt: "'The grass is wet this morning, so the best explanation is that it rained overnight.' Which logic type is this in the PDF?",
          options: ["Deductive", "Inductive", "Abductive", "Analogical"],
          correctIndex: 2,
          explanation: "The PDF uses this exact kind of reasoning to explain abduction: starting with observations and choosing the most likely explanation."
        },
        {
          prompt: "Which failure mode belongs specifically to inductive logic in the PDF?",
          options: [
            "Ignoring critical differences between two similar cases",
            "Using a false premise in a valid structure",
            "Insufficient sample size or selection bias",
            "Forgetting that multiple explanations may fit"
          ],
          correctIndex: 2,
          explanation: "The PDF warns that induction fails when the sample is too narrow or biased. The black swan example shows why a broad generalization can collapse."
        }
      ]
    },
    {
      title: "Statements & Assumptions",
      summary:
        "This topic in the PDF focuses on facts versus opinions, necessary versus sufficient conditions, and hidden assumptions. Good reasoning improves when you isolate what is explicitly true from what is only being taken for granted.",
      pausePrompt: "Before choosing, separate the stated fact from the hidden assumption behind the conclusion.",
      questions: [
        {
          prompt: "A team says, 'Sales fell after the redesign, so the redesign caused the decline.' What is the hidden assumption?",
          options: [
            "Sales always fall after a redesign",
            "No other major factor changed at the same time",
            "All redesigns reduce demand",
            "The team prefers the older design"
          ],
          correctIndex: 1,
          explanation: "The jump from sequence to cause assumes other explanations are absent. The PDF treats identifying hidden assumptions as central to better reasoning."
        },
        {
          prompt: "Which statement best reflects the PDF's focus on necessary versus sufficient conditions?",
          options: [
            "A sufficient condition always needs more evidence to matter",
            "A necessary condition must be present, but may not by itself guarantee the outcome",
            "A necessary condition guarantees the conclusion by itself",
            "Necessary and sufficient mean the same thing in decision analysis"
          ],
          correctIndex: 1,
          explanation: "The PDF explicitly highlights necessary versus sufficient conditions. A necessary condition is required, but it may still not be enough on its own."
        }
      ]
    },
    {
      title: "Cognitive Biases",
      summary:
        "The bias section covers anchoring, availability, confirmation bias, sunk cost fallacy, overconfidence, and status quo bias. The common thread is that psychological shortcuts distort judgment unless we deliberately challenge them.",
      pausePrompt: "Pause and ask whether the first number, the most vivid example, or past investment is pulling the decision off course.",
      questions: [
        {
          prompt: "A supplier opens negotiation with an inflated quote, and that number keeps shaping the final discussion even after everyone agrees it is unrealistic. Which bias does the PDF describe here?",
          options: ["Availability bias", "Anchoring bias", "Status quo bias", "Confirmation bias"],
          correctIndex: 1,
          explanation: "The PDF uses price quotes and negotiations to illustrate anchoring. The first number becomes an unfair benchmark for later judgment."
        },
        {
          prompt: "After a highly publicized cyberattack, a company over-invests in that one threat while neglecting statistically more probable risks. Which PDF bias is this?",
          options: ["Sunk cost fallacy", "Overconfidence bias", "Availability bias", "Status quo bias"],
          correctIndex: 2,
          explanation: "The PDF says availability bias happens when vivid or recent examples dominate probability judgment. The cyberattack example appears directly in that section."
        }
      ]
    }
  ],
  "problem-solving": [
    {
      title: "Problem Framing (GAI)",
      summary:
        "The Given-Asked-Implied framework in the PDF improves framing by separating explicit facts, the real question, and hidden assumptions. It prevents solving the wrong problem and encourages reframing when the stated question is too narrow.",
      pausePrompt: "Before answering, list what is given, what is truly being asked, and what is only implied.",
      questions: [
        {
          prompt: "A client asks, 'How do we reduce costs?' but the better reframe may be 'How do we add more value with existing resources?' Which part of GAI is doing the most work in that shift?",
          options: ["Given", "Asked", "Implied", "Output"],
          correctIndex: 1,
          explanation: "The PDF explicitly says reframing the asked question can transform the solution space. Here the real question is being refined, not the raw facts."
        },
        {
          prompt: "A team lists all the hard numbers and rules in a case but never surfaces stakeholder beliefs or assumptions about what must stay constant. Which GAI element is being neglected?",
          options: ["Given", "Asked", "Implied", "Constraint mapping"],
          correctIndex: 2,
          explanation: "The PDF defines implied as the hidden assumptions, context, and beliefs taken for granted. Missing them leads to fragile solutions."
        }
      ]
    },
    {
      title: "Structured Solving",
      summary:
        "Level 2 describes structured solving through decomposition, case-based reasoning, and elimination techniques. The idea is to break ambiguity into smaller drivers so each step becomes easier to test and reject.",
      pausePrompt: "Pause before solving and decide what the main buckets or drivers are before you chase details.",
      questions: [
        {
          prompt: "When a problem feels large and vague, which first move best matches the PDF's structured solving approach?",
          options: [
            "Jump straight to the most intuitive fix",
            "Break the problem into smaller components and test them separately",
            "Wait for more data before defining the issue",
            "Choose the option with the fastest implementation"
          ],
          correctIndex: 1,
          explanation: "The PDF emphasizes decomposition. Structured solving becomes possible only when the problem is divided into manageable parts."
        },
        {
          prompt: "Which action best reflects elimination techniques in the PDF?",
          options: [
            "Keeping every explanation open until the end",
            "Dropping options that violate a hard constraint or known fact",
            "Choosing the most familiar framework regardless of fit",
            "Avoiding assumptions entirely"
          ],
          correctIndex: 1,
          explanation: "Elimination works by removing paths that conflict with the known structure of the problem. It is a disciplined narrowing process, not guesswork."
        }
      ]
    },
    {
      title: "Data Interpretation",
      summary:
        "The PDF warns against traps such as correlation versus causation, Simpson's paradox, misleading averages, survivorship bias, base rate neglect, and cherry-picking. Good interpretation requires checking the full distribution and the subgroup story before declaring insight.",
      pausePrompt: "Before locking an answer, ask whether you are seeing causation, the full dataset, and the right subgroup view.",
      questions: [
        {
          prompt: "Ice cream sales and drownings both rise in summer. According to the PDF, what is the correct interpretation?",
          options: [
            "Ice cream sales cause drownings",
            "Drownings cause ice cream sales",
            "A third variable may be influencing both",
            "The higher number alone proves causation"
          ],
          correctIndex: 2,
          explanation: "The PDF uses this exact style of example to show correlation is not causation. A hidden factor like weather can drive both variables."
        },
        {
          prompt: "A trend appears positive in each subgroup but reverses when all groups are combined. Which PDF trap is this?",
          options: ["Cherry-picking", "Simpson's paradox", "Base rate neglect", "Survivorship bias"],
          correctIndex: 1,
          explanation: "The PDF defines Simpson's paradox as an aggregate result that hides or reverses what is visible inside the subgroups."
        }
      ]
    },
    {
      title: "Reasoning Patterns",
      summary:
        "The PDF lists arrangements, games, tournaments, networks, and flow tracking as recurring reasoning patterns. The common skill is to track constraints, movement, and relationships rather than treating every puzzle as a new category from scratch.",
      pausePrompt: "Pause before solving and ask whether the problem is mainly about ordering, connections, competition, or tracking movement.",
      questions: [
        {
          prompt: "If a problem asks who sits where under multiple seating constraints, which pattern from the PDF is the best starting frame?",
          options: ["Flow tracking", "Arrangement", "Tournament", "Market sizing"],
          correctIndex: 1,
          explanation: "Arrangements are the PDF's natural home for order and position constraints. The structure matters more than the surface story."
        },
        {
          prompt: "A puzzle asks you to track how quantity moves across several connected points over time. Which PDF pattern best fits?",
          options: ["Network or flow tracking", "Deductive-only proof", "Anchoring analysis", "Case orientation"],
          correctIndex: 0,
          explanation: "The PDF explicitly names networks and flow tracking for this type of reasoning. The core task is conserving and tracing movement across nodes."
        }
      ]
    }
  ],
  "decision-frameworks": [
    {
      title: "Decision Trees",
      summary:
        "The PDF presents decision trees as a structured way to map choices, chance events, branches, and end outcomes. They are most useful when uncertainty can be organized across multiple stages and explained clearly to stakeholders.",
      pausePrompt: "Before choosing, ask where the decision is made, where chance enters, and what each branch actually represents.",
      questions: [
        {
          prompt: "In the PDF's anatomy of a decision tree, what happens at a chance node?",
          options: [
            "A choice is made between strategies",
            "An uncertain event occurs with assigned probabilities",
            "Only the final financial outcome is shown",
            "A hidden assumption is revealed"
          ],
          correctIndex: 1,
          explanation: "The PDF defines chance nodes as points where uncertain events occur and probabilities are attached to each branch."
        },
        {
          prompt: "When does the PDF say decision trees are especially useful?",
          options: [
            "When the decision is simple and probabilities are purely speculative",
            "When there are multiple stages, meaningful uncertainty, and defensible estimates",
            "When the problem is entirely emotional or subjective",
            "When time must be minimized at all costs"
          ],
          correctIndex: 1,
          explanation: "The PDF recommends decision trees for complex, multi-stage choices where uncertainty and estimated outcomes can be laid out and justified."
        }
      ]
    },
    {
      title: "Expected Value",
      summary:
        "Expected Value in the PDF is the weighted average of possible outcomes. It helps quantify the average return or cost of a path, but the PDF also warns against over-optimism, ignoring correlation, and forgetting downside risk or risk aversion.",
      pausePrompt: "Pause and compute value times probability for each branch before trusting instinct.",
      questions: [
        {
          prompt: "A decision has a 60% chance of yielding 100 and a 40% chance of yielding 20. What is the expected value?",
          options: ["52", "60", "68", "120"],
          correctIndex: 2,
          explanation: "Expected value is the weighted average: 0.6 x 100 plus 0.4 x 20. The result is 68."
        },
        {
          prompt: "Which mistake is listed in the PDF as a common EV error?",
          options: [
            "Using probabilities only when events are independent",
            "Ignoring correlation between events and using single-point estimates too casually",
            "Avoiding scenario planning entirely",
            "Treating decision nodes and chance nodes as identical"
          ],
          correctIndex: 1,
          explanation: "The PDF explicitly warns about over-optimism, ignored correlation, and single-point estimates for highly variable outcomes."
        }
      ]
    },
    {
      title: "Risk (Known vs Unknown)",
      summary:
        "The PDF separates known risks, unknown risks, and Knightian uncertainty. Known risks can be quantified and managed through mitigation and expected value, while unknown or unmeasurable risks call for resilience, optionality, diversification, and downside protection.",
      pausePrompt: "Before answering, classify the uncertainty first: measurable, hard to measure, or fundamentally unknowable.",
      questions: [
        {
          prompt: "Which example best matches a known risk in the PDF?",
          options: [
            "A revolutionary scientific discovery that makes the core product obsolete",
            "Equipment failure probabilities based on historical data",
            "A global paradigm shift no model anticipated",
            "A black swan event with no meaningful probability estimate"
          ],
          correctIndex: 1,
          explanation: "The PDF treats known risks as quantifiable through historical data or established models. Equipment failure is one of its direct examples."
        },
        {
          prompt: "What does the PDF recommend for Knightian uncertainty?",
          options: [
            "Rely only on precise statistical models",
            "Ignore it because it cannot be measured",
            "Prioritize downside protection, staged commitment, and portfolio thinking",
            "Use averages and single-point estimates more aggressively"
          ],
          correctIndex: 2,
          explanation: "For unmeasurable uncertainty, the PDF shifts from precise prediction to protection and resilience. That is why staged commitment and downside protection matter."
        }
      ]
    },
    {
      title: "Personal Finance Logic",
      summary:
        "In Level 3, the PDF brings decision logic into everyday finance through inflation, time value of money, EMI versus rent frameworks, insurance logic, opportunity cost, SIP discipline, and loan structure analysis.",
      pausePrompt: "Pause and ask whether the decision should be judged only by current cash flow or by opportunity cost and long-term value.",
      questions: [
        {
          prompt: "According to the PDF's Level 3 framing, which comparison is too narrow when evaluating EMI versus rent?",
          options: [
            "Comparing only the monthly outflow",
            "Considering inflation and time value of money",
            "Examining the structure of the loan",
            "Assessing opportunity cost"
          ],
          correctIndex: 0,
          explanation: "The PDF includes EMI versus rent within a broader economic framework. A monthly payment comparison alone ignores time value, flexibility, and opportunity cost."
        },
        {
          prompt: "Which choice best reflects the PDF's idea of SIP discipline and opportunity cost?",
          options: [
            "Stopping contributions whenever recent returns look weak",
            "Viewing each unused rupee as costless if it stays in cash",
            "Treating consistent investing and alternative uses of money as linked decisions",
            "Focusing only on nominal gains and ignoring inflation"
          ],
          correctIndex: 2,
          explanation: "The PDF places SIP discipline alongside opportunity cost and loan structure analysis. The right logic is comparative and long-term, not purely reactive."
        }
      ]
    }
  ],
  "case-studies": [
    {
      title: "Case Orientation",
      summary:
        "The PDF says case orientation begins by identifying the decision, separating symptoms from the core problem, and defining constraints. In the Eastern Europe Casket Works case, the real question is not 'Should we modernize?' in the abstract, but whether automation is justified under decline, irreversibility, and skills constraints.",
      pausePrompt: "Before answering, separate the visible symptom from the actual decision that management must make.",
      questions: [
        {
          prompt: "In the Eastern Europe Casket Works setup, which statement is the core decision rather than just a symptom?",
          options: [
            "Veteran artisans are aging",
            "The market is steadily declining",
            "Whether to invest significantly in automation or maintain the status quo",
            "Production is still highly manual"
          ],
          correctIndex: 2,
          explanation: "The PDF frames automation versus status quo as the central decision. The other points are facts and constraints that shape that decision."
        },
        {
          prompt: "Which item is most clearly a case constraint in the PDF?",
          options: ["Capital availability", "MECE thinking", "Expected value formula", "Cherry-picking"],
          correctIndex: 0,
          explanation: "The problem setup explicitly lists constraints such as capital availability, market size, irreversibility, and skills gap."
        }
      ]
    },
    {
      title: "Case Structuring",
      summary:
        "The PDF describes case structuring through MECE thinking, hypothesis-driven solving, and bottleneck analysis. The goal is to organize the decision so causes, trade-offs, and failure points are examined without overlap or confusion.",
      pausePrompt: "Pause before solving and ask what issue tree or hypothesis would explain the case most cleanly.",
      questions: [
        {
          prompt: "Which structure is most consistent with the PDF's MECE approach to the automation case?",
          options: [
            "One long list mixing finance, people, technology, and market issues randomly",
            "Separate buckets for market conditions, financial impact, risk, and flexibility",
            "A structure based only on what the owner worries about most today",
            "A structure that repeats labor cost under every branch"
          ],
          correctIndex: 1,
          explanation: "MECE thinking requires clean, non-overlapping buckets. The PDF's analysis framework separates scenario analysis, financial modeling, risk, and irreversibility."
        },
        {
          prompt: "Which statement best reflects bottleneck analysis in a business case?",
          options: [
            "Treat every issue as equally limiting",
            "Identify the specific constraint that most limits performance before optimizing around it",
            "Assume the first visible problem is the real bottleneck",
            "Start with implementation before diagnosis"
          ],
          correctIndex: 1,
          explanation: "The PDF lists bottleneck analysis as part of case structuring. The point is to isolate the true limiting factor instead of spreading effort evenly."
        }
      ]
    },
    {
      title: "Data & Insight",
      summary:
        "This topic in the PDF covers estimation logic, market sizing for decisions, and risk-return cutoffs. The AmeriGlow case adds a related lesson: strong operational metrics can still hide strategic weakness if the chosen metric is disconnected from overall value.",
      pausePrompt: "Before choosing, ask whether the metric in front of you is actually measuring value or just local efficiency.",
      questions: [
        {
          prompt: "What is the central warning from the AmeriGlow case in the PDF?",
          options: [
            "Operational efficiency should always dominate strategy",
            "A single optimized metric can hide broader value destruction",
            "Inventory should always be maximized to avoid stockouts",
            "Demand shifts matter less than procurement scale"
          ],
          correctIndex: 1,
          explanation: "The PDF says AmeriGlow's operational excellence created strategic blindness. Optimizing one metric can damage capital allocation and strategic agility."
        },
        {
          prompt: "When using estimation logic or a risk-return cutoff in a case, what matters most according to the PDF's style of analysis?",
          options: [
            "Using one precise number without showing assumptions",
            "Linking the estimate to constraints, scenarios, and decision consequences",
            "Avoiding all qualitative judgment",
            "Treating market size as separate from the decision itself"
          ],
          correctIndex: 1,
          explanation: "The PDF consistently ties estimates to decision framing, scenario analysis, and strategic implications. Numbers matter because they change the choice, not because they look precise."
        }
      ]
    },
    {
      title: "Integrated Cases",
      summary:
        "Integrated cases in the PDF require full synthesis of logic, structure, data, and risk. The Eastern Europe Casket Works case shows why irreversibility, optionality, and flexibility can outweigh a superficially attractive early commitment.",
      pausePrompt: "Pause and decide whether the smartest move is commitment now or preserving the option to act later.",
      questions: [
        {
          prompt: "Why does the PDF conclude that delaying automation was the strongest decision for Eastern Europe Casket Works?",
          options: [
            "Because automation never creates value",
            "Because preserving flexibility had higher value under volatility and irreversibility",
            "Because labor costs were already irrelevant",
            "Because competitors had stopped investing"
          ],
          correctIndex: 1,
          explanation: "The PDF's core lesson is the value of optionality. Under uncertainty, delaying an irreversible investment preserved flexibility and avoided a poorly timed sunk cost."
        },
        {
          prompt: "Which change would most likely reverse the decision to delay, according to the PDF?",
          options: [
            "Demand remains unstable and labor stays cheap",
            "The cost of automation falls and market demand becomes stable and predictable",
            "Management becomes impatient with ambiguity",
            "The company focuses only on DCF without flexibility"
          ],
          correctIndex: 1,
          explanation: "The PDF explicitly says the decision would change if demand stabilized, labor costs rose, competitors gained a decisive automation advantage, or automation became much less risky."
        }
      ]
    }
  ]
};

export const dashboardStats = [
  { label: "Levels", value: "4" },
  { label: "Topics", value: "16" },
  { label: "Questions", value: "32" },
  { label: "Case Portfolio", value: "6 cases" }
];

export const caseStudy = {
  title: "Eastern Europe Casket Works",
  problem:
    "A family-owned casket maker must decide whether to automate production or preserve its manual model while operating in a stable but declining market with aging labor, capital constraints, and irreversible investment risk.",
  pausePrompt:
    "Before looking at the analysis, decide whether the real question is cost reduction, modernization, or how much optionality the business should preserve under uncertainty.",
  options: [
    "A. Automate immediately to catch up with modern competitors",
    "B. Delay automation, preserve flexibility, and revisit once conditions are clearer",
    "C. Ignore market change and maintain the current model indefinitely"
  ],
  analysis: [
    "The PDF highlights volatility, irreversibility, and flexibility as central to the decision rather than treating automation as automatically superior.",
    "Delaying avoided a sunk investment that could have locked the company into a poor fit for shifting market conditions.",
    "The case also shows the limits of relying only on DCF when the value of waiting and optionality is material."
  ],
  solution:
    "The strongest decision in the PDF is to delay automation and preserve optionality. That choice keeps the company adaptive while it learns more about demand, labor, and the economics of commitment.",
  takeaways: [
    "Irreversible decisions should be evaluated differently from reversible ones.",
    "Flexibility has value, especially under uncertainty.",
    "Do not commit early simply because technology exists or competitors are moving."
  ]
};

export const credibility = [
  "Creator: Vikash Singh",
  "CMRM-IIM Bangalore",
  "14+ Years of Training Experience in Data Interpretation, Logical Reasoning, Math, and Decision Making"
];
