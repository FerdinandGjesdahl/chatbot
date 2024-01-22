document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var input = document.getElementById('chat-input');
    var message = input.value.trim();
    if (message) {
        appendMessage('You', message);
        showWaitingMessage();
        input.value = '';

        fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            clearWaitingMessage();
            appendMessage('Bot', data.reply);
        })
        .catch(error => {
            clearWaitingMessage();
            appendMessage('Error', 'No connection to backend');
            console.error('Error:', error);
        });
    }
}

function appendMessage(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
}

function showWaitingMessage() {
    var chatBox = document.getElementById('chat-box');
    var waitingMessage = document.createElement('div');
    waitingMessage.id = 'waiting-message';
    waitingMessage.innerHTML = `<strong>Waiting for response...</strong>`;
    chatBox.appendChild(waitingMessage);
}

function clearWaitingMessage() {
    var waitingMessage = document.getElementById('waiting-message');
    if (waitingMessage) {
        waitingMessage.remove();
    }
}