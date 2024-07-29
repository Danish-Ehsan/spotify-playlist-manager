import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root.tsx";
import ErrorPage from "./pages/error-page.tsx";
import Home from "./routes/home.tsx";
import Playlists, { loader as playlistsLoader } from "./routes/playlists.tsx";
import { tokenLoader } from "./utils/token-loader.ts";
import Login from "./routes/login.tsx";
import NotFound from "./pages/not-found.tsx";
import Playlist, { loader as playlistLoader } from "./routes/playlist.tsx";

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
            path: "playlist/:playlistId",
            element: <Playlist />,
            loader: playlistLoader,
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
