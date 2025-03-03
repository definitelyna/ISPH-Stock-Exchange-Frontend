import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Help,
  Market,
  Portfolio,
  Profile,
  Trade,
  SignIn,
} from "./pages/pages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/help",
      element: <Help />,
    },
    {
      path: "/market",
      element: <Market />,
    },
    {
      path: "/portfolio",
      element: <Portfolio />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/trade",
      element: <Trade />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },

  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
);
