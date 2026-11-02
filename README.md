# 🌱 KrishiQuest – Gamified Platform to Promote Sustainable Farming Practices

**Smart India Hackathon 2025 | Problem Statement ID: SIH25075**

KrishiQuest is a gamified digital platform designed to encourage farmers to adopt sustainable agricultural practices through interactive learning, personalized farming challenges, achievement rewards, and community engagement.

The platform transforms traditional agricultural education into an engaging experience where farmers can learn sustainable farming techniques, complete real-world farming activities, earn points, unlock achievements, and contribute towards environmentally responsible agriculture.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Objectives](#-project-objectives)
4. [Key Features](#-key-features)
5. [User Roles](#-user-roles)
6. [Technology Stack](#-technology-stack)
7. [System Architecture](#-system-architecture)
8. [Application Modules](#-application-modules)
9. [Project Structure](#-project-structure)
10. [Database Design](#-database-design)
11. [API Architecture](#-api-architecture)
12. [Installation and Setup](#-installation-and-setup)
13. [Environment Configuration](#-environment-configuration)
14. [Application Workflow](#-application-workflow)
15. [Security](#-security)
16. [Future Enhancements](#-future-enhancements)
17. [Testing](#-testing)
18. [Contribution Guidelines](#-contribution-guidelines)
19. [License](#-license)

---

## 🌾 Project Overview

Agriculture plays a significant role in India's economy and the livelihood of millions of people. However, conventional farming practices often involve excessive chemical fertilizer usage, inefficient irrigation, monocropping, and unsustainable resource consumption.

KrishiQuest aims to address these challenges by introducing gamification into agricultural education and sustainable farming adoption.

The platform provides farmers with personalized agricultural missions, educational resources, progress tracking, achievement badges, and community-based competitions.

Instead of simply providing theoretical agricultural information, KrishiQuest encourages farmers to apply sustainable practices in their actual farming activities.

### Our Approach

The platform follows three fundamental principles:

| Principle | Description |
|---|---|
| Learn | Educate farmers through interactive lessons, quizzes, and farming simulations. |
| Practice | Encourage real-world implementation through personalized farming quests. |
| Earn | Reward farmers with points, badges, achievements, and recognition. |

### Project Vision

To create an engaging agricultural ecosystem that motivates farmers to adopt sustainable farming practices while promoting environmental conservation, agricultural awareness, and community participation.

---

## 🎯 Problem Statement

**SIH25075 – Gamified Platform to Promote Sustainable Farming Practices**

The problem statement focuses on encouraging farmers to adopt environmentally responsible agricultural practices by introducing an interactive and gamified digital platform.

### Major Challenges

- Excessive dependence on chemical fertilizers and pesticides.
- Over-irrigation and inefficient water management.
- Continuous monocropping and lack of crop diversification.
- Limited awareness of sustainable agricultural techniques.
- Lack of motivation to change traditional farming practices.
- Limited engagement with conventional agricultural awareness programs.

### Proposed Solution

KrishiQuest addresses these challenges through:

- Gamified agricultural education.
- Personalized sustainable farming missions.
- Activity-based progress tracking.
- Reward and achievement systems.
- Farmer communities and leaderboards.
- Verification of real-world sustainable farming activities.

---

## 🎯 Project Objectives

1. Promote awareness of sustainable agricultural practices.
2. Encourage farmers to adopt environmentally friendly farming techniques.
3. Provide personalized farming missions based on crop type and geographical location.
4. Introduce gamification to improve farmer engagement.
5. Recognize farmers for completing sustainable agricultural activities.
6. Encourage knowledge sharing among farming communities.
7. Track the adoption of sustainable agricultural practices.
8. Support agricultural departments in monitoring farmer participation and engagement.

---

## 🚀 Key Features

### 1. User Authentication and Farmer Registration

- Secure farmer registration and login.
- JWT-based authentication.
- Role-based access control.
- Farmer profile management.
- Farm and crop information management.

### 2. Personalized Farming Quests

Farmers receive sustainable farming challenges based on their agricultural profile.

Examples:

| Quest | Description |
|---|---|
| Water Saver | Adopt efficient irrigation techniques. |
| Soil Guardian | Improve soil health using organic manure. |
| Green Protector | Explore biological pest management. |
| Crop Diversity | Practice mixed cropping or crop rotation. |
| Mulching Master | Adopt mulching to conserve soil moisture. |

Each quest contains:
- Quest title and description.
- Instructions and educational resources.
- Difficulty level.
- Expected completion duration.
- Reward points.
- Verification requirements.

### 3. Interactive Agricultural Learning

The platform provides educational content through:

- Interactive quizzes.
- Educational videos.
- Farming tutorials.
- Flashcards.
- Scenario-based learning.
- Sustainable farming awareness materials.

### 4. Gamification and Reward System

Farmers earn rewards by participating in learning activities and completing sustainable farming missions.

**Gamification elements:**

- Experience points (XP).
- Achievement badges.
- Farmer levels.
- Daily and weekly challenges.
- Progress tracking.
- Achievement history.
- Reward points.

### 5. Real-World Activity Verification

Farmers can submit evidence of completed farming activities.

Verification mechanisms may include:

- Photograph uploads.
- Activity descriptions.
- Submission timestamps.
- Location information with user consent.
- Agriculture officer verification.

Verified activities are eligible for the corresponding rewards.

### 6. Farmer Dashboard

The dashboard provides an overview of farming achievements and platform activities.

It includes:

- Total earned points.
- Current farmer level.
- Completed quests.
- Pending quests.
- Earned badges.
- Sustainability progress.
- Recent activities.
- Recommended missions.

### 7. Leaderboard and Community

- Individual farmer rankings.
- Village-level leaderboards.
- Community-based competitions.
- Sustainable farming discussions.
- Farmer experience sharing.
- Community achievements.

### 8. Agriculture Officer Dashboard

Agriculture officers can:

- View farmer participation.
- Review submitted farming activities.
- Approve or reject quest submissions.
- Create and manage farming quests.
- Monitor farmer progress.
- View agricultural engagement statistics.

### 9. Administrative Management

Administrators can manage:

- Users and roles.
- Agricultural learning content.
- Farming quests.
- Achievement badges.
- Reward configurations.
- Community activities.
- Platform analytics.

---

## 👥 User Roles

The application supports three primary user roles.

| Role | Responsibilities |
|---|---|
| Farmer | Learn sustainable practices, complete quests, submit evidence, earn rewards, and participate in communities. |
| Agriculture Officer | Manage farming missions, verify farmer submissions, and monitor agricultural activities. |
| Admin | Manage users, roles, platform content, rewards, and system configurations. |

Each role receives access only to the resources and operations permitted by its authorization level.

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Building reusable user interface components. |
| JavaScript (ES6+) | Frontend application logic. |
| Axios | Communication with backend REST APIs. |
| React Router | Client-side navigation and routing. |
| HTML5 | Application structure. |
| CSS3 | Styling and responsive layouts. |
| Chart.js / Recharts | Dashboard analytics and visualizations. |

### Backend

| Technology | Purpose |
|---|---|
| Java | Core backend programming language. |
| Spring Boot | Backend application development. |
| Spring Web | REST API development. |
| Spring Security | Authentication and authorization. |
| JWT | Token-based authentication. |
| Spring Data JPA | Database access and repository management. |
| Hibernate | Object-relational mapping (ORM). |
| Maven | Dependency and build management. |

### Database

| Technology | Purpose |
|---|---|
| MySQL | Relational database management. |
| MySQL Workbench | Database administration and visualization. |
| JPA / Hibernate | Entity mapping and database operations. |

### Development and Testing Tools

| Tool | Purpose |
|---|---|
| IntelliJ IDEA / Eclipse | Java backend development. |
| Visual Studio Code | Frontend development. |
| Postman | REST API testing. |
| Git | Version control. |
| GitHub | Source code management and collaboration. |
| Swagger / OpenAPI | API documentation. |
| JUnit | Backend unit testing. |

---

## 🏗️ System Architecture

KrishiQuest follows a client-server architecture with a React frontend, Spring Boot backend, and MySQL database.

```text
                 FARMER / OFFICER / ADMIN
                           |
                           |
                    REACT FRONTEND
                  JavaScript + Axios
                           |
                           |
                    REST API LAYER
                       HTTP/JSON
                           |
                           |
                  SPRING BOOT BACKEND
                           |
          +----------------+----------------+
          |                |                |
     CONTROLLER         SERVICE          SECURITY
       LAYER             LAYER             LAYER
          |                |                |
          +----------------+----------------+
                           |
                     REPOSITORY LAYER
                     Spring Data JPA
                           |
                      HIBERNATE ORM
                           |
                       MYSQL DB
```

### Architectural Layers

**1. Presentation Layer**

React.js handles the user interface, navigation, user interactions, and API communication.

**2. Controller Layer**

Spring Boot REST controllers receive HTTP requests and return appropriate responses.

**3. Service Layer**

Contains business logic for farmer management, quests, rewards, verification, and gamification.

**4. Repository Layer**

Spring Data JPA repositories perform database operations.

**5. Database Layer**

MySQL stores application information, including users, farms, crops, quests, submissions, achievements, and transactions.

---

## 📁 Project Structure

The project is organized into separate frontend and backend applications.

```text
KrishiQuest/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── QuestCard.jsx
│   │   │   └── ProgressBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── QuestPage.jsx
│   │   │   ├── LearningPage.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── questService.js
│   │   │   └── farmerService.js
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/krishiquest/
│   │   │   │
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── entity/
│   │   │   ├── dto/
│   │   │   ├── security/
│   │   │   ├── exception/
│   │   │   ├── enums/
│   │   │   └── KrishiQuestApplication.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │
│   ├── src/test/
│   └── pom.xml
│
├── docs/
│   ├── architecture/
│   ├── database/
│   └── api-documentation/
│
├── .gitignore
└── README.md
```

*Note: The directory structure represents the proposed organization and can evolve during development.*

---

## 🗄️ Database Design

The application uses MySQL as its relational database.

Spring Data JPA and Hibernate handle object-relational mapping between Java entities and database tables.

### Main Database Entities

| Entity | Description |
|---|---|
| User | Stores user authentication and account information. |
| FarmerProfile | Stores farmer-specific details. |
| Farm | Stores farm information. |
| Crop | Stores available crop information. |
| FarmCrop | Represents crops cultivated on farms. |
| SustainablePractice | Stores sustainable farming techniques. |
| Quest | Stores farming missions and challenges. |
| QuestEligibility | Defines quest eligibility conditions. |
| FarmerQuest | Tracks farmer participation in quests. |
| QuestSubmission | Stores evidence submitted by farmers. |
| Verification | Stores verification decisions and remarks. |
| RewardTransaction | Maintains reward point transaction history. |
| Badge | Stores available achievements. |
| FarmerBadge | Tracks badges earned by farmers. |
| CommunityPost | Stores farmer community posts. |
| Comment | Stores comments on community posts. |

### Important Database Relationships

- One user can have one farmer profile.
- One farmer can own multiple farms.
- One farm can cultivate multiple crops.
- One quest can be assigned to multiple farmers.
- One farmer can participate in multiple quests.
- One farmer quest can have multiple submissions.
- A submission can receive a verification decision.
- One farmer can earn multiple badges.
- One farmer can create multiple community posts.

### Database Design Considerations

- Use primary keys and foreign keys to maintain referential integrity.
- Use unique constraints for email and mobile number where appropriate.
- Store passwords using secure password hashing.
- Use transactions for reward allocation.
- Maintain a separate reward transaction history.
- Use appropriate date and timestamp fields.
- Use enumerations for quest status, verification status, and user roles.
- Maintain audit information for important administrative actions.

---

## 🔌 API Architecture

The backend exposes RESTful APIs for communication with the React frontend.

All API requests and responses use JSON.

### Base URL

```text
http://localhost:8080/api/v1
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user. |
| POST | /auth/login | Authenticate a user. |
| POST | /auth/logout | Logout or invalidate the current session/token as implemented. |
| GET | /auth/profile | Get authenticated user information. |

### Farmer APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /farmers/profile | Get farmer profile. |
| PUT | /farmers/profile | Update farmer profile. |
| POST | /farms | Register a new farm. |
| GET | /farms | Get farmer's farms. |
| POST | /farms/{farmId}/crops | Add a crop to a farm. |
| GET | /farmers/dashboard | Get farmer dashboard information. |

### Quest APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /quests | Get available quests. |
| GET | /quests/{questId} | Get quest details. |
| GET | /quests/recommended | Get recommended quests. |
| POST | /quests/{questId}/participate | Participate in a quest. |
| GET | /farmer-quests | Get farmer's quests. |
| POST | /farmer-quests/{id}/submissions | Submit quest evidence. |

### Verification APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /verifications/pending | Get pending submissions. |
| GET | /verifications/{id} | Get submission details. |
| POST | /verifications/{id}/approve | Approve a submission. |
| POST | /verifications/{id}/reject | Reject a submission. |

### Gamification APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | /rewards/balance | Get farmer's current points. |
| GET | /rewards/history | Get reward transaction history. |
| GET | /badges | Get available badges. |
| GET | /farmers/badges | Get earned badges. |
| GET | /leaderboard | Get farmer rankings. |

### Community APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /community/posts | Create a community post. |
| GET | /community/posts | Get community posts. |
| GET | /community/posts/{id} | Get post details. |
| POST | /community/posts/{id}/comments | Add a comment. |

*Note: These endpoints describe the planned API contract. Actual implementation may introduce additional endpoints or modify request methods.*

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Install the following software before starting:

- Java JDK 17 or later.
- Node.js and npm.
- MySQL Server 8.x.
- MySQL Workbench (optional).
- IntelliJ IDEA / Eclipse.
- Visual Studio Code.
- Git.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd KrishiQuest
```

### 2. Database Setup

Start MySQL Server and create the database.

```sql
CREATE DATABASE krishiquest;
```

Verify that the database has been created:

```sql
SHOW DATABASES;
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure your database connection in:

```text
src/main/resources/application.properties
```

Example configuration:

```properties
spring.application.name=KrishiQuest

server.port=8080

spring.datasource.url=jdbc:mysql://localhost:3306/krishiquest
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Install dependencies and build the application:

```bash
mvn clean install
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will generally be available at:

```text
http://localhost:5173
```

The exact URL is displayed in the terminal when the development server starts.

---

## 🔐 Environment Configuration

Sensitive configuration values should not be committed to GitHub.

### Backend Environment Variables

```env
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_secure_secret_key
```

Configure these variables in your development environment.

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Example Axios configuration:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
```

For authenticated requests, configure an appropriate authorization mechanism to attach the JWT token.

---

## 🔄 Application Workflow

The general workflow of KrishiQuest is as follows:

```text
             USER REGISTRATION
                    |
                    v
             FARMER PROFILE
                    |
                    v
             FARM INFORMATION
                    |
                    v
           PERSONALIZED QUESTS
                    |
                    v
          LEARNING AND GUIDANCE
                    |
                    v
          FARMER COMPLETES QUEST
                    |
                    v
           SUBMITS EVIDENCE
                    |
                    v
             VERIFICATION
                    |
              +-----+-----+
              |           |
           APPROVED    REJECTED
              |           |
              v           v
         AWARD POINTS   FEEDBACK
              |
              v
         UPDATE PROGRESS
              |
              v
       BADGES AND LEADERBOARD
```

### Example Scenario

A farmer cultivating bananas receives a quest to adopt mulching practices.

1. The farmer views the quest instructions.
2. The farmer learns about the benefits of mulching.
3. The farmer implements the technique on the farm.
4. The farmer uploads photographs as evidence.
5. An agriculture officer verifies the submission.
6. The platform awards the configured points.
7. The farmer's achievements and progress are updated.

---

## 🛡️ Security

Security is an important consideration because the platform manages user accounts, farmer information, and activity submissions.

The application incorporates the following security practices:

- JWT-based authentication.
- Role-based access control using Spring Security.
- Secure password hashing using BCrypt.
- Input validation and sanitization.
- Authorization checks on protected endpoints.
- Protection against unauthorized data access.
- Secure database configuration.
- Environment-based secret management.
- Appropriate CORS configuration.
- Validation of uploaded files.
- Audit logging for important administrative operations.

Sensitive farmer information and location data should only be collected when necessary and with appropriate user consent.

---

## 🧪 Testing

The application should be tested at both frontend and backend levels.

### Backend Testing

**JUnit and Mockito**

Used for testing:

- Authentication services.
- Farmer management.
- Quest assignment.
- Reward calculations.
- Submission verification.
- Repository operations.

**Postman**

Used for testing:

- REST API endpoints.
- Authentication.
- Authorization.
- Request validation.
- API responses.
- Error handling.

### Frontend Testing

Testing should cover:

- Registration and login.
- Dashboard rendering.
- API communication using Axios.
- Navigation and routing.
- Quest participation.
- Evidence submission.
- Responsive layouts.

---

## 🔮 Future Enhancements

The following features can be introduced in future development phases.

### 1. AI-Powered Farming Assistant

An intelligent assistant that provides guidance on sustainable agricultural practices based on farmer queries.

### 2. AI-Based Image Verification

Use image classification to assist in identifying farming activities submitted by farmers.

### 3. Weather-Based Recommendations

Integrate weather APIs to provide location-specific farming suggestions and reminders.

### 4. Offline Accessibility

Allow farmers to access previously downloaded educational content and missions without an active internet connection.

### 5. Multilingual Support

Support regional languages such as Malayalam, Marathi, Hindi, and other Indian languages.

### 6. Farming Simulation

Introduce interactive farming games where users learn the impact of agricultural decisions on soil health, water consumption, and crop productivity.

### 7. Government Scheme Integration

Provide information about relevant government agricultural schemes and benefits.

### 8. Advanced Sustainability Analytics

Introduce data-driven insights to monitor sustainable farming adoption and environmental impact.

---

## 🤝 Contribution Guidelines

Contributions are welcome!

If you want to contribute to KrishiQuest:

1. Fork the repository.
2. Clone your fork.
3. Create a new feature branch.
4. Implement your changes.
5. Test your implementation.
6. Commit your changes with meaningful messages.
7. Push your branch.
8. Create a Pull Request.

Example:

```bash
git checkout -b feature/quest-management

git add .

git commit -m "Add quest management functionality"

git push origin feature/quest-management
```

Please follow the existing project structure and coding conventions.

---

## 📜 License

This project is developed as part of the Smart India Hackathon initiative under problem statement SIH25075.

A formal open-source license can be added based on the team's distribution and usage requirements.

---

## 🌍 Expected Impact

KrishiQuest aims to contribute towards a more sustainable agricultural ecosystem by:

- Increasing awareness of sustainable farming practices.
- Encouraging efficient utilization of natural resources.
- Promoting soil health and biodiversity.
- Reducing unnecessary dependence on chemical inputs.
- Improving farmer engagement through gamification.
- Strengthening knowledge sharing among farming communities.
- Encouraging measurable adoption of sustainable agricultural techniques.

---

## 👨‍💻 Project Information

| Field | Details |
|---|---|
| Project Name | KrishiQuest |
| Problem Statement ID | SIH25075 |
| Competition | Smart India Hackathon 2025 |
| Domain | Agriculture, FoodTech & Rural Development |
| Frontend | React.js, JavaScript, Axios |
| Backend | Java, Spring Boot |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL |
| Architecture | Client-Server, REST API |

---

**KrishiQuest – Learn. Practice. Earn. Grow Sustainably. 🌱**

*Making sustainable farming engaging, rewarding, and accessible to every farmer.*