import frappe

@frappe.whitelist()
def get_reply(message):
    """
    Simple static reply (fallback)
    """
    return {"reply": f"You said: {message}"}


@frappe.whitelist()
def search_any(query):
    """
    Dynamic search across multiple doctypes.
    Returns a list of {doctype, name} matching the query.
    """
    results = []

    # Add the doctypes you want the chatbot to search
    doctypes_to_search = ["Employee", "Attendance", "Leave Allocation"]

    for doctype in doctypes_to_search:
        try:
            docs = frappe.get_all(
                doctype,
                filters={"name": ["like", f"%{query}%"]},
                fields=["name"],
                limit_page_length=10
            )
            for doc in docs:
                results.append({"doctype": doctype, "name": doc.name})
        except Exception:
            # Skip if doctype does not exist
            continue

    return {"results": results}
