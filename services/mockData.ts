
import { BrokerOrder, PLDay, TradeSignal, UserSettings, ForecastData, AutomationRule, UserProfile, NewsItem, TechnicalIndicator, TradingBot, MarketScanResult } from '../types';

// Mock User Profile
export const mockUser: UserProfile = {
  id: 'u-123',
  email: 'demo@govelites.com',
  name: 'Alex Trader',
  plan: 'pro'
};

// Mock User Settings
export const mockSettings: UserSettings = {
  user_id: 'u-123',
  auto_trade_enabled: false,
  paper_trading: true,
  daily_max_loss: 250,
  risk_per_trade: 83.33,
  max_open_trades: 3,
  strategy_name: 'Trader1 Scale-Out',
  position_size_model: 'fixed_risk',
  tp1_percentage: 60,
  tp2_percentage: 40,
  tp1_offset: 0.15,
  tp2_offset: 0.30,
  sl1_offset: 0.075,
  sl2_offset: 0.15,
  move_sl_to_be_after_tp1: true,
  api_config: {
    broker: 'alpaca',
    alpaca_paper_key: 'PK_TEST_123456789',
    alpaca_paper_secret: 'sk_test_****************',
    providers: {}, // Initialize empty, will be filled by UI
  }
};

// Mock Bots
export const mockBots: TradingBot[] = [
  {
    id: 'bot-default',
    name: 'Default Bot',
    description: 'Systematic, low-frequency ETF momentum and mean-reversion.',
    active: true,
    isDefault: true,
    details: {
      frequency: 'Low (1-2 trades/week)',
      instruments: ['TQQQ', 'SQQQ'],
      strategies: ['Trend-following', 'Mean-reversion']
    },
    performance: {
      cagr: '40%',
      drawdown: '33%'
    },
    risk: {
      daily_loss_cap: 250,
      description: 'Leverage-aware risk with per-symbol overrides.'
    }
  },
  { 
    id: 'bot-1', 
    name: 'MA Crossover Bot (9/20)', 
    description: 'Trades based on the crossover of 9 and 20-period moving averages.', 
    active: false 
  },
  { 
    id: 'bot-2', 
    name: 'Price Action Candlestick Bot', 
    description: 'Identifies key candlestick patterns at support/resistance zones with a strict risk/reward ratio.', 
    active: false 
  },
  { 
    id: 'bot-3', 
    name: 'Opening Range Breakout (ORB)', 
    description: 'A classic day-trading momentum strategy for the first hour of market open.', 
    active: false 
  },
  { 
    id: 'bot-4', 
    name: 'ABCD Pattern', 
    description: 'Classic harmonic reversal pattern trading.', 
    active: false 
  },
  { 
    id: 'bot-5', 
    name: 'Fibonacci Retracement', 
    description: 'Trades pullbacks to key Fibonacci levels in a trend.', 
    active: false 
  },
  { 
    id: 'bot-6', 
    name: 'Earnings Season Gap', 
    description: 'A short-term event-driven strategy to trade momentum after earnings news.', 
    active: false 
  },
  { 
    id: 'bot-7', 
    name: '"Fallen Angel" Reversal', 
    description: 'A short-term, high-risk, high-reward contrarian reversal play.', 
    active: false 
  },
  { 
    id: 'bot-8', 
    name: 'Swing-Trading S&P 500 ETFs', 
    description: 'A swing trading strategy (days to weeks) for major market ETFs.', 
    active: false 
  },
  { 
    id: 'bot-9', 
    name: 'Gold & Oil Futures Contrarian', 
    description: 'Contrarian bot for futures, typically for swing trading.', 
    active: false 
  },
  { 
    id: 'bot-10', 
    name: 'Blue-Chip Dividend Capture', 
    description: 'A short-term income strategy focused on capturing dividends.', 
    active: false 
  },
  { 
    id: 'bot-11', 
    name: 'Forex (EUR/USD) Breakout', 
    description: 'Day-trading or short-swing breakout opportunities in Forex.', 
    active: false 
  },
  { 
    id: 'bot-12', 
    name: 'Pairs Trading (Market Neutral)', 
    description: "Trade correlated assets' mean-reversion. A market-neutral approach.", 
    active: false 
  },
  { 
    id: 'bot-13', 
    name: 'Volatility Crush (Post-Event)', 
    description: 'Profit from post-earnings IV crush. An event-driven options strategy.', 
    active: false 
  },
  { 
    id: 'bot-14', 
    name: 'VIX Fade (Contrarian)', 
    description: 'Short volatility on extreme VIX spikes. A high-risk, mean-reversion play.', 
    active: false 
  },
  { 
    id: 'bot-15', 
    name: 'Momentum with Volume Confirmation', 
    description: 'Momentum trades confirmed by volume. A swing or day-trading strategy.', 
    active: false 
  },
  { 
    id: 'bot-16', 
    name: 'Sector Rotation (Macro)', 
    description: 'A long-term macro strategy to rotate capital between market sectors.', 
    active: false 
  },
];

