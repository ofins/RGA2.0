import "../../../styles/Home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <option key={index}>{team.name}</option>
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
      navigate("/record-game");
      return null;
    }
    alert("Please choose two different teams!");
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
              type="text"
              placeholder="Title: e.g. falcon vs Taco"
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
          {/* <input type="date" placeholder='date' name='game_date' className='inputBox' required /> */}
          <button onClick={handleClick} type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
