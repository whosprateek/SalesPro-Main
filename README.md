# SalesPro - Multi-Tenant Sales CRM Platform

A professional, modern CRM application built with Next.js, React, and Tailwind CSS. Designed for managing sales teams across multiple organizations with role-based access control.

## 🎯 Project Overview

SalesPro is a frontend-only demonstration of a comprehensive sales management platform that showcases:
- Multi-tenant architecture with organization-specific role enforcement
- Role-based access control (Admin & Agent) scoped to home organization
- Real-time lead management with role-based filtering
- Call logging system with organizational isolation
- Advanced analytics dashboard for admin users
- Responsive UI design with performance optimization

## 📋 Features

### Dashboard
- **Welcome Section**: Personalized greeting with organization and role information
- **Key Metrics**: Display total leads, open leads, daily calls, and conversion rates
- **Quick Actions**: Fast navigation to leads and call logs
- **Recent Activity**: Feed showing latest sales activities with status indicators

### Leads Management
- **Search & Filter**: Find leads by name, phone, or email with debounced search
- **Status Management**: Filter leads by status (New, Contacted, Converted)
- **Admin Edit Capability**: Double-click to edit lead status (Admin only for home org)
- **Role-Based Views**: 
  - **Admins**: See all leads in their home organization
  - **Agents**: See only leads assigned to them in their home organization
  - **Cross-Org Access**: Admins can view other orgs but act as Agents
- **Responsive Table**: Scrollable table with all lead details and skeleton loaders

### Call Logs
- **Date Filtering**: Filter call logs by specific dates
- **Search Functionality**: Find calls by lead name or outcome
- **Pagination**: Navigate through call history (10 items per page)
- **Call Outcomes**: Color-coded call results (Interested, Callback scheduled, No Answer, etc.)
- **Detailed Records**: Date, time, duration, and outcome tracking

### Analytics (Admin Only)
- **KPI Dashboard**: Total leads, converted leads, conversion rate, revenue, average deal size
- **Monthly Revenue Trend**: Line chart showing revenue trajectory
- **Lead Status Breakdown**: Pie chart visualizing pipeline stages
- **Agent Performance**: Bar chart comparing agent productivity and revenue
- **Organization-Scoped**: Analytics visible only for admin's home organization

### Settings (Admin Only)
- **Organization Configuration**: Manage organization settings
- **Account Settings**: Account management options
- **Role Permissions**: View and understand role-based access control
- **Organization-Scoped**: Settings accessible only to admin of home organization

## 👥 User Roles & Multi-Tenant Access

### Role Enforcement Rules
The system implements **organization-scoped role enforcement**:
- **Home Organization**: Users retain their designated role (Admin or Agent)
- **Other Organizations**: Users automatically downgrade to Agent role
- **Example**: admin@acme.com is Admin in Acme but Agent in TechCorp

### Admin
- **Home Org**: Full access to all leads, analytics, settings, and team management
- **Other Orgs**: Can view and act on leads as an Agent only
- Edit lead statuses directly (double-click on status) - only in home org
- Access Analytics dashboard - only for home org
- Configure Settings - only for home org

### Agent
- **Home Org**: View only assigned leads, log calls, view their activity
- **Other Orgs**: View and work on leads as assigned
- Cannot edit lead statuses
- Cannot access Analytics or Settings in any organization
- Focus on active sales activities

## 🔐 Authentication & Multi-Tenancy

### Demo Credentials

**Organization A (Acme Corp)**
- Admin: `admin@acme.com` (Admin in Acme, Agent in TechCorp)
- Agent: `agent@acme.com` (Agent in both orgs)

**Organization B (TechCorp)**
- Admin: `admin@techcorp.com` (Admin in TechCorp, Agent in Acme)
- Agent: `agent@techcorp.com` (Agent in both orgs)

### Login Flow
1. Enter any email address or use demo credentials
2. Role and organization access are automatically determined
3. Click "Sign In" to access the app
4. Admins can switch between organizations, with role adjusting automatically

### Authentication Architecture
- **Frontend-Only Demo**: No password required
- **User Credentials Mapping**: Each email maps to a home organization and role
- **Dynamic Role Calculation**: `determineRole()` function evaluates org access
- **LocalStorage Persistence**: Auth state and tenant data persist across sessions

## 📁 Project Structure