// Mock Signals
export const mockSignals: TradeSignal[] = [
  {
    id: 's-1',
    user_id: 'u-123',
    src: 'scanner',
    ticker: 'NVDA',
    side: 'long',
    entry: 132.50,
    stop: 130.00,
    reason: 'Breakout above VWAP',
    rvol: 2.5,
    catalyst: 'Earnings anticipation',
    received_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: 's-2',
    user_id: 'u-123',
    src: 'tradingview',
    ticker: 'TSLA',
    side: 'short',
    entry: 215.00,
    stop: 218.50,
    reason: 'Resistance rejection at daily high',
    rvol: 1.8,
    received_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 's-3',
    user_id: 'u-123',
    src: 'scanner',
    ticker: 'AMD',
    side: 'long',
    entry: 160.20,
    stop: 158.00,
    reason: 'Sector sympathy move',
    rvol: 1.2,
    received_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  }
];

// Mock Orders
export const mockOrders: BrokerOrder[] = [
  {
    id: 'o-1',
    user_id: 'u-123',
    signal_id: 's-2',
    broker: 'alpaca',
    mode: 'paper',
    qty: 100,
    q1: 60,
    q2: 40,
    entry: 215.00,
    tp1: 212.00,
    tp2: 210.00,
    sl1: 218.50,
    sl2: 218.50,
    status: 'filled',
    created_at: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: 'o-2',
    user_id: 'u-123',
    signal_id: 's-3',
    broker: 'alpaca',
    mode: 'paper',
    qty: 50,
    q1: 30,
    q2: 20,
    entry: 160.20,
    tp1: 162.00,
    tp2: 164.00,
    sl1: 158.00,
    sl2: 158.00,
    status: 'submitted',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  }
];

// Mock P/L Data for Chart
export const mockPLData: PLDay[] = Array.from({ length: 7 }).map((_, i) => ({
  id: `pl-${i}`,
  user_id: 'u-123',
  trading_day: new Date(Date.now() - 1000 * 60 * 60 * 24 * (6 - i)).toISOString().split('T')[0],
  realized_pl: Math.floor(Math.random() * 500) - 200, // Random P/L between -200 and 300
  updated_at: new Date().toISOString(),
}));

// Mock Forecast Data
export const mockForecastData: ForecastData[] = [
  { month: 'Jan', conservative: 1000, expected: 1500, aggressive: 2200 },
  { month: 'Feb', conservative: 2100, expected: 3200, aggressive: 4500 },
  { month: 'Mar', conservative: 3300, expected: 5000, aggressive: 7800 },
  { month: 'Apr', conservative: 4600, expected: 7100, aggressive: 11500 },
  { month: 'May', conservative: 6000, expected: 9500, aggressive: 16000 },
  { month: 'Jun', conservative: 7500, expected: 12000, aggressive: 21000 },
  { month: 'Jul', conservative: 9000, expected: 15000, aggressive: 26000 },
];

// Mock Automation Rules
export const mockAutomationRules: AutomationRule[] = [
  {
    id: 'r-1',
    name: 'Stop-Loss Circuit Breaker',
    trigger: 'pl_threshold',
    condition: 'Daily Loss > $200',
    action: 'close_position',
    active: true,
  },
  {
    id: 'r-2',
    name: 'Earnings Volatility Alert',
    trigger: 'news_event',
    condition: 'Earnings in < 15 min',
    action: 'email_alert',
    active: true,
  },
  {
    id: 'r-3',
    name: 'Profit Lock',
    trigger: 'price_level',
    condition: 'Price > VWAP + 2SD',
    action: 'hedge',
    active: false,
  }
];

export const mockNews: NewsItem[] = [
  {
    id: 'n-1',
    headline: "Fed Signals Potential Rate Cuts Later This Year Amid Cooling Inflation",
    source: "Bloomberg",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    tickers: ['SPY', 'QQQ'],
    sentiment: 'bullish',
    url: '#'
  },
  {
    id: 'n-2',
    headline: "Tesla Deliveries Miss Estimates as Competition Heats Up in China",
    source: "Reuters",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    tickers: ['TSLA'],
    sentiment: 'bearish',
    url: '#'
  },
  {
    id: 'n-3',
    headline: "NVIDIA Announces New AI Chip Architecture, Blackwell",
    source: "TechCrunch",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    tickers: ['NVDA', 'AMD'],
    sentiment: 'bullish',
    url: '#'
  },
  {
    id: 'n-4',
    headline: "Oil Prices Stabilize After Weeks of Volatility",
    source: "CNBC",
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    tickers: ['USO', 'XLE'],
    sentiment: 'neutral',
    url: '#'
  }
];

