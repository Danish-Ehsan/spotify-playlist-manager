import { login } from "./auth";

export default async function tokenLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const authCode = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  console.log(authCode);

  if (error) {
    throw new Error(error);
  }

  //Compare local state variable with the Spotify return state as a recommended security step
  if (!state || state !== localStorage.getItem("spotify_auth_state")) {
    throw new Error("Spotify auth state mismatch");
  }

  if (authCode) {
    //login() returns a redirect() on success
    return login(authCode);
  }

  return null;
}
