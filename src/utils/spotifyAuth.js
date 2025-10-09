/*
**
** spotify_album_finder
** File description:
** spotifyAuth.js
*/

const scopes = [
    "user-top-read",
    "user-read-recently-played",
    "user-library-read"
].join(" ");

export function getSpotifyLoginUrl()
{
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const scope = encodeURIComponent(scopes);

    return (
        "https://accounts.spotify.com/authorize" +
        `?client_id=${clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${scope}`
    );
}
