(() => {
    function initChatbot() {
        if (!window.frappe || !document.body) return setTimeout(initChatbot, 1000);
        if (document.getElementById("ai-chatbot-button")) return;

        // --- Chat Button ---
        const chatBtn = document.createElement("button");
        chatBtn.id = "ai-chatbot-button";
        chatBtn.innerText = "🤖 Chat";
        chatBtn.style.position = "fixed";
        chatBtn.style.bottom = "20px";
        chatBtn.style.right = "20px";
        chatBtn.style.padding = "10px 15px";
        chatBtn.style.borderRadius = "50px";
        chatBtn.style.background = "#007bff";
        chatBtn.style.color = "#fff";
        chatBtn.style.zIndex = 9999;
        chatBtn.style.cursor = "pointer";
        document.body.appendChild(chatBtn);

        // --- Chat Window ---
        const chatWindow = document.createElement("div");
        chatWindow.id = "ai-chatbot-window";
        chatWindow.style.position = "fixed";
        chatWindow.style.bottom = "80px";
        chatWindow.style.right = "20px";
        chatWindow.style.width = "350px";
        chatWindow.style.height = "400px";
        chatWindow.style.background = "white";
        chatWindow.style.borderRadius = "10px";
        chatWindow.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        chatWindow.style.padding = "10px";
        chatWindow.style.display = "none";
        chatWindow.style.flexDirection = "column";
        chatWindow.style.zIndex = 10000;
        document.body.appendChild(chatWindow);

        const chatArea = document.createElement("div");
        chatArea.style.flex = "1";
        chatArea.style.overflowY = "auto";
        chatArea.style.padding = "5px";
        chatArea.style.fontSize = "14px";
        chatWindow.appendChild(chatArea);

        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = "Ask anything...";
        inputBox.style.width = "100%";
        inputBox.style.padding = "8px";
        inputBox.style.borderRadius = "5px";
        inputBox.style.border = "1px solid #ccc";
        chatWindow.appendChild(inputBox);

        chatBtn.onclick = () => {
            chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
        };

        inputBox.addEventListener("keypress", async (e) => {
            if (e.key === "Enter" && inputBox.value.trim()) {
                const msg = inputBox.value.trim();
                const userMsg = document.createElement("div");
                userMsg.textContent = "🧑 " + msg;
                chatArea.appendChild(userMsg);
                inputBox.value = "";

                try {
                    const response = await frappe.call({
                        method: "business_theme_v14.api.chatbot_ai.get_ai_response",
                        args: { message: msg },
                    });

                    const botMsg = document.createElement("div");
                    botMsg.textContent = "🤖 " + response.message;
                    chatArea.appendChild(botMsg);
                    chatArea.scrollTop = chatArea.scrollHeight;
                } catch (err) {
                    console.error("Chatbot error:", err);
                }
            }
        });
    }

    initChatbot();
})();
