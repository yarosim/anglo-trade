
export interface APIConfig {
  broker: 'alpaca' | 'binance' | 'ibkr';
  alpaca_paper_key?: string;
  alpaca_paper_secret?: string;
  alpaca_live_key?: string;
  alpaca_live_secret?: string;
  providers: Record<string, {
    apiKey?: string;
    secretKey?: string;
    baseUrl?: string;
  }>;
  openai_key?: string; 
  gemini_key?: string; 
}

export interface TradingBot {
  id: string;
  name: string;
  description: string;
  active: boolean;
  isDefault?: boolean;
  details?: {
    frequency?: string;
    instruments?: string[];
    strategies?: string[];
  };
  performance?: {
    cagr: string;
    drawdown: string;
  };
  risk?: {
    daily_loss_cap: number;
    description: string;
  };
}

export interface UserSettings {
  user_id: string;
  auto_trade_enabled: boolean;
  paper_trading: boolean;
  daily_max_loss: number;
  risk_per_trade: number;
  max_open_trades: number;
  strategy_name: string;
  position_size_model: 'fixed_risk' | 'fixed_qty' | 'percent_account';
  tp1_percentage: number; 
  tp2_percentage: number; 
  tp1_offset: number;
  tp2_offset: number;
  sl1_offset: number;
  sl2_offset: number;
  move_sl_to_be_after_tp1: boolean;
  api_config: APIConfig;
  created_at?: string;
}

export interface BrokerAccount {
  id: string;
  currency: string;
  cash: number;
  buying_power: number;
  equity: number;
  daytrade_count: number;
  is_day_trader: boolean;
  status: 'ACTIVE' | 'RESTRICTED' | 'CLOSED';
}

export interface Position {
  symbol: string;
  qty: number;
  avg_entry_price: number;
  current_price: number;
  market_value: number;
  unrealized_pl: number;
  unrealized_plpc: number;
  side: 'long' | 'short';
}

export interface TradeSignal {
  id: string;
  user_id: string;
  src: 'tradingview' | 'scanner' | 'ai_forecast';
  ticker: string;
  side: 'long' | 'short';
  entry: number;
  stop: number;
  reason?: string;
  rvol?: number;
  catalyst?: string;
  received_at: string;
  uniq_key?: string;
}

export interface BrokerOrder {
  id: string;
  user_id: string;
  signal_id?: string;
  broker: string;
  mode: 'paper' | 'live';
  qty: number;
  q1: number;
  q2: number;
  entry: number;
  tp1: number;
  tp2: number;
  sl1: number;
  sl2: number;
  status: 'submitted' | 'filled' | 'canceled' | 'rejected';
  broker_order_ids?: any;
  created_at: string;
}

export interface PLDay {
  id: string;
  user_id: string;
  trading_day: string;
  realized_pl: number;
  updated_at: string;
}

export interface ForecastData {
  month: string;
  conservative: number;
  expected: number;
  aggressive: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'price_level' | 'news_event' | 'pl_threshold' | 'trade_closed';
  condition: string;
  action: 'email_alert' | 'close_position' | 'hedge' | 'log_journal';
  active: boolean;
  emailTemplate?: {
    subject: string;
    body: string;
  };
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  tickers: string[];
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  aiAnalysis?: string;
  url?: string;
}

export interface TechnicalIndicator {
  ticker: string;
  price: number;
  rsi_14: number;
  macd: {
    line: number;
    signal: number;
    histogram: number;
  };
  ema_9: number;
  ema_20: number;
  sma_200: number;
  atr: number;
  trend: 'uptrend' | 'downtrend' | 'sideways';
}

export interface MarketScanResult {
  ticker: string;
  price: number;
  change_percent: number;
  volume: number;
  relative_volume: number;
  sector: string;
  setup: string;
  ai_rating?: number;
  ai_reason?: string;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  SIGNALS = 'SIGNALS',
  SCANNER = 'SCANNER',
  ORDERS = 'ORDERS',
  FORECAST = 'FORECAST',
  ANALYSIS = 'ANALYSIS',
  AUTOMATION = 'AUTOMATION',
  BILLING = 'BILLING',
  SETTINGS = 'SETTINGS',
  HELP = 'HELP'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'pro' | 'elite';
  avatar_url?: string;
}

export interface Toast {
  message: string;
  type: 'success' | 'error';
}
