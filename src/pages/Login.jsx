/*
**
** spotify_album_finder
** File description:
** Login.jsx
*/

import { Container, Button } from "react-bootstrap";
import { getSpotifyLoginUrl } from "../utils/spotifyAuth";

function Login()
{
    return (
        <Container className="login-container">
            <h2 className="login-title">🎧 Connect your Spotify account</h2>
            <p className="login-text">
                Login to generate your personalized Spotify Wrapped!
            </p>

            <Button href={getSpotifyLoginUrl()} className="login-button">
                Login with Spotify
            </Button>
        </Container>
    );
}

export default Login;
