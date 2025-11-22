import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { NewsItem } from '../types';
import { Newspaper, TrendingUp, TrendingDown, Minus, Sparkles, Loader2 } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [localNews, setLocalNews] = useState<NewsItem[]>(news);

  const analyzeSentiment = async (id: string, headline: string) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      alert("Please configure API_KEY in .env.local to use AI features.");
      return;
    }

    setAnalyzingId(id);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the sentiment of this financial headline for a trader. Return ONLY "Bullish", "Bearish", or "Neutral" followed by a pipe "|" and a 10 word explanation. Headline: "${headline}"`
      });
      
      const text = response.text || "Neutral|Could not analyze";
      const [sentimentRaw, explanation] = text.split('|');
      const sentiment = sentimentRaw.trim().toLowerCase() as 'bullish' | 'bearish' | 'neutral';

      setLocalNews(prev => prev.map(item => 
        item.id === id ? { ...item, sentiment, aiAnalysis: explanation } : item
      ));
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-indigo-400" />
          Market Headlines
        </h3>
        <span className="text-xs text-slate-500">Live Feed</span>
      </div>
      <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
        {localNews.map((item) => (
          <div key={item.id} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
            <div className="flex justify-between items-start gap-4 mb-1">
              <a href={item.url} className="text-sm font-medium text-slate-200 hover:text-indigo-400 line-clamp-2">
                {item.headline}
              </a>
              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                {new Date(item.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">{item.source}</span>
                {item.tickers.map(t => (
                  <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
              
              {item.sentiment ? (
                <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                  item.sentiment === 'bullish' ? 'bg-green-900/30 text-green-400' :
                  item.sentiment === 'bearish' ? 'bg-red-900/30 text-red-400' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {item.sentiment === 'bullish' && <TrendingUp className="w-3 h-3" />}
                  {item.sentiment === 'bearish' && <TrendingDown className="w-3 h-3" />}
                  {item.sentiment === 'neutral' && <Minus className="w-3 h-3" />}
                  <span className="capitalize">{item.sentiment}</span>
                </div>
              ) : (
                <button 
                  onClick={() => analyzeSentiment(item.id, item.headline)}
                  disabled={analyzingId === item.id}
                  className="text-[10px] flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
                >
                  {analyzingId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  AI Sentiment
                </button>
              )}
            </div>
            {item.aiAnalysis && (
              <p className="mt-2 text-xs text-slate-400 italic border-l-2 border-slate-700 pl-2">
                "{item.aiAnalysis}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};