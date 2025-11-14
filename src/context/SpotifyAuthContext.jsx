/*
**
** spotify_album_finder
** File description:
** 
*/

import { createContext, useContext, useState, useEffect } from "react";

const SpotifyAuthContext = createContext();

export function SpotifyAuthProvider({ children })
{
    /* Use sessionStorage so user disconnects when browser is closed */
    const [token, setToken] = useState(
        sessionStorage.getItem("spotify_token") || null
    );
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("spotify_user")) || null
    );

    /* Save token */
    useEffect(() => {
        if (token)
            sessionStorage.setItem("spotify_token", token);
        else
            sessionStorage.removeItem("spotify_token");
    }, [token]);

    /* Save user */
    useEffect(() => {
        if (user)
            sessionStorage.setItem("spotify_user", JSON.stringify(user));
        else
            sessionStorage.removeItem("spotify_user");
    }, [user]);

    /* Logout function */
    function logout()
    {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("spotify_token");
        sessionStorage.removeItem("spotify_user");
    }

    return (
        <SpotifyAuthContext.Provider value={{
            token,
            setToken,
            user,
            setUser,
            logout
        }}>
            {children}
        </SpotifyAuthContext.Provider>
    );
}

export function useSpotifyAuth()
{
    return useContext(SpotifyAuthContext);
}
