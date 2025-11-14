/*
**
** spotify_album_finder
** File description:
** Wrapped.jsx
*/

import { useEffect, useState } from "react";
import { useSpotifyAuth } from "../context/SpotifyAuthContext";
import "../styles/wrapped.css";

function Wrapped()
{
    const { token, user } = useSpotifyAuth();
    const [totalListeningMinutes, setTotalListeningMinutes] = useState(0);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    /* Fetch listening time and top data */
    useEffect(() => {
        if (!token)
            return;

        /* Recently played tracks */
        fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: { Authorization: "Bearer " + token },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.items)
                    return;

                let totalMs = 0;

                for (const item of data.items)
                    totalMs += item.track.duration_ms;
                setTotalListeningMinutes(Math.floor(totalMs / 60000));
            })
            .catch((err) => console.error("Recent tracks error:", err));

        /* Top artists */
        fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
            headers: { Authorization: "Bearer " + token },
        })
            .then((res) => res.json())
            .then((data) => setTopArtists(data.items || []))
            .catch((err) => console.error("Top artists error:", err));

        /* Top tracks */
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            headers: { Authorization: "Bearer " + token },
        })
            .then((res) => res.json())
            .then((data) => setTopTracks(data.items || []))
            .catch((err) => console.error("Top tracks error:", err));
    }, [token]);

    return (
        <div className="favorites-container wrapped-container">
            <h2>🎁 Your 2025 Spotify Wrapped</h2>
            {user && (
                <p>
                    Welcome, <strong>{user.display_name}</strong> 👋
                </p>
            )}

            <h4>
                ⏱️ You’ve listened for about{" "}
                <strong>{totalListeningMinutes}</strong> minutes recently!
            </h4>

            <section className="wrapped-section">
                <h3>Top Artists</h3>
                <div className="wrapped-grid">
                    {topArtists.map((artist) => (
                        <div
                            key={artist.id}
                            className="wrapped-card"
                        >
                            <img
                                src={artist.images?.[0]?.url}
                                alt={artist.name}
                                className="wrapped-card-image"
                            />
                            <p className="wrapped-card-title">
                                {artist.name}
                            </p>
                            <p className="wrapped-card-subtitle">
                                {artist.genres?.slice(0, 2).join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="wrapped-section">
                <h3>Top Tracks</h3>
                <div className="wrapped-grid">
                    {topTracks.map((track) => (
                        <div
                            key={track.id}
                            className="wrapped-card"
                        >
                            <img
                                src={track.album.images?.[0]?.url}
                                alt={track.name}
                                className="wrapped-card-image"
                            />
                            <p className="wrapped-card-title">
                                {track.name}
                            </p>
                            <p className="wrapped-card-subtitle">
                                {track.artists[0].name}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Wrapped;
