/**
 * config.js - API Configuration
 * 
 * ⚠️ IMPORTANT: Do NOT commit this file to Git!
 * Add to .gitignore to prevent exposing your API key
 * 
 * This file contains your sensitive credentials and should never be public
 */

export const API_CONFIG = {
  // Your OpenRouter API Key
  apiKey: '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',
  
  // OpenRouter API Endpoint
  apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
  
  // Model to use
  model: 'openai/gpt-oss-20b:freee',
  
  // Application settings
  appName: 'Kisan Sathi',
  environment: 'development'
};

export default API_CONFIG;
