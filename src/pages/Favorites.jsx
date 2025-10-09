/*
**
** spotify_album_finder
** File description:
** Favorites.jsx
*/

import { Container, Row } from "react-bootstrap";
import { useFavorites } from "../context/FavoritesContext";
import AlbumCard from "../components/AlbumCard";

function Favorites()
{
    const { favorites } = useFavorites();

    return (
        <Container className="favorites-container">
            <h2>❤️ My Favorite Albums</h2>
            <Row style={{ justifyContent: "center" }}>
                {favorites.length > 0 ? (
                    favorites.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))
                ) : (
                    <p>No favorites yet.</p>
                )}
            </Row>
        </Container>
    );
}

export default Favorites;
