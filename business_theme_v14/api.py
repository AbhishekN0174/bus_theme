# import frappe
# import openai

# @frappe.whitelist(allow_guest=True)
# def get_reply(message):
#     """
#     Returns site data or AI-generated response for the chatbot.
#     """

#     # 1️⃣ Try fetching live site data first
#     # Example: search for employees by name
#     employees = frappe.get_all(
#         "Employee",
#         fields=["employee_name", "company", "designation", "status", "date_of_joining"],
#         filters={"employee_name": ["like", f"%{message}%"]},
#         limit=5
#     )

#     if employees:
#         reply_lines = []
#         for e in employees:
#             line = f"👤 {e['employee_name']}\n" \
#                    f"Company: {e['company']}\n" \
#                    f"Designation: {e['designation']}\n" \
#                    f"Status: {e['status']}\n" \
#                    f"Date of Joining: {e['date_of_joining']}"
#             reply_lines.append(line)
#         return {"reply": "\n\n".join(reply_lines)}

#     # 2️⃣ Fallback to leave info
#     if "leave" in message.lower():
#         return {"reply": "You can view your leave balance under HR > Leaves > Leave Balance."}

#     # 3️⃣ Optional: AI fallback
#     api_key = frappe.conf.get("openai_api_key")
#     if not api_key:
#         return {"reply": "No matching data found and OpenAI API key is missing."}

#     openai.api_key = api_key

#     try:
#         completion = openai.ChatCompletion.create(
#             model="gpt-4-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful ERPNext assistant."},
#                 {"role": "user", "content": message}
#             ]
#         )
#         ai_reply = completion.choices[0].message["content"].strip()
#         return {"reply": ai_reply}
#     except Exception as e:
#         return {"reply": f"Error generating AI response: {str(e)}"}




# import frappe
# import openai

# @frappe.whitelist(allow_guest=True)
# def get_reply(message):
#     """
#     Returns site data or AI-generated response for the chatbot.
#     """

#     # 1️⃣ Try fetching live Employee data first
#     employees = frappe.get_all(
#         "Employee",
#         fields=["employee_name", "company", "designation", "status", "date_of_joining"],
#         filters={"employee_name": ["like", f"%{message}%"]},
#         limit=5
#     )

#     if employees:
#         reply_lines = []
#         for e in employees:
#             line = f"👤 {e['employee_name']}\n" \
#                    f"Company: {e['company']}\n" \
#                    f"Designation: {e['designation']}\n" \
#                    f"Status: {e['status']}\n" \
#                    f"Date of Joining: {e['date_of_joining']}"
#             reply_lines.append(line)
#         return {"reply": "\n\n".join(reply_lines)}

#     # 2️⃣ Fallback for leave queries
#     if "leave" in message.lower():
#         return {"reply": "You can view your leave balance under HR > Leaves > Leave Balance."}

#     # 3️⃣ Optional: fallback to OpenAI AI response
#     api_key = frappe.conf.get("openai_api_key")
#     if not api_key:
#         return {"reply": "No matching data found and OpenAI API key is missing."}

#     openai.api_key = api_key

#     try:
#         completion = openai.ChatCompletion.create(
#             model="gpt-4-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful ERPNext assistant."},
#                 {"role": "user", "content": message}
#             ]
#         )
#         ai_reply = completion.choices[0].message["content"].strip()
#         return {"reply": ai_reply}
#     except Exception as e:
#         return {"reply": f"Error generating AI response: {str(e)}"}



# import frappe

# @frappe.whitelist(allow_guest=True)
# def get_reply(message):
#     """
#     Search across selected DocTypes and return matching data.
#     """
#     message = message.strip().lower()
#     if not message:
#         return {"reply": "Please provide a search term."}

#     searchable_doctypes = ["Employee", "Role", "Customer", "Supplier"]
#     reply_lines = []

#     for dt in searchable_doctypes:
#         try:
#             meta = frappe.get_meta(dt)
#             string_fields = [
#                 f.fieldname for f in meta.fields
#                 if f.fieldtype in ("Data", "Small Text", "Link", "Select")
#             ]

#             if not string_fields:
#                 continue

#             # Use OR filters instead of AND
#             or_filters = []
#             for field in string_fields:
#                 or_filters.append([dt, field, "like", f"%{message}%"])

#             records = frappe.get_all(
#                 dt, fields=["name"] + string_fields, or_filters=or_filters, limit=5
#             )

#             if records:
#                 reply_lines.append(f"📄 *{dt}* (Top {len(records)} results):")
#                 for r in records:
#                     display = ", ".join(
#                         f"{k}: {v}" for k, v in r.items() if v and k != "name"
#                     )
#                     reply_lines.append(f" • {display or '(no text fields found)'}")
#                 reply_lines.append("")

#         except Exception as e:
#             frappe.log_error(f"Chatbot search error in {dt}: {e}")
#             continue

#     if reply_lines:
#         return {"reply": "\n".join(reply_lines)}

#     return {"reply": "No matching data found in your site."}


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

import frappe
import openai

@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """
    Receives a message from the frontend and returns an AI-generated response.
    """

    # Optional: set your OpenAI key securely in Site Config
    api_key = frappe.conf.get("openai_api_key")
    if not api_key:
        return {"error": "OpenAI API key missing in site_config.json"}

    openai.api_key = api_key

    try:
        # Example using GPT-4 (you can adjust this)
        completion = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": message}
            ]
        )
        reply = completion.choices[0].message["content"].strip()
        return {"reply": reply}
    except Exception as e:
        return {"error": str(e)}
