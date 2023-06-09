import "../../../styles/Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions";
import axios from 'axios'
import {Button, Modal} from 'react-bootstrap'

function Home() {
  const [show, setShow] = useState(false)
  const handleClose = () => {setShow(false)}
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
      console.log(
        'Note: RGA backend server is hosted on render.com and using free tier service. Pushing and pulling data from database will have some delays'
      )
      fetchAllTeams();
    }, [])
    const fetchAllTeams = async () => {
      try {
        const res = await axios.get("https://rga-backend-jdbm.onrender.com/teams")
        dispatch(actions.importTeams(res.data))
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    
  //Date
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  //create 5 random digits for gameID
  function randomDigits5() {
    let digits = [];
    for (let i = 0; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * 10);
      digits.push(randomNum);
    }
    return digits.join("");
  }

  //create a temp state to save selected home and away team
  const [selected, setSelected] = useState({
    title: "",
    homeTeam: "",
    awayTeam: "",
  });

  //get list of teams
  const teams = useSelector((state) => state.teamReducer);


  const teamList = teams.map((team, index) => (
    <option key={index}>{team.teamName}</option>
  ));

  //when next is clicked, pass selected team info into redux state for recordGame
  const handleClick = () => {
    if (selected.homeTeam !== selected.awayTeam) {
      dispatch(
        actions.recordTeams(
          selected.title,
          date,
          selected.homeTeam,
          selected.awayTeam,
          randomDigits5()
        )
      );
      dispatch(actions.resetCurrentlyPlaying())
      navigate("/record-game");
      return null
    }
    return alert('please choose two different teams!')
  };

  return (
    <div className="home--container">
      <div className="home--NewGameContainer">
        <form>
          <h3>Start New Game</h3>
          <div className="home--secA">
            <input
              onChange={(e) =>
                setSelected({
                  ...selected,
                  title: e.target.value,
                })
              }
              autoFocus
              type="text"
              placeholder="Title: e.g. LA Laker vs GS Warriors #212"
              name="title"
              className="inputBox title"
            />
            <div className="home--teamInputContainer">
              <select
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    homeTeam: e.target.value,
                  })
                }
                type="text"
                placeholder="Team A"
                name="team-A"
                className="inputBox teamInputs"
              >
                <option>Select Home Team</option>
                {teamList}
              </select>
              <select
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    awayTeam: e.target.value,
                  })
                }
                type="text"
                placeholder="Team B"
                name="team-B"
                className="inputBox teamInputs"
              >
                <option>Select Away Team</option>
                {teamList}
              </select>
            </div>
          </div>
          <button onClick={handleClick} type="submit">
            Next
          </button>
        </form>
      </div>
        <Modal centered className="my-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
            <Modal.Body>
              <h5>Please choose two different teams!</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Understood</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Home;
