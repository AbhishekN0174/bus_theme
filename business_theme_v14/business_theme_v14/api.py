import frappe
import requests
import os

# Optional: set OPENAI_API_KEY in environment variables if you want GPT responses
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

@frappe.whitelist()
def get_reply(message):
    """
    Handles AI + Frappe data queries
    """
    # First, check if the message is about your site data
    site_data_response = fetch_frappe_data(message)
    if site_data_response:
        return {"reply": site_data_response}

    # Otherwise, fallback to AI response
    ai_response = get_ai_response(message)
    return {"reply": ai_response}


def fetch_frappe_data(query):
    """
    Check if query matches your site data (Employee, Leave, Attendance)
    Return formatted results if found
    """
    doctypes_to_search = {
        "Employee": ["employee_name", "employee_number", "department", "designation"],
        "Leave Application": ["employee", "leave_type", "from_date", "to_date", "status"],
        "Attendance": ["employee", "attendance_date", "status"]
    }

    results = []

    for doctype, fields in doctypes_to_search.items():
        try:
            docs = frappe.get_all(
                doctype,
                filters={"name": ["like", f"%{query}%"]},
                fields=fields,
                limit_page_length=5
            )
            for doc in docs:
                results.append({"doctype": doctype, "data": doc})
        except Exception:
            continue

    if results:
        text = ""
        for item in results:
            text += f"{item['doctype']}:\n"
            for k, v in item["data"].items():
                text += f"  {k}: {v}\n"
            text += "\n"
        return text

    return None


def get_ai_response(message):
    """
    Uses OpenAI GPT model to answer general questions
    """
    if not OPENAI_API_KEY:
        return "AI not configured. Please set OPENAI_API_KEY in environment."

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4",
        "messages": [{"role": "user", "content": message}],
        "temperature": 0.7,
        "max_tokens": 300
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        data = response.json()
        return data["choices"][0]["message"]["content"]
    else:
        return f"AI Error: {response.text}"
