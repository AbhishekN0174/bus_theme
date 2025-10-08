frappe.ready(() => {
  // Close awesomplete / autocomplete dropdowns on blur
  $(document).on("blur", ".sidebar-section.filter-section .list-tags input", function () {
    // Hide any autocomplete / tag dropdowns
    $(".awesomplete, .ui-autocomplete, .tt-menu, .select2-dropdown, .dropdown-menu").hide();
  });

  // Optional: also close if user clicks anywhere outside sidebar
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".sidebar-section.filter-section .list-tags").length) {
      $(".awesomplete, .ui-autocomplete, .tt-menu, .select2-dropdown, .dropdown-menu").hide();
    }
  });
});
// Close Tags popup when mouse leaves
document.addEventListener("DOMContentLoaded", function() {
  const tagField = document.querySelector(".sidebar-section.filter-section .list-tags");
  const popup = tagField?.querySelector(".dropdown-menu, .awesomplete, .ui-autocomplete, .tt-menu, .select2-dropdown");

  if (tagField) {
    tagField.addEventListener("mouseleave", function() {
      // hide popup when cursor leaves the tags field area
      let openPopup = document.querySelector(".sidebar-section.filter-section .list-tags .dropdown-menu, .sidebar-section.filter-section .list-tags .awesomplete, .sidebar-section.filter-section .list-tags .ui-autocomplete, .sidebar-section.filter-section .list-tags .tt-menu, .sidebar-section.filter-section .list-tags .select2-dropdown");
      if (openPopup) {
        openPopup.style.display = "none";
      }
    });
  }
});



// // Frappe HR Horizontal Navigation Creator
// // Creates modern navigation cards like the reference image

// (function() {
//     'use strict';
    
//     function initHorizontalNav() {
//         // Remove existing navigation if it exists
//         const existingNav = document.querySelector('.horizontal-nav-container');
//         if (existingNav) {
//             existingNav.remove();
//         }
        
//         // Hide original Frappe onboarding content - comprehensive targeting
//         const onboardingElements = document.querySelectorAll(
//             '.onboarding-step, .onboarding-widget-box, .setup-wizard-slide, ' +
//             '.onboarding-step.pending, .onboarding-step.pending.active, .module-onboarding, .onboarding-steps-wrapper, ' +
//             '.onboarding-step-preview, .widget.onboarding-widget-box, ' +
//             'div[data-doctype="Module Onboarding"], div[onboarding_name="Human Resource"], ' +
//             'div[onboarding_name], .ce-block[onboarding_name], .widget[data-widget-name*="onboarding"]'
//         );
//         onboardingElements.forEach(el => {
//             el.style.display = 'none';
//             el.style.visibility = 'hidden';
//         });
        
//         // Create horizontal navigation container
//         const navContainer = document.createElement('div');
//         navContainer.className = 'horizontal-nav-container';
        
//         // Define HR menu items based on your actual sidebar structure
//         const hrMenuItems = [
//             {
//                 title: 'HR',
//                 description: 'Human Resource management dashboard and overview.',
//                 icon: '👥',
//                 href: '/app/hr',
//                 background: '#3b82f6'
//             },
//             {
//                 title: 'Recruitment',
//                 description: 'Plan and execute the recruitment of candidates till their joining.',
//                 icon: '🎯',
//                 href: '/app/recruitment',
//                 background: '#10b981'
//             },
//             {
//                 title: 'Employee Lifecycle',
//                 description: 'Manage employee records, profiles, and career progression.',
//                 icon: '👤',
//                 href: '/app/employee-lifecycle',
//                 background: '#8b5cf6'
//             },
//             {
//                 title: 'Performance',
//                 description: 'Track performance reviews and employee appraisals.',
//                 icon: '⭐',
//                 href: '/app/performance',
//                 background: '#ef4444'
//             },
//             {
//                 title: 'Shift & Attendance',
//                 description: 'Monitor shift schedules and attendance tracking.',
//                 icon: '⏰',
//                 href: '/app/shift-%26-attendance',
//                 background: '#06b6d4'
//             },
//             {
//                 title: 'Expense Claims',
//                 description: 'Process employee expense claims and reimbursements.',
//                 icon: '💰',
//                 href: '/app/expense-claims',
//                 background: '#f97316'
//             },
//             {
//                 title: 'Leaves',
//                 description: 'Handle leave applications, approvals, and balance tracking.',
//                 icon: '🏖️',
//                 href: '/app/leaves',
//                 background: '#84cc16'
//             }
//         ];
        
