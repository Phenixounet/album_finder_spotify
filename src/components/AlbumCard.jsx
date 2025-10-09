/*
**
** spotify_album_finder
** File description:
** AlbumCard.jsx
*/

import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function AlbumCard({ album, onFavoriteToggle, isFavorite = false })
{
    const [favorite, setFavorite] = useState(isFavorite);

    useEffect(() => {
        setFavorite(isFavorite);
    }, [isFavorite]);

    /* Add or remove album from favorites */
    function toggleFavorite()
    {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorite)
            favorites = favorites.filter((a) => a.id !== album.id);
        else
            favorites.push(album);

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setFavorite(!favorite);

        if (onFavoriteToggle)
            onFavoriteToggle(album.id);
    }

    return (
        <Card className="album-card">
            <div className="album-header">
                <button
                    className="heart-btn"
                    onClick={toggleFavorite}
                    aria-label="toggle favorite"
                >
                    {favorite ? "❤️" : "🤍"}
                </button>
            </div>
            <Card.Img
                src={album.images[0]?.url}
                alt={album.name}
                className="album-image"
            />
            <Card.Body>
                <Card.Title className="album-title">{album.name}</Card.Title>
                <Card.Text className="album-date">
                    Release Date:<br /> {album.release_date}
                </Card.Text>
                <Button
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="album-button"
                >
                    Album Link
                </Button>
            </Card.Body>
        </Card>
    );
}

export default AlbumCard;
