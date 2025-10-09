/*
**
** spotify_album_finder
** File description:
** FavoritesContext.jsx
*/

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children })
{
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    function addFavorite(album)
    {
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.id === album.id);
            if (exists)
                return prev;
            return [...prev, album];
        });
    }

    function removeFavorite(albumId)
    {
        setFavorites((prev) => prev.filter((fav) => fav.id !== albumId));
    }

    function isFavorite(albumId)
    {
        return favorites.some((fav) => fav.id === albumId);
    }

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites()
{
    return useContext(FavoritesContext);
}
