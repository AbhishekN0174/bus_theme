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
            width: "300px",
            maxHeight: "400px",
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

        // Messages container
        const messages = document.createElement("div");
        messages.style.flex = "1";
        messages.style.overflowY = "auto";
        messages.style.padding = "10px";
        chatWindow.appendChild(messages);

        // Input box
        const inputContainer = document.createElement("div");
        inputContainer.style.display = "flex";
        chatWindow.appendChild(inputContainer);

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type your message...";
        Object.assign(input.style, {flex: "1", padding: "5px"});
        inputContainer.appendChild(input);

        const sendBtn = document.createElement("button");
        sendBtn.innerText = "Send";
        Object.assign(sendBtn.style, {padding: "5px 10px"});
        inputContainer.appendChild(sendBtn);

        // Toggle chat
        chatBtn.onclick = () => {
            chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
        };

        // Send message
        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            // Show user message
            const userMsg = document.createElement("div");
            userMsg.innerText = text;
            userMsg.style.textAlign = "right";
            userMsg.style.margin = "5px 0";
            messages.appendChild(userMsg);

            input.value = "";

            // Call Frappe API
            try {
                const res = await frappe.call({
                    method: "business_theme_v14.business_theme_v14.api.search_any",
                    args: { query: text }
                });

                const data = res.message.results;
                const botMsg = document.createElement("div");

                if (data.length === 0) {
                    botMsg.innerText = "🤖 No results found.";
                } else {
                    botMsg.innerText = data.map(d => `${d.doctype}: ${d.name}`).join("\n");
                }

                botMsg.style.textAlign = "left";
                botMsg.style.margin = "5px 0";
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
