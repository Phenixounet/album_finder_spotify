/*
**
** spotify_album_finder
** File description:
** 
*/

import { useSpotifyAuth } from "../context/SpotifyAuthContext";

function LogoutButton()
{
    const { logout } = useSpotifyAuth();

    return (
        <button className="logout-btn" onClick={logout}>
            Se déconnecter
        </button>
    );
}

export default LogoutButton;
