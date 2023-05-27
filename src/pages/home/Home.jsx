import '../../../styles/Home.css'
import { useState } from 'react'

function Home() {
    
    const handleClick = () => {
        console.log('clicked!')
    }
    return(
        <div className="home--container">
            <div className="home--NewGameContainer">
                <form>
                    <h3>Start New Game</h3>
                    <div className="home--secA">
                        <input type="text" placeholder='Title: e.g. falcon vs Taco' name='title'  className='inputBox title' />
                        <div className="home--teamInputContainer">
                            <input type="text" placeholder='Team A' name='team-A' className='inputBox teamInputs' /> 
                            <input type="text" placeholder='Team B' name='team-B' className='inputBox teamInputs' /> 
                        </div>
                    </div>
                    <input type="date" placeholder='date' name='game_date' className='inputBox' />
                    <button onClick={handleClick} type='submit'>Next</button>
                </form>
            </div>
        </div>
    )
}

export default Home;
