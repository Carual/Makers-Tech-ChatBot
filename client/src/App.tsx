import React from 'react';
import './index.css';
import ChatTest from './components/chat';
import Inventory from './pages/inventory';
import Header from './components/header';
import ChatBot from './pages/chatBot';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatBot />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
  }
])
function App() {
  return <>
    <RouterProvider router={router} />
  </>;

}

export default App;