//         // Create navigation items
//         hrMenuItems.forEach(item => {
//             const navItem = document.createElement('a');
//             navItem.className = 'nav-card-item';
//             navItem.href = item.href;
//             navItem.title = item.description;
            
//             // Create icon/image container
//             const imageDiv = document.createElement('div');
//             imageDiv.className = 'nav-card-image';
//             imageDiv.style.background = item.background;
//             imageDiv.textContent = item.icon;
            
//             // Create title
//             const titleDiv = document.createElement('div');
//             titleDiv.className = 'nav-card-title';
//             titleDiv.textContent = item.title;
            
//             // Create description
//             const descDiv = document.createElement('div');
//             descDiv.className = 'nav-card-description';
//             descDiv.textContent = item.description;
            
//             // Append elements
//             navItem.appendChild(imageDiv);
//             navItem.appendChild(titleDiv);
//             navItem.appendChild(descDiv);
//             navContainer.appendChild(navItem);
//         });
        
//         // Insert navigation into page using better positioning
//         insertNavigation(navContainer);
//     }
    
//     // Initialize when DOM is ready
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', initHorizontalNav);
//     } else {
//         initHorizontalNav();
//     }
    
//     // Re-initialize when navigating between pages
//     if (window.frappe) {
//         frappe.router.on('change', function() {
//             setTimeout(initHorizontalNav, 100);
//         });
//     }
    
//     // Also listen for hash changes
//     window.addEventListener('hashchange', function() {
//         setTimeout(initHorizontalNav, 100);
//     });
    
//     function insertNavigation(navContainer) {
//         // Target the main content area directly from your HTML structure
//         const layoutMainSection = document.querySelector('.layout-main-section');
//         const deskPageContent = document.querySelector('.desk-page.page-main-content');
//         const pageMainContent = document.querySelector('.page-main-content');
        
//         if (layoutMainSection) {
//             // Insert at the very beginning of layout-main-section
//             layoutMainSection.insertBefore(navContainer, layoutMainSection.firstChild);
//         } else if (deskPageContent) {
//             // Insert at the beginning of desk-page content
//             deskPageContent.insertBefore(navContainer, deskPageContent.firstChild);
//         } else if (pageMainContent) {
//             // Insert at the beginning of page-main-content
//             pageMainContent.insertBefore(navContainer, pageMainContent.firstChild);
//         } else {
//             // Fallback: try other selectors
//             const pageHead = document.querySelector('.page-head');
//             const pageContainer = document.querySelector('.page-container');
//             const mainSection = document.querySelector('.main-section');
            
//             if (pageHead) {
//                 pageHead.parentNode.insertBefore(navContainer, pageHead.nextSibling);
//             } else if (pageContainer) {
//                 pageContainer.insertBefore(navContainer, pageContainer.firstChild);
//             } else if (mainSection) {
//                 mainSection.insertBefore(navContainer, mainSection.firstChild);
//             } else {
//                 document.body.appendChild(navContainer);
//             }
//         }
//     }
    
// })();


// document.querySelectorAll('.list-sidebar.overlay-sidebar').forEach(el => {
//     el.addEventListener('wheel', (e) => {
//         e.preventDefault();
//         el.scrollBy({
//             top: e.deltaY < 0 ? -60 : 60, // adjust step (smaller = smoother, larger = faster)
//             behavior: 'smooth'
//         });
//     }, { passive: false });
// });




