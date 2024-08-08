import { redirect } from "react-router-dom";

export function isAuthenticated() {
  return !!localStorage.getItem("user");
}

export async function login(authCode: string) {
  const req = new Request("/api/auth/get-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: authCode,
    }),
  });

  //response sets JWT token as an httpOnly cookie
  const res = await fetch(req);

  if (!res.ok) {
    const errData = await res.json();
    throw errData;
  }

  const user = await res.json();
  localStorage.setItem("user", JSON.stringify(user));

  //Unlike logoutLoader(), login() does not need to hard refresh state on login
  //This is because the Spotify auth flow already redirects the user to the Spotify login page
  //and then back to the app on success, resetting state.
  return redirect("/playlists");
}

export async function logoutLoader() {
  //Server removes JWT token httpOnly cookies
  const res = await fetch("/api/auth/logout");

  if (!res.ok) {
    const errData = await res.json();
    throw errData;
  }

  localStorage.removeItem("user");

  //Uses window.location instead of redirect() or Navigate
  //so the App does a hard refresh to reset state and show the correct navigation menu.
  //You can't access Context in a loader so that approach doesn't work.
  window.location.href = "/login";

  return null;
}
