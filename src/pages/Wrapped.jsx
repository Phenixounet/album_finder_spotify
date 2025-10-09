/*
**
** spotify_album_finder
** File description:
** Wrapped.jsx
*/

import { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";

function Wrapped()
{
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const token = localStorage.getItem("spotify_access_token");

    useEffect(() => {
        if (!token)
            return;

        const headers = { Authorization: "Bearer " + token };

        /* Top artists */
        fetch("https://api.spotify.com/v1/me/top/artists?limit=5", { headers })
            .then((res) => res.json())
            .then((data) => setTopArtists(data.items || []))
            .catch((err) => console.error("Artist error:", err));

        /* Top tracks */
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", { headers })
            .then((res) => res.json())
            .then((data) => setTopTracks(data.items || []))
            .catch((err) => console.error("Track error:", err));
    }, [token]);

    return (
        <Container className="wrapped-container">
            <h2 className="wrapped-title">🎁 Your 2025 Spotify Wrapped</h2>

            <div className="wrapped-section">
                <h3>Top Artists</h3>
                <Row style={{ justifyContent: "center" }}>
                    {topArtists.map((artist) => (
                        <Card key={artist.id} className="wrapped-card">
                            <Card.Img src={artist.images[0]?.url} />
                            <Card.Body>
                                <Card.Title>{artist.name}</Card.Title>
                                <Card.Text>
                                    {artist.genres.slice(0, 2).join(", ")}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </div>

            <div className="wrapped-section">
                <h3>Top Tracks</h3>
                <Row style={{ justifyContent: "center" }}>
                    {topTracks.map((track) => (
                        <Card key={track.id} className="wrapped-card">
                            <Card.Img src={track.album.images[0]?.url} />
                            <Card.Body>
                                <Card.Title>{track.name}</Card.Title>
                                <Card.Text>{track.artists[0].name}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default Wrapped;
