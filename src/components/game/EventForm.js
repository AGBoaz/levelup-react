import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
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

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>



            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}