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
  model: 'stepfun/step-3.5-flash:free',
  
  
  // Application settings
  appName: 'Kisan Sathi',
  environment: 'development'
};

export default API_CONFIG;
