# 🌱 KrishiQuest – Frontend Development Guidelines

**Project:** Gamified Platform to Promote Sustainable Farming Practices
**Problem Statement ID:** SIH25075
**Frontend Stack:** React.js, JavaScript (ES6+), Axios, React Router, HTML5, CSS3

---

# 1. Introduction

This document defines the frontend development standards, architecture, coding conventions, UI/UX guidelines, component structure, and API integration practices for the KrishiQuest application.

The primary objective is to maintain a consistent, reusable, responsive, and maintainable frontend throughout the development process.

Every frontend developer must follow these guidelines while implementing new features or modifying existing components.

## 1.1 Development Objectives

- Develop a responsive and user-friendly interface.
- Maintain a consistent design across all application pages.
- Create reusable React components.
- Maintain separation between UI components and business logic.
- Integrate backend REST APIs using Axios.
- Implement role-based navigation and protected routes.
- Provide a smooth user experience for farmers, agriculture officers, and administrators.
- Follow clean coding practices and maintainable project architecture.

---

# 2. Technology Requirements

| Technology          | Usage                                |
| ------------------- | ------------------------------------ |
| React.js            | Component-based frontend development |
| JavaScript ES6+     | Application logic                    |
| Axios               | Backend API communication            |
| React Router DOM    | Application navigation               |
| HTML5               | Semantic page structure              |
| CSS3                | Styling and responsive layouts       |
| Chart.js / Recharts | Dashboard visualizations             |
| React Context API   | Shared application state             |
| Vite                | Development server and build tool    |

Use JavaScript with `.js` and `.jsx` files. TypeScript is not part of the current project requirements.

---

# 3. Frontend Architecture

The frontend must follow a modular, component-based architecture.

The application should be divided into the following major sections:

1. Authentication
2. Farmer Dashboard
3. Farm and Crop Management
4. Learning and Educational Content
5. Quest Management
6. Gamification and Rewards
7. Community and Leaderboard
8. Agriculture Officer Dashboard
9. Admin Dashboard
10. User Profile and Settings

Each section should contain its own pages, components, and related functionality.

---

# 4. Recommended Folder Structure

Follow the structure below when organizing the frontend application.

```text
frontend/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logo.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── dashboard/
│   │   ├── quests/
│   │   ├── rewards/
│   │   ├── learning/
│   │   └── community/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── farmer/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MyFarm.jsx
│   │   │   ├── MyQuests.jsx
│   │   │   ├── Learning.jsx
│   │   │   ├── Rewards.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── officer/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageQuests.jsx
│   │   │   └── VerifySubmissions.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── ManageContent.jsx
│   │   │
│   │   └── NotFound.jsx
│   │
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   ├── FarmerLayout.jsx
│   │   ├── OfficerLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── farmerService.js
│   │   ├── farmService.js
│   │   ├── questService.js
│   │   ├── rewardService.js
│   │   └── communityService.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── formatters.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── responsive.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── README.md
```

Developers may extend this structure when new modules are introduced. Avoid placing all components, API calls, and business logic inside a single file.

---

# 5. UI/UX Design Guidelines

## 5.1 Overall Design Philosophy

KrishiQuest should have a modern, clean, nature-inspired design.

The interface should communicate:

- Agriculture
- Sustainability
- Growth
- Community
- Achievement
- Trust

Avoid unnecessarily complicated layouts, excessive animations, and cluttered dashboards.

The platform should be easy to understand, especially for users who may not have extensive experience using digital applications.

## 5.2 Color Palette

Use a consistent color palette throughout the application.

| Color         | Suggested Hex | Purpose                               |
| ------------- | ------------- | ------------------------------------- |
| Primary Green | #2E7D32       | Primary buttons and important actions |
| Light Green   | #E8F5E9       | Background highlights                 |
| Dark Green    | #1B5E20       | Headings and navigation               |
| Earth Brown   | #795548       | Agricultural accents                  |
| Sky Blue      | #64B5F6       | Information and water-related content |
| White         | #FFFFFF       | Main backgrounds                      |
| Light Gray    | #F5F7F5       | Secondary backgrounds                 |
| Dark Gray     | #263238       | Primary text                          |
| Orange        | #F9A825       | Rewards and achievements              |

