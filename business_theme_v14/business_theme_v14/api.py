import frappe

@frappe.whitelist()
def get_reply(message):
    try:
        message = message.lower().strip()

        # 1️⃣ Employee list
        if "employee" in message:
            employees = frappe.get_all(
                "Employee",
                fields=["employee_name", "designation", "department"],
                limit=10
            )
            if employees:
                reply = "👥 Employee List:\n"
                for emp in employees:
                    reply += f"- {emp.employee_name} ({emp.designation or 'No Designation'}) [{emp.department or 'No Department'}]\n"
            else:
                reply = "No employees found."

        # 2️⃣ Leave Applications
        elif "leave" in message:
            leaves = frappe.get_all(
                "Leave Application",
                fields=["employee_name", "leave_type", "from_date", "to_date", "status"],
                order_by="from_date desc",
                limit=10
            )
            if leaves:
                reply = "🌴 Leave Applications:\n"
                for lv in leaves:
                    reply += f"- {lv.employee_name}: {lv.leave_type} ({lv.from_date} → {lv.to_date}) [{lv.status}]\n"
            else:
                reply = "No leave applications found."

        # 3️⃣ Expense Claims
        elif "expense" in message:
            claims = frappe.get_all(
                "Expense Claim",
                fields=["employee", "total_sanctioned_amount", "approval_status"],
                order_by="creation desc",
                limit=10
            )
            if claims:
                reply = "💰 Expense Claims:\n"
                for cl in claims:
                    reply += f"- {cl.employee}: ₹{cl.total_sanctioned_amount or 0} [{cl.approval_status or 'Pending'}]\n"
            else:
                reply = "No expense claims found."

        # 4️⃣ Attendance Records
        elif "attendance" in message:
            records = frappe.get_all(
                "Attendance",
                fields=["employee", "attendance_date", "status"],
                order_by="attendance_date desc",
                limit=10
            )
            if records:
                reply = "🕒 Attendance Records:\n"
                for r in records:
                    reply += f"- {r.employee}: {r.attendance_date} ({r.status})\n"
            else:
                reply = "No attendance data found."

        # 5️⃣ Role List
        elif "role" in message:
            roles = frappe.get_roles(frappe.session.user)
            reply = "🧩 Your Roles:\n" + "\n".join(roles)

        # Default fallback
        else:
            reply = (
                "🤖 I can fetch live ERPNext data.\n"
                "Try typing any of these:\n"
                "• employee list\n"
                "• leave list\n"
                "• expense claims\n"
                "• attendance\n"
                "• role list"
            )

        return {"reply": reply}

    except Exception as e:
        frappe.log_error(message=str(e), title="Chatbot API Error")
        return {"reply": f"⚠️ Server Error: {str(e)}"}
