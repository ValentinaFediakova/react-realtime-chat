# react-realtime-chat

A real-time chat application built with React, Redux, and WebSockets.

This project was developed as part of a Hexlet course to practice building a frontend application with real-time features, authentication, and form validation. It includes user registration, login, messaging, and dynamic channel management.

## ✨ Features

- Realtime messaging with WebSockets
- User authentication (sign up / sign in)
- Create, rename, and delete channels
- Message filtering
- Form validation and error handling
- Responsive layout

## 🛠️ Tech Stack

- React
- Redux Toolkit
- React Router
- Axios
- Socket.IO-client
- i18next
- Formik

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ValentinaFediakova/react-realtime-chat.git
cd react-realtime-chat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install and run the backend server

```bash
npm install @hexlet/chat-server
npx chat-server
```

The backend will run at `http://localhost:5001`.

You can test it with:

```bash
curl http://localhost:5001/api/v1/channels
```

For more details, see the official server documentation:  
👉 https://www.npmjs.com/package/@hexlet/chat-server

### 4. Start the frontend app

```bash
npm start
```

The app will be available at `http://localhost:3000`.

> Note: Proxy to the backend is already configured in `frontend/package.json`:
> ```json
> "proxy": "http://127.0.0.1:5001"
> ```

## 📦 Status

Project completed as part of the Hexlet curriculum. No active development planned, but feel free to explore the code.
