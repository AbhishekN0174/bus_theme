(() => {
    function initChatbot() {
        if (!window.frappe || !document.body) return setTimeout(initChatbot, 1000);
        if (document.getElementById("ai-chatbot-button")) return;

        // Chat button
        const chatBtn = document.createElement("button");
        chatBtn.id = "ai-chatbot-button";
        chatBtn.innerText = "💬 AI Assistant";
        Object.assign(chatBtn.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "12px 18px",
            cursor: "pointer",
            zIndex: "9999",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        });
        document.body.appendChild(chatBtn);

        // Chat window
        const chatBox = document.createElement("div");
        chatBox.id = "chat-window";
        chatBox.style.cssText = `
            display:none;
            position:fixed;
            bottom:80px;
            right:20px;
            width:320px;
            height:420px;
            background:#fff;
            border-radius:12px;
            box-shadow:0 4px 20px rgba(0,0,0,0.4);
            z-index:10000;
            overflow:hidden;
            flex-direction:column;
        `;
        chatBox.innerHTML = `
            <div style="background:#007bff;color:#fff;padding:12px;font-weight:600;">
                🤖 AI Assistant
                <button id="close-chat" style="float:right;background:none;border:none;color:#fff;cursor:pointer;">×</button>
            </div>
            <div id="chat-body" style="flex:1;overflow-y:auto;padding:10px;font-size:14px;"></div>
            <div style="display:flex;padding:8px;border-top:1px solid #eee;">
                <input id="chat-input" placeholder="Type a message..." style="flex:1;padding:8px;border:1px solid #ccc;border-radius:8px;">
                <button id="send-btn" style="margin-left:6px;padding:8px 14px;background:#007bff;color:#fff;border:none;border-radius:8px;">Send</button>
            </div>
        `;
        document.body.appendChild(chatBox);

        chatBtn.onclick = () => (chatBox.style.display = "flex");
        chatBox.querySelector("#close-chat").onclick = () => (chatBox.style.display = "none");

        const chatBody = chatBox.querySelector("#chat-body");
        const chatInput = chatBox.querySelector("#chat-input");

        function appendMsg(sender, text) {
            const msg = document.createElement("div");
            msg.style.margin = "6px 0";
            msg.style.textAlign = sender === "user" ? "right" : "left";
            msg.innerHTML = `<span style="display:inline-block;padding:8px 12px;border-radius:12px;max-width:80%;background:${
                sender === "user" ? "#007bff;color:#fff" : "#f1f1f1"
            };">${text}</span>`;
            chatBody.appendChild(msg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        async function sendMessage() {
            const msg = chatInput.value.trim();
            if (!msg) return;
            appendMsg("user", msg);
            chatInput.value = "";

            try {
                const res = await frappe.call({
                    method: "business_theme_v14.business_theme_v14.api.get_reply",
                    args: { message: msg },
                });

                const data = res.message;

                if (data.data && Array.isArray(data.data)) {
                    appendMsg("bot", `<b>${data.type.toUpperCase()} Data:</b><br>${data.data.map(d => JSON.stringify(d)).join("<br>")}`);
                } else {
                    appendMsg("bot", data.reply || "No data found.");
                }
            } catch (err) {
                appendMsg("bot", "⚠️ Failed to reach server.");
                console.error(err);
            }
        }

        chatBox.querySelector("#send-btn").onclick = sendMessage;
        chatInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
    }

    initChatbot();
})();
