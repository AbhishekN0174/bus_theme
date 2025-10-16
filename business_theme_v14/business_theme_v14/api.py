import frappe

@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """
    Basic AI Chatbot backend that returns ERPNext data based on the message.
    """
    message = message.lower().strip()

    # 🔹 Employees
    if "employee" in message:
        employees = frappe.get_all("Employee", fields=["employee_name", "designation"], limit=5)
        if employees:
            reply = "\n".join([f"{e.employee_name} — {e.designation}" for e in employees])
        else:
            reply = "No employees found."
        return {"reply": reply}

    # 🔹 Leave Applications
    elif "leave" in message:
        leaves = frappe.get_all("Leave Application", fields=["employee_name", "leave_type", "status"], limit=5)
        if leaves:
            reply = "\n".join([f"{l.employee_name} — {l.leave_type} ({l.status})" for l in leaves])
        else:
            reply = "No leave records found."
        return {"reply": reply}

    # 🔹 Job Openings
    elif "job" in message or "recruitment" in message:
        jobs = frappe.get_all("Job Opening", fields=["job_title", "status"], limit=5)
        if jobs:
            reply = "\n".join([f"{j.job_title} — {j.status}" for j in jobs])
        else:
            reply = "No job openings found."
        return {"reply": reply}

    # 🔹 Default fallback
    return {"reply": f"Server received your message: {message}"}
