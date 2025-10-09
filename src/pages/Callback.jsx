/*
**
** spotify_album_finder
** File description:
** Callback.jsx
*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback()
{
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code)
            return;

        const authParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    btoa(
                        import.meta.env.VITE_CLIENT_ID +
                        ":" +
                        import.meta.env.VITE_CLIENT_SECRET
                    ),
            },
            body:
                "grant_type=authorization_code" +
                "&code=" + code +
                "&redirect_uri=" +
                encodeURIComponent(import.meta.env.VITE_REDIRECT_URI),
        };

        fetch("https://accounts.spotify.com/api/token", authParams)
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("spotify_access_token", data.access_token);
                navigate("/wrapped");
            })
            .catch((err) => console.error("Error retrieving token:", err));
    }, [navigate]);

    return <p className="callback-text">Authenticating with Spotify...</p>;
}

export default Callback;
