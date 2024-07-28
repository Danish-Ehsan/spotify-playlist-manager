import { getAppToken } from "./app-access-token";

export async function getArtist(artistId: string) {
  const accessToken = await getAppToken();

  const req = new Request(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const res = await fetch(req);
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json;
}

export async function getUserProfile(token: string) {
  const req = new Request("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();

  return json;
}

export async function getAllPlaylists(token: string) {
  const spotifyReq = new Request(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const spotifyRes = await fetch(spotifyReq);

  console.log(spotifyRes.url);

  if (!spotifyRes.ok) {
    throw new Error(spotifyRes.statusText);
  }

  const json = await spotifyRes.json();

  return json;
}
