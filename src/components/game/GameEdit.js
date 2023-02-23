import { useState, useEffect } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import { editGame, getGameTypes, getSingleGame } from '../../managers/GameManager.js'


export const GameEdit = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()

    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        name: "",
        description: "",
        game_type: 0,
        gamer: 0
    })
    
    useEffect(() => {
        // TODO: Get the game types, then set the state
        getSingleGame(gameId)
        .then(gameData => { setCurrentGame(gameData)})
    }, [gameId])

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
        .then((gameTypesArray) => { setGameTypes(gameTypesArray)})
    }, [])



    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit a Game</h2>

            <fieldset>
                {/*NAME*/}
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        name="name" 
                        required autoFocus
                        className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                {/*DESCRIPTION*/}
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                {/*Game TYPE*/}
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                        {gameTypes.map(gameType => {
                            return <>
                                <div>
                                    <input type="radio" name="game_type" value={gameType.id} key={`game_type--${gameType.id}`}
                                        onChange={changeGameState}
                                    /> {gameType.type}
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
                        gamer: currentGame.gamer,
                        name: currentGame.name,
                        description: currentGame.description,
                        game_type: currentGame.game_type
                    }

                    // Send POST request to your API
                    editGame(game, 1)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Complete</button>
        </form>
    )
}