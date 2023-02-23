
// GET
export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers: {
            "Authorization":`Token ${localStorage.getItem("lu_token")}`
        }
    }).then(response => response.json())
}

export const getSingleGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers: {
            "Authorization":`Token ${localStorage.getItem("lu_token")}`
        }
    }).then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", { 
        headers: {
            "Authorization":`Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}


// CREATE
export const createGame = (game) => {
    return fetch("http://localhost:8000/games", { 
        method: "POST",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}

// UPDATE
export const editGame = (game, id) => {
    return fetch(`http://localhost:8000/games/${id}`, { 
        method: "PUT",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}
