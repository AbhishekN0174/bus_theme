# apps/ai_chatbot/ai_chatbot/api.py
import frappe

@frappe.whitelist()
def get_reply(message):
    # 🔹 Temporary: just return some data
    return {"reply": f"Server received your message: {message}"}

