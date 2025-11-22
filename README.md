# TradeFlow Pro

**Automated trading guardrails and AI-powered signal analysis for disciplined traders.**

## Company Thinking

### Problem
Retail traders fail not because of a lack of signals, but because of a lack of discipline and risk management. Existing tools are either too complex (TradingView + APIs) or too simple (Robinhood).

### Solution
A "Smart Dashboard" that acts as a risk manager. It connects to brokers, enforces daily loss limits, and uses AI to second-guess bad trade ideas before they are executed.

## Operational Playbook

### Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Add `API_KEY` for Gemini AI.
3. Add Stripe Keys (See `ops/stripe_guide.md`).

### Deployment
- **Frontend**: Deployed via AI Studio / Vercel.
- **PWA**: Manifest included for 'Add to Home Screen' functionality.
- **Greenlight**: See `ops/greenlight.md` for strategic alignment.

### Testing
- **Demo Mode**: Click "Try Demo" on the landing page to access a pre-filled account.
- **Mock Data**: Located in `services/mockData.ts`.

## Key Features
- **AI Signal Analysis**: Real-time validity checks on trade setups.
- **P/L Forecasting**: AI-driven projection of portfolio growth with seasonality.
- **Smart Automation**: Auto-email campaigns triggered by market events (e.g., "Stop Loss Hit" journal prompt).
- **Risk Guardrails**: Hard stops on daily P/L.

## Contact
📞 Phone: 919-701-9684  
📧 Email: info@govelites.com  
🏢 Office: Durham, NC 27712  

**Business Hours:**  
Mon-Fri: 9:00 AM – 6:00 PM EST  
Sat: 10:00 AM – 4:00 PM EST  
Sun: Closed
