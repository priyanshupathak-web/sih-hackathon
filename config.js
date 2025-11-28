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
  model: 'mistralai/mistral-7b-instruct:free',
  
  // Application settings
  appName: 'Kisan Sathi',
  environment: 'development'
};

export default API_CONFIG;
