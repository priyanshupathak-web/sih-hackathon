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
