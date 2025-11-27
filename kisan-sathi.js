/**
 * KISAN SATHI - AI Farming Assistant Integration
 * Powered by OpenRouter API with agricultural knowledge
 */

class KisanSathi {
  constructor() {
    this.apiKey = "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";
    this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    this.model = "x-ai/grok-4.1-fast:free";
    
    // System prompt for agricultural context
    this.systemPrompt = `You are Kisan Sathi, a friendly and knowledgeable AI farming assistant for Indian farmers. 
Your role is to help farmers with:
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

Be encouraging and empathetic. Remember farmers face real challenges.
Always suggest consulting local agricultural experts for complex issues.`;

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
    if (!this.toggleBtn) return;

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
      this.badge.style.display = 'none';
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
      this.sendBtn.disabled = true;

      // Add user message to conversation history
      this.conversationHistory.push({
        role: "user",
        content: userMessage
      });

      // Prepare messages for API
      const messages = this.conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // API Request
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "Kisan Sathi - AI Farming Assistant"
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: this.systemPrompt },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't process your request. Please try again.";

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: aiResponse
      });

      // Remove typing indicator and add AI response
      this.removeTypingIndicator();
      this.addMessageToUI(aiResponse, 'bot');

      // Save chat history
      this.saveChatHistory();

    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      this.removeTypingIndicator();
      this.addMessageToUI(
        `Sorry, I'm having trouble connecting to the server. Error: ${error.message}. Please try again in a moment.`,
        'bot'
      );
    } finally {
      this.isLoading = false;
      this.sendBtn.disabled = false;
      this.input.focus();
    }
  }

  addMessageToUI(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `kisan-sathi-message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Convert text to paragraphs and handle line breaks
    const paragraphs = message.split('\n\n').map(para => `<p>${this.escapeHtml(para.trim())}</p>`).join('');
    contentDiv.innerHTML = paragraphs || `<p>${this.escapeHtml(message)}</p>`;

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
    // Store last 10 conversations in sessionStorage to preserve during session
    const limitedHistory = this.conversationHistory.slice(-10);
    sessionStorage.setItem('kisanSathiHistory', JSON.stringify(limitedHistory));
  }

  loadChatHistory() {
    // Load previous conversation if exists
    const savedHistory = sessionStorage.getItem('kisanSathiHistory');
    if (savedHistory) {
      try {
        this.conversationHistory = JSON.parse(savedHistory);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
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
    this.messagesContainer.innerHTML = `
      <div class="kisan-sathi-message bot-message">
        <div class="message-content">
          <p>नमस्ते 👋 मैं Kisan Sathi हूँ। आप मुझसे फसलों, मौसम, सिंचाई, कीट नियंत्रण, या किसी भी कृषि समस्या के बारे में पूछ सकते हैं।</p>
          <p><small style="color: var(--color-text-secondary);">Hello 👋 I'm Kisan Sathi, your AI farming assistant.</small></p>
        </div>
      </div>
    `;
  }
}

// Initialize Kisan Sathi when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.kisanSathi = new KisanSathi();
  console.log('✅ Kisan Sathi AI Assistant loaded successfully!');
});
