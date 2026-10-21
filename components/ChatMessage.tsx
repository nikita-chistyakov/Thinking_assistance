import React, { useState } from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { UserIcon, AiIcon } from './Icons';
import { Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1.5 py-1">
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
  </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip HTML tags for clean text copy if it's HTML
    const tempEl = document.createElement('div');
    tempEl.innerHTML = message.text;
    const cleanText = tempEl.textContent || tempEl.innerText || message.text;
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-start gap-3 my-4 group ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-900/30">
          <AiIcon className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="flex flex-col max-w-2xl">
        <div
          className={`p-4 rounded-2xl text-slate-100 shadow-sm relative ${
            isAI
              ? 'bg-slate-800/95 border border-slate-700/80 rounded-tl-sm'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-sm shadow-md shadow-cyan-950/20'
          }`}
        >
          {message.text ? (
            isAI ? (
              <div
                className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed space-y-2 text-sm"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            ) : (
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
            )
          ) : (
            <TypingIndicator />
          )}

          {/* Copy Button on Hover */}
          {message.text && (
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-1 rounded-md bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity text-xs ${
                copied ? 'opacity-100' : ''
              }`}
              title="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        <div className={`text-[10px] text-slate-500 mt-1 px-1 ${isAI ? 'text-left' : 'text-right'}`}>
          {isAI ? 'ClearThink AI • Socratic Facilitator' : 'You'}
        </div>
      </div>

      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-slate-300" />
        </div>
      )}
    </div>
  );
};
