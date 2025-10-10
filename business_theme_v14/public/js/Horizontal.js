sendBtn.onclick = () => {
    const text = inputBox.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.textContent = "🧑 " + text;
    Object.assign(userMsg.style, { textAlign: "right", margin: "6px 0", color: "#222" });
    messages.appendChild(userMsg);
    inputBox.value = "";

    const aiMsg = document.createElement("div");
    aiMsg.textContent = "🤖 Thinking...";
    Object.assign(aiMsg.style, { margin: "6px 0", color: "#007bff" });
    messages.appendChild(aiMsg);

    messages.scrollTop = messages.scrollHeight;

    // 🔥 Send to Frappe API
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
