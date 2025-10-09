/*
**
** spotify_album_finder
** File description:
** AlbumCard.jsx
*/

import { Card, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/albumcard.css";

function AlbumCard({ album })
{
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(album.id);

    function toggleFavorite()
    {
        if (favorite)
            removeFavorite(album.id);
        else
            addFavorite(album);
    }

    return (
        <Card className="album-card">
            <div className="album-img-wrapper">
                <Card.Img src={album.images[0]?.url} />
                <button
                    className="fav-btn"
                    onClick={toggleFavorite}
                    aria-label="Toggle favorite"
                >
                    {favorite ? <FaHeart color="#ff4b5c" /> : <FaRegHeart />}
                </button>
            </div>
            <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>Release Date: {album.release_date}</Card.Text>
                <Button
                    href={album.external_urls.spotify}
                    className="album-link-btn"
                >
                    Album Link
                </Button>
            </Card.Body>
        </Card>
    );
}

export default AlbumCard;