Store colors as CSS variables.

Example:

```css
:root {
    --primary-green: #2E7D32;
    --dark-green: #1B5E20;
    --light-green: #E8F5E9;

    --earth-brown: #795548;
    --sky-blue: #64B5F6;

    --background: #F5F7F5;
    --surface: #FFFFFF;

    --text-primary: #263238;
    --text-secondary: #607D8B;
}
```

Do not introduce random colors into individual components.

## 5.3 Typography

Use readable and consistent typography.

Recommended fonts:

- Inter
- Poppins
- Roboto

Guidelines:

- Page headings should have clear visual hierarchy.
- Body text must remain readable.
- Avoid excessively small font sizes.
- Use consistent font weights.
- Maintain proper spacing between headings and content.

## 5.4 Layout Guidelines

Use consistent layouts across authenticated pages.

**Farmer Dashboard Layout:**

- Sidebar navigation.
- Top navigation bar.
- Main content area.
- Notification section.
- Profile menu.

**Authentication Layout:**

- Simple and clean interface.
- KrishiQuest logo.
- Login or registration form.
- Clear input labels.
- Appropriate validation messages.

**Admin and Officer Layout:**

- Role-specific navigation.
- Data tables.
- Search and filtering.
- Dashboard analytics.
- Verification and management actions.

## 5.5 Responsive Design

All pages must support:

- Desktop screens.
- Laptop screens.
- Tablets.
- Mobile devices.

Use CSS Flexbox and Grid wherever appropriate.

Do not use fixed widths for the entire page layout.

The sidebar should become a collapsible navigation menu on smaller screens.

---

# 6. React Component Development Standards

## 6.1 Component Guidelines

- Use functional React components.
- Use React Hooks for state and lifecycle management.
- Keep components small and reusable.
- Avoid unnecessary code duplication.
- Use props for component communication.
- Avoid unnecessary deeply nested components.
- Keep UI presentation separate from API communication.

Example:

```jsx
function QuestCard({ quest }) {
    return (
        <div className="quest-card">
            <h3>{quest.title}</h3>

            <p>{quest.description}</p>

            <span>
                {quest.points} XP
            </span>
        </div>
    );
}

export default QuestCard;
```

The component should receive data through props instead of directly accessing backend resources.

## 6.2 Naming Conventions

| Element      | Convention       | Example       |
| ------------ | ---------------- | ------------- |
| Components   | PascalCase       | QuestCard.jsx |
| Functions    | camelCase        | fetchQuests() |
| Variables    | camelCase        | farmerName    |
| Constants    | UPPER_SNAKE_CASE | API_BASE_URL  |
| CSS classes  | kebab-case       | quest-card    |
| Custom Hooks | use + camelCase  | useAuth()     |
| Context      | PascalCase       | AuthContext   |

## 6.3 State Management

Use React's built-in state management tools.

- `useState` for local component state.
- `useEffect` for side effects and data fetching where appropriate.
- Context API for shared authentication and notification state.
- `useMemo` and `useCallback` only where useful for performance.

Do not introduce Redux or other state-management libraries unless the team has a clear requirement.

## 6.4 Props and Data Handling

- Pass only the necessary data to components.
- Avoid directly modifying props.
- Use stable keys when rendering lists.
- Handle empty and missing values safely.
- Avoid excessive prop drilling.

---

# 7. API Integration Guidelines

The frontend communicates with the Spring Boot backend through REST APIs.

Axios must be used for HTTP communication.

## 7.1 Centralized Axios Configuration

All API calls must use a centralized Axios instance.

Create:

`src/services/api.js`

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000
});

export default api;
```

## 7.2 API Service Separation

Do not write API requests directly inside every UI component.

Create separate service files for each application module.

Example:

`src/services/questService.js`

```javascript
import api from "./api";

export const getAllQuests = () => {
    return api.get("/quests");
};

export const getQuestById = (questId) => {
    return api.get(`/quests/${questId}`);
};

