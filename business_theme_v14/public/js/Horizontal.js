(() => {
    function initChatbot() {
        if (!window.frappe || !document.body) return setTimeout(initChatbot, 1000);
        if (document.getElementById("ai-chatbot-button")) return;

        // --- Chat Button ---
        const chatBtn = document.createElement("button");
        chatBtn.id = "ai-chatbot-button";
        chatBtn.innerText = "🤖 Chat";
        Object.assign(chatBtn.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "10px 20px",
            background: "#ffb400",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        });
        document.body.appendChild(chatBtn);

        // --- Chat Window ---
        const chatWindow = document.createElement("div");
        chatWindow.id = "ai-chatbot-window";
        Object.assign(chatWindow.style, {
            position: "fixed",
            bottom: "70px",
            right: "20px",
            width: "350px",
            maxHeight: "450px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "none",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        });
        document.body.appendChild(chatWindow);

        // --- Messages Container ---
        const messages = document.createElement("div");
        messages.style.flex = "1";
        messages.style.overflowY = "auto";
        messages.style.padding = "10px";
        chatWindow.appendChild(messages);

        // --- Input Box ---
        const inputContainer = document.createElement("div");
        inputContainer.style.display = "flex";
        inputContainer.style.borderTop = "1px solid #ccc";
        chatWindow.appendChild(inputContainer);

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type your message...";
        Object.assign(input.style, { flex: "1", padding: "8px", border: "none" });
        inputContainer.appendChild(input);

        const sendBtn = document.createElement("button");
        sendBtn.innerText = "Send";
        Object.assign(sendBtn.style, {
            padding: "8px 12px",
            border: "none",
            background: "#ffb400",
            cursor: "pointer"
        });
        inputContainer.appendChild(sendBtn);

        // --- Toggle Chat Window ---
        chatBtn.onclick = () => {
            chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
        };

        // --- Send Message Function ---
        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            // Show user message
            const userMsg = document.createElement("div");
            userMsg.innerText = text;
            userMsg.style.textAlign = "right";
            userMsg.style.margin = "5px 0";
            userMsg.style.background = "#e0e0e0";
            userMsg.style.padding = "5px 8px";
            userMsg.style.borderRadius = "5px";
            messages.appendChild(userMsg);

            input.value = "";

            // Call AI + Frappe backend
            try {
                const res = await frappe.call({
                    method: "business_theme_v14.business_theme_v14.api.get_reply",
                    args: { message: text }
                });

                const botMsg = document.createElement("div");

                if (!res.message || !res.message.reply) {
                    botMsg.innerText = "🤖 No response.";
                } else {
                    // Preserve line breaks and basic formatting
                    botMsg.innerHTML = res.message.reply.replace(/\n/g, "<br>");
                }

                botMsg.style.textAlign = "left";
                botMsg.style.margin = "5px 0";
                botMsg.style.background = "#f0f0f0";
                botMsg.style.padding = "5px 8px";
                botMsg.style.borderRadius = "5px";
                messages.appendChild(botMsg);

                messages.scrollTop = messages.scrollHeight;

            } catch (err) {
                const errMsg = document.createElement("div");
                errMsg.innerText = "🤖 Error contacting server.";
                errMsg.style.color = "red";
                messages.appendChild(errMsg);
            }
        }

        sendBtn.onclick = sendMessage;
        input.onkeydown = (e) => { if (e.key === "Enter") sendMessage(); };
    }

    initChatbot();
})();
