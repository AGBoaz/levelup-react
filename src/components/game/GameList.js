import React, { useEffect, useState } from "react"
import {getGames} from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {

    const navigate = useNavigate()
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game--name">{game.name}</div>
                        <div className="game--gamer">by {game.gamer.bio}</div>
                        <div className="game--description">{game.description}</div>
                        <div className="game--type">Type: {game.game_type.type}</div>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {navigate({ pathname: `/games/edit/${game.id}`})}}>Edit
                        </button>
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        </article>
    )
}

