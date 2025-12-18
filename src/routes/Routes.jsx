import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddBook from "../pages/Dashboard/Seller/AddBook";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import BookDetails from "../pages/BookDetails/BookDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import Books from "../components/Home/Books";
import Invoice from "../pages/Payment/Invoice";
import MyBook from "../pages/MyBook";
import EditBook from "../pages/EditBook";
// import AllUser from "../pages/Dashboard/Admin/AllUser";
import ManageBook from "../pages/Dashboard/Admin/ManageBook";
// import UpdateRole from "../components/Modal/UpdateRole";
import AllUser from "../pages/Dashboard/Admin/AllUser";
import Wishlist from "../pages/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "my-book",
        element: <MyBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "all-user",
        element: <AllUser />,
      },
      {
        path: "manage-book",
        element: <ManageBook />,
      },
    ],
  },
]);
