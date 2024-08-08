import { useLoaderData, Link, LoaderFunctionArgs } from "react-router-dom";
import refreshToken from "../utils/refresh-token";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Playlists loader firing");
  const res = await fetch("/api/user/playlists");

  if (res.status === 403) {
    const url = new URL(request.url);

    return refreshToken(url.pathname);
  } else if (!res.ok) {
    const errorData = await res.json();
    errorData.url = request.url;
    throw errorData;
  }

  const json = await res.json();

  console.log(json);

  return json;
}

export default function Playlists() {
  const playlists =
    useLoaderData() as SpotifyApi.ListOfCurrentUsersPlaylistsResponse;

  const playlistCards = playlists.items.map((playlist) => {
    return (
      <article className="c-card" key={playlist.id}>
        <Link
          to={`/playlist/${playlist.id}`}
          className="c-card__link"
          aria-label={`Go to ${playlist.name} playlist`}
        >
          <div className="c-card__image">
            <img src={playlist.images[0].url} alt="Playlist image" />
          </div>
          <div className="c-card__text">
            <h3 className="c-card__title">{playlist.name}</h3>
            <p className="c-card__summary">{playlist.tracks.total} tracks</p>
          </div>
        </Link>
      </article>
    );
  });

  return (
    <section className="l-content">
      <h1>Playlists</h1>
      <section className="l-grid">{playlistCards}</section>
      <h2>Raw data</h2>
      <pre>
        <code>{JSON.stringify(playlists, null, 3)}</code>
      </pre>
    </section>
  );
}
