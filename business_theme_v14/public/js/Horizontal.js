(() => {
    function initChatbot() {
        if (!window.frappe || !document.body) return setTimeout(initChatbot, 1000);
        if (document.getElementById("ai-chatbot-button")) return;

        // --- Chat Button ---
        const chatBtn = document.createElement("button");
        chatBtn.id = "ai-chatbot-button";
        chatBtn.innerText = "💬";
        Object.assign(chatBtn.style, {
            position: "fixed", bottom: "25px", right: "25px",
            width: "60px", height: "60px", borderRadius: "50%",
            backgroundColor: "#007bff", color: "#fff",
            fontSize: "26px", border: "none", cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)", zIndex: "9999999"
        });
        document.body.appendChild(chatBtn);

        // --- Chat Window ---
        const chatWindow = document.createElement("div");
        chatWindow.id = "ai-chatbot-window";
        Object.assign(chatWindow.style, {
            position: "fixed", bottom: "100px", right: "25px",
            width: "350px", height: "450px", backgroundColor: "#fff",
            borderRadius: "16px", display: "none", flexDirection: "column",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)", overflow: "hidden", zIndex: "99999999"
        });
        chatWindow.innerHTML = `
            <div style="background:#007bff;color:white;padding:12px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;">
                <span>AI Assistant 🤖</span>
                <span id="ai-chatbot-close" style="cursor:pointer;">&times;</span>
            </div>
            <div id="ai-chatbot-messages" style="flex:1;padding:12px;overflow-y:auto;background:#f8f9fa;">
                <div style="margin-bottom:8px;color:#555;">👋 Hello! Ask me about employees, leaves, or expenses.</div>
            </div>
            <div style="display:flex;border-top:1px solid #ddd;padding:8px;">
                <input id="ai-chatbot-input" type="text" placeholder="Type here..." 
                    style="flex:1;border:1px solid #ccc;border-radius:6px;padding:8px;">
                <button id="ai-chatbot-send" 
                    style="margin-left:8px;background:#007bff;color:white;border:none;border-radius:6px;padding:8px 12px;cursor:pointer;">Send</button>
            </div>
        `;
        document.body.appendChild(chatWindow);

        // --- Toggle Chat Window ---
        chatBtn.onclick = () => chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
        chatWindow.querySelector("#ai-chatbot-close").onclick = () => chatWindow.style.display = "none";

        const inputBox = chatWindow.querySelector("#ai-chatbot-input");
        const sendBtn = chatWindow.querySelector("#ai-chatbot-send");
        const messages = chatWindow.querySelector("#ai-chatbot-messages");

        function addMessage(text, sender = "bot") {
            const div = document.createElement("div");
            div.textContent = (sender === "user" ? "🧑 " : "🤖 ") + text;
            Object.assign(div.style, {
                margin: "6px 0",
                textAlign: sender === "user" ? "right" : "left",
                color: sender === "user" ? "#222" : "#007bff",
                whiteSpace: "pre-line"
            });
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight;
        }

        function sendMessage() {
            const text = inputBox.value.trim();
            if (!text) return;
            addMessage(text, "user");
            inputBox.value = "";
            const loadingMsg = document.createElement("div");
            loadingMsg.textContent = "🤖 Thinking...";
            loadingMsg.style.color = "#999";
            messages.appendChild(loadingMsg);
            messages.scrollTop = messages.scrollHeight;

            frappe.call({
                method: "business_theme_v14.api.get_reply",
                args: { message: text },
                callback: function (r) {
                    loadingMsg.remove();
                    if (r.message && r.message.reply) {
                        addMessage(r.message.reply, "bot");
                    } else {
                        addMessage("⚠️ No response from server.", "bot");
                    }
                },
                error: function () {
                    loadingMsg.remove();
                    addMessage("⚠️ Failed to reach server.", "bot");
                }
            });
        }

        sendBtn.onclick = sendMessage;
        inputBox.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
    }

    window.addEventListener("load", initChatbot);
    setTimeout(initChatbot, 2000);
})();
