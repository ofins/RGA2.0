import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Table } from 'react-bootstrap'
import '../../../styles/Games.css'
import { useSelector } from 'react-redux'

const Games = () => {
    //import states
    const login = useSelector(state => state.login)
    console.log(login)

    //create a state to hold game data
    const [gameData, setGameData] = useState([])
    const [dates, setDates] = useState('')

    //get historic game data from database
    const fetchGameData = async () => {
        try {
            const gameStats = await axios.get("http://localhost:5000/gamestats")
            setGameData(gameStats.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetchGameData();
    }, [toggle])

    // input stats into table
    // .map() all the games in array
    // .map() title, dates, gameID, home and away onto screen
    // .map() each player into one row with their stats
    //filter data based on: team name, dates

    //delete, edit stats button
    const handleDelete = async (id) => {
        try {
            axios.delete("http://localhost:5000/gamestats/" + id)
            // window.location.reload();
            setToggle(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    const gameStatsList = gameData
        .filter(game => {
            if (dates.startDate) {
                return game.date >= dates.startDate
            }
            return game
        })
        .filter(game => {
            if (dates.endDate) {
                return game.date <= dates.endDate
            }
            return game
        })
        .map((game) => (
            <div className='games--border'>
                <div key={game._id} className="games--gameInfo">
                    <h3>{game.title}</h3>
                    <span>
                    <p>{game.date}</p>
                    {login.isLoggedIn ? 
                    <Button onClick={() => {handleDelete(game._id)}} size='sm' variant='danger'>Delete</Button>
                    : null}
                    </span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Points</th>
                            <th>2-PTS</th>
                            <th>2-PTS AT</th>
                            <th>2-PTS %</th>
                            <th>3-PTS</th>
                            <th>3-PTS AT</th>
                            <th>3-PTS %</th>
                            <th>Foul PTS</th>
                            <th>Foul AT</th>
                            <th>Foul %</th>
                            <th>Off-Reb</th>
                            <th>Def-Reb</th>
                            <th>All Reb</th>
                            <th>Assists</th>
                            <th>Steal</th>
                            <th>Blocks</th>
                            <th>TurnOver</th>
                            <th>Fouls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game.home.map((player, index) => (
                            <tr key={index}>
                                <td>{player.playerNumber}</td>
                                <td>{player.playerName}</td>
                                <td>{player.points}</td>
                                <td>{player.two_points}</td>
                                <td>{player.two_points_attempt}</td>
                                <td>{player.two_points_per}%</td>
                                <td>{player.three_points}</td>
                                <td>{player.three_points_attempt}</td>
                                <td>{player.three_points_per}%</td>
                                <td>{player.foul_points}</td>
                                <td>{player.foul_points_attempt}</td>
                                <td>{player.foul_points_per}%</td>
                                <td>{player.offensive_rebound}</td>
                                <td>{player.defensive_rebound}</td>
                                <td>{player.all_rebound}</td>
                                <td>{player.assists}</td>
                                <td>{player.steals}</td>
                                <td>{player.blocks}</td>
                                <td>{player.turnOver}</td>
                                <td>{player.foul}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Table variant='dark'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Points</th>
                            <th>2-PTS</th>
                            <th>2-PTS AT</th>
                            <th>2-PTS %</th>
                            <th>3-PTS</th>
                            <th>3-PTS AT</th>
                            <th>3-PTS %</th>
                            <th>Foul PTS</th>
                            <th>Foul AT</th>
                            <th>Foul %</th>
                            <th>Off-Reb</th>
                            <th>Def-Reb</th>
                            <th>All Reb</th>
                            <th>Assists</th>
                            <th>Steal</th>
                            <th>Blocks</th>
                            <th>TurnOver</th>
                            <th>Fouls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game.away.map((player, index) => (
                            <tr key={index}>
                                <td>{player.playerNumber}</td>
                                <td>{player.playerName}</td>
                                <td>{player.points}</td>
                                <td>{player.two_points}</td>
                                <td>{player.two_points_attempt}</td>
                                <td>{player.two_points_per}%</td>
                                <td>{player.three_points}</td>
                                <td>{player.three_points_attempt}</td>
                                <td>{player.three_points_per}%</td>
                                <td>{player.foul_points}</td>
                                <td>{player.foul_points_attempt}</td>
                                <td>{player.foul_points_per}%</td>
                                <td>{player.offensive_rebound}</td>
                                <td>{player.defensive_rebound}</td>
                                <td>{player.all_rebound}</td>
                                <td>{player.assists}</td>
                                <td>{player.steals}</td>
                                <td>{player.blocks}</td>
                                <td>{player.turnOver}</td>
                                <td>{player.foul}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        ))

    return (
        <div className='games--container'>
            <h3>Historic Game Data</h3>
            <div className="games--filterContainer">
                <h4 className='mx-3'>Filter</h4>
                <p className='mx-3'>start date:</p>
                <input onChange={(e) => {
                    setDates({
                        ...dates,
                        startDate: e.target.value
                    })
                }} type="date" name="startDate" id="startDate" />
                <p className='mx-3'>end date:</p>
                <input onChange={(e) => {
                    setDates({
                        ...dates,
                        endDate: e.target.value
                    })
                }} type="date" name="endDate" id="endDate" />
                <Button onClick={() => {
                    window.location.reload();
                }} variant='secondary' className='mx-3'>Clear</Button>
            </div>
            {gameData.length > 0 ?
                <div className="games--statslist">
                    {gameStatsList}
                </div>
                :
                (
                    <h2>loading...</h2>
                )
            }
        </div>
    )
}

export default Games