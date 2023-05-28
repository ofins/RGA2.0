import '../../../styles/RosterTeam.css'
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';



function RosterTeam() {
    const { id } = useParams();
    const [currentTeam, setCurrentTeam] = useState(null)

    const teams = useSelector(state => state.teamReducer) 
    // console.log(teams)
    // console.log(id)

    //when the page loads, fetch the team based on URL
    useEffect(() => {
        teams.map(team => {
            if(team.id === parseInt(id)){
                setCurrentTeam(team)
            }
        })
    }, [id])

    if(!currentTeam){
        return <h3>loading...</h3>
    }
    return(
        <div className="rosterTeam--container">
            <div className="rosterTeam--playerCardContainer">
                <div className="rosterTeam--secA">
                    {currentTeam.players.length > 0
                        ? currentTeam.players.map((player, index) => (
                                <div key={index} className="rosterTeam--playerCard">
                                    <h2>{player.number}</h2>
                                    <h3>{player.name}</h3>
                                </div>
                            ))
                        : <h3>Your team is empty</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default RosterTeam;