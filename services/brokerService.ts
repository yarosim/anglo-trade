
import { APIConfig, BrokerAccount, Position, BrokerOrder } from '../types';

// Trading API Service
// Encapsulates all broker interactions and enforces configuration best practices

class BrokerService {
  
  // Validate API Credentials Format (Client-Side Best Practice)
  validateKeyFormat(broker: string, key: string, mode: 'paper' | 'live'): { valid: boolean; error?: string } {
    if (!key || key.length < 5) return { valid: false, error: 'Key is too short' };

    if (broker === 'alpaca') {
      if (mode === 'paper' && !key.startsWith('PK')) {
        return { valid: false, error: 'Alpaca Paper keys must start with "PK"' };
      }
      if (mode === 'live' && !key.startsWith('AK')) {
        return { valid: false, error: 'Alpaca Live keys must start with "AK"' };
      }
    }
    return { valid: true };
  }

  // Test Connection to Broker (Simulated)
  async testConnection(config: APIConfig, mode: 'paper' | 'live'): Promise<{ success: boolean; message: string }> {
    const key = mode === 'paper' ? config.alpaca_paper_key : config.alpaca_live_key;
    const secret = mode === 'paper' ? config.alpaca_paper_secret : config.alpaca_live_secret;
    const broker = config.broker;

    // 1. Basic Input Validation
    if (!key || !secret) {
      return { success: false, message: 'Missing API Key or Secret' };
    }

    // 2. Format Validation
    const formatCheck = this.validateKeyFormat(broker, key, mode);
    if (!formatCheck.valid) {
      return { success: false, message: formatCheck.error || 'Invalid key format' };
    }

    // 3. Network Simulation (In a real app, this would call GET /v2/account)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock Logic: Fail if secret contains "fail"
        if (secret.includes('fail')) {
          resolve({ success: false, message: 'Broker refused connection (401 Unauthorized)' });
        } else {
          resolve({ success: true, message: `Connected to ${broker.toUpperCase()} (${mode})` });
        }
      }, 1500);
    });
  }

  // Get Account Summary
  async getAccount(config: APIConfig, mode: 'paper' | 'live'): Promise<BrokerAccount | null> {
    // Mock Response
    return {
      id: 'ACC-' + Math.floor(Math.random() * 10000),
      currency: 'USD',
      cash: 25000.00,
      buying_power: 100000.00,
      equity: 25430.50,
      daytrade_count: 0,
      is_day_trader: false,
      status: 'ACTIVE'
    };
  }

  // Get Open Positions
  async getPositions(config: APIConfig, mode: 'paper' | 'live'): Promise<Position[]> {
    // Mock Response
    return [
      {
        symbol: 'NVDA',
        qty: 10,
        avg_entry_price: 130.50,
        current_price: 132.50,
        market_value: 1325.00,
        unrealized_pl: 20.00,
        unrealized_plpc: 0.015,
        side: 'long'
      }
    ];
  }
}

export const brokerService = new BrokerService();
