
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { marked } from 'marked';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { createChatSession } from './services/geminiService';
import type { Message } from './types';
import { Sender } from './types';

function App() {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const chatSession = createChatSession();
        if (chatSession) {
          setChat(chatSession);
          // Initial message from AI
          setMessages([
            {
              id: `ai-intro-${Date.now()}`,
              text: "Hello! I'm ClearThink AI. I'm here to help you walk through any problem or decision. To start, please tell me what's on your mind.",
              sender: Sender.AI,
            },
          ]);
        } else {
          setError("Failed to initialize chat. Is your API Key configured?");
        }
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred during initialization.");
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async (userMessage: string) => {
    if (isAiThinking || !chat) return;

    setIsAiThinking(true);
    
    const userMsgId = `user-${Date.now()}`;
    const aiMsgId = `ai-${Date.now()}`;

    // Add user message and AI thinking placeholder
    setMessages(prev => [
        ...prev,
        { id: userMsgId, text: userMessage, sender: Sender.USER },
        { id: aiMsgId, text: '', sender: Sender.AI }
    ]);

    try {
        const result = await chat.sendMessageStream({ message: userMessage });
        let fullResponse = '';

        for await (const chunk of result) {
            fullResponse += chunk.text;
            const htmlText = await marked.parse(fullResponse);
            setMessages(prev => prev.map(msg => 
                msg.id === aiMsgId ? { ...msg, text: htmlText } : msg
            ));
        }
    } catch (e) {
        console.error(e);
        const errorText = "Sorry, I encountered an error. Please try again.";
        setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: errorText } : msg
        ));
    } finally {
        setIsAiThinking(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      <header className="p-4 border-b border-slate-700/50 text-center bg-slate-900/80 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-slate-200">ClearThink AI</h1>
        <p className="text-sm text-slate-400">Your partner in structured thinking</p>
      </header>
      
      {error && (
        <div className="bg-red-500/50 text-white p-4 text-center">
            {error}
        </div>
      )}

      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
        </div>
      </main>

      <footer className="w-full">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isAiThinking} />
      </footer>
    </div>
  );
}

export default App;
