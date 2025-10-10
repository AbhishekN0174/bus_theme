import frappe
import openai

@frappe.whitelist(allow_guest=True)
def chatbot_reply(message):
    """
    Simple site data fetch example – returns Employee info or leave instructions.
    """
    message_lower = message.lower()

    if "employee" in message_lower:
        # Fetch first 5 employees
        employees = frappe.get_all("Employee", fields=["employee_name", "designation"], limit=5)
        if employees:
            reply = "\n".join([f"{e['employee_name']} - {e['designation']}" for e in employees])
        else:
            reply = "No employees found."
        return {"reply": reply}

    if "leave" in message_lower:
        return {"reply": "You can view your leave balance under HR > Leaves > Leave Balance."}

    # Fallback if no site data matches
    return {"reply": "I didn't understand that. Try asking about employees or leave."}


@frappe.whitelist(allow_guest=True)
def get_reply(message):
    """
    Receives a message from frontend and returns AI-generated response using OpenAI.
    Fallback to site data if AI fails.
    """
    api_key = frappe.conf.get("openai_api_key")
    if not api_key:
        return {"error": "OpenAI API key missing in site_config.json"}

    openai.api_key = api_key

    try:
        # GPT-4 AI response
        completion = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant for ERPNext."},
                {"role": "user", "content": message}
            ]
        )
        reply = completion.choices[0].message["content"].strip()
        return {"reply": reply}

    except Exception as e:
        # Fallback: try local chatbot_reply
        site_reply = chatbot_reply(message)
        return {"reply": site_reply.get("reply", f"Error: {str(e)}")}
