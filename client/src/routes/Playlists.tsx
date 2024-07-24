import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch("/api/user/playlists");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();

  return json;
}

export function Playlists() {
  const playlists = useLoaderData();

  return (
    <>
      <h1>Playlists</h1>
      <p>
        <pre>
          <code>{JSON.stringify(playlists, null, 3)}</code>
        </pre>
      </p>
    </>
  );
}
