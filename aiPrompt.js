window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatContainer = document.getElementById('chatbot-container');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  // Toggle chat window visibility
  toggleBtn.addEventListener('click', () => {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
      chatContainer.style.display = 'flex';
      input.focus();
    } else {
      chatContainer.style.display = 'none';
    }
  });

  // Enter key handler
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
      const userText = input.value.trim().toLowerCase();

      // Show user message
      const userMsg = document.createElement('p');
      userMsg.textContent = `You: ${input.value}`;
      userMsg.style.fontWeight = 'bold';
      messages.appendChild(userMsg);

      // Redirect logic
      let response = "Sorry, I didn't understand that command.";
      let redirectUrl = null;

      if (userText.includes('booking')) redirectUrl = 'booking.html';
      else if (userText.includes('pre-flight') || userText.includes('upgrade')) redirectUrl = 'preflight.html';
      else if (userText.includes('in-flight')) redirectUrl = 'inflight.html';
      else if (userText.includes('post-flight')) redirectUrl = 'postflight.html';
      else if (userText.includes('loyalty')) redirectUrl = 'loyalty.html';

      if (redirectUrl) {
        response = `Redirecting you to the ${redirectUrl.replace('.html','').replace(/-/g, ' ')} page...`;
        const aiMsg = document.createElement('p');
        aiMsg.textContent = `AI: ${response}`;
        messages.appendChild(aiMsg);
        setTimeout(() => window.location.href = redirectUrl, 1500);
      } else {
        const aiMsg = document.createElement('p');
        aiMsg.textContent = `AI: ${response}`;
        messages.appendChild(aiMsg);
      }

      messages.scrollTop = messages.scrollHeight;
      input.value = '';
    }
  });
});
