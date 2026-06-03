# GitHub Repo Explorer

## Project Description

This project is a GitHub Repository Explorer built as part of the assigned coding exercise. The application allows users to search for any GitHub username and view profile information along with their public repositories. Users can sort repositories by stars, name, or last updated date, expand repository cards to view additional details, and load more repositories when available. The project uses the GitHub REST API through a custom Express.js backend with caching support to reduce unnecessary API requests.

---

## Live Demo

Frontend: https://your-frontend-url.com

Backend: https://your-backend-url.com

---

## Features

### User Search

* Search any GitHub username
* View profile information
* Recent searches stored in localStorage

### User Profile

* Avatar
* Name
* Bio
* Followers count
* Following count
* Public repositories count

### Repository Explorer

* Repository name
* Description
* Primary language
* Star count
* Last updated date

### Repository Sorting

* Sort by Stars
* Sort by Name
* Sort by Last Updated

### Repository Details

* Expand repository card
* Open issues count
* Fork count
* Default branch

### Pagination

* Load More repositories button
* Fetches repositories page-by-page

### Error Handling

* Invalid GitHub username
* API errors
* Loading states

### Performance

* Backend caching
* GitHub token support

---

## Tech Stack

### Frontend

* React.js

  * Component-based UI development

* Tailwind CSS

  * Rapid and responsive styling

* React Icons

  * GitHub logo, search icons, UI icons

* Vite

  * Fast development environment

### Backend

* Node.js

  * JavaScript runtime

* Express.js

  * REST API server

* Axios

  * GitHub API requests

* dotenv

  * Environment variable management

* CORS

  * Frontend-backend communication

### External APIs

* GitHub REST API

  * User and repository data

---

## How to Run Locally

### Clone Repository

```bash
git clone <repository-url>
cd GitHub-Repo-Explorer
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a .env file:

```env
PORT=5000
GITHUB_TOKEN=your_github_token
```

Run backend:

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Documentation

### Get User Information

Method:

```http
GET
```

Endpoint:

```http
/api/github/:username
```

Example:

```http
/api/github/octocat
```

Response:

```json
{
  "login": "octocat",
  "name": "The Octocat",
  "bio": "GitHub mascot",
  "avatar_url": "...",
  "followers": 100,
  "following": 5,
  "public_repos": 8
}
```

---

### Get User Repositories

Method:

```http
GET
```

Endpoint:

```http
/api/github/:username/repos
```

Query Parameters:

```http
?page=1
```

Example:

```http
/api/github/octocat/repos?page=1
```

Response:

```json
{
  "repos": [
    {
      "id": 1,
      "name": "repo-name",
      "description": "Repository description",
      "language": "JavaScript",
      "stargazers_count": 20,
      "updated_at": "2025-01-01"
    }
  ],
  "page": 1,
  "per_page": 30,
  "count": 30
}
```

---

## Project Structure

```text
GitHub-Repo-Explorer
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── RepoList.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── Backend
│   ├── cache
│   │   └── memoryCache.js
│   │
│   ├── routes
│   │   └── github.js
│   │
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

AI and External Assistance Disclosure

AI tools (ChatGPT) were used as a development assistant during specific parts of the project. The assistance was primarily focused on implementation guidance, debugging support, and UI/UX suggestions.

Areas where AI assistance was used:

Frontend
Designing and implementing the loading overlay experience (background blur and loading state handling).
Suggestions for the expandable repository details feature (showing open issues count, default branch, forks, etc.).
UI/UX improvements for the search interface and repository cards.
Debugging React state management and component integration issues.
Backend
Suggestions for API response caching strategy using in-memory caching.
Guidance for GitHub API error handling (user not found, rate limiting, and server errors).
Assistance with implementing repository pagination and load-more functionality.
General Express.js route structure and API design recommendations.
Documentation
Assistance in structuring and organizing the README file.

All code integration, architecture decisions, debugging, testing, customization, and final implementation were completed manually. Every AI-generated suggestion was reviewed, modified when necessary, and verified before being included in the project.

Additional References
GitHub REST API Documentation
React Documentation
Express.js Documentation
Tailwind CSS Documentation
Axios Documentation


Next Steps

The current implementation focuses on delivering a complete GitHub Repository Explorer with user search, repository exploration, sorting, pagination, caching, error handling, and an improved user experience.

If I were to continue developing this project, the next areas I would focus on are:

Repository Search & Filtering
Search repositories by name within the fetched results.
Filter repositories by programming language, stars, or fork status.
Combine sorting and filtering for easier repository discovery.
Advanced Repository Insights
Display repository topics and tags.
Show license information and repository size.
Provide visual statistics such as language distribution and repository activity.
Enhanced User Experience
Infinite scrolling as an alternative to the current "Load More" functionality.
Skeleton loaders for repository cards while data is being fetched.
Dark/Light theme support with user preferences stored locally.

## Tutorials and Code Snippets

This project was implemented from scratch and was not generated from a complete tutorial project.

While I consulted documentation and community resources for understanding specific concepts and debugging issues, no large code sections were copied directly from tutorials or Stack Overflow answers into the final implementation.

---

## Author

Pavitra Jangir

GitHub:
https://github.com/Pavitrajangir

LinkedIn:
https://www.linkedin.com/in/pavitra-jangir-a13a0428b
