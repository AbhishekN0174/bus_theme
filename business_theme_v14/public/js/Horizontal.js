frappe.ready(() => {
    console.log("Horizontal.js loaded!"); // For testing in console

    // ---------- Chat Button ----------
    const chatButton = document.createElement('button');
    chatButton.innerHTML = '💬';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.right = '20px';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.background = '#007bff';
    chatButton.style.color = '#fff';
    chatButton.style.fontSize = '24px';
    chatButton.style.cursor = 'pointer';
    chatButton.style.zIndex = '1000';
    document.body.appendChild(chatButton);

    // ---------- Chat Window ----------
    const chatWindow = document.createElement('div');
    chatWindow.style.position = 'fixed';
    chatWindow.style.bottom = '90px';
    chatWindow.style.right = '20px';
    chatWindow.style.width = '320px';
    chatWindow.style.height = '400px';
    chatWindow.style.background = '#fff';
    chatWindow.style.border = '1px solid #ccc';
    chatWindow.style.borderRadius = '12px';
    chatWindow.style.display = 'none';
    chatWindow.style.flexDirection = 'column';
    chatWindow.style.zIndex = '1000';
    document.body.appendChild(chatWindow);

    const messagesDiv = document.createElement('div');
    messagesDiv.style.flex = '1';
    messagesDiv.style.overflowY = 'auto';
    messagesDiv.style.padding = '10px';
    chatWindow.appendChild(messagesDiv);

    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Ask me something...';
    inputBox.style.width = '80%';
    inputBox.style.margin = '8px';
    chatWindow.appendChild(inputBox);

    const sendBtn = document.createElement('button');
    sendBtn.innerText = 'Send';
    sendBtn.style.width = '50px';
    sendBtn.style.margin = '8px';
    chatWindow.appendChild(sendBtn);

    // ---------- Toggle Chat Window ----------
    chatButton.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    };

    // ---------- Send Message Function (Test Only) ----------
    async function sendMessage() {
        const message = inputBox.value.trim();
        if (!message) return;

        messagesDiv.innerHTML += `<div><b>You:</b> ${message}</div>`;
        inputBox.value = '';

        // Temporary test response
        messagesDiv.innerHTML += `<div><b>Bot:</b> Hello! Chatbot is working.</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Later you can replace above with actual API call:
        /*
        try {
            const res = await frappe.call({
                method: "business_theme_v14.api.chatbot_reply",
                args: { message },
            });
            const reply = res.message || "Sorry, I didn't understand that.";
            messagesDiv.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } catch (e) {
            messagesDiv.innerHTML += `<div><b>Bot:</b> Error connecting to chatbot.</div>`;
        }
        */
    }

    // ---------- Event Listeners ----------
    sendBtn.onclick = sendMessage;
    inputBox.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });
});
