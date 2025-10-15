import frappe

@frappe.whitelist()
def get_reply(message):
    user = frappe.session.user

    # Example 1: Role list
    if "role" in message.lower():
        roles = frappe.get_roles(user)
        return {"reply": f"Your roles are: {', '.join(roles)}"}

    # Example 2: Employee info
    if "employee" in message.lower():
        employee = frappe.db.get_value("Employee", {"user_id": user}, ["employee_name", "designation"], as_dict=True)
        if employee:
            return {"reply": f"👤 {employee.employee_name}, Designation: {employee.designation}"}
        else:
            return {"reply": "No employee record found for your user."}

    # Example 3: Attendance status
    if "attendance" in message.lower():
        today = frappe.utils.today()
        status = frappe.db.get_value("Attendance", {"employee": ["in", frappe.db.get_all("Employee", filters={"user_id": user}, pluck="name")], "attendance_date": today}, "status")
        return {"reply": f"Today's attendance status: {status or 'Not marked yet.'}"}

    # Default response
    return {"reply": f"Server received your message: {message}"}
