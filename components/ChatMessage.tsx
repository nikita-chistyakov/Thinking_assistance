
import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { UserIcon, AiIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);


export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;

  return (
    <div className={`flex items-start gap-3 my-4 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
          <AiIcon className="w-5 h-5 text-cyan-400" />
        </div>
      )}
      <div
        className={`max-w-xl p-4 rounded-2xl text-slate-50 ${
          isAI
            ? 'bg-slate-800 rounded-tl-none'
            : 'bg-blue-600 rounded-br-none'
        }`}
      >
        {message.text ? (
            <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
        ) : (
            <TypingIndicator />
        )}
      </div>
      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-slate-300" />
        </div>
      )}
    </div>
  );
};
