import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Dashboard,
  Help,
  Market,
  Portfolio,
  Profile,
  Stocks,
  Trade,
} from "./pages/pages";

const router = createBrowserRouter([
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
    element: <Help />
  },
  {
    path: "/market",
    element: <Market />
  },
  {
    path: "/portfolio",
    element: <Portfolio />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/stocks",
    element: <Stocks />
  },
  {
    path: "/trade",
    element: <Trade />
  }
], {
    future: {
        v7_relativeSplatPath: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
        v7_startTransition: true,
    }
});

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
