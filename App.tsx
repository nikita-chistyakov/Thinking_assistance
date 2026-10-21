import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { marked } from 'marked';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { ReadmePage } from './components/ReadmePage';
import { createChatSession } from './services/geminiService';
import type { Message } from './types';
import { Sender } from './types';
import {
  MessageSquare,
  BookOpen,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Brain,
  ShieldAlert
} from 'lucide-react';

type AppView = 'chat' | 'readme';

const QUICK_STARTERS = [
  {
    label: 'Career Crossroads',
    sub: 'Corporate safety vs startup equity',
    prompt: "I'm deciding between staying in my safe corporate job with predictable promotions or taking an offer as founding engineer at an early-stage startup with high equity. I feel paralyzed.",
  },
  {
    label: 'Architecture Stack',
    sub: 'Postgres SQL vs Mongo Document DB',
    prompt: "Our engineering team is split on whether to use PostgreSQL or MongoDB for our new SaaS data layer. We need to decide before building core models.",
  },
  {
    label: 'Product MVP Launch',
    sub: 'Ship imperfect now vs polish 4 weeks',
    prompt: "We have built our core workflow. It's functional but unpolished. Should we launch a public beta immediately to test demand or spend 4 weeks refining UX?",
  },
];

function App() {
  const [currentView, setCurrentView] = useState<AppView>('chat');
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefilledInput, setPrefilledInput] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const initChat = () => {
    try {
      const chatSession = createChatSession();
      if (chatSession) {
        setChat(chatSession);
        setError(null);
        setMessages([
          {
            id: `ai-intro-${Date.now()}`,
            text: "Hello! I'm **ClearThink AI**. I'm here to help you walk through any problem or tough decision using a structured 6-step framework.\n\nTo start, please tell me what decision or dilemma is currently on your mind.",
            sender: Sender.AI,
          },
        ]);
      } else {
        setError("API Key is not configured. Please set the GEMINI_API_KEY environment variable.");
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred during initialization.");
    }
  };

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isAiThinking]);

  const handleSendMessage = async (userMessage: string) => {
    if (isAiThinking || !chat) return;

    setIsAiThinking(true);

    const userMsgId = `user-${Date.now()}`;
    const aiMsgId = `ai-${Date.now()}`;

    // Add user message and AI thinking placeholder
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, text: userMessage, sender: Sender.USER },
      { id: aiMsgId, text: '', sender: Sender.AI },
    ]);

    try {
      const result = await chat.sendMessageStream({ message: userMessage });
      let fullResponse = '';

      for await (const chunk of result) {
        fullResponse += chunk.text;
        const htmlText = await marked.parse(fullResponse);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, text: htmlText } : msg
          )
        );
      }
    } catch (e) {
      console.error(e);
      const errorText = "Sorry, I encountered an error during response generation. Please try again or restart the session.";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId ? { ...msg, text: errorText } : msg
        )
      );
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleResetChat = () => {
    if (messages.length > 1) {
      const confirmReset = window.confirm(
        "Are you sure you want to start a new problem-solving session? Current conversation will be cleared."
      );
      if (!confirmReset) return;
    }
    initChat();
  };

  const handleSelectTemplate = (prompt: string) => {
    setPrefilledInput(prompt);
    setCurrentView('chat');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation Bar */}
      <header className="px-4 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-950/40">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-100 text-base tracking-tight">
                  ClearThink AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                  Socratic Partner
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Structured decision intelligence & rational problem-solving
              </p>
            </div>
          </div>

          {/* View Switcher Tabs & Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <button
                onClick={() => setCurrentView('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentView === 'chat'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Session</span>
              </button>

              <button
                onClick={() => setCurrentView('readme')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentView === 'readme'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>README & Docs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
              </button>
            </div>

            {/* Reset Button (visible in chat mode) */}
            {currentView === 'chat' && (
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">New Session</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content: Chat View or Readme View */}
      {currentView === 'readme' ? (
        <ReadmePage
          onBackToChat={() => setCurrentView('chat')}
          onSelectPromptTemplate={handleSelectTemplate}
        />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {error && (
            <div className="bg-rose-950/90 border-b border-rose-800 text-rose-200 px-4 py-2.5 text-xs text-center flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Chat Messages Scroll Container */}
          <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              {/* Optional Prompt Framework Mini Banner */}
              <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>
                    ClearThink guides you through 6 steps: <strong>Problem Framing ➔ Goals ➔ Brainstorming ➔ Analysis ➔ Decision ➔ Next Step</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setCurrentView('readme')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium whitespace-nowrap ml-3 flex items-center gap-1"
                >
                  <span>Learn how it works</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Quick Starter Cards if only initial greeting exists */}
              {messages.length === 1 && (
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                    Need inspiration? Try an example dilemma:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {QUICK_STARTERS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setPrefilledInput(item.prompt);
                        }}
                        className="text-left p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition group flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {item.sub}
                          </p>
                        </div>
                        <span className="text-[10px] text-cyan-400 mt-3 font-medium flex items-center gap-1">
                          Load into input <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Footer Input */}
          <footer className="w-full">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isAiThinking}
              prefilledText={prefilledInput}
              onClearPrefill={() => setPrefilledInput('')}
            />
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
