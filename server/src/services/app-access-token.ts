let token: string | null = null;
let tokenExpiryTime: number | null = null;

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

export function isAppTokenExpired() {
  return tokenExpiryTime && tokenExpiryTime < Date.now();
}

export async function getAppToken() {
  if (token && !isAppTokenExpired()) {
    return token;
  } else {
    await fetchAppToken();
    return token;
  }
}

export function setToken(newToken: string, expiryTime: number) {
  token = newToken;
  tokenExpiryTime = Date.now() + expiryTime * 1000;
}

async function fetchAppToken() {
  const req = new Request("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const res = await fetch(req);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  setToken(json["access_token"], json["expires_in"]);
}

export async function refreshAppToken() {}
