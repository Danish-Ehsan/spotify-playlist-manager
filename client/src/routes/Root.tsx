import generateRandomString from "../utils/generate-random-string";

export default function Root() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  const state = generateRandomString(8);

  //Store state in local storage to compare with the Spotify API response
  localStorage.setItem("spotify_auth_state", state);

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", "code");
  url.searchParams.append(
    "redirect_uri",
    "http://localhost:6201/get-access-token"
  );
  url.searchParams.append("state", state);
  url.searchParams.append(
    "scope",
    "playlist-read-private playlist-read-collaborative"
  );

  return <a href={url.toString()}>Login with Spotify</a>;
}