frappe.ready(function() { let input = document.querySelector( '.save-filter-section .input-with-feedback' ); if (input) { input.addEventListener('input', function() { if (this.value.trim() !== "") { // show extra controls only when user types something document.querySelectorAll( '.save-filter-section .sidebar-action,' + '.save-filter-section .saved-filters-preview,' + '.save-filter-section .frappe-control[data-fieldtype="Check"]' ).forEach(el => { el.style.display = "block"; }); } }); } }); frappe.ready(function() { // Select the input and the hide saved section let filterInput = document.querySelector(".input-with-feedback.form-control.input-xs"); let hideSaved = document.querySelector(".save-filter-section .sidebar-action"); if (filterInput && hideSaved) { // Initially hide the section hideSaved.classList.add("hide-saved-hidden"); // Add event listener filterInput.addEventListener("input", function() { if (this.value.trim() === "") { hideSaved.classList.add("hide-saved-hidden"); } else { hideSaved.classList.remove("hide-saved-hidden"); } }); } });

                                                                                                                                                                      
 const widgets = document.querySelectorAll('.widget-shortcut-widget-box');
let jobOpeningWidget = null;
widgets.forEach(widget => {
    const titleElement = widget.querySelector('.widget-title .ellipsis');
    if (titleElement && titleElement.textContent.trim() === 'Job Opening') {
        jobOpeningWidget = widget.closest('.widget-shortcut-widget-box');
    }
});
if (jobOpeningWidget) {
    const parent = jobOpeningWidget.parentElement;
    parent.appendChild(jobOpeningWidget);
    console.log('Job Opening widget moved to bottom');
} else {
    console.log('Job Opening widget not found');
}   

let el = document.querySelector('.sidebar-section.filter-section');
if (!el) { console.log('filter-section not found'); }
else {
  let p = el;
  while (p) {
    const cs = getComputedStyle(p);
    console.log(p.tagName.toLowerCase(), p.className, 'margin-bottom=', cs.marginBottom, 'padding-bottom=', cs.paddingBottom, 'height=', cs.height);
    p = p.parentElement;
    if (p.tagName.toLowerCase()==='body') break;
  }
}
document.querySelectorAll('.widget.spacer, .spacer, .flex-spacer').forEach(n=>n.style.display='none');


    (() => {





















      frappe.ready(function() {
    // Create Chatbox container
    let chatContainer = $(`
        <div id="ai-chatbox" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            z-index: 9999;
        ">
            <div style="padding:10px; background:#f44336; color:white; border-radius:12px 12px 0 0; font-weight:bold;">
                🤖 AI Assistant
            </div>
            <div id="chat-messages" style="flex:1; padding:10px; overflow-y:auto; max-height:200px;">
                <div style="color:gray; font-size:12px;">Ask me anything...</div>
            </div>
            <div style="display:flex; border-top:1px solid #eee;">
                <input id="chat-input" type="text" placeholder="Type a message..." 
                    style="flex:1; border:none; padding:8px; font-size:14px; outline:none;">
                <button id="chat-send" style="background:#f44336; color:white; border:none; padding:8px 12px; cursor:pointer;">
                    Send
                </button>
            </div>
        </div>
    `);

    $("body").append(chatContainer);

    // Handle send button
    $("#chat-send").on("click", function() {
        let msg = $("#chat-input").val();
        if (!msg) return;

        // Add user message
        $("#chat-messages").append(`<div style="margin:5px 0; text-align:right;"><b>You:</b> ${msg}</div>`);
        $("#chat-input").val("");

        // Call OpenAI API (via backend)
        frappe.call({
            method: "bus_theme_v14.api.ask_openai",
            args: { prompt: msg },
            callback: function(r) {
                if (r.message) {
                    $("#chat-messages").append(`<div style="margin:5px 0; text-align:left; color:#333;"><b>AI:</b> ${r.message}</div>`);
                    $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
                }
            }
        });
    });
});














      // ========================
//  AI Chatbot (Glass UI)
// ========================

document.addEventListener("DOMContentLoaded", function () {
  // Create chat button
  const chatButton = document.createElement("div");
  chatButton.id = "ai-chat-button";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  // Create chat window
  const chatWindow = document.createElement("div");
  chatWindow.id = "ai-chat-window";
  chatWindow.innerHTML = `
    <div class="ai-chat-header">
      <span>AI Assistant</span>
      <button id="close-chat">×</button>
    </div>
    <div class="ai-chat-messages" id="chat-messages"></div>
    <div class="ai-chat-input">
      <input type="text" id="chat-input" placeholder="Ask me anything..." />
      <button id="send-chat">➤</button>
    </div>
  `;
  document.body.appendChild(chatWindow);

  const messagesDiv = document.getElementById("chat-messages");
  const inputField = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-chat");
  const closeButton = document.getElementById("close-chat");

  // Open/close handlers
  chatButton.onclick = () => chatWindow.classList.toggle("open");
  closeButton.onclick = () => chatWindow.classList.remove("open");

  // Handle send message
  sendButton.onclick = sendMessage;
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    addMessage("user", text);
    inputField.value = "";

    try {
      const reply = await askOpenAI(text);
      addMessage("bot", reply);
    } catch (err) {
      addMessage("bot", "⚠️ Error connecting to AI. Check your API key.");
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `msg ${sender}`;
    msg.innerText = text;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // --- OpenAI Chat Request ---
  async function askOpenAI(userText) {
    const API_KEY = "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"; // <-- Replace with your key
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from AI.";
  }
});



