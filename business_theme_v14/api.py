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

# import frappe
# import openai

# @frappe.whitelist(allow_guest=True)
# def get_reply(message):
#     """
#     Receives a message from the frontend and returns an AI-generated response.
#     """

#     # Optional: set your OpenAI key securely in Site Config
#     api_key = frappe.conf.get("openai_api_key")
#     if not api_key:
#         return {"error": "OpenAI API key missing in site_config.json"}

#     openai.api_key = api_key

#     try:
#         # Example using GPT-4 (you can adjust this)
#         completion = openai.ChatCompletion.create(
#             model="gpt-4-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful AI assistant."},
#                 {"role": "user", "content": message}
#             ]
#         )
#         reply = completion.choices[0].message["content"].strip()
#         return {"reply": reply}
#     except Exception as e:
#         return {"error": str(e)}

