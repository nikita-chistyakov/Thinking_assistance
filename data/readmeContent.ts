export interface ProtocolStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  promptExample: string;
  whyItMatters: string;
  color: string;
}

export interface MentalModel {
  id: string;
  name: string;
  category: 'Strategy' | 'Risk Analysis' | 'Prioritization' | 'Cognitive Clarity';
  origin: string;
  summary: string;
  howToApply: string;
  exampleQuestion: string;
}

export interface PromptTemplate {
  id: string;
  category: 'Career & Work' | 'Technical Architecture' | 'Business & Product' | 'Personal Life';
  title: string;
  description: string;
  promptText: string;
  tags: string[];
}

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    number: 1,
    title: 'Problem Framing & Grounding',
    subtitle: 'Cut through emotional fog to find the single core dilemma',
    description:
      'ClearThink listens to your initial thoughts and rephrases the dilemma into a tight, unambiguous statement. This tests whether you are solving the real root problem or merely reacting to symptoms.',
    promptExample: '"Thanks for sharing. To confirm, the core problem is choosing between stability and high growth. Is that right?"',
    whyItMatters: 'A problem well-stated is a problem half-solved. Without clear framing, people spend weeks solving the wrong thing.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    number: 2,
    title: 'Goal & Outcome Definition',
    subtitle: 'Clarify what genuine success looks like before debating options',
    description:
      'Before jumping to solutions, the agent anchors you to your desired outcome. What are the non-negotiables? What constraints matter? What does victory feel like?',
    promptExample: '"Now that the problem is clear, what would a successful outcome look like 6 months from now?"',
    whyItMatters: 'You cannot evaluate paths without knowing the destination. Clear criteria prevent moving goalposts.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    number: 3,
    title: 'Divergent Brainstorming',
    subtitle: 'Generate 3–5 viable paths without premature judgment',
    description:
      'The AI urges you to push past the obvious binary trap (Option A vs Option B) to uncover hybrid or creative alternatives (Options C, D, and E) while suspending critique.',
    promptExample: '"Let\'s explore possibilities. Try to list 3 to 5 distinct options without judging them yet."',
    whyItMatters: 'Binary decisions have a 52% failure rate; adding just one extra alternative drops the failure rate to under 32%.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    number: 4,
    title: 'Multi-Criteria Pros & Cons Analysis',
    subtitle: 'Systematically stress-test each path against upsides, downsides & second-order effects',
    description:
      'Walking sequentially through each option, ClearThink uncovers hidden trade-offs, resource costs, emotional toll, and what happens next (second-order consequences).',
    promptExample: '"Let\'s examine Option 1. What are the key upsides? And what are the hidden risks or trade-offs?"',
    whyItMatters: 'Prevents confirmation bias from blinding you to the dark side of your favored choice.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: 5,
    title: 'Decision Selection & First Micro-Action',
    subtitle: 'Commit to the best path and immediately identify the first step',
    description:
      'Synthesizing the trade-offs, you declare the chosen path. The AI immediately anchors this with a low-friction, concrete micro-action you can take within 24–48 hours.',
    promptExample: '"Looking at the trade-offs, which path is strongest? What is the very first physical step you can take today?"',
    whyItMatters: 'A decision without an immediate physical action is merely a wish. Micro-actions build instant momentum.',
    color: 'from-pink-500 to-emerald-500',
  },
  {
    number: 6,
    title: 'Review, Synthesis & Commitment',
    subtitle: 'Lock in the logic chain and walk away with total mental clarity',
    description:
      'The session concludes with an executive summary of your problem, chosen path, rationale, and immediate next step, instilling calm confidence.',
    promptExample: '"So the plan is to [Chosen Option], starting with [First Step]. You\'ve done some great thinking today!"',
    whyItMatters: 'Provides a clean cognitive receipt you can refer back to whenever doubt creeps in.',
    color: 'from-emerald-500 to-cyan-500',
  },
];

export const MENTAL_MODELS: MentalModel[] = [
  {
    id: 'first-principles',
    name: 'First Principles Thinking',
    category: 'Cognitive Clarity',
    origin: 'Aristotle / Elon Musk',
    summary: 'Boil a dilemma down to its most fundamental truths, then reason up from first truths rather than by analogy.',
    howToApply: 'Strip away "how everyone else does it" or historical precedent. Ask what physics, economics, or pure logic dictate is possible.',
    exampleQuestion: '"What are the indisputable facts here, and what is merely convention?"',
  },
  {
    id: 'second-order',
    name: 'Second-Order Thinking',
    category: 'Strategy',
    origin: 'Howard Marks / Garrett Hardin',
    summary: 'Evaluate decisions not just by immediate outcomes, but by the downstream consequences of those outcomes.',
    howToApply: 'Always ask: "And then what?" What will competitors, team members, or your future self do in response?',
    exampleQuestion: '"If we pick this path and it succeeds in month 1, what new headache will it produce by month 6?"',
  },
  {
    id: 'pre-mortem',
    name: 'Pre-Mortem Analysis',
    category: 'Risk Analysis',
    origin: 'Gary Klein (Cognitive Psychologist)',
    summary: 'Assume you picked your favored path, but 12 months later it has failed disastrously. Explain why.',
    howToApply: 'Forces honest critique without triggering defensive ego, because everyone assumes failure upfront to uncover latent hazards.',
    exampleQuestion: '"Fast forward one year: this plan crashed and burned. What was the fatal flaw we ignored?"',
  },
  {
    id: 'inversion',
    name: 'Inversion (Mental Turnaround)',
    category: 'Strategy',
    origin: 'Carl Gustav Jacob Jacobi & Charlie Munger',
    summary: 'Instead of asking how to achieve success, ask how you could guarantee guaranteed failure—and systematically avoid those things.',
    howToApply: 'List all ways this decision could be ruined (e.g. running out of money, burning bridges, overcomplicating). Cross them off.',
    exampleQuestion: '"What are 3 things we could do right now that would guarantee this initiative flops?"',
  },
  {
    id: 'regret-minimization',
    name: 'Regret Minimization Framework',
    category: 'Strategy',
    origin: 'Jeff Bezos (Amazon Founding Decision)',
    summary: 'Project yourself forward to age 80. Looking back, which choice will make you prouder?',
    howToApply: 'Puts acute short-term embarrassment or fear into perspective against lifetime regret of inaction.',
    exampleQuestion: '"When you are 80 years old, will you regret having tried this and failed, or never having tried at all?"',
  },
  {
    id: 'ten-ten-ten',
    name: 'The 10/10/10 Rule',
    category: 'Cognitive Clarity',
    origin: 'Suzy Welch',
    summary: 'Examine how you will feel about the choice in 10 minutes, in 10 months, and in 10 years.',
    howToApply: 'Filters out emotional turbulence (awkward conversation in 10 minutes) in favor of long-term leverage (liberating freedom in 10 months/years).',
    exampleQuestion: '"How will the discomfort of this decision feel tomorrow versus 10 months from now?"',
  },
  {
    id: 'eisenhower-matrix',
    name: 'Eisenhower Urgent vs. Important',
    category: 'Prioritization',
    origin: 'Dwight D. Eisenhower',
    summary: 'Distinguish between things that scream for immediate attention versus things that fundamentally compound value.',
    howToApply: 'Never let urgent, low-impact noise cannibalize the non-urgent, high-impact foundational decisions.',
    exampleQuestion: '"Is this decision genuinely critical, or is it merely loud and urgent?"',
  },
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'career-crossroads',
    category: 'Career & Work',
    title: 'Career Crossroads: Safe Path vs Startup Risk',
    description: 'Weighing a comfortable corporate role against an early-stage venture with upside.',
    promptText:
      'I am currently at a crossroads in my career. I have a stable, well-paying corporate role with predictable promotion cycles, but I also have an offer to join an early-stage startup as a founding engineer with high equity and significant risk. I feel stuck between security and ambition.',
    tags: ['Career', 'Risk', 'Compensation', 'Growth'],
  },
  {
    id: 'tech-stack-db',
    category: 'Technical Architecture',
    title: 'Database Architecture: Relational vs Document Store',
    description: 'Deciding the persistence layer for an evolving SaaS platform.',
    promptText:
      'We are architecting a new B2B SaaS platform. Half our engineering team wants PostgreSQL with strict relational schemas, while the other half prefers MongoDB or Firestore for rapid iteration and document flexibility. We need to decide before building our core domain models.',
    tags: ['Engineering', 'Architecture', 'Postgres', 'Scalability'],
  },
  {
    id: 'product-scope-mvp',
    category: 'Business & Product',
    title: 'MVP Scope: Launch Now or Polish Further?',
    description: 'Deciding whether to launch a raw prototype or spend another month on polish.',
    promptText:
      'Our team has built the core workflow of our product. It works, but the onboarding is rough, styling is basic, and there are minor bugs. We are debating whether to open public beta now to get real feedback or delay launch by 4 weeks to polish the UX.',
    tags: ['Product', 'Launch', 'Speed', 'Quality'],
  },
  {
    id: 'team-conflict',
    category: 'Career & Work',
    title: 'Difficult Stakeholder / Co-worker Negotiation',
    description: 'Resolving a persistent philosophical disagreement with a key team member.',
    promptText:
      'I have a recurring disagreement with my co-founder regarding our go-to-market strategy. They want enterprise sales with long cycles; I want product-led self-serve growth. Every leadership sync devolves into the same debate and morale is suffering.',
    tags: ['Management', 'Communication', 'Alignment'],
  },
  {
    id: 'financial-allocation',
    category: 'Personal Life',
    title: 'Capital Allocation: Debt Payoff vs Investment',
    description: 'Optimizing personal cash reserves across loans, equities, and emergency buffer.',
    promptText:
      'I have accumulated $25,000 in surplus cash. I have student loans at 5.2% interest, zero emergency fund beyond 1 month of living expenses, and an interest in investing in index funds. I need a clear framework to allocate this capital rationally.',
    tags: ['Finance', 'Debt', 'Investing', 'Security'],
  },
];

export const SYSTEM_ARCHITECTURE_INFO = {
  sdk: '@google/genai ^1.12.0',
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  streaming: true,
  parsing: 'marked ^16.1.2 async stream tokenizer',
  storage: 'Ephemeral client session (zero server data logging)',
};