export const participateInQuest = (questId) => {
    return api.post(`/quests/${questId}/participate`);
};
```

Components should call these service functions.

## 7.3 API Response Handling

Every API integration must handle:

- Successful responses.
- Loading states.
- Validation errors.
- Authentication failures.
- Authorization failures.
- Server errors.
- Network errors.
- Empty responses.

Example:

```jsx
const [quests, setQuests] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const fetchQuests = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await getAllQuests();

        setQuests(response.data);

    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Unable to load quests."
        );
    } finally {
        setLoading(false);
    }
};
```

Do not show raw backend stack traces to users.

## 7.4 Authentication Token Handling

The frontend must attach the authentication token to protected API requests.

Use a centralized Axios request interceptor where appropriate.

The token storage strategy should be decided with the backend team. Prefer secure, HttpOnly cookies when the backend architecture supports them. If bearer tokens are used, establish a secure storage and expiration strategy rather than assuming localStorage is automatically safe.

---

# 8. Routing and Navigation

Use React Router DOM for application navigation.

The application should provide separate routes for different user roles.

Example route structure:

```text
/
├── /login
├── /register
│
├── /farmer
│   ├── /dashboard
│   ├── /my-farm
│   ├── /quests
│   ├── /learning
│   ├── /rewards
│   ├── /leaderboard
│   └── /profile
│
├── /officer
│   ├── /dashboard
│   ├── /quests
│   └── /verification
│
└── /admin
    ├── /dashboard
    ├── /users
    └── /content
```

## Routing Requirements

- Public routes must be accessible without authentication.
- Protected routes must require authentication.
- Role-specific pages must validate the user's role.
- Unauthorized users must not access restricted pages.
- Unknown routes must display a 404 page.
- Logout must clear the authenticated frontend state.

Remember that frontend route protection is only a user experience feature. Actual authorization must always be enforced by Spring Security on the backend.

---

# 9. Form Development and Validation

All forms must provide clear labels, appropriate input types, and validation feedback.

### Registration Form

Required fields may include:

- Full name.
- Mobile number.
- Email address.
- Password.
- Confirm password.
- Village.
- District.
- State.
- Preferred language.

Additional farm and crop information can be collected through the farmer profile setup process.

### Validation Guidelines

- Required fields must not be empty.
- Email addresses must follow a valid format.
- Mobile numbers must follow the applicable validation rules.
- Password requirements must be communicated clearly.
- Confirm password must match the password.
- Invalid forms must not be submitted.
- Backend validation errors must be displayed appropriately.

Always validate important data on both frontend and backend.

---

# 10. Page Development Guidelines

## 10.1 Landing Page

The landing page should introduce KrishiQuest and explain its purpose.

Required sections:

- Navigation bar.
- Hero section.
- About the platform.
- Sustainable farming practices.
- How KrishiQuest works.
- Gamification and rewards.
- Community benefits.
- Registration call to action.
- Footer.

## 10.2 Farmer Dashboard

The farmer dashboard should provide a quick overview of the farmer's activities.

Recommended sections:

- Welcome message.
- Total XP.
- Completed quests.
- Current level.
- Sustainability score.
- Recommended quests.
- Recent achievements.
- Progress charts.

## 10.3 Quest Page

Each quest should display:

- Quest title.
- Description.
- Sustainable practice category.
- Difficulty level.
- Estimated duration.
- Reward points.
- Completion requirements.
- Learning resources.
- Start quest action.

## 10.4 Quest Submission Page

The submission interface should allow farmers to:

- View quest requirements.
- Describe completed activities.
- Upload photographs.
- Submit supporting information.
- Track verification status.

## 10.5 Rewards Page

Display:

- Current points balance.
- Earned badges.
- Available achievements.
- Reward history.
- Level progress.

## 10.6 Leaderboard Page

Display:

- Farmer rankings.
- Points earned.
- Village-based rankings.
- Competition information.

## 10.7 Officer Dashboard

Display:

- Total registered farmers.
- Active quests.
- Pending verifications.
- Approved submissions.
- Rejected submissions.
- Farmer participation statistics.

## 10.8 Admin Dashboard

Display:

- User management.
- Quest management.
- Learning content management.
- Reward configuration.
- Platform analytics.

---

# 11. Loading, Error and Empty States

Every page that loads backend data must have appropriate UI states.

### Loading State

Display a loader or skeleton while data is being fetched.

### Error State

Show a meaningful message when an API request fails.

### Empty State

Provide a helpful message when there is no available data.

Examples:

- No quests available at the moment.
- You haven't completed any missions yet.
- No submissions are waiting for verification.
- No community posts found.

Avoid displaying blank pages when data is unavailable.

---

# 12. Accessibility Guidelines

The application should be accessible to users with different levels of digital literacy and accessibility needs.

- Use semantic HTML elements.
- Provide labels for all form inputs.
- Add meaningful alternative text to images.
- Maintain sufficient color contrast.
- Ensure keyboard navigation.
- Use visible focus indicators.
- Do not communicate status through color alone.
- Use readable font sizes.
- Provide clear validation messages.

---

# 13. Performance Optimization

Follow these practices to improve frontend performance:

- Use lazy loading for large page components.
- Optimize images before uploading them.
- Avoid unnecessary component re-renders.
- Use pagination for large datasets.
- Avoid fetching the same data repeatedly.
- Use appropriate loading placeholders.
- Split large components into smaller modules.
- Avoid unnecessary third-party dependencies.

---

# 14. Security Guidelines

- Never hardcode credentials or secret keys.
- Never expose backend secrets in frontend environment variables.
- Never assume frontend validation is sufficient.
- Do not trust user-submitted information.
- Validate uploaded files and their types.
- Handle authentication expiration.
- Do not expose sensitive farmer information.
- Follow the agreed token storage strategy.
- Avoid rendering untrusted HTML directly.

All protected operations must be validated by the backend.

---

# 15. Git and Collaboration Guidelines

All developers must follow a consistent Git workflow.

### Branch Naming

```text
main
development

