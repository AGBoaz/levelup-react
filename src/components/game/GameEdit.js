import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getSingleGame, editGame } from '../../managers/GameManager.js'


export const GameEdit = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()

    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        gamer: 0,
        name: "",
        description: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGameTypes()
        .then((gameTypesArray) => { setGameTypes(gameTypesArray)})
    }, [])

    useEffect(() => {
        // TODO: Get the event, then set the state
        getSingleGame(gameId)
        .then((gameData) => { setCurrentGame(gameData)})
    }, [gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit a Game</h2>

            {/*NAME*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/*DESCRIPTION*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="description" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                {/*GAME TYPE*/}
                <div className="form-group">
                    <label htmlFor="game">Game Type: </label>
                        {gameTypes.map(game_type => {
                            return <>
                                <div>
                                    <input type="radio" name="game_type" value={game_type.id} key={`game--${game_type.id}`}
                                        onChange={changeGameState}
                                    /> {game_type.type}
                                </div>
                            </>
                        })}
                </div>
            </fieldset>



            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        gamer: parseInt(currentGame.gamer.id),
                        name: currentGame.name,
                        description: currentGame.description,
                        game_type: parseInt(currentGame.game_type)                    
                    }

                    // Send POST request to your API
                    editGame(game, gameId)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Done</button>
        </form>
    )
}