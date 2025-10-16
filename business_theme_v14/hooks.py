app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Midocean Technologies Pvt Ltd"
app_description = "Business Theme for ERPNext / Frappe"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "sagar@midocean.tech"
app_license = "MIT"

# JS include
app_include_js = ["/assets/business_theme_v14/js/Horizontal.js"]

# Include API
override_whitelisted_methods = {
    "business_theme_v14.api.chatbot_ai.get_ai_response": "business_theme_v14.api.chatbot_ai.get_ai_response"
}
