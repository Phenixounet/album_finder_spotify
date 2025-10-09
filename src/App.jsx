/*
**
** spotify_album_finder
** File description:
** App.jsx
*/

import { Container, Row, Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import AlbumCard from "./components/AlbumCard";
import Favorites from "./pages/Favorites";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App()
{
    const [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    /* Theme management */
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    /* Fetch Spotify API access token */
    useEffect(() => {
        const authParams = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body:
                "grant_type=client_credentials&client_id=" +
                clientId +
                "&client_secret=" +
                clientSecret,
        };

        fetch("https://accounts.spotify.com/api/token", authParams)
            .then((res) => res.json())
            .then((data) => setAccessToken(data.access_token))
            .catch((err) => console.error("Error fetching token:", err));
    }, []);

    /* Artist search */
    async function search()
    {
        if (searchInput.trim() === "")
            return;

        const artistParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };

        const artistID = await fetch(
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
            artistParams
        )
            .then((res) => res.json())
            .then((data) => data.artists?.items?.[0]?.id)
            .catch(() => null);

        if (!artistID)
            return;

        await fetch(
            "https://api.spotify.com/v1/artists/" +
                artistID +
                "/albums?include_groups=album&market=US&limit=50",
            artistParams
        )
            .then((res) => res.json())
            .then((data) => setAlbums(data.items))
            .catch((err) => console.error("Error fetching albums:", err));
    }

    /* Toggle theme (light/dark) */
    function toggleTheme()
    {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <div className="App">
            <Nav className="justify-content-center" style={{ marginBottom: "20px" }}>
                <Nav.Item>
                    <Link to="/" className="nav-link">Search</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/favorites" className="nav-link">Favorites ❤️</Link>
                </Nav.Item>
            </Nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <SearchBar
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                                onSearch={search}
                                onToggleTheme={toggleTheme}
                                currentTheme={theme}
                            />
                            <Container>
                                <Row
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-around",
                                        alignContent: "center",
                                    }}
                                >
                                    {albums.map((album) => (
                                        <AlbumCard key={album.id} album={album} />
                                    ))}
                                </Row>
                            </Container>
                        </>
                    }
                />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </div>
    );
}

export default App;
