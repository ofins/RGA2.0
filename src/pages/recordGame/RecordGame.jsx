import "../../../styles/RecordGame.css";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

import CreateModal from "../../components/modals/CreateModal";
import PlayerCard from "../../components/playerCard/PlayerCard";

function RecordGame() {
  const dispatch = useDispatch();

  const recordStats = useSelector((state) => state.recordGame);
  console.log(recordStats);

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

  return (
    <div className="recordGame--container">
      <div className="recordGame--scoreBanner">
        <Row className="d-flex justify-content-center text-center align-items-center">
          <Col>
            <h6>Home | {recordStats.home.team}</h6>
          </Col>
          <Col>
            <h3>{recordStats.home.score}</h3>
          </Col>
          <Col>
            <div className="recordGame--quarterPanel">
              <h2>Q2</h2>
              <Button size="sm" variant="warning">
                start/next/end
              </Button>
            </div>
          </Col>
          <Col>
            <h3>{recordStats.home.score}</h3>
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
      <Button size="sm" onClick={() => handleInputPlayer(3)}>Floor Players</Button>
      <CreateModal number={3} />
      {/* edit_currentlyPlaying */}
    </div>
  );
}

export default RecordGame;
