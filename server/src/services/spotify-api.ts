import { getAccessToken } from "./access-token";

export async function getArtist(artistId: string) {
  const accessToken = await getAccessToken();

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
