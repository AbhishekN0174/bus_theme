# import frappe

# @frappe.whitelist()
# def get_reply(message):
#     """AI Chatbot — Fetch real ERPNext data based on keywords"""
#     message = message.lower()

#     # Get employee data
#     if "employee" in message:
#         employees = frappe.get_all(
#             "Employee",
#             fields=["name", "employee_name", "designation", "company"],
#             limit_page_length=5,
#         )
#         return {"type": "employee", "data": employees}

#     # Get leave applications
#     if "leave" in message:
#         leaves = frappe.get_all(
#             "Leave Application",
#             fields=["name", "employee_name", "leave_type", "from_date", "to_date", "status"],
#             order_by="creation desc",
#             limit_page_length=5,
#         )
#         return {"type": "leave", "data": leaves}

#     # Get expense claims
#     if "expense" in message:
#         expenses = frappe.get_all(
#             "Expense Claim",
#             fields=["name", "employee", "total_claimed_amount", "status"],
#             order_by="creation desc",
#             limit_page_length=5,
#         )
#         return {"type": "expense", "data": expenses}

#     # Default reply
#     return {"reply": f"Sorry, I couldn’t understand '{message}'. Try 'employee', 'leave', or 'expense'."}



import frappe
import datetime
import openai  # you'll install this below

# --- Replace with your OpenAI API key ---
openai.api_key = "YOUR_OPENAI_API_KEY_HERE"

@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """
    Understands the user's message using OpenAI, 
    then fetches real ERPNext data accordingly.
    """

    try:
        # 1️⃣ Use AI to interpret the intent
        system_prompt = """
        You are an assistant for ERPNext.
        You help users query company data like employees, leaves, and expenses.
        Convert the user question into one of these actions:
        - "employee_joined_this_month"
        - "leave_balance_for_employee"
        - "pending_expense_claims"
        - "unknown"
        """

        ai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
        )

        intent = ai_response.choices[0].message.content.strip().lower()

        # 2️⃣ Fetch ERPNext data based on the intent
        if "employee_joined_this_month" in intent:
            start_date = datetime.date.today().replace(day=1)
            employees = frappe.db.get_all(
                "Employee",
                filters={"date_of_joining": [">=", start_date]},
                fields=["employee_name", "designation", "date_of_joining"]
            )
            if not employees:
                return {"reply": "No employees joined this month."}
            data = "\n".join([f"- {e.employee_name} ({e.designation})" for e in employees])
            return {"reply": f"Employees who joined this month:\n{data}"}

        elif "leave_balance_for_employee" in intent:
            return {"reply": "Please specify the employee name."}

        elif "pending_expense_claims" in intent:
            claims = frappe.db.get_all(
                "Expense Claim",
                filters={"workflow_state": "Draft"},
                fields=["name", "employee_name", "total_claimed_amount"]
            )
            if not claims:
                return {"reply": "No pending expense claims found."}
            data = "\n".join([f"{c.name}: ₹{c.total_claimed_amount} ({c.employee_name})" for c in claims])
            return {"reply": f"Pending expense claims:\n{data}"}

        else:
            return {"reply": "Sorry, I didn’t understand that. Try asking about employees, leaves, or expenses."}

    except Exception as e:
        frappe.log_error(f"AI Chatbot Error: {str(e)}", "chatbot_ai.get_reply")
        return {"error": str(e)}

