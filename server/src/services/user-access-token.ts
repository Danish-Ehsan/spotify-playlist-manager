const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURI = process.env.SPOTIFY_REDIRECT_URI as string;

export async function getUserToken(authCode: string) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: redirectURI,
  });

  const spotifyReq = new Request(
    `https://accounts.spotify.com/api/token?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );

  const res = await fetch(spotifyReq);

  console.log(res.status);

  if (!res.ok) {
    console.log(res.status);
    throw new Error(res.statusText);
  }

  const json = await res.json();

  return json;
}

export async function refreshUserToken(refreshToken: string) {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const spotifyReq = new Request(
    `https://accounts.spotify.com/api/token?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );

  const res = await fetch(spotifyReq);

  console.log(res.status);

  if (!res.ok) {
    console.log(res.status);
    throw new Error(res.statusText);
  }

  const json = await res.json();

  return json;
}
