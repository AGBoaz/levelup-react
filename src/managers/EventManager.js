export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

// CREATE
export const createEvent = (game) => {
    return fetch("http://localhost:8000/events", { 
        method: "POST",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}