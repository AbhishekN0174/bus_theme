import frappe

@frappe.whitelist()
def get_reply(message):
    """AI Chatbot — Fetch real ERPNext data based on keywords"""
    message = message.lower()

    # Get employee data
    if "employee" in message:
        employees = frappe.get_all(
            "Employee",
            fields=["name", "employee_name", "designation", "company"],
            limit_page_length=5,
        )
        return {"type": "employee", "data": employees}

    # Get leave applications
    if "leave" in message:
        leaves = frappe.get_all(
            "Leave Application",
            fields=["name", "employee_name", "leave_type", "from_date", "to_date", "status"],
            order_by="creation desc",
            limit_page_length=5,
        )
        return {"type": "leave", "data": leaves}

    # Get expense claims
    if "expense" in message:
        expenses = frappe.get_all(
            "Expense Claim",
            fields=["name", "employee", "total_claimed_amount", "status"],
            order_by="creation desc",
            limit_page_length=5,
        )
        return {"type": "expense", "data": expenses}

    # Default reply
    return {"reply": f"Sorry, I couldn’t understand '{message}'. Try 'employee', 'leave', or 'expense'."}
