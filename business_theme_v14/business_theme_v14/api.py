import frappe

@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """Simple intelligent response based on ERPNext data"""
    message = message.lower().strip()

    # Employee list
    if "employee" in message:
        employees = frappe.get_all("Employee", fields=["employee_name", "designation"], limit=5)
        if employees:
            reply = "\n".join([f"{e.employee_name} — {e.designation}" for e in employees])
        else:
            reply = "No employees found."
        return {"reply": reply}

    # Leaves
    elif "leave" in message:
        leaves = frappe.get_all("Leave Application", fields=["employee_name", "status", "leave_type"], limit=5)
        if leaves:
            reply = "\n".join([f"{l.employee_name} — {l.leave_type} ({l.status})" for l in leaves])
        else:
            reply = "No leave data available."
        return {"reply": reply}

    # Default response
    return {"reply": f"Server received your message: {message}"}