```
app/
├── layout.tsx                 # Root layout with metadata
├── globals.css                # Global styles and theme tokens
├── page.jsx                   # Login page (role & tenant determination)
├── dashboard/
│   ├── page.jsx               # Dashboard (protected route)
│   └── loading.tsx            # Loading skeleton
├── leads/
│   ├── page.jsx               # Leads with role-based filtering
│   └── loading.tsx            # Loading skeleton
├── call-logs/
│   ├── page.jsx               # Call logs (async wrapper + suspense)
│   └── loading.tsx            # Loading skeleton
├── analytics/
│   ├── page.jsx               # Analytics (Admin only, org-scoped)
│   └── loading.tsx            # Loading skeleton
├── settings/
│   ├── page.jsx               # Settings (Admin only, org-scoped)
│   └── loading.tsx            # Loading skeleton
└── access-denied/
    └── page.jsx               # Access denied page

src/
├── components/
│   ├── AppLayout.jsx          # Main app wrapper with sidebar/header
│   ├── Sidebar.jsx            # Navigation with org-aware links
│   ├── Header.jsx             # User info, org switcher, tenant/role updater
│   ├── ProtectedRoute.jsx     # Route guard for role-based access
│   ├── DataTable.jsx          # Memoized reusable table (Lead/Call data)
│   ├── SearchBar.jsx          # Debounced search component
│   ├── FilterChips.jsx        # Memoized status filter chips
│   ├── StatCard.jsx           # Memoized KPI card
│   ├── QuickActionCard.jsx    # Memoized action card
│   ├── DateFilter.jsx         # Date range selector
│   ├── PageTransition.jsx     # Page fade-in animation
│   └── CallLogsContentWrapper.jsx # Async wrapper for Suspense
├── context/
│   ├── AuthContext.jsx        # Auth state + role determination logic
│   └── TenantContext.jsx      # Tenant state + org switching
├── data/
│   └── mockData.js            # Mock leads, calls, analytics per org
├── hooks/
│   └── useDebounce.js         # Search debounce (300ms delay)
└── utils/
    └── (utility functions)
```

## 🎨 Design & Styling

### Color Palette
- **Primary**: Deep Blue (`oklch(0.4 0.15 260)`) - Main brand color
- **Accent**: Vibrant Purple (`oklch(0.55 0.2 260)`) - Highlights and accents
- **Secondary**: Light Blue (`oklch(0.94 0.03 240)`) - Background elements
- **Neutral**: Grays (`oklch(0.92 0 0)`) - Text and borders

### Typography
- **Font Family**: Geist (sans-serif), Geist Mono (monospace)
- **Heading Scale**: 2xl (Dashboard), xl (Sections), lg (Cards)
- **Line Height**: 1.4-1.6 for optimal readability

### Responsive Breakpoints
- Mobile-first design
- Tablet (md): 768px
- Desktop (lg): 1024px
- Grid layouts adapt: 1 column (mobile) → 4 columns (desktop)

## ⚡ Performance Optimizations

### Debounced Search
- **300ms Delay**: Search input debounced to reduce re-renders during typing
- **Implementation**: `useDebounce` hook in leads and call-logs pages
- **Impact**: Prevents excessive filtering calculations on every keystroke

### Component Memoization
- **React.memo()**: StatCard, QuickActionCard, FilterChips, DataTable prevent unnecessary re-renders
- **Props Comparison**: Only re-renders if props actually change
- **Impact**: Significant performance gain with large datasets

### Filtered Data Optimization
- **useMemo**: Filtered leads/calls recalculated only when dependencies change
- **Dependency Array**: Recomputes only when search term, filter status, or source data changes
- **Impact**: Eliminates redundant filtering calculations

### Event Handler Optimization
- **useCallback**: Event handlers wrapped to maintain referential equality
- **Prevents Child Re-renders**: Child components don't re-render due to function recreation
- **Impact**: Smoother interactions and reduced memory pressure

### Async Components & Suspense
- **Suspense Boundaries**: Call logs, settings, and dashboard wrapped in Suspense
- **Loading States**: Skeleton loaders provide visual feedback
- **React 19 Canary Features**: Optimized async rendering pipeline
- **Impact**: Better code splitting and progressive loading

### React Compiler (Experimental)
- **Enabled in next.config.mjs**: Automatic component optimization
- **Scope Tracking**: Compiler identifies optimal memoization boundaries
- **Impact**: Handwritten memoization sometimes redundant; compiler auto-optimizes

### Image Optimization
- **Next.js Image Config**: Optimized responsive image handling
- **Format**: WebP with PNG fallback
- **Impact**: Reduced bandwidth and faster load times

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the project

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### First Login
1. Use demo credentials or enter a custom email
2. Role and organization are automatically determined
3. Click "Sign In"

### Testing Cross-Org Behavior
1. Login as `admin@acme.com` (Admin in Acme)
2. Switch to TechCorp from the header switcher
3. Notice: You're now an Agent (can't edit lead status, can't access Analytics)
4. Switch back to Acme
5. Notice: You're Admin again (can edit, can access Analytics)

## 🔄 State Management & Role Enforcement

