
import { GoogleGenAI } from "@google/genai";
import { TradeSignal, TechnicalIndicator, MarketScanResult } from "../types";

export const analyzeSignal = async (signal: TradeSignal): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "Gemini API Key is missing. Please configure it to use this feature.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Analyze the following trading signal for potential risk and validity.
      
      Ticker: ${signal.ticker}
      Side: ${signal.side}
      Entry: ${signal.entry}
      Stop Loss: ${signal.stop}
      Relative Volume (RVOL): ${signal.rvol || 'N/A'}
      Reason: ${signal.reason || 'N/A'}
      Catalyst: ${signal.catalyst || 'N/A'}

      Provide a concise, 2-sentence analysis. First sentence regarding technical validity based on the reason. Second sentence regarding risk/reward profile.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis could not be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to analyze signal due to an API error.";
  }
};

export const analyzeTechnicalContext = async (data: TechnicalIndicator): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return "Gemini API Key is missing. Please add it to .env.local";
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
          Act as a Chief Technical Strategist at a top hedge fund. Perform an extensive technical analysis and profitability assessment on ${data.ticker} based on the following data:
          
          Current Price: $${data.price.toFixed(2)}
          Primary Trend: ${data.trend.toUpperCase()}
          Momentum (RSI 14): ${data.rsi_14.toFixed(1)}
          MACD: Line ${data.macd.line.toFixed(2)}, Signal ${data.macd.signal.toFixed(2)}, Hist ${data.macd.histogram.toFixed(2)}
          Moving Averages: EMA(9) $${data.ema_9.toFixed(2)}, EMA(20) $${data.ema_20.toFixed(2)}, SMA(200) $${data.sma_200.toFixed(2)}
          Volatility (ATR): ${data.atr.toFixed(2)}
          
          Provide a structured, professional report with these exact sections:

          1. **Executive Summary**:
             - Directional Bias (Bullish/Bearish/Neutral).
             - Conviction Level (High/Medium/Low).

          2. **Technical Deep Dive**:
             - Analyze the relationship between Price, EMA 9, and EMA 20.
             - Interpret Momentum: Is RSI overbought/sold? Is MACD converging/diverging?
             - Assess Market Structure relative to the 200 SMA (Long-term baseline).

          3. **Profitability & Risk Strategy**:
             - **Probability of Success**: Estimate a percentage chance for a trend-following trade.
             - **Stop Loss Placement**: Suggest a specific price level based on 1.5x ATR volatility.
             - **Profit Target**: Suggest a target to achieve a minimum 1:2 Risk/Reward ratio.

          Tone: Analytical, decisive, and institutional.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "Technical analysis unavailable.";
    } catch (error) {
        console.error("Gemini Tech Analysis Error:", error);
        return "Failed to generate technical analysis.";
    }
}

export const analyzeMarketScan = async (stock: MarketScanResult): Promise<{ rating: number; reason: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
      return { rating: 0, reason: "API Key Missing" };
  }

  try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        Analyze this market scanner result for ${stock.ticker}.
        
        Data:
        - Price: $${stock.price}
        - Change: ${stock.change_percent}%
        - RVOL: ${stock.relative_volume}
        - Pattern: ${stock.setup}
        - Sector: ${stock.sector}

        Is this a high-quality breakout/setup or a likely fakeout? 
        Rate it from 1-10 (10 being best).
        Provide a single sentence rationale.

        Return JSON format: { "rating": number, "reason": "string" }
      `;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
      });

      const result = JSON.parse(response.text || '{}');
      return {
          rating: result.rating || 5,
          reason: result.reason || "Analysis unavailable"
      };
  } catch (error) {
      console.error("Gemini Scan Error:", error);
      return { rating: 0, reason: "AI Error" };
  }
}
