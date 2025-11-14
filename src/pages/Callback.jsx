/*
**
** spotify_album_finder
** File description:
** Callback.jsx
*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpotifyAuth } from "../context/SpotifyAuthContext";

function Callback()
{
    const navigate = useNavigate();
    const { setToken, setUser } = useSpotifyAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code)
            return;

        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
        });

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    setToken(data.access_token);

                    fetch("https://api.spotify.com/v1/me", {
                        headers: { Authorization: "Bearer " + data.access_token },
                    })
                        .then((res) => res.json())
                        .then((userData) => {
                            setUser(userData);
                            navigate("/wrapped");
                        });
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3>Connecting to Spotify...</h3>
        </div>
    );
}

export default Callback;