### AuthContext
Manages authentication and role determination:
- **user**: Current user object (email, homeOrg, homeRole)
- **login(email, tenant)**: Sets user and determines role based on tenant
- **determineRole(email, tenant)**: Evaluates if user is accessing home org or other org
- **updateTenantAndRole(tenantId)**: Switches tenant and recalculates role
- **logout()**: Clears auth state
- **hydrated**: Tracks localStorage initialization to prevent flickering

### TenantContext
Manages multi-tenant operations:
- **currentTenant**: Active tenant object
- **setCurrentTenant()**: Updates active organization
- **TENANTS**: Map of available organizations (Acme, TechCorp)

### Role Enforcement Logic
```javascript
// Pseudo-code: Role determination algorithm
const determineRole = (userEmail, selectedTenantId) => {
  const userHomeOrg = getUserHomeOrg(userEmail);
  
  if (selectedTenantId === userHomeOrg) {
    return getUserHomeRole(userEmail); // Admin or Agent
  } else {
    return 'Agent'; // Downgrade to Agent for other orgs
  }
};
```

## 📊 Data Structure

### Lead Object
```javascript
{
  id: "L001",
  name: "Company Name",
  phone: "+1-555-0101",
  email: "contact@company.com",
  company: "Company Name",
  status: "New" | "Contacted" | "Converted",
  value: "$50,000",
  assignedTo: "agent@home.com" // Only visible if org matches
}
```

### Call Log Object
```javascript
{
  id: "CL001",
  leadName: "Company Name",
  date: "2024-01-15",
  time: "10:30 AM",
  duration: "12 mins",
  outcome: "Interested" | "Callback scheduled" | "No Answer" | "Not interested"
}
```

### Analytics Object (Org-Scoped)
```javascript
{
  totalLeads: 5,
  convertedLeads: 1,
  totalRevenue: "$385,000",
  conversionRate: "20%",
  averageDealSize: "$77,000",
  monthlyTrend: [...],      // Last 6 months
  agentPerformance: [...],   // Org agents only
  statusBreakdown: [...]     // Org leads only
}
```

## 🔍 Features Explained

### Multi-Tenant Architecture
- Each organization (tenant) has isolated data
- Users can switch between organizations if they have access
- Data filtering ensures users only see tenant-specific information

### Role-Based Access Control (RBAC)
- **Admin Access**: Full system access including settings and analytics
- **Agent Access**: Limited to assigned leads and call logging
- Protected routes redirect unauthorized users to access-denied page

### Lead Management
- Admins can edit lead statuses by double-clicking
- Agents can only view their assigned leads
- Search and filter work across visible leads
- Real-time status updates

### Performance Optimization
- **Debounced Search**: 300ms delay reduces unnecessary re-renders
- **React.memo**: Components memoized to prevent unnecessary renders
- **useMemo**: Filtered data recalculated only when dependencies change
- **Skeleton Loaders**: Visual feedback during data loading
- **Responsive Images**: Optimized image handling in Next.js

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Component Library**: shadcn/ui
- **State Management**: React Context API
- **Hooks**: Custom hooks (useDebounce, useAuth)

## 📈 Mock Data

The application uses realistic mock data for demonstration:
- **5 Leads per organization** with varying statuses
- **12 Call log entries** per day range
- **6 Months of analytics** data
- **Agent performance** metrics

Mock data is defined in `src/data/mockData.js` and can be easily replaced with real API calls.

## 🔄 Switching Between Users

To test different roles and organizations:
1. Click logout in the top-right corner
2. Use different demo credentials from the login page
3. Observe how the interface changes based on role and tenant

## 🎓 Learning Resources

This project demonstrates:
- Next.js 16 App Router with Server Components
- React Context for state management
- Role-based routing and component protection
- Multi-tenant SaaS architecture
- Modern UI/UX patterns
- Performance optimization techniques

## 📝 Notes

- This is a **frontend-only demonstration**
- No backend server or database
- All data is client-side (localStorage for persistence)
- Suitable for prototyping, learning, and UI/UX testing
- Ready to be connected to a real backend API

## 🚀 Next Steps for Production

To convert this to a production-ready application:

1. **Backend Integration**
   - Replace mock data with API calls
   - Implement real authentication
   - Add database storage

2. **Security**
   - Implement OAuth/JWT authentication
   - Add CSRF protection
   - Secure API endpoints with middleware

3. **Features**
   - Email notifications
   - File uploads
   - Advanced reporting
   - Integrations (Slack, email, calendar)

4. **Infrastructure**
   - Deploy to Vercel or similar platform
   - Set up CDN for assets
   - Configure monitoring and logging

## 📄 License

This project is provided as-is for learning and demonstration purposes.

## 🤝 Support

For issues or questions, refer to the codebase documentation or create an issue in your repository.

---

Built with ❤️ using Next.js and React
