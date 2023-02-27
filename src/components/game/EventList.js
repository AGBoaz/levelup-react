import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const navigate = useNavigate()

    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleDelete = (eventId) => {
        deleteEvent(eventId).then(getEvents().then(data => setEvents(data)))
    }
    const handleLeave = (eventId) => {
        leaveEvent(eventId).then(getEvents().then(data => setEvents(data)))
    }
    const handleJoin = (event, eventId) => {
        joinEvent(event, eventId).then(getEvents().then(data => setEvents(data)))
    }

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.name} by {event.organizer}</div>
                        <div className="event__game">{event.game}</div>
                        <div className="event__location">{event.location} at {event.date} </div>
                        <button className="btn btn-1 btn-sep icon-create"
                            onClick={() => {navigate({ pathname: `/events/edit/${event.id}`})}}>Edit
                        </button>
                        <button className="btn btn-3 btn-sep icon-create"
                            onClick={() => {handleDelete(event.id)}}>Delete
                        </button>
                        {
                            event.joined ?
                            // statement is truthy
                                <button className="btn btn-3 btn-sep icon-create"
                                onClick={() => {handleLeave(event.id)}}>Leave
                                </button>
                            :
                            // statement is falsy
                                <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {handleJoin(event, event.id)}}>Join
                                </button>
                        }
                    
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
        </article>
    )
}