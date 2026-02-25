# Swetha Enterprise — Custom ERPNext Theme & Role Dashboard

A professional custom Frappe/ERPNext app with:
- 🎨 **Blue & White Professional Theme** — complete UI redesign
- 🔐 **Role-Based Dashboards** — 4 separate portals based on user role
- 📱 **Mobile Responsive** — works on all screen sizes

## Role Portals Included

| Role | Portal |
|------|--------|
| Administrator / System Manager | Admin Dashboard |
| HR Manager / HR User | HR & Payroll Portal |
| Sales Manager / Purchase Manager | Sales & Purchase Portal |
| Healthcare Practitioner / Physician | Healthcare Portal |

## Installation on Frappe Cloud

1. Go to your site on Frappe Cloud
2. Click **Apps** → **Install App**
3. Choose **Install from GitHub**
4. Enter: `https://github.com/YOUR-USERNAME/swetha_enterprise`
5. Click Install

## What Changes

- Complete sidebar, navbar, forms, buttons redesigned
- Role-based dashboard with live stats
- Quick actions per role
- Module chips for fast navigation
- All ERPNext functionality stays 100% the same

## Files Structure

```
swetha_enterprise/
├── swetha_enterprise/
│   ├── public/
│   │   ├── css/
│   │   │   ├── theme.css        # Main ERPNext theme
│   │   │   └── dashboard.css    # Role dashboard styles
│   │   └── js/
│   │       └── dashboard.js     # Role detection & portals
│   ├── page/
│   │   └── role_dashboard/      # Role-based portal page
│   └── hooks.py                 # App configuration
├── setup.py
└── requirements.txt
```

## Developer

Swetha — swethasarala1808@gmail.com
