import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./routes/Home.tsx";
import Playlists, { loader as playlistsLoader } from "./routes/Playlists.tsx";
import { tokenLoader } from "./utils/token-loader.ts";
import Login from "./routes/Login.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "get-access-token",
            loader: tokenLoader,
          },
          {
            path: "playlists",
            element: <Playlists />,
            loader: playlistsLoader,
          },
          {
            path: "user",
            loader: async () => {
              return await fetch("/api/user");
            },
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
