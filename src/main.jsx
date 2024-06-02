import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Route from './Page/Route';
import ErrorPage from './Page/ErrorPage';
import Home from './Page/Home';
import ContextProvider from './Auth/ContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AboutUs from './Page/AboutUs';
import ContactUs from './Page/ContactUs';



const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Route />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
      {
        path:"/aboutUs",
        element:<AboutUs/>
      },
      {
        path:'/contactUs',
        element:<ContactUs/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <Toaster/>
  </QueryClientProvider>
)
