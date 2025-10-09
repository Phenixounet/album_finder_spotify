/*
**
** spotify_album_finder
** File description:
** SearchBar.jsx
*/

import { FormControl, InputGroup, Button, Container } from "react-bootstrap";

function SearchBar({ searchInput, setSearchInput, onSearch, onToggleTheme, currentTheme })
{
    return (
        <Container className="searchbar-container">
            <InputGroup>
                <FormControl
                    placeholder="Search For Artist"
                    type="input"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            onSearch();
                    }}
                />
                <Button onClick={onSearch}>Search</Button>
                <Button
                    onClick={onToggleTheme}
                    variant={currentTheme === "dark" ? "light" : "dark"}
                    style={{ marginLeft: "10px" }}
                >
                    {currentTheme === "dark" ? "🌞" : "🌙"}
                </Button>
            </InputGroup>
        </Container>
    );
}

export default SearchBar;
