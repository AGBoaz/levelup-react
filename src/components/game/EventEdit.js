import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { editEvent, getSingleEvent } from '../../managers/EventManager.js'


export const EventEdit = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()

    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        Organizer: "",
        name: "",
        date: null,
        location: "",
        game: 0
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGames()
        .then((gamesArray) => { setGames(gamesArray)})
    }, [])

    useEffect(() => {
        // TODO: Get the event, then set the state
        getSingleEvent(eventId)
        .then((eventData) => { setCurrentEvent(eventData)})
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit an Event</h2>

            {/*NAME*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/*DATE*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/*LOCATION*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                {/*GAME*/}
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                        {games.map(game => {
                            return <>
                                <div>
                                    <input type="radio" name="game" value={game.id} key={`game--${game.id}`}
                                        onChange={changeEventState}
                                    /> {game.name}
                                </div>
                            </>
                        })}
                </div>
            </fieldset>



            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: currentEvent.organizer,
                        name: currentEvent.name,
                        date: currentEvent.date,
                        location: currentEvent.location,
                        game: parseInt(currentEvent.game)                    
                    }

                    // Send POST request to your API
                    editEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}