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



import frappe

@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """
    Searches across multiple DocTypes for fields containing the user's query.
    Returns matching records from allowed DocTypes.
    """

    message = message.strip().lower()

    if not message:
        return {"reply": "Please provide a search term."}

    # List of DocTypes to search
    searchable_doctypes = ["Employee", "Role", "Leave Approver", "Customer", "Supplier"]

    reply_lines = []

    for dt in searchable_doctypes:
        try:
            # Retrieve metadata for the DocType
            meta = frappe.get_meta(dt)
            # Identify fields that are of type 'Data', 'Small Text', 'Link', or 'Select'
            string_fields = [f.fieldname for f in meta.fields if f.fieldtype in ("Data", "Small Text", "Link", "Select")]

            if not string_fields:
                continue

            # Build filters for each field
            filters = [[field, "like", f"%{message}%"] for field in string_fields]

            # Fetch records matching the filters
            records = frappe.get_all(dt, fields=string_fields, filters=filters, limit=5)

            if records:
                reply_lines.append(f"📄 {dt}:")
                for r in records:
                    lines = [f"{k}: {v}" for k, v in r.items()]
                    reply_lines.append(" • " + "; ".join(lines))
                reply_lines.append("")  # Add a blank line between DocTypes

        except Exception as e:
            # Skip DocTypes that cause errors
            continue

    if reply_lines:
        return {"reply": "\n".join(reply_lines)}

    return {"reply": "No matching data found in your site."}
