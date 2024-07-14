import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Route from './Layouts/Route';
import ErrorPage from './Page/ErrorPage';
import Home from './Page/Home';
import ContextProvider from './Auth/ContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './Components/LoadingSpinner';

const Login = lazy(() => import('./Page/Login'));
const SignUp = lazy(() => import('./Page/SignUp'));
const AboutUs = lazy(() => import('./Page/AboutUs'));
const ContactUs = lazy(() => import('./Page/ContactUs'));
const BiodatasPage = lazy(() => import('./Page/BiodatasPage'));
const BioDataDeatils = lazy(() => import('./Page/BioDataDeatils'));
const PrivateRoute = lazy(() => import('./Route/PrivateRoute'));
const CheckoutPage = lazy(() => import('./Page/CheckoutPage'));
const DashboardLayout = lazy(() => import('./Layouts/DashboardLayout'));
const Biodata = lazy(() => import('./Page/Dashboard/Biodata'));
const ViewBiodata = lazy(() => import('./Page/Dashboard/ViewBiodata'));
const MyContactRequest = lazy(() => import('./Page/Dashboard/MyContactRequest'));
const Favourites_Biodata = lazy(() => import('./Page/Dashboard/Favourites_Biodata'));
const AdminDashboard = lazy(() => import('./Page/Dashboard/Admin/AdminDashboard'));
const ManageUsers = lazy(() => import('./Page/Dashboard/Admin/ManageUsers'));
const ApprovedPremium = lazy(() => import('./Page/Dashboard/Admin/ApprovedPremium'));
const ApprovedContactRequest = lazy(() => import('./Page/Dashboard/Admin/ApprovedContactRequest'));
const SuccessStory = lazy(() => import('./Page/Dashboard/Admin/SuccessStory'));
const Married = lazy(() => import('./Page/Dashboard/Married'));

const queryClient = new QueryClient();

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
        element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense>
      },
      {
        path: '/signup',
        element: <Suspense fallback={<LoadingSpinner />}><SignUp /></Suspense>
      },
      {
        path: "/aboutUs",
        element: <Suspense fallback={<LoadingSpinner />}><AboutUs /></Suspense>
      },
      {
        path: '/contactUs',
        element: <Suspense fallback={<LoadingSpinner />}><ContactUs /></Suspense>
      },
      {
        path: '/biodatas',
        element: <Suspense fallback={<LoadingSpinner />}><BiodatasPage /></Suspense>
      },
      {
        path: '/details/:id',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><BioDataDeatils /></PrivateRoute></Suspense>
      },
      {
        path:"/checkoutPage/:id",
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><CheckoutPage/></PrivateRoute></Suspense>
      },
    ]
  },
  {
    path:'dashboard',
    element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><DashboardLayout/></PrivateRoute></Suspense>,
    children:[
      {
        path:'biodata',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><Biodata/></PrivateRoute></Suspense>
      },
      {
        path:"viewBiodata",
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><ViewBiodata/></PrivateRoute></Suspense>
      },
      {
        path:'myContactRequest',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><MyContactRequest/></PrivateRoute></Suspense>
      },
      {
        path:'favouritesBiodata',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><Favourites_Biodata/></PrivateRoute></Suspense>
      },
      {
        path:'adminDashboard',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><AdminDashboard/></PrivateRoute></Suspense>
      },
      {
        path:'manageUsers',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><ManageUsers/></PrivateRoute></Suspense>
      },
      {
        path:'approvedPremium',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><ApprovedPremium/></PrivateRoute></Suspense>
      },
      {
        path:'approvedContactRequest',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><ApprovedContactRequest/></PrivateRoute></Suspense>
      },
      {
        path:'successStory',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><SuccessStory/></PrivateRoute></Suspense>
      },
      {
        path:'married',
        element: <Suspense fallback={<LoadingSpinner />}><PrivateRoute><Married/></PrivateRoute></Suspense>
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
);
