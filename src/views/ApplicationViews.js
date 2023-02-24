import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/game/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/game/EventForm"
import { GameEdit } from "../components/game/GameEdit"
import { EventEdit } from "../components/game/EventEdit"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/events" element={<EventList />} />

                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />

                <Route path="/games/edit/:gameId" element={<GameEdit />} />
                <Route path="/events/edit/:eventId" element={<EventEdit />} />
            </Route>
        </Routes>
    </>
}