import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  MessageSquare,
  Copy,
  Check,
  Download,
  Search,
  ArrowRight,
  Sparkles,
  Brain,
  ShieldCheck,
  Layers,
  Terminal,
  HelpCircle,
  ExternalLink,
  Cpu,
  Compass,
  Lightbulb,
  CheckCircle2,
  FileText
} from 'lucide-react';
import {
  PROTOCOL_STEPS,
  MENTAL_MODELS,
  PROMPT_TEMPLATES,
  SYSTEM_ARCHITECTURE_INFO,
  MentalModel,
  PromptTemplate
} from '../data/readmeContent';

interface ReadmePageProps {
  onBackToChat: () => void;
  onSelectPromptTemplate: (prompt: string) => void;
}

export const ReadmePage: React.FC<ReadmePageProps> = ({
  onBackToChat,
  onSelectPromptTemplate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'protocol' | 'models' | 'playbook' | 'architecture' | 'raw'>(
    'overview'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Full Raw Markdown content
  const rawReadmeMarkdown = `# 🧠 ClearThink AI

> **Your partner in structured thinking, decision intelligence, and rational problem-solving.**

## 💡 Overview
ClearThink AI is a specialized conversational agent engineered to guide individuals, leaders, engineers, and strategists through complex, ambiguous decisions.

Unlike typical chatbots that rush to give generic advice or hallucinated opinions, ClearThink AI acts as a methodical Socratic facilitator.

## 🎯 The Core Philosophy
"The AI never makes the decision for you. It illuminates the landscape so that YOU can make the right decision yourself."

1. Socratic, not Prescriptive
2. Sequential Discipline (6-step pipeline)
3. Calm & Methodical Tone
4. Action-Biased & Concrete

## 🪜 The 6-Step Decision Protocol
1. Problem Framing & Grounding
2. Goal & Outcome Definition
3. Divergent Brainstorming (3-5 Paths)
4. Multi-Criteria Pros & Cons Analysis
5. Decision Selection & First Micro-Action
6. Review, Synthesis & Commitment

## 🧠 Supported Mental Models
- First Principles Thinking (Aristotle / Elon Musk)
- Second-Order Thinking (Howard Marks)
- Pre-Mortem Analysis (Gary Klein)
- Inversion (Carl Jacobi / Charlie Munger)
- Regret Minimization Framework (Jeff Bezos)
- The 10/10/10 Rule (Suzy Welch)
- Eisenhower Matrix (Urgent vs Important)

## 🏗️ Architecture & Stack
- Google Gen AI SDK (@google/genai)
- Gemini 2.5 Flash
- React 19 + TypeScript + Tailwind CSS
- Real-time Markdown streaming via marked`;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawReadmeMarkdown);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([rawReadmeMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'README.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered mental models based on search and category
  const filteredModels = useMemo(() => {
    return MENTAL_MODELS.filter((model: MentalModel) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.howToApply.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || model.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Filtered prompt templates
  const filteredTemplates = useMemo(() => {
    return PROMPT_TEMPLATES.filter((tpl: PromptTemplate) => {
      return (
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Banner & Control Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-20 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100">ClearThink Documentation</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-950 border border-cyan-800/80 text-cyan-300">
                  README v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cognitive frameworks, system specifications & decision protocol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search models, steps, prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <button
              onClick={handleCopyRaw}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
              title="Copy raw README.md"
            >
              {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRaw ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
              title="Download README.md file"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={onBackToChat}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-md shadow-cyan-950 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Back to Chat</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1 border-t border-slate-800/70 pt-2.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Philosophy', icon: Compass },
            { id: 'protocol', label: '6-Step Protocol', icon: Layers },
            { id: 'models', label: 'Mental Models', icon: Brain },
            { id: 'playbook', label: 'Prompt Playbook', icon: Lightbulb },
            { id: 'architecture', label: 'Architecture & Engine', icon: Cpu },
            { id: 'raw', label: 'Raw README.md', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* TAB 1: OVERVIEW & PHILOSOPHY */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Hero Callout */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 sm:p-8">
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Rational Decision Intelligence
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Structured Thinking to Vanquish Decision Paralysis
                  </h2>
                  <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Most high-stakes decisions fail not because people lack information, but because they lack a disciplined sequence. ClearThink AI is an intelligent facilitator designed to guide your mind through uncertainty, dismantle cognitive biases, and deliver committed action.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={onBackToChat}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-semibold transition shadow-lg shadow-cyan-950"
                    >
                      <span>Start a Problem-Solving Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('protocol')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition"
                    >
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Explore the 6-Step Protocol</span>
                    </button>
                  </div>
                </div>

                {/* Subtle decorative glow */}
                <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* The Core Contrast: Advice Dispenser vs Thinking Partner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-900/60 border border-red-950/40 space-y-4">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Traditional AI Assistants (Advice Dispensers)
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Jump immediately to prescriptive advice without understanding your personal values or risk tolerance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Reinforce confirmation bias by validating whatever half-baked idea you type in.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Output walls of generic, disjointed bullet points that increase analysis paralysis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Leave you with zero ownership; if the advice goes wrong, you resent following it.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/90 border border-cyan-800/60 shadow-lg shadow-cyan-950/20 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    ClearThink AI (Socratic Cognitive Partner)
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Never makes the decision for you. Guides YOU to uncover the optimal decision with absolute ownership.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Strictly sequenced: will not allow debating options until the core problem and true goal are defined.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Forces multi-option divergent thinking (3-5 options) to shatter dangerous false binaries.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Concludes every session with an immediate physical micro-action executable within 48 hours.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cognitive Biases Counteracted */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  Cognitive Biases ClearThink Defends Against
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Premature Convergence',
                      desc: 'Fixating on the first feasible idea before exploring superior alternative routes.',
                      remedy: 'Enforced 3-5 option brainstorming.',
                    },
                    {
                      title: 'Confirmation Bias',
                      desc: 'Only cataloging pros for your emotional favorite while ignoring glaring red flags.',
                      remedy: 'Mandatory isolated pros & cons audit.',
                    },
                    {
                      title: 'Sunk Cost Fallacy',
                      desc: 'Persisting on failing paths merely because of time, capital, or pride invested.',
                      remedy: 'Goal anchoring & forward-looking outcomes.',
                    },
                    {
                      title: 'Intention-Action Gap',
                      desc: 'Feeling satisfied by intellectualizing a decision without taking tangible action.',
                      remedy: 'Enforced First Micro-Step commitment.',
                    },
                  ].map((bias, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
                    >
                      <div>
                        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                          Bias
                        </span>
                        <h4 className="text-sm font-bold text-slate-100 mt-1">{bias.title}</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{bias.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <span className="text-[11px] font-medium text-cyan-400 block">
                          ClearThink Shield:
                        </span>
                        <span className="text-xs text-slate-300">{bias.remedy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 6-STEP PROTOCOL */}
          {activeTab === 'protocol' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  The 6-Step Decision Protocol
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  ClearThink AI adheres strictly to this state machine. It will never skip ahead or jump around, ensuring you build an airtight chain of reasoning.
                </p>
              </div>

              <div className="space-y-4">
                {PROTOCOL_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-slate-100">{step.title}</h3>
                          <p className="text-xs text-cyan-400">{step.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-500">Stage 0{step.number} / 06</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Example AI Interaction:
                        </span>
                        <p className="text-xs font-mono text-cyan-300 italic">
                          {step.promptExample}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Cognitive Rationale:
                        </span>
                        <p className="text-xs text-slate-300">
                          {step.whyItMatters}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MENTAL MODELS */}
          {activeTab === 'models' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    Mental Models Library
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fundamental cognitive frameworks built into ClearThink’s facilitation methodology.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['All', 'Strategy', 'Risk Analysis', 'Prioritization', 'Cognitive Clarity'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredModels.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No mental models matching your criteria. Try clearing search or filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredModels.map((model) => (
                    <div
                      key={model.id}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                            {model.category}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">{model.origin}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-100">{model.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                          {model.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400">Application:</span>
                          <p className="text-xs text-slate-300 mt-0.5">{model.howToApply}</p>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                          <span className="text-[11px] font-mono text-cyan-400 block">Prompt to ask yourself:</span>
                          <p className="text-xs italic text-slate-200 mt-0.5">{model.exampleQuestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROMPT PLAYBOOK */}
          {activeTab === 'playbook' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  Prompt Playbook & Scenarios
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click <strong>&quot;Load Into Chat&quot;</strong> on any template below to test ClearThink AI with a real-world scenario.
                </p>
              </div>

              <div className="space-y-4">
                {filteredTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                          {tpl.category}
                        </span>
                        <h3 className="text-base font-bold text-slate-100">{tpl.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400">{tpl.description}</p>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans italic">
                        &quot;{tpl.promptText}&quot;
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {tpl.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPromptTemplate(tpl.promptText)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold whitespace-nowrap shadow-md shadow-cyan-950 transition self-start md:self-center"
                    >
                      <span>Load Into Chat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ARCHITECTURE & ENGINE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  System Architecture & AI Specifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Under-the-hood implementation details, model parameters, and privacy guarantees.
                </p>
              </div>

              {/* Spec Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">AI Model</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono mt-1 block">
                    {SYSTEM_ARCHITECTURE_INFO.model}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Google Gen AI v1.12.0</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Temperature</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono mt-1 block">
                    {SYSTEM_ARCHITECTURE_INFO.temperature}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Tuned for objective rationality</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Markdown Parser</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono mt-1 block">
                    {SYSTEM_ARCHITECTURE_INFO.parsing.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Streaming HTML hydration</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Streaming Protocol</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">
                    sendMessageStream
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">Low latency chunking</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 col-span-2">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Data Persistence & Privacy</span>
                  <span className="text-sm font-bold text-slate-200 mt-1 block">
                    100% In-Memory Ephemeral Sessions
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Conversations never persist to an external database; state dissolves upon page refresh.
                  </span>
                </div>
              </div>

              {/* System Instruction Code View */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-300">SYSTEM_INSTRUCTION (services/geminiService.ts)</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`You are ClearThink AI, an expert agent in structured problem-solving and decision-making...`);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950/80 overflow-x-auto max-h-96">
                  <pre>
{`1. Introduction & Problem Framing
   - Rephrase the core problem to ensure clear understanding.

2. Goal Definition
   - Establish what success looks like and identify non-negotiables.

3. Brainstorming Options
   - Guide the user to list at least 3-5 distinct choices without judgment.

4. Analysis of Options (Pros & Cons)
   - Sequentially audit upsides, downsides, and second-order consequences.

5. Decision & Action Plan
   - Guide selection of the strongest path and isolate the first micro-action.

6. Review & Conclude
   - Summarize the commitment and provide a solid cognitive takeaway.`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RAW MARKDOWN VIEWER */}
          {activeTab === 'raw' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-white">README.md (Raw Markdown View)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyRaw}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition"
                  >
                    {copiedRaw ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRaw ? 'Copied to Clipboard' : 'Copy Raw Markdown'}</span>
                  </button>
                  <button
                    onClick={handleDownloadMarkdown}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[600px]">
                {rawReadmeMarkdown}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
