// Import necessary components and libraries
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ChatPage from "./pages/Chat";
import HomePage from "./pages/Home";
import io from 'socket.io-client';



function App() {
  
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        },
        {
          path: 'chat',
          element: <ChatPage />
        },
        
      ]
    }
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
