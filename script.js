function openChatbot() {
    document.getElementById('chatbot').style.display = 'flex';
}

function sendMessage() {
    let input = document.getElementById('userInput');
    let message = input.value.trim();
    if (!message) return;

    let chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div><b>You:</b> ${message}</div>`;

    // Placeholder AI response
    setTimeout(() => {
        chatbox.innerHTML += `<div><b>AI:</b> I'm a demo chatbot. Soon I'll connect to OpenAI API!</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);

    input.value = '';
}
