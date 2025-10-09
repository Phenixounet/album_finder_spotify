/*
**
** spotify_album_finder
** File description:
** Wrapped.jsx
*/

import { useEffect, useState } from "react";
import { useSpotifyAuth } from "../context/SpotifyAuthContext";

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
        <div className="favorites-container">
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

            <section style={{ marginTop: "40px" }}>
                <h3>Top Artists</h3>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {topArtists.map((artist) => (
                        <div
                            key={artist.id}
                            style={{
                                width: "180px",
                                margin: "10px",
                                background: "#181818",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            <img
                                src={artist.images?.[0]?.url}
                                alt={artist.name}
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
                            <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                                {artist.name}
                            </p>
                            <p style={{ fontSize: "13px", color: "#bbb" }}>
                                {artist.genres?.slice(0, 2).join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginTop: "40px" }}>
                <h3>Top Tracks</h3>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {topTracks.map((track) => (
                        <div
                            key={track.id}
                            style={{
                                width: "180px",
                                margin: "10px",
                                background: "#181818",
                                padding: "10px",
                                borderRadius: "8px",
                            }}
                        >
                            <img
                                src={track.album.images?.[0]?.url}
                                alt={track.name}
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
                            <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                                {track.name}
                            </p>
                            <p style={{ fontSize: "13px", color: "#bbb" }}>
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
