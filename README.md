# 🐛 MERN Bug Tracker

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI" />
</div>

<div align="center">
  <h3>A full-stack bug tracking application built with the MERN stack</h3>
  <p>Complete with comprehensive testing, debugging utilities, and modern UI components</p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [▶️ Running the Application](#️-running-the-application)
- [🧪 Testing](#-testing)
- [🐞 Debugging](#-debugging)
- [⚠️ Error Handling](#️-error-handling)
- [📁 Project Structure](#-project-structure)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- 🎯 **Full CRUD Operations** - Create, read, update, and delete bugs seamlessly
- 📊 **Status Tracking** - Monitor bug status (open, in-progress, resolved)
- 🎚️ **Priority Management** - Assign priority levels (low, medium, high)
- 📱 **Responsive Design** - Beautiful UI with Material-UI components
- 🛡️ **Error Boundaries** - Comprehensive error handling throughout the application
- 🧪 **Testing Suite** - Unit and integration tests for both frontend and backend
- 🔍 **Built-in Debugging** - Debugging utilities and comprehensive logging
- ⚡ **Real-time Updates** - Instant feedback on all operations
- 🔐 **Data Validation** - Robust client and server-side validation

## 🛠️ Technologies Used

### Frontend
- **React** `^18.0.0` - Modern UI library with hooks
- **Material-UI** `^5.0.0` - Sleek component library
- **Axios** `^1.0.0` - HTTP client for API calls
- **React Router** - Client-side routing

### Backend
- **Node.js** `^16.0.0` - JavaScript runtime
- **Express.js** `^4.18.0` - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** `^6.0.0` - MongoDB object modeling

### Testing & Development
- **Jest** `^29.0.0` - JavaScript testing framework
- **React Testing Library** - React component testing
- **Supertest** - HTTP assertion library
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Debugging Tools
- **Chrome DevTools** - Frontend debugging
- **Node.js Inspector** - Backend debugging
- **Error Boundaries** - React error handling
- **Morgan** - HTTP request logging

## 📋 Prerequisites

Before you begin, ensure you have these installed on your system:

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | `v16+` | JavaScript runtime |
| **MongoDB** | `v5.0+` | Database (local or Atlas) |
| **Git** | Latest | Version control (optional) |
| **PNPM** | Latest | Package manager (recommended) |

> **Note**: You can also use `npm` or `yarn` instead of `pnpm`

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/mern-bug-tracker.git

# Navigate to project directory
cd mern-bug-tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pnpm install  # or npm install

# Create environment file
touch .env
```

**Configure your `.env` file:**

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bug-tracker
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bug-tracker

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: JWT Secret (for future authentication)
JWT_SECRET=your-secret-key-here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
pnpm install  # or npm install
```

## ▶️ Running the Application

### Development Mode

**Start the Backend Server:**
```bash
cd backend
pnpm start  # or npm start

# For development with auto-reload
pnpm dev   # or npm run dev
```

**Start the Frontend Development Server:**
```bash
# In a new terminal
cd frontend
pnpm start  # or npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Production Mode

**Backend:**
```bash
cd backend
NODE_ENV=production pnpm start
```

**Frontend:**
```bash
cd frontend
pnpm build
pnpm serve  # or serve -s build
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

**Test Coverage Includes:**
- Unit tests for controllers
- Integration tests for API endpoints
- Database model validation tests
- Error handling tests

### Frontend Tests

```bash
cd frontend

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

**Test Coverage Includes:**
- Component rendering tests
- User interaction tests
- API service tests
- Integration flow tests

## 🐞 Debugging

### Backend Debugging

**Console Logging:**
```javascript
// Strategic console.log placement
console.log('Debug point:', { variable, timestamp: new Date().toISOString() });
```

**Node.js Inspector:**
```bash
# Start with debugging enabled
node --inspect server.js

# For break on start
node --inspect-brk server.js
```
Then open Chrome and navigate to `chrome://inspect`

**Debug Scripts:**
```bash
# Debug mode with nodemon
pnpm debug

# Debug tests
pnpm test:debug
```

### Frontend Debugging

**React DevTools:**
- Install the Chrome extension
- Inspect component state and props
- Track component re-renders

**Chrome DevTools:**
- Use the Sources tab for breakpoints
- Network tab for API calls
- Console for error messages

**Error Boundaries:**
```jsx
// Automatic error catching and display
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## ⚠️ Error Handling

### Backend Error Handling

- **Express Middleware**: Centralized error handling
- **Mongoose Validation**: Automatic data validation
- **Custom Error Classes**: Structured error responses
- **Logging**: Comprehensive error logging with timestamps

### Frontend Error Handling

- **Error Boundaries**: Catch and display component errors
- **API Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Fallback UI**: Graceful degradation on errors

## 📁 Project Structure

```
mern-bug-tracker/
├── 📁 backend/
│   ├── 📁 controllers/         # Route controllers
│   ├── 📁 models/             # Mongoose models
│   ├── 📁 routes/             # Express routes
│   ├── 📁 middleware/         # Custom middleware
│   ├── 📁 utils/              # Utility functions
│   ├── 📁 tests/              # Backend tests
│   ├── 📄 server.js           # Entry point
│   └── 📄 .env                # Environment variables
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 services/       # API services
│   │   ├── 📁 utils/          # Utility functions
│   │   ├── 📁 tests/          # Frontend tests
│   │   └── 📄 App.js          # Main App component
│   └── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore
```

## 🌐 API Endpoints

### Bug Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bugs` | Get all bugs |
| `GET` | `/api/bugs/:id` | Get bug by ID |
| `POST` | `/api/bugs` | Create new bug |
| `PUT` | `/api/bugs/:id` | Update bug |
| `DELETE` | `/api/bugs/:id` | Delete bug |

### Request/Response Examples

**Create Bug:**
```json
POST /api/bugs
{
  "title": "Login button not working",
  "description": "Users cannot log in on mobile devices",
  "priority": "high",
  "status": "open"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Login button not working",
    "description": "Users cannot log in on mobile devices",
    "priority": "high",
    "status": "open",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)

1. **Prepare for deployment:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login
```

2. **Create Heroku app:**
```bash
heroku create your-app-name-backend
```

3. **Set environment variables:**
```bash
heroku config:set MONGODB_URI=your-production-mongodb-uri
heroku config:set NODE_ENV=production
```

4. **Deploy:**
```bash
git push heroku main
```

### Frontend Deployment (Netlify)

1. **Build the project:**
```bash
cd frontend
pnpm build
```

2. **Deploy to Netlify:**
- Drag and drop the `build` folder to Netlify
- Or connect your Git repository for continuous deployment

### Environment Variables for Production

**Backend (.env.production):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bug-tracker
PORT=5000
NODE_ENV=production
```

**Frontend:**
Create a `.env.production` file:
```env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes and add tests**
4. **Run the test suite:**
   ```bash
   pnpm test
   ```
5. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by [Your Name]</p>
  <p>
    <a href="https://github.com/your-username/mern-bug-tracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/your-username/mern-bug-tracker/issues">Request Feature</a>
  </p>
</div>