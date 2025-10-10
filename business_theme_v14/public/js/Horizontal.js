frappe.ready(function () {
    console.log("💬 Chatbot JS Loaded with Popup UI");

    // Wait until UI fully loads
    setTimeout(() => {
        // --- 1. Chatbot Button ---
        const chatButton = document.createElement("button");
        chatButton.innerText = "💬 Chat";
        Object.assign(chatButton.style, {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            padding: "12px 18px",
            borderRadius: "40px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            zIndex: "9999999",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            transition: "transform 0.2s ease"
        });

        chatButton.addEventListener("mouseenter", () => {
            chatButton.style.transform = "scale(1.05)";
        });
        chatButton.addEventListener("mouseleave", () => {
            chatButton.style.transform = "scale(1)";
        });

        document.body.appendChild(chatButton);

        // --- 2. Chat Window Container ---
        const chatWindow = document.createElement("div");
        Object.assign(chatWindow.style, {
            position: "fixed",
            bottom: "90px",
            right: "25px",
            width: "340px",
            height: "420px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "none",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: "99999999",
            animation: "fadeIn 0.3s ease"
        });

        // --- 3. Chat Header ---
        const header = document.createElement("div");
        header.innerText = "AI Assistant 💬";
        Object.assign(header.style, {
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "12px 16px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        });

        const closeBtn = document.createElement("span");
        closeBtn.innerHTML = "&times;";
        Object.assign(closeBtn.style, {
            cursor: "pointer",
            fontSize: "20px"
        });
        closeBtn.onclick = () => (chatWindow.style.display = "none");
        header.appendChild(closeBtn);

        chatWindow.appendChild(header);

        // --- 4. Messages Area ---
        const messages = document.createElement("div");
        Object.assign(messages.style, {
            flex: "1",
            padding: "12px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9"
        });
        messages.innerHTML = `<div style="margin-bottom:8px;color:#555;">👋 Hello! How can I help you today?</div>`;
        chatWindow.appendChild(messages);

        // --- 5. Input Area ---
        const inputContainer = document.createElement("div");
        Object.assign(inputContainer.style, {
            display: "flex",
            borderTop: "1px solid #ddd",
            padding: "8px"
        });

        const inputBox = document.createElement("input");
        Object.assign(inputBox.style, {
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px"
        });
        inputBox.placeholder = "Type your message...";

        const sendBtn = document.createElement("button");
        sendBtn.innerText = "Send";
        Object.assign(sendBtn.style, {
            marginLeft: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            cursor: "pointer"
        });

        inputContainer.appendChild(inputBox);
        inputContainer.appendChild(sendBtn);
        chatWindow.appendChild(inputContainer);

        // --- 6. Add to DOM ---
        document.body.appendChild(chatWindow);

        // --- 7. Toggle Popup ---
        chatButton.addEventListener("click", () => {
            chatWindow.style.display =
                chatWindow.style.display === "none" ? "flex" : "none";
        });

        // --- 8. Send Button Function ---
        sendBtn.addEventListener("click", () => {
            const userText = inputBox.value.trim();
            if (!userText) return;

            // Show user message
            const msg = document.createElement("div");
            msg.textContent = "🧑 " + userText;
            Object.assign(msg.style, {
                margin: "6px 0",
                textAlign: "right",
                color: "#222"
            });
            messages.appendChild(msg);

            inputBox.value = "";

            // Auto reply (for now)
            const reply = document.createElement("div");
            reply.textContent = "🤖 Thanks for your message!";
            Object.assign(reply.style, {
                margin: "6px 0",
                color: "#007bff"
            });
            setTimeout(() => messages.appendChild(reply), 600);

            messages.scrollTop = messages.scrollHei
