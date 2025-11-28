import { API_CONFIG } from './config.js';

class KisanSathi {
  constructor() {
    // Load API configuration from config.js
    this.apiKey = API_CONFIG.apiKey;
    this.apiUrl = API_CONFIG.apiUrl;
    this.model = API_CONFIG.model;

    // Validate API key is loaded
    if (!this.apiKey || this.apiKey === 'your_api_key_here') {
      console.error('❌ API Key not configured! Please update config.js with your actual API key.');
      this.showErrorMessage('Configuration error: API key not found. Please check config.js');
      return;
    }

    console.log('✅ API Configuration loaded from config.js');

    // System prompt for agricultural context
    this.systemPrompt = `You are Kisan Sathi, a friendly and knowledgeable AI farming assistant for Indian farmers. Your role is to help farmers with:
- Crop selection and seasonal planning
- Pest and disease management
- Soil health and fertility
- Irrigation and water management
- Weather interpretation and farming practices
- Organic farming methods
- Government schemes and subsidies
- Market prices and selling strategies

Keep responses:
- Simple and clear (suitable for farmers with varying literacy levels)
- In both Hindi and English when possible
- Practical and actionable
- dont show reasoning steps
- Focused on sustainable and profitable farming
- With references to Indian agricultural practices
- Maximum 20000 words per response

Be encouraging and empathetic. Remember farmers face real challenges. Always suggest consulting local agricultural experts for complex issues.`;

    this.conversationHistory = [];
    this.isLoading = false;
    this.initializeElements();
    this.attachEventListeners();
    this.loadChatHistory();
  }

  initializeElements() {
    this.toggleBtn = document.getElementById('kisanSathiToggle');
    this.window = document.getElementById('kisanSathiWindow');
    this.closeBtn = document.getElementById('kisanSathiClose');
    this.messagesContainer = document.getElementById('kisanSathiMessages');
    this.input = document.getElementById('kisanSathiInput');
    this.form = document.getElementById('kisanSathiForm');
    this.sendBtn = document.getElementById('kisanSathiSendBtn');
    this.suggestionsContainer = document.getElementById('kisanSathiSuggestions');
    this.badge = document.getElementById('kisanSathiBadge');
  }

  attachEventListeners() {
    if (!this.toggleBtn) {
      console.warn('⚠️ Kisan Sathi UI elements not found in HTML');
      return;
    }

    this.toggleBtn.addEventListener('click', () => this.toggleWindow());
    this.closeBtn.addEventListener('click', () => this.closeWindow());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Suggestion buttons
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        this.input.value = question;
        this.sendMessage(question);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.window.classList.contains('hidden')) {
        this.closeWindow();
      }
    });
  }

  toggleWindow() {
    this.window.classList.toggle('hidden');
    if (!this.window.classList.contains('hidden')) {
      this.input.focus();
      if (this.badge) this.badge.style.display = 'none';
    }
  }

  closeWindow() {
    this.window.classList.add('hidden');
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = this.input.value.trim();
    if (message) {
      this.sendMessage(message);
      this.input.value = '';
    }
  }

  sendMessage(message) {
    if (this.isLoading) {
      console.warn('⚠️ Already processing a message. Please wait.');
      return;
    }

    // Add user message to UI
    this.addMessageToUI(message, 'user');

    // Hide suggestions after first message
    if (this.suggestionsContainer) {
      this.suggestionsContainer.style.display = 'none';
    }

    // Show typing indicator
    this.showTypingIndicator();

    // Send to API
    this.callOpenRouter(message);
  }

  async callOpenRouter(userMessage) {
    try {
      this.isLoading = true;
      if (this.sendBtn) this.sendBtn.disabled = true;

      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Prepare messages for API
      const messages = this.conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      console.log('📤 Sending request to OpenRouter API...');
      console.log('API Key loaded from config.js:', this.apiKey ? '✅ Yes' : '❌ No');

      // API Request
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'Kisan Sathi - AI Farming Assistant'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.systemPrompt
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        })
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('✅ API Response received successfully');

      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I couldn\'t process your request. Please try again.';

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      // Remove typing indicator and add AI response
      this.removeTypingIndicator();
      this.addMessageToUI(aiResponse, 'bot');

      // Save chat history
      this.saveChatHistory();
    } catch (error) {
      console.error('❌ Error calling OpenRouter API:', error);
      this.removeTypingIndicator();

      let errorMessage = `Error: ${error.message}`;

      if (error.message.includes('401')) {
        errorMessage = '❌ Authentication failed. Please check your API key in config.js';
      } else if (error.message.includes('429')) {
        errorMessage = '⏱️ Rate limit exceeded. Please wait a moment and try again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = '🌐 Network error. Please check your internet connection.';
      }

      this.addMessageToUI(errorMessage, 'bot');
    } finally {
      this.isLoading = false;
      if (this.sendBtn) this.sendBtn.disabled = false;
      if (this.input) this.input.focus();
    }
  }

  addMessageToUI(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `kisan-sathi-message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;

    messageDiv.appendChild(contentDiv);
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'kisan-sathi-message bot-message';
    messageDiv.id = 'typing-indicator';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      contentDiv.appendChild(dot);
    }

    messageDiv.appendChild(contentDiv);
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  saveChatHistory() {
    const limitedHistory = this.conversationHistory.slice(-10);
    try {
      sessionStorage.setItem('kisanSathiHistory', JSON.stringify(limitedHistory));
    } catch (error) {
      console.warn('⚠️ Could not save chat history:', error);
    }
  }

  loadChatHistory() {
    try {
      const savedHistory = sessionStorage.getItem('kisanSathiHistory');
      if (savedHistory) {
        this.conversationHistory = JSON.parse(savedHistory);
        console.log('📖 Loaded previous chat history');
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  clearHistory() {
    this.conversationHistory = [];
    sessionStorage.removeItem('kisanSathiHistory');
    if (this.messagesContainer) {
      this.messagesContainer.innerHTML = '';
    }
    console.log('🗑️ Chat history cleared');
  }

  showErrorMessage(message) {
    console.error(message);
    if (this.messagesContainer) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'kisan-sathi-message bot-message';
      messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(message)}</div>`;
      this.messagesContainer.appendChild(messageDiv);
    }
  }
}

// Initialize Kisan Sathi when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.kisanSathi = new KisanSathi();
  console.log('✅ Kisan Sathi AI Assistant loaded successfully!');
});
