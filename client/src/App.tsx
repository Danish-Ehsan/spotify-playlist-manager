import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router-dom";
import { isAuthenticated, logoutLoader } from "./utils/auth.ts";

import Root from "./routes/root.tsx";
import ErrorPage from "./pages/error-page.tsx";
import Home from "./routes/home.tsx";
import Playlists, { loader as playlistsLoader } from "./routes/playlists.tsx";
import tokenLoader from "./utils/token-loader.ts";
import Login from "./routes/login.tsx";
import NotFound from "./pages/not-found.tsx";
import Playlist, { loader as playlistLoader } from "./routes/playlist.tsx";

function authLoader(loader: LoaderFunction) {
  console.log("authLoader firing");
  return async ({ ...args }: LoaderFunctionArgs) => {
    console.log("loader wrapper firing");
    console.log(args);

    if (!isAuthenticated()) {
      throw redirect("/login");
    }
    return loader({ ...args });
  };
}

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
            path: "login",
            element: <Login />,
          },
          {
            path: "logout",
            loader: logoutLoader,
          },
          {
            path: "playlists",
            element: <Playlists />,
            loader: authLoader(playlistsLoader),
          },
          {
            path: "playlist/:playlistId",
            element: <Playlist />,
            loader: authLoader(playlistLoader),
          },
          {
            path: "user",
            loader: authLoader(async () => {
              return fetch("/api/user");
            }),
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
  return <RouterProvider router={router} />;
}
