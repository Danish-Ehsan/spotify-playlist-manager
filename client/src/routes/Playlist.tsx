import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`/api/user/playlist/${params.playlistId}`);

  if (!res.ok) {
    const errData = await res.json();
    throw errData;
  }

  const json = res.json();
  return json;
}

export default function Playlist() {
  const playlist = useLoaderData() as SpotifyApi.SinglePlaylistResponse;

  return (
    <section className="l-content">
      <h1>
        {playlist.name} Playlist{" "}
        <small className="u-secondary-color">
          by {playlist.owner.display_name}
        </small>
      </h1>
      <pre>
        <code>{JSON.stringify(playlist, null, 3)}</code>
      </pre>
    </section>
  );
}
