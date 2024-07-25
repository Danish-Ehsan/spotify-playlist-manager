import { redirect } from "react-router-dom";

export async function tokenLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const authCode = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  console.log(authCode);

  if (error) {
    throw new Error(error);
  }

  if (!state || state !== localStorage.getItem("spotify_auth_state")) {
    throw new Error("State mismatch");
  }

  const req = new Request("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: authCode,
    }),
  });

  //response sets JWT cookie
  const res = await fetch(req);

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.message);
  }

  return redirect("/playlists");
}
