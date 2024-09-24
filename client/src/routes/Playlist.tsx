import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import refreshToken from "../utils/refresh-token";
import SongsTable from "../components/songs-table";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const res = await fetch(`/api/user/playlist/${params.playlistId}`);

  if (res.status === 403) {
    const url = new URL(request.url);

    return refreshToken(url.pathname);
  } else if (!res.ok) {
    const errData = await res.json();
    errData.url = request.url;
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
      <h3>Number of songs: {playlist.tracks.items.length}</h3>
      <SongsTable playlist={playlist} />
      <pre>
        <code>{JSON.stringify(playlist, null, "-")}</code>
      </pre>
    </section>
  );
}
