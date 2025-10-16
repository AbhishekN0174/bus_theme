import frappe
import json
import openai

# 🔑 Set your OpenAI key securely
openai.api_key = frappe.db.get_single_value("Chatbot Settings", "openai_api_key") or "YOUR_API_KEY"

@frappe.whitelist(allow_guest=True)
def get_ai_response(message):
    """Handle user message intelligently."""
    message = message.lower()

    # Step 1: Ask AI what the user wants
    prompt = f"""
    The user said: "{message}"
    You are an ERPNext assistant. Decide what data to fetch.
    Return JSON in this format:
    {{"intent": "employees_joined", "filters": {{"month": "October"}}}} or {{"intent": "leave_balance", "employee": "John"}}
    """

    ai_intent = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are an ERPNext AI assistant."},
                  {"role": "user", "content": prompt}],
    )

    intent_text = ai_intent["choices"][0]["message"]["content"]

    try:
        parsed = json.loads(intent_text)
    except Exception:
        return "Sorry, I couldn’t understand that request."

    # Step 2: Fetch data from ERPNext based on intent
    if parsed.get("intent") == "employees_joined":
        return get_recent_employees(parsed.get("filters", {}))
    elif parsed.get("intent") == "leave_balance":
        return get_leave_balance(parsed.get("employee"))
    else:
        return "Sorry, I couldn’t find that info."

def get_recent_employees(filters):
    month = filters.get("month")
    employees = frappe.db.get_all("Employee",
        fields=["employee_name", "date_of_joining"],
        filters={"date_of_joining": [">", "2025-10-01"]} if month else {},
        limit=10
    )
    if not employees:
        return "No new employees found."
    return "Recent employees:\n" + "\n".join([f"{e.employee_name} ({e.date_of_joining})" for e in employees])

def get_leave_balance(employee_name):
    leaves = frappe.db.get_all("Leave Allocation",
        fields=["leave_type", "total_leaves_allocated", "leaves_taken", "leaves_remaining"],
        filters={"employee_name": employee_name},
    )
    if not leaves:
        return f"No leave records found for {employee_name}."
    lines = [f"{l.leave_type}: {l.leaves_remaining} remaining" for l in leaves]
    return f"Leave balance for {employee_name}:\n" + "\n".join(lines)
