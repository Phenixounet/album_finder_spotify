/*
**
** spotify_album_finder
** File description:
** App.jsx
*/

import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Row, Nav, Button } from "react-bootstrap";
import { FaSpotify } from "react-icons/fa";

import SearchBar from "./components/SearchBar";
import AlbumCard from "./components/AlbumCard";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Wrapped from "./pages/Wrapped";

import { getSpotifyLoginUrl } from "./utils/spotifyAuth";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SpotifyAuthProvider, useSpotifyAuth } from "./context/SpotifyAuthContext";

import "./styles/loginButton.css";
import "./styles/theme.css";

/* ----------- Inner App Component (uses context) ----------- */
function AppContent()
{
    const [searchInput, setSearchInput] = useState("");
    const [albums, setAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const { token } = useSpotifyAuth();

    /* Apply theme */
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    /* Fetch general Spotify token for public search */
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
            .catch((err) => console.error("Token error:", err));
    }, []);

    /* Search artist albums */
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
            .catch((err) => console.error("Album fetch error:", err));
    }

    function toggleTheme()
    {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <div className="App">
            <Nav className="justify-content-center" style={{ marginBottom: "20px" }}>
                <Nav.Item><Link to="/" className="nav-link">Search</Link></Nav.Item>
                <Nav.Item><Link to="/favorites" className="nav-link">Favorites ❤️</Link></Nav.Item>
                <Nav.Item><Link to="/wrapped" className="nav-link">Wrapped 🎁</Link></Nav.Item>
            </Nav>

            <Routes>
                <Route path="/" element={
                    <>
                        <SearchBar
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            onSearch={search}
                            onToggleTheme={toggleTheme}
                            currentTheme={theme}
                        />

                        {/* Show login button only if not logged in */}
                        {!token && (
                            <div className="login-spotify-wrapper">
                                <Button
                                    href={getSpotifyLoginUrl()}
                                    className="login-spotify-btn"
                                >
                                    <FaSpotify /> Login with Spotify
                                </Button>
                            </div>
                        )}

                        <Container>
                            <Row
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-around",
                                }}
                            >
                                {albums.map((album) => (
                                    <AlbumCard key={album.id} album={album} />
                                ))}
                            </Row>
                        </Container>
                    </>
                } />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/wrapped" element={<Wrapped />} />
            </Routes>
        </div>
    );
}

/* ----------- Global Providers ----------- */
function App()
{
    return (
        <SpotifyAuthProvider>
            <FavoritesProvider>
                <AppContent />
            </FavoritesProvider>
        </SpotifyAuthProvider>
    );
}

export default App;
