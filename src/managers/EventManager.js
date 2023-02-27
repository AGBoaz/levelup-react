// GET
export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


// CREATE
export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { 
        method: "POST",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const joinEvent = (event, eventId) => {
    // TODO: Write the POST fetch request to join and event
    return fetch(`http://localhost:8000/events/${eventId}/signup`, { 
        method: "POST",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}


// UPDATE
export const editEvent = (event, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`,{ 
        method: "PUT",
            headers: {
                "Authorization":`Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
        body: JSON.stringify(event)
    })
}


//DELETE
export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`,{ 
        method: "DELETE",
        headers: {
            "Authorization":`Token ${localStorage.getItem("lu_token")}`,
        },
    })
}

export const leaveEvent = eventId => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`,{ 
        method: "DELETE",
        headers: {
            "Authorization":`Token ${localStorage.getItem("lu_token")}`,
        },
    })
}