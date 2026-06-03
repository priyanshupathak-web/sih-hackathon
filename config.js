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
  model: 'openrouter/owl-alpha',
  
  
  // Application settings
  appName: 'Kisan Sathi',
  environment: 'development'
};
export const AUTH0_CONFIG = {
  domain: 'YOUR_DOMAIN.auth0.com',     // e.g., dev-abc123.us.auth0.com
  clientId: 'YOUR_CLIENT_ID',          // From Auth0 dashboard
  audience: 'https://YOUR_DOMAIN.auth0.com/api/v2/'  // Optional for API calls
};

export default API_CONFIG;
