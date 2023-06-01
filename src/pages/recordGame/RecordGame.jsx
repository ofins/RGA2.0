import "../../../styles/RecordGame.css";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import gameStatsData from "./gameStatsData";
import CreateModal from "../../components/modals/CreateModal";
import PlayerCard from "../../components/playerCard/PlayerCard";
import { useNavigate } from "react-router-dom";

function RecordGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recordStats = useSelector((state) => state.recordGame);

  //find entire team data for home and away team by matching the team names passed in here
  const homeTeam = useSelector((state) => state.teamReducer).filter(
    (team) => team.name === recordStats.home.team
  );
  const awayTeam = useSelector((state) => state.teamReducer).filter(
    (team) => team.name === recordStats.away.team
  );

  //create a redux state for 5 slots on each side, these are the players that are currently playing on the fields. These can be swapped at any time.

  const currentlyPlaying = useSelector((state) => state.currentlyPlaying);
  console.log(currentlyPlaying);

  //This is to open Table to input players into player card
  const handleInputPlayer = (num) => {
    dispatch(actions.showModal(num));
  };

  //game stats btn elements
  const gameStatsBtnEls = gameStatsData.map((btn, index) => (
    <div
      onClick={() => handleInputStats(recordStats.quarter, btn.name)}
      key={index}
      className="gameStats--btn"
    >
      <h6>{btn.name}</h6>
    </div>
  ));

  //find selected player, number, team
  const selectedPlayer = currentlyPlaying.find(
    (player) => player.selected === true
  );

  //handleInputStats button
  const handleInputStats = (quarter, stats) => {
    //run only if player is selected
    if (selectedPlayer.player !== "") {
      //pass in quarter number and stats
      return dispatch(
        actions.inputStats(
          selectedPlayer.player,
          selectedPlayer.team,
          quarter,
          stats,
          selectedPlayer.number
        )
      );
    }
  };

  //handleStatsDelete button
  const handleDeleteStats = (index) => {
    dispatch(actions.deleteStats(index));
    runScore(); //this updates the score when point is deleted
  };

  //save scores in a state
  const [score, setScore] = useState({ home: 0 });

  let homeScoreCount = 0;
  let awayScoreCount = 0;

  //function to count score based on 2 or 3 pts and team
  function runScore() {
    recordStats.gameStats.map((item) => {
      if (item.team === recordStats.home.team && item.stats === "2 PTS SCORE") {
        return homeScoreCount++;
      } else if (
        item.team === recordStats.away.team &&
        item.stats === "2 PTS SCORE"
      ) {
        return awayScoreCount++;
      } else if (
        item.team === recordStats.home.team &&
        item.stats === "3 PTS SCORE"
      ) {
        homeScoreCount = homeScoreCount + 1.5;
      } else if (
        item.team === recordStats.away.team &&
        item.stats === "3 PTS SCORE"
      ) {
        awayScoreCount = awayScoreCount + 1.5;
      }
    });
    setScore({ home: homeScoreCount * 2, away: awayScoreCount * 2 });
  }

  //useEffect to reload whenever log is updated
  useEffect(() => {
    runScore();
  }, [recordStats.gameStats]);
  console.log(score);

  // TOGGLE QUARTER **

  const handleQuarter = () => {
    if (recordStats.quarter < 4) {
      dispatch(actions.toggleQuarter());
      return;
    }
    dispatch(actions.toggleQuarterEnd());
    if (recordStats.quarter === "End Game") {
      dispatch(actions.recordScore(score.home, score.away));
      navigate("/post-game");
      dispatch(actions.toggleQuarterNew());
    }
  };

  const handlePrevQuarter = () => {
    dispatch(actions.togglePrevQuarter());
  };

  console.log(recordStats.gameStats);

  const gameStatEls = recordStats.gameStats.map((stat, index) => (
    <tr key={index}>
      <td className="col-1">{stat.number}</td>
      <td>{stat.team}</td>
      <td>{stat.player}</td>
      <td className="col-1">{stat.quarter}</td>
      <td>{stat.stats}</td>
      <td className="col-1">
        <Button onClick={() => handleDeleteStats(index)} variant="danger">
          del
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="recordGame--container">
      <div className="recordGame--scoreBanner">
        <Row className="d-flex justify-content-center text-center align-items-center">
          <Col>
            <h6>Home | {recordStats.home.team}</h6>
          </Col>
          <Col>
            <h3 className="gameScore">{score.home}</h3>
          </Col>
          <Col>
            <div className="recordGame--quarterPanel">
              <h2>
                {recordStats.quarter === "End Game" ? "" : "Q"}{" "}
                {recordStats.quarter}
              </h2>
              {recordStats.quarter > 1 ? (
                <Button
                  onClick={handlePrevQuarter}
                  className="mx-1 quarterBtn"
                  size="sm"
                  variant="warning"
                >
                  Prev
                </Button>
              ) : null}
              <Button
                className="mx-1 quarterBtn"
                onClick={handleQuarter}
                size="sm"
                variant="warning"
              >
                {recordStats.quarter === "End Game" ? "End" : "Next"}
              </Button>
            </div>
          </Col>
          <Col>
            <h3 className="gameScore">{score.away}</h3>
          </Col>
          <Col>
            <h6>Away | {recordStats.away.team}</h6>
          </Col>
        </Row>
      </div>
      <div className="recordGame--midContainer">
        <div className="playerCards left">
          <PlayerCard
            position={1}
            playerNumber={currentlyPlaying[0].number}
            playerName={currentlyPlaying[0].player}
          />
          <PlayerCard
            position={2}
            playerNumber={currentlyPlaying[1].number}
            playerName={currentlyPlaying[1].player}
          />
          <PlayerCard
            position={3}
            playerNumber={currentlyPlaying[2].number}
            playerName={currentlyPlaying[2].player}
          />
          <PlayerCard
            position={4}
            playerNumber={currentlyPlaying[3].number}
            playerName={currentlyPlaying[3].player}
          />
          <PlayerCard
            position={5}
            playerNumber={currentlyPlaying[4].number}
            playerName={currentlyPlaying[4].player}
          />
        </div>
        <div className="recordGame--gameStatsContainer">{gameStatsBtnEls}</div>
        <div className="playerCards right">
          <PlayerCard
            position={6}
            playerNumber={currentlyPlaying[5].number}
            playerName={currentlyPlaying[5].player}
          />
          <PlayerCard
            position={7}
            playerNumber={currentlyPlaying[6].number}
            playerName={currentlyPlaying[6].player}
          />
          <PlayerCard
            position={8}
            playerNumber={currentlyPlaying[7].number}
            playerName={currentlyPlaying[7].player}
          />
          <PlayerCard
            position={9}
            playerNumber={currentlyPlaying[8].number}
            playerName={currentlyPlaying[8].player}
          />
          <PlayerCard
            position={10}
            playerNumber={currentlyPlaying[9].number}
            playerName={currentlyPlaying[9].player}
          />
        </div>
      </div>
      <Button
        id="floor-player-btn"
        size="sm"
        onClick={() => handleInputPlayer(3)}
      >
        Edit Court Players
      </Button>
      <div className="recordGame--tableContainer">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Player</th>
              <th>Quarter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{gameStatEls}</tbody>
        </Table>
      </div>
      <CreateModal number={3} />
      {/* edit_currentlyPlaying */}
    </div>
  );
}

export default RecordGame;
