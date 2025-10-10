(() => {
    // Safe load check — ensures frappe is ready and DOM is available
    function initChatbot() {
        console.log("💬 Initializing Chatbot...");

        if (!window.frappe || !document.body) {
            console.log("⏳ Waiting for Frappe Desk to load...");
            return setTimeout(initChatbot, 1000);
        }

        // Prevent duplicate button creation
        if (document.getElementById("ai-chatbot-button")) return;

        console.log("✅ Frappe loaded, injecting chatbot UI...");

        // ---- 1️⃣ Create Chat Button ----
        const chatBtn = document.createElement("button");
        chatBtn.id = "ai-chatbot-button";
        chatBtn.innerText = "💬";
        Object.assign(chatBtn.style, {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "26px",
            fontWeight: "bold",
            border: "none",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
            cursor: "pointer",
            zIndex: "9999999999",
            transition: "transform 0.2s ease"
        });

        chatBtn.onmouseenter = () => chatBtn.style.transform = "scale(1.1)";
        chatBtn.onmouseleave = () => chatBtn.style.transform = "scale(1)";

        document.body.appendChild(chatBtn);
        console.log("✅ Chat button added to page.");

        // ---- 2️⃣ Create Chat Popup Window ----
        const chatWindow = document.createElement("div");
        chatWindow.id = "ai-chatbot-window";
        Object.assign(chatWindow.style, {
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "350px",
            height: "450px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            display: "none",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: "99999999999"
        });

        chatWindow.innerHTML = `
            <div style="background:#007bff;color:#fff;padding:12px 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;">
                <span>AI Assistant 🤖</span>
                <span id="ai-chatbot-close" style="cursor:pointer;font-size:20px;">&times;</span>
            </div>
            <div id="ai-chatbot-messages" style="flex:1;padding:12px;overflow-y:auto;background:#f8f9fa;">
                <div style="margin-bottom:8px;color:#555;">👋 Hello! How can I help you today?</div>
            </div>
            <div style="display:flex;border-top:1px solid #ddd;padding:8px;background:#fff;">
                <input id="ai-chatbot-input" type="text" placeholder="Type your message..." 
                       style="flex:1;border:1px solid #ccc;border-radius:6px;padding:8px;">
                <button id="ai-chatbot-send" 
                        style="margin-left:8px;background:#007bff;color:#fff;border:none;border-radius:6px;padding:8px 12px;cursor:pointer;">Send</button>
            </div>
        `;
        document.body.appendChild(chatWindow);
        console.log("✅ Chat window added to DOM.");

        // ---- 3️⃣ Toggle Logic ----
        const closeBtn = chatWindow.querySelector("#ai-chatbot-close");
        chatBtn.onclick = () => {
            const isVisible = chatWindow.style.display === "flex";
            chatWindow.style.display = isVisible ? "none" : "flex";
        };
        closeBtn.onclick = () => (chatWindow.style.display = "none");

        // ---- 4️⃣ Message Sending ----
        const sendBtn = chatWindow.querySelector("#ai-chatbot-send");
        const inputBox = chatWindow.querySelector("#ai-chatbot-input");
        const messages = chatWindow.querySelector("#ai-chatbot-messages");

sendBtn.onclick = () => {
    const text = inputBox.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.textContent = "🧑 " + text;
    Object.assign(userMsg.style, { textAlign: "right", margin: "6px 0", color: "#222" });
    messages.appendChild(userMsg);
    inputBox.value = "";

    // ---- 🔥 Send Message to Backend (AI Chatbot API) ----
    const aiMsg = document.createElement("div");
    aiMsg.textContent = "🤖 Thinking...";
    Object.assign(aiMsg.style, { margin: "6px 0", color: "#007bff" });
    messages.appendChild(aiMsg);

    messages.scrollTop = messages.scrollHeight;

    frappe.call({
        method: "ai_chatbot.api.get_reply",
        args: { message: text },
        callback: function (r) {
            if (r.message && r.message.reply) {
                aiMsg.textContent = "🤖 " + r.message.reply;
            } else if (r.message && r.message.error) {
                aiMsg.textContent = "⚠️ Error: " + r.message.error;
            } else {
                aiMsg.textContent = "🤖 (No response)";
            }
            messages.scrollTop = messages.scrollHeight;
        },
        error: function (err) {
            aiMsg.textContent = "⚠️ Failed to reach server.";
        }
    });
};


    // Ensure chatbot initializes after full desk load
    window.addEventListener("load", initChatbot);
    setTimeout(initChatbot, 2000);
})();