feature/authentication
feature/farmer-dashboard
feature/quest-management
feature/reward-system
feature/leaderboard

bugfix/api-integration
bugfix/responsive-layout
```

### Commit Message Examples

```bash
git commit -m "Add farmer dashboard UI"

git commit -m "Integrate quest listing API"

git commit -m "Fix authentication navigation"

git commit -m "Add responsive sidebar"
```

### Collaboration Rules

1. Do not directly push unreviewed changes to the main branch.
2. Create feature branches for new functionality.
3. Pull the latest development changes before starting work.
4. Avoid modifying files assigned to other developers without coordination.
5. Resolve merge conflicts carefully.
6. Test changes before creating a Pull Request.
7. Use meaningful commit messages.

---

# 16. Development Checklist

Before considering a frontend module complete, verify the following:

### UI Development

- [ ] Responsive design implemented.
- [ ] Consistent colors and typography.
- [ ] Reusable components created.
- [ ] Navigation works correctly.
- [ ] Forms have appropriate validation.
- [ ] Loading and empty states implemented.

### API Integration

- [ ] Axios service functions implemented.
- [ ] Correct backend endpoints integrated.
- [ ] Success responses handled.
- [ ] API errors handled.
- [ ] Authentication handled.
- [ ] Authorization-aware navigation implemented.

### Quality Assurance

- [ ] No console errors.
- [ ] No broken navigation links.
- [ ] No unnecessary duplicate components.
- [ ] Mobile layout tested.
- [ ] Backend integration tested.
- [ ] Git changes committed.

---

# 17. Final Development Principles

Every frontend developer working on KrishiQuest must follow these core principles:

1. **Consistency:** Maintain a common design system throughout the application.
2. **Reusability:** Develop reusable components instead of duplicating UI code.
3. **Modularity:** Keep pages, services, components, and utilities separate.
4. **Maintainability:** Write readable and understandable JavaScript code.
5. **Responsiveness:** Ensure the application works across different screen sizes.
6. **Accessibility:** Make the platform easy to use for all farmers.
7. **Reliability:** Handle API errors and unexpected states properly.
8. **Security:** Never rely on frontend restrictions for actual data protection.
9. **Collaboration:** Follow the agreed Git workflow and coordinate changes.
10. **User Experience:** Prioritize simplicity and usability over unnecessary visual complexity.

---

**KrishiQuest – Learn. Practice. Earn. Grow Sustainably. 🌱**

*This document serves as the standard frontend development reference for all contributors working on the KrishiQuest project.*
