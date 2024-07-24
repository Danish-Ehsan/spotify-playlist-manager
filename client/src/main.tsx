import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";
import { Playlists, loader as playlistsLoader } from "./routes/Playlists.tsx";
import { fetchAccessToken } from "./utils/access-token.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/get-access-token",
    loader: fetchAccessToken,
  },
  {
    path: "/playlists",
    element: <Playlists />,
    loader: playlistsLoader,
  },
  {
    path: "/user",
    loader: async () => {
      return await fetch("/api/user");
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
