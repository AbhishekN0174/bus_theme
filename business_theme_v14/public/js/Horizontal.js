frappe.ready(function() {
    console.log("💬 Chatbot JS Loaded Successfully");

    const button = document.createElement("button");
    button.innerText = "💬 Chatbot";
    Object.assign(button.style, {
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
        zIndex: "99999",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    });

    button.addEventListener("click", () => {
        frappe.msgprint("Hello 👋 Chatbot is working!");
    });

    document.body.appendChild(button);
});
