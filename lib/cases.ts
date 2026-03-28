import { createClient } from "@/lib/supabase/server";

export type CaseRecord = {
  level: string;
  case_name: string;
  short_description: string;
};

export type CaseQuestionRecord = {
  level: string;
  case_name: string;
  prompt: string;
  options: string[];
  correct_index: number;
  analysis: string;
};

const fallbackCases: CaseRecord[] = [
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    short_description:
      "A family-owned casket maker must decide whether to automate production in a declining market with aging labor, capital constraints, and irreversible investment risk."
  },
  {
    level: "case-studies",
    case_name: "AmeriGlow",
    short_description:
      "A business with strong operating metrics must decide whether local efficiency is masking a deeper strategic weakness in capital allocation, inventory, and value creation."
  }
];

const fallbackQuestions: CaseQuestionRecord[] = [
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "In the Eastern Europe Casket Works setup, which statement is the core decision rather than just a symptom?",
    options: [
      "Veteran artisans are aging",
      "The market is steadily declining",
      "Whether to invest significantly in automation or maintain the status quo",
      "Production is still highly manual"
    ],
    correct_index: 2,
    analysis:
      "The real case decision is automation versus status quo. The other points are context and constraints that shape the decision, not the decision itself."
  },
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "Which item is most clearly a case constraint in this topic?",
    options: ["Capital availability", "MECE thinking", "Expected value formula", "Cherry-picking"],
    correct_index: 0,
    analysis:
      "Capital availability is a hard operating constraint in the case. The other options are tools or errors in reasoning, not business constraints."
  },
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "Which structure is most consistent with this framework's MECE approach to the automation case?",
    options: [
      "One long list mixing finance, people, technology, and market issues randomly",
      "Separate buckets for market conditions, financial impact, risk, and flexibility",
      "A structure based only on what the owner worries about most today",
      "A structure that repeats labor cost under every branch"
    ],
    correct_index: 1,
    analysis:
      "A strong case structure separates the problem into clean, non-overlapping buckets. Market conditions, economics, risk, and flexibility provide a disciplined lens for the decision."
  },
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "Which statement best reflects bottleneck analysis in a business case?",
    options: [
      "Treat every issue as equally limiting",
      "Identify the specific constraint that most limits performance before optimizing around it",
      "Assume the first visible problem is the real bottleneck",
      "Start with implementation before diagnosis"
    ],
    correct_index: 1,
    analysis:
      "Bottleneck analysis looks for the limiting factor that most constrains the outcome. That is the highest-leverage place to focus the case."
  },
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "Why does this framework conclude that delaying automation was the strongest decision for Eastern Europe Casket Works?",
    options: [
      "Because automation never creates value",
      "Because preserving flexibility had higher value under volatility and irreversibility",
      "Because labor costs were already irrelevant",
      "Because competitors had stopped investing"
    ],
    correct_index: 1,
    analysis:
      "The case shows the value of optionality under uncertainty. Delaying protected the business from locking into an irreversible investment before the environment became clearer."
  },
  {
    level: "case-studies",
    case_name: "Eastern Europe Casket Works",
    prompt: "Which change would most likely reverse the decision to delay?",
    options: [
      "Demand remains unstable and labor stays cheap",
      "The cost of automation falls and market demand becomes stable and predictable",
      "Management becomes impatient with ambiguity",
      "The company focuses only on DCF without flexibility"
    ],
    correct_index: 1,
    analysis:
      "If uncertainty falls and automation economics improve, the value of waiting drops. That is the kind of condition that can legitimately change the recommendation."
  },
  {
    level: "case-studies",
    case_name: "AmeriGlow",
    prompt: "What is the central warning from the AmeriGlow case?",
    options: [
      "Operational efficiency should always dominate strategy",
      "A single optimized metric can hide broader value destruction",
      "Inventory should always be maximized to avoid stockouts",
      "Demand shifts matter less than procurement scale"
    ],
    correct_index: 1,
    analysis:
      "AmeriGlow warns against mistaking local efficiency for strategic health. A business can optimize one metric while quietly weakening its overall economics and flexibility."
  },
  {
    level: "case-studies",
    case_name: "AmeriGlow",
    prompt: "When using estimation logic or a risk-return cutoff in this case, what matters most?",
    options: [
      "Using one precise number without showing assumptions",
      "Linking the estimate to constraints, scenarios, and decision consequences",
      "Avoiding all qualitative judgment",
      "Treating market size as separate from the decision itself"
    ],
    correct_index: 1,
    analysis:
      "The point of estimation in a case is not just precision. It is to clarify assumptions, compare scenarios, and improve the decision itself."
  }
];

export async function getCasesForLevel(level = "case-studies") {
  const supabase = await createClient();

  if (!supabase) {
    return fallbackCases.filter((item) => item.level === level);
  }

  const { data, error } = await supabase
    .from("cases")
    .select("level, case_name, short_description")
    .eq("level", level)
    .order("case_name");

  if (error || !data || data.length === 0) {
    console.error("[cases] Failed to fetch cases", { level, error });
    return fallbackCases.filter((item) => item.level === level);
  }

  return data as CaseRecord[];
}

export async function getCaseDetail(caseName: string) {
  const normalizedName = decodeURIComponent(caseName);
  const supabase = await createClient();

  if (!supabase) {
    return {
      caseRecord: fallbackCases.find((item) => item.case_name === normalizedName) ?? null,
      questions: fallbackQuestions.filter((item) => item.case_name === normalizedName)
    };
  }

  const [{ data: caseRecord, error: caseError }, { data: questions, error: questionError }] = await Promise.all([
    supabase
      .from("cases")
      .select("level, case_name, short_description")
      .eq("case_name", normalizedName)
      .maybeSingle(),
    supabase
      .from("questions")
      .select("level, case_name, prompt, options, correct_index, analysis")
      .eq("case_name", normalizedName)
      .order("prompt")
  ]);

  if (caseError || questionError || !caseRecord) {
    console.error("[cases] Failed to fetch case detail", {
      caseName: normalizedName,
      caseError,
      questionError
    });

    return {
      caseRecord: fallbackCases.find((item) => item.case_name === normalizedName) ?? null,
      questions: fallbackQuestions.filter((item) => item.case_name === normalizedName)
    };
  }

  return {
    caseRecord: caseRecord as CaseRecord,
    questions: ((questions ?? []) as Array<Omit<CaseQuestionRecord, "options"> & { options: unknown }>).map((item) => ({
      ...item,
      options: Array.isArray(item.options) ? (item.options as string[]) : []
    }))
  };
}
