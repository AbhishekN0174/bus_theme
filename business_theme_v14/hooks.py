from . import __version__ as app_version
import time

# -----------------------------
# App Info
# -----------------------------
app_name = "business_theme_v14"
app_title = "Business Theme V14"
app_publisher = "Midocean Technologies Pvt Ltd"
app_description = "Business Theme for ERPNext / Frappe"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "sagar@midocean.tech"
app_license = "MIT"





# hooks.py - required by Frappe
app_name = "ai_chatbot"
app_title = "AI Chatbot"
app_publisher = "Your Name"
app_description = "AI Chatbot integration for Frappe"
app_icon = "octicon octicon-comment"
app_color = "blue"
app_email = "you@example.com"
app_license = "MIT"








# -----------------------------
# Version (auto timestamp)
# -----------------------------
app_version = str(int(time.time()))

# -----------------------------
# Includes in <head>
# -----------------------------

# Include JS files
app_include_js = [
    "/assets/business_theme_v14/js/Horizontal.js"
]

# Include CSS files with versioning
app_include_css = [
    f"/assets/business_theme_v14/css/custom_theme.css?v={app_version}"
]

# -----------------------------
# Website settings
# -----------------------------
website_context = {
    "favicon": "/assets/business_theme_v14/images/favicon.png",
    # Optional: splash image
    # "splash_image": "/assets/business_theme_v14/images/itchamps_logo.png"
}

# -----------------------------
# (Optional) other hooks
# -----------------------------
# You can uncomment and customize these later if needed
# web_include_js = "/assets/business_theme_v14/js/business_theme_v14.js"
# web_include_css = "/assets/business_theme_v14/css/business_theme_v14.css"
# page_js = {"page" : "public/js/file.js"}
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# -----------------------------
# End of hooks.py
# -----------------------------
