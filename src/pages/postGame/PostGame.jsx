import { useEffect, useState } from "react";
import "../../../styles/PostGame.css";
import { Table, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import gameStatsData from "../recordGame/gameStatsData";
import * as actions from "../../redux/actions";
import axios from 'axios'

function PostGame() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //post game stats
    const postGameStats = useSelector((state) => state.postGameStats);

    //get recordGame stats information
    const recordGame = useSelector(state => state.recordGame)

    //list out all the players that participated in this game for each team
    const activeHomePlayers = [];
    const activeAwayPlayers = [];
    function unitePlayers() {
        recordGame.gameStats.map((item) => {
            //home team
            if (item.team === recordGame.home.team) {
                if (activeHomePlayers.includes(item.player) === false) {
                    activeHomePlayers.push(item.player);
                }
            } else if (item.team === recordGame.away.team) {
                if (activeAwayPlayers.includes(item.player) === false) {
                    activeAwayPlayers.push(item.player);
                }
            }
        });
    }
    unitePlayers();

    // input stats into redux state

    function run(arr) {
        arr.map((player) => {
            //reset the stats after each player loops
            let number = 0;
            let two_points_count = 0;
            let two_points_count_fail = 0;
            let three_points_count = 0;
            let three_points_count_fail = 0;
            let foul_ball_score = 0;
            let foul_ball_fail = 0;
            let offensive_rebound = 0;
            let defensive_rebound = 0;
            let steals = 0;
            let assists = 0;
            let blocks = 0;
            let turnover = 0;
            let offensive_foul = 0;
            let defensive_foul = 0;
            recordGame.gameStats.map((item) => {
                gameStatsData.map((data) => {
                    if (player === item.player && item.stats === data.name) {
                        number = item.number
                        switch (data.name) {
                            case "2 PTS SCORE":
                                return two_points_count++;
                            case "2 PTS FAIL":
                                return two_points_count_fail++;
                            case "3 PTS SCORE":
                                return three_points_count++;
                            case "3 PTS FAIL":
                                return three_points_count_fail++;
                            case "FOUL BALL SCORE":
                                return foul_ball_score++;
                            case "FOUL BALL FAIL":
                                return foul_ball_fail++;
                            case "Offen-Rebound":
                                return offensive_rebound++;
                            case "Defen-Rebound":
                                return defensive_rebound++;
                            case "Steal":
                                return steals++;
                            case "Assist":
                                return assists++;
                            case "Block":
                                return blocks++;
                            case "Turnover":
                                return turnover++;
                            case "Offen-Foul":
                                return offensive_foul++;
                            case "Defen-Foul":
                                return defensive_foul++;
                            default:
                                return;
                        }
                    }
                });
            });
            let points = two_points_count * 2 + three_points_count * 3;
            let two_points = two_points_count * 2;
            let two_points_AT = two_points_count + two_points_count_fail;
            let two_points_Per = ((two_points_count / two_points_AT) * 100).toFixed(2);
            let three_points = three_points_count * 3;
            let three_points_AT = three_points_count + three_points_count_fail;
            let three_points_Per = ((three_points_count / three_points_AT) * 100).toFixed(2);
            let foul_ball_AT = foul_ball_score + foul_ball_fail;
            let foul_ball_Per = ((foul_ball_score / foul_ball_AT) * 100).toFixed(2);
            let allRebound = offensive_rebound + defensive_rebound;
            let foul = defensive_foul + offensive_foul;

            if (arr === activeHomePlayers) {
                dispatch(
                    actions.inputPostGameStatsHome(
                        player,
                        number,
                        points,
                        two_points,
                        two_points_AT,
                        two_points_Per,
                        three_points,
                        three_points_AT,
                        three_points_Per,
                        foul_ball_score,
                        foul_ball_AT,
                        foul_ball_Per,
                        offensive_rebound,
                        defensive_rebound,
                        allRebound,
                        assists,
                        steals,
                        blocks,
                        turnover,
                        foul,

                    )
                );
                return
            }
            dispatch(
                actions.inputPostGameStatsAway(
                    player,
                    number,
                    points,
                    two_points,
                    two_points_AT,
                    two_points_Per,
                    three_points,
                    three_points_AT,
                    three_points_Per,
                    foul_ball_score,
                    foul_ball_AT,
                    foul_ball_Per,
                    offensive_rebound,
                    defensive_rebound,
                    allRebound,
                    assists,
                    steals,
                    blocks,
                    turnover,
                    foul,

                )
            );

            console.log(postGameStats.home);
        });
    }
    console.log(postGameStats.home)
    useEffect(() => {
        dispatch(actions.resetPostGameStats())
        run(activeHomePlayers);
        run(activeAwayPlayers);
    }, []);

    //enter the postGameStats into Table
    const tableHomeLog = postGameStats.home.map((player, index) => (
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
    ))

    const tableAwayLog = postGameStats.away.map((player, index) => (
        <tr key={index}>
            <td>{player.playerNumber}</td>
            <td>{player.playerName}</td>
            <td>{player.points}</td>
            <td>{player.two_points}</td>
            <td>{player.two_points_attempt}</td>
            <td>{player.two_points_per}</td>
            <td>{player.three_points}</td>
            <td>{player.three_points_attempt}</td>
            <td>{player.three_points_per}</td>
            <td>{player.foul_points}</td>
            <td>{player.foul_points_attempt}</td>
            <td>{player.foul_points_per}</td>
            <td>{player.offensive_rebound}</td>
            <td>{player.defensive_rebound}</td>
            <td>{player.all_rebound}</td>
            <td>{player.assists}</td>
            <td>{player.steals}</td>
            <td>{player.blocks}</td>
            <td>{player.turnOver}</td>
            <td>{player.foul}</td>
        </tr>
    ))

    async function handleSaveGame(title, date, gameId) {
        try {
            const res = await axios.post("http://localhost:5000/gamestats", {
                title: title,
                date: date,
                gameId: gameId,
                home: postGameStats.home,
                away: postGameStats.away
            })
            alert('game saved!')
            navigate("/")
            console.log('game saved')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="postGame--info">
                <p>{recordGame.date}</p>
                <h3>{recordGame.title}</h3>
                <p>Game ID: {recordGame.game_id}</p>
            </div>
            <Button variant="primary" onClick={() => { handleSaveGame(recordGame.title, recordGame.date, recordGame.game_id) }}>Save Game Stats</Button>
            <div className="postGame--container">
                <div className="postGame--subContainer home">
                    <h3>Home - {recordGame.home.score}</h3>
                    <Table striped bordered hover>
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
                            {tableHomeLog}
                        </tbody>
                    </Table>
                </div>
                <div className="postGame--subContainer away">
                    <h3>Away - {recordGame.away.score}</h3>
                    <Table striped bordered hover variant="dark">
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
                            {tableAwayLog}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default PostGame;
