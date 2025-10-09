/*
** 
** spotify_album_finder
** File description:
** SpotifyAuthContext.jsx
*/

import { createContext, useContext, useState, useEffect } from "react";

const SpotifyAuthContext = createContext();

export function SpotifyAuthProvider({ children })
{
    const [token, setToken] = useState(localStorage.getItem("spotify_token") || null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("spotify_user")) || null
    );

    /* Save state in localStorage */
    useEffect(() => {
        if (token)
            localStorage.setItem("spotify_token", token);
        else
            localStorage.removeItem("spotify_token");
    }, [token]);

    useEffect(() => {
        if (user)
            localStorage.setItem("spotify_user", JSON.stringify(user));
        else
            localStorage.removeItem("spotify_user");
    }, [user]);

    return (
        <SpotifyAuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </SpotifyAuthContext.Provider>
    );
}

export function useSpotifyAuth()
{
    return useContext(SpotifyAuthContext);
}
