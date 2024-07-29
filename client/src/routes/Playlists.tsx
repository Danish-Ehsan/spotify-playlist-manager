import { useLoaderData } from "react-router-dom";

export async function loader() {
  const res = await fetch("/api/user/playlists");

  if (!res.ok) {
    //throw new Error(res.statusText);
    const errorData = await res.json();
    throw errorData;
  }

  const json = await res.json();

  return json;
}

export default function Playlists() {
  //TODO: Create type for playlists
  const playlists = useLoaderData();

  const playlistCards = playlists.items.map((playlist) => {
    return (
      <article className="c-card" key={playlist.id}>
        <a
          href={`/playlist/${playlist.id}`}
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
        </a>
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
