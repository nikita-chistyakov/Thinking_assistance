import React, { useState, useEffect, useRef } from 'react';
import { SendIcon } from './Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  prefilledText?: string;
  onClearPrefill?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  prefilledText,
  onClearPrefill,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefilledText) {
      setInput(prefilledText);
      if (onClearPrefill) onClearPrefill();
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
        }
      }, 50);
    }
  }, [prefilledText, onClearPrefill]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 border-t border-slate-800">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="State your problem, choice, or dilemma..."
              rows={1}
              className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 rounded-xl p-3 pr-10 resize-none border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition duration-150 text-sm max-h-40 leading-relaxed"
              disabled={isLoading}
            />
            {input.trim() && (
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  if (textareaRef.current) textareaRef.current.style.height = 'auto';
                }}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-200"
                title="Clear input"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-xl bg-cyan-600 text-white disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700 border border-transparent disabled:cursor-not-allowed hover:bg-cyan-500 active:scale-95 transition-all shadow-md shadow-cyan-950/40 flex-shrink-0"
            title="Send message (Enter)"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <SendIcon className="w-5 h-5" />
            )}
          </button>
        </form>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>
            <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for line break
          </span>
          <span className="hidden sm:inline">6-Step Socratic Decision Framework</span>
        </div>
      </div>
    </div>
  );
};