export const mockTechnicalIndicators: TechnicalIndicator[] = [
  {
    ticker: 'NVDA',
    price: 132.50,
    rsi_14: 68.5,
    macd: { line: 1.2, signal: 0.8, histogram: 0.4 },
    ema_9: 130.10,
    ema_20: 128.45,
    sma_200: 110.00,
    atr: 3.50,
    trend: 'uptrend'
  },
  {
    ticker: 'TSLA',
    price: 215.00,
    rsi_14: 42.0,
    macd: { line: -0.5, signal: 0.1, histogram: -0.6 },
    ema_9: 218.00,
    ema_20: 221.50,
    sma_200: 195.00,
    atr: 6.20,
    trend: 'downtrend'
  },
  {
    ticker: 'AAPL',
    price: 225.30,
    rsi_14: 55.0,
    macd: { line: 0.1, signal: 0.15, histogram: -0.05 },
    ema_9: 224.50,
    ema_20: 223.80,
    sma_200: 180.00,
    atr: 2.10,
    trend: 'sideways'
  }
];

// Helper to generate mock data for any ticker with logic consistency
export const generateMockTechnicalIndicator = (ticker: string): TechnicalIndicator => {
  const basePrice = Math.random() * 400 + 20; // $20 - $420
  // 40% Uptrend, 30% Downtrend, 30% Sideways
  const trendType = Math.random();
  const trend = trendType > 0.6 ? 'uptrend' : trendType > 0.3 ? 'downtrend' : 'sideways';
  
  let price = basePrice;
  let sma200 = basePrice;
  let ema20 = basePrice;
  let ema9 = basePrice;
  let rsi = 50;
  let macdHist = 0;

  // Enforce correlation based on trend for AI logic
  if (trend === 'uptrend') {
      sma200 = basePrice * 0.85; // Price above SMA 200
      ema20 = basePrice * 0.95; // Price above EMA 20
      ema9 = basePrice * 0.98; // Price above EMA 9
      rsi = 55 + Math.random() * 25; // RSI > 55 (Bullish)
      macdHist = Math.random() * 0.5 + 0.1; // Positive momentum
  } else if (trend === 'downtrend') {
      sma200 = basePrice * 1.15; // Price below SMA 200
      ema20 = basePrice * 1.05;
      ema9 = basePrice * 1.02;
      rsi = 20 + Math.random() * 25; // RSI < 45 (Bearish)
      macdHist = -Math.random() * 0.5 - 0.1; // Negative momentum
  } else {
      sma200 = basePrice * (0.98 + Math.random() * 0.04); // Choppy around SMA
      rsi = 40 + Math.random() * 20; // Neutral RSI
      macdHist = (Math.random() * 0.2 - 0.1); // Flat momentum
  }

  return {
    ticker: ticker.toUpperCase(),
    price: price,
    rsi_14: rsi,
    macd: { 
      line: macdHist * 2, 
      signal: macdHist, 
      histogram: macdHist 
    },
    ema_9: ema9,
    ema_20: ema20,
    sma_200: sma200,
    atr: price * 0.025, // ~2.5% volatility
    trend: trend
  };
};

// Generate Market Scanner Results
export const generateMarketScanResults = (count: number = 10): MarketScanResult[] => {
  const tickers = ['AAPL', 'NVDA', 'AMD', 'TSLA', 'MSFT', 'META', 'GOOGL', 'AMZN', 'NFLX', 'COIN', 'PLTR', 'SOFI', 'MARA', 'DKNG', 'HOOD'];
  const sectors = ['Technology', 'Consumer Discretionary', 'Finance', 'Services'];
  const setups = ['Bull Flag', 'Breakout', 'Reversal', 'Oversold Bounce', 'Volume Spike', 'New High'];

  return Array.from({ length: count }).map((_, i) => {
    const isGreen = Math.random() > 0.4;
    return {
      ticker: tickers[Math.floor(Math.random() * tickers.length)],
      price: parseFloat((Math.random() * 300 + 10).toFixed(2)),
      change_percent: parseFloat(((Math.random() * 10) * (isGreen ? 1 : -1)).toFixed(2)),
      volume: Math.floor(Math.random() * 5000000) + 500000,
      relative_volume: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      setup: setups[Math.floor(Math.random() * setups.length)]
    };
  });
};
