import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Route from './Layouts/Route';
import ErrorPage from './Page/ErrorPage';
import Home from './Page/Home';
import ContextProvider from './Auth/ContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import AboutUs from './Page/AboutUs';
import ContactUs from './Page/ContactUs';
import BiodatasPage from './Page/BiodatasPage';
import BioDataDeatils from './Page/BioDataDeatils';
import PrivateRoute from './Route/PrivateRoute';
import CheckoutPage from './Page/CheckoutPage';
import DashboardLayout from './Layouts/DashboardLayout';
import Biodata from './Page/Dashboard/Biodata';
import ViewBiodata from './Page/Dashboard/ViewBiodata';
import MyContactRequest from './Page/Dashboard/MyContactRequest';
import Favourites_Biodata from './Page/Dashboard/Favourites_Biodata';
import AdminDashboard from './Page/Dashboard/Admin/AdminDashboard';
import ManageUsers from './Page/Dashboard/Admin/ManageUsers';
import ApprovedPremium from './Page/Dashboard/Admin/ApprovedPremium';
import ApprovedContactRequest from './Page/Dashboard/Admin/ApprovedContactRequest';
import SuccessStory from './Page/Dashboard/Admin/SuccessStory';
import Married from './Page/Dashboard/Married';



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
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: "/aboutUs",
        element: <AboutUs />
      },
      {
        path: '/contactUs',
        element: <ContactUs />
      },
      {
        path: '/biodatas',
        element: <BiodatasPage />
      },
      {
        path: '/details/:id',
        element: <PrivateRoute><BioDataDeatils /></PrivateRoute>
      },
      {
        path:"/checkoutPage/:id",
        element:<PrivateRoute><CheckoutPage/></PrivateRoute>
      },
      
    ]
  },

  {
    path:'dashboard',
    element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        path:'biodata',
        element:<PrivateRoute><Biodata/></PrivateRoute>
      },
      {
        path:"viewBiodata",
        element:<PrivateRoute><ViewBiodata/></PrivateRoute>
      },
      {
        path:'myContactRequest',
        element:<PrivateRoute><MyContactRequest/></PrivateRoute>
      },
      {
        path:'favouritesBiodata',
        element:<PrivateRoute><Favourites_Biodata/></PrivateRoute>
      },
      {
        path:'adminDashboard',
        element:<PrivateRoute><AdminDashboard/></PrivateRoute>
      },
      {
        path:'manageUsers',
        element:<PrivateRoute><ManageUsers/></PrivateRoute>
      },
      {
        path:'approvedPremium',
        element:<PrivateRoute><ApprovedPremium/></PrivateRoute>
      },
      {
        path:'approvedContactRequest',
        element:<PrivateRoute><ApprovedContactRequest/></PrivateRoute>
      },
      {
        path:'successStory',
        element:<PrivateRoute><SuccessStory/></PrivateRoute>
      },
      {
        path:'married',
        element:<PrivateRoute><Married/></PrivateRoute>
      }
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <Toaster />
  </QueryClientProvider>
)
