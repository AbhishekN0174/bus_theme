frappe.ready(function() {
    console.log("💬 Chatbot JS Loaded Successfully");

    // Delay execution to ensure desk UI is fully loaded
    setTimeout(() => {
        // Create chatbot button
        const chatbotButton = document.createElement("button");
        chatbotButton.innerText = "💬 Chatbot";

        Object.assign(chatbotButton.style, {
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
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        });

        chatbotButton.addEventListener("click", () => {
            frappe.msgprint("Hello 👋 Chatbot is working!");
        });

        // Append to body (top-most layer)
        document.body.appendChild(chatbotButton);
        console.log("💬 Chatbot button added to DOM");
    }, 2000); // Wait 2 seconds for full desk load
});
