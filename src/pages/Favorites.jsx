/*
**
** spotify_album_finder
** File description:
** Favorites.jsx
*/

import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import AlbumCard from "../components/AlbumCard";

function Favorites()
{
    const [favorites, setFavorites] = useState([]);

    /* Load favorites from localStorage */
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    /* Remove album from favorites */
    function removeFavorite(id)
    {
        const updated = favorites.filter((album) => album.id !== id);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    }

    return (
        <Container>
            <h2 style={{ marginBottom: "20px" }}>❤️ My Favorite Albums</h2>

            {favorites.length === 0 ? (
                <p>No favorite albums yet.</p>
            ) : (
                <Row
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                    }}
                >
                    {favorites.map((album) => (
                        <AlbumCard
                            key={album.id}
                            album={album}
                            onFavoriteToggle={() => removeFavorite(album.id)}
                            isFavorite={true}
                        />
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Favorites;
