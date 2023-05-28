import "../../../styles/PlayerCard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

function PlayerCard(props) {
  const dispatch = useDispatch();

  //get data for players that are currently playing
  const currentlyPlaying = useSelector((state) => state.currentlyPlaying);



  //when player card is clicked, it will highlight the card indicating that this player can currently have stats added to its profile
  //this is done by passing the position into it
  const handleSelect = (pos) => {
    dispatch(actions.selectCurrentlyPlaying(pos));
  };

  //now we check if this current player card is selected by using .find to see if the .selected property is true for this position
  const checkIfSelected = currentlyPlaying.find(
    (pos) => pos.position === props.position
  ).selected;

  return (
    <div
      onClick={() => handleSelect(props.position)}
      style={checkIfSelected ? { backgroundColor: "#FCB726" } : null}
      className="playerCard--container"
    >
      <div
        className="playerCard--playerNumber"
        style={checkIfSelected ? { backgroundColor: "#532482" } : null}
      >
        <h2>{props.playerNumber}</h2>
      </div>
      <h3>{props.playerName}</h3>
    </div>
  );
}

export default PlayerCard;
