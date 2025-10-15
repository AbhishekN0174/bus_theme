# import frappe

# @frappe.whitelist()
# def get_reply(message):
#     try:
#         message = message.lower().strip()

#         # 1️⃣ Employee list
#         if "employee" in message:
#             employees = frappe.get_all(
#                 "Employee",
#                 fields=["employee_name", "designation", "department"],
#                 limit=10
#             )
#             if employees:
#                 reply = "👥 Employee List:\n"
#                 for emp in employees:
#                     reply += f"- {emp.employee_name} ({emp.designation or 'No Designation'}) [{emp.department or 'No Department'}]\n"
#             else:
#                 reply = "No employees found."

#         # 2️⃣ Leave Application list
#         elif "leave" in message:
#             leaves = frappe.get_all(
#                 "Leave Application",
#                 fields=["employee_name", "leave_type", "from_date", "to_date", "status"],
#                 limit=10,
#                 order_by="from_date desc"
#             )
#             if leaves:
#                 reply = "🌴 Leave Applications:\n"
#                 for lv in leaves:
#                     reply += f"- {lv.employee_name}: {lv.leave_type} ({lv.from_date} → {lv.to_date}) [{lv.status}]\n"
#             else:
#                 reply = "No leave applications found."

#         # 3️⃣ Expense Claim list
#         elif "expense" in message:
#             claims = frappe.get_all(
#                 "Expense Claim",
#                 fields=["employee", "total_sanctioned_amount", "approval_status"],
#                 limit=10,
#                 order_by="creation desc"
#             )
#             if claims:
#                 reply = "💰 Expense Claims:\n"
#                 for cl in claims:
#                     reply += f"- {cl.employee}: ₹{cl.total_sanctioned_amount or 0} [{cl.approval_status}]\n"
#             else:
#                 reply = "No expense claims found."

#         # 4️⃣ Attendance records
#         elif "attendance" in message:
#             attendance = frappe.get_all(
#                 "Attendance",
#                 fields=["employee", "attendance_date", "status"],
#                 limit=10,
#                 order_by="attendance_date desc"
#             )
#             if attendance:
#                 reply = "🕒 Attendance Records:\n"
#                 for a in attendance:
#                     reply += f"- {a.employee}: {a.attendance_date} ({a.status})\n"
#             else:
#                 reply = "No attendance records found."

#         # 5️⃣ Role list for current user
#         elif "role" in message:
#             roles = frappe.get_roles(frappe.session.user)
#             reply = "🧩 Your Roles: " + ", ".join(roles)

#         # 6️⃣ Default: echo
#         else:
#             reply = f"Server received your message: {message}. Try typing 'employee', 'leave', 'expense', or 'attendance'."

#         return {"reply": reply}

#     except Exception as e:
#         frappe.log_error(message=str(e), title="Chatbot Error")
#         return {"reply": f"⚠️ Error: {str(e)}"}





# ai_chatbot/api.py
import frappe

@frappe.whitelist()
def search_site(query, doctype=None, limit=10):
    """
    Search any doctype in the Frappe site.
    :param query: Search text
    :param doctype: Specific doctype to search (optional)
    :param limit: Max results
    """
    results = []

    # If a specific doctype is provided
    if doctype:
        results = frappe.get_list(
            doctype,
            filters=[["name", "like", f"%{query}%"]],
            fields=["name"],
            limit_page_length=limit
        )
    else:
        # Search all doctypes the user has permission for
        for dt in frappe.get_all("DocType", filters={"issingle": 0, "restrict_to_domain": ""}):
            try:
                matches = frappe.get_list(
                    dt.name,
                    filters=[["name", "like", f"%{query}%"]],
                    fields=["name"],
                    limit_page_length=limit
                )
                if matches:
                    results.append({dt.name: matches})
            except Exception as e:
                continue  # Skip doctypes user cannot access

    return results
