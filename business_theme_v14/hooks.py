app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Your Name"
app_description = "Custom Business Theme with AI Chatbot"
app_email = "you@example.com"
app_license = "MIT"

# Include your custom JS file
app_include_js = [
    "/assets/business_theme_v14/js/Horizontal.js"
]

# Optional CSS include (remove if not used)
# app_include_css = ["/assets/business_theme_v14/css/style.css"]

# --- API methods ---
override_whitelisted_methods = {
    "business_theme_v14.api.get_reply": "business_theme_v14.api.get_reply"
}
