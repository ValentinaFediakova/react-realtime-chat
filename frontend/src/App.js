import React, { useEffect, useState } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  useLocation,
  useNavigate,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContext from './contexts/index.js';
import useAuth from './hooks/index.js';
import Chat from './routes/chat/Chat';
import Login from './routes/login/Login';
import Signup from './routes/signup/Signup';
import { ErrorBoundaryMyApp, ErrorPage } from './errors';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  return (

    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const rollbarConfig = {
  accessToken: '9d62154534f94f47ba9ca77d7d991337',
  environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const App = () => {
  useEffect(() => {
    // console.log('loaded App')
  }, []);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ErrorBoundaryMyApp>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/"
                  element={(
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  )}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <ToastContainer transition={Slide} />
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundaryMyApp>
        {/* <TestError /> */}
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
