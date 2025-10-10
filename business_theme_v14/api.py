import frappe

@frappe.whitelist(allow_guest=True)
def chatbot_reply(message):
    """
    Simple chatbot logic – replace this with AI integration later
    """
    message = message.lower()

    if "employee" in message:
        # Example ERPNext fetch
        employees = frappe.get_all("Employee", fields=["employee_name", "designation"], limit=5)
        reply = "\n".join([f"{e['employee_name']} - {e['designation']}" for e in employees])
        return reply or "No employees found."
    
    if "leave" in message:
        return "You can view your leave balance under HR > Leaves > Leave Balance."

    return "I'm still learning! Try asking about employees or leave."
