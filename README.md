# Event Management System

A multi-role event management web application built from an Excel wireframe specification. Runs entirely in the browser — no server or installation required.

---

## Quick Start

1. Clone or download the repository
2. Open `index.html` in Chrome or Edge
3. Login with the credentials below

```bash
git clone https://github.com/dharmendra4522/Event-Management-System.git
cd EventManagementSystem
# Open index.html in your browser

```
#Live 
  https://dharmendra4522.github.io/Event-Management-System/
---

## Demo Credentials

| Role   | User ID   | Password    |
|--------|-----------|-------------|
| Admin  | `admin`   | `admin123`  |
| Vendor | `vendor1` | `vendor123` |
| User   | `user1`   | `user123`   |

---

## File Structure

```
EventManagementSystem/
│
├── index.html                      ← Entry point (INDEX screen)
│
├── css/
│   └── style.css                   ← All styles
│
├── js/
│   ├── data.js                     ← Shared data store & session
│   ├── auth.js                     ← Login / Signup / Logout
│   └── app.js                      ← Business logic
│
└── pages/
    ├── flowchart.html              ← Sheet 2:  Flow Chart
    ├── admin_login.html            ← Sheet 3:  Admin Login
    ├── vendor_login.html           ← Sheet 4:  Vendor Login
    ├── vendor_signup.html          ← Sheet 5:  Vendor Sign Up
    ├── user_login.html             ← Sheet 6:  User Login
    ├── vendor_dashboard.html       ← Sheet 7:  Vendor (Dashboard)
    ├── user_signup.html            ← Sheet 8:  User SignUp
    ├── add_item.html               ← Sheet 9:  Add Item
    ├── user_portal.html            ← Sheet 10: User Portal
    ├── vendor_page.html            ← Sheet 11: Vendor Page
    ├── products.html               ← Sheet 12: Products
    ├── cart.html                   ← Sheet 13: Cart
    ├── checkout.html               ← Sheet 14: CheckOut
    ├── success.html                ← Sheet 15: Success (PopUp)
    ├── request_item.html           ← Sheet 16: Request Item
    ├── product_status.html         ← Sheet 17: Product Status
    ├── update_status.html          ← Sheet 18: Update (Status)
    ├── order_status.html           ← Sheet 19: Order Status (User)
    ├── admin_dashboard.html        ← Sheet 20: Admin Dashboard
    ├── maintain_user.html          ← Sheet 21: Maintain User
    ├── maintain_vendor.html        ← Sheet 22: Maintain Vendor
    ├── add_user_membership.html    ← Add User Membership
    ├── update_user_membership.html ← Update User Membership
    ├── add_vendor_membership.html  ← Add Membership for Vendor
    ├── update_vendor_membership.html← Update Membership for Vendor
    ├── admin_reports.html          ← Admin Reports
    ├── admin_transactions.html     ← Admin Transactions
    ├── user_reports.html           ← User Reports
    └── guest_list.html             ← Guest List
```

---

## Roles & Access

| Feature              | Admin | Vendor | User |
|----------------------|-------|--------|------|
| Maintenance Menu     | ✅    | ❌     | ❌   |
| Reports              | ✅    | ❌     | ✅   |
| Transactions         | ✅    | ✅     | ✅   |
| Add / Update Items   | ❌    | ✅     | ❌   |
| Product Status       | ❌    | ✅     | ❌   |
| Cart & Checkout      | ❌    | ❌     | ✅   |
| Guest List           | ❌    | ❌     | ✅   |
| Order Status         | ❌    | ❌     | ✅   |

---

## Requirements Implemented (from Instruction Sheet)

1. Flow chart matches the Excel wireframe
2. Maintenance module built (Admin only)
3. Basic formatting applied
4. Chart link present on all authenticated pages
5. Radio buttons — only one can be selected
6. Checkbox — checked = yes, unchecked = no
7. Passwords hidden on all login pages (`type="password"`)
8. Admin — full access: maintenance, reports, transactions
9. User — no maintenance access; reports and transactions only
10. Validations on all forms
11. Session management working correctly
12. Maintenance Menu — Admin access only
13. Flow matches the flow chart

**Add Membership:** All fields mandatory. Select one option — 6 months or 1 year or 2 years. Default — 6 months selected.

**Update Membership:** Membership Number is mandatory; rest of the fields populate automatically. User can extend or cancel. Default — six months extension selected.

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks, no dependencies)

> Data is stored in memory. Refreshing the page resets all data. To persist data, a backend (Node.js / PHP + MySQL) would need to be added.

---

## License

MIT
