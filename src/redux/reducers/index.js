
import teamReducer from './team'
import currentRosterTeamReducer from './currentRosterTeam';
import showModalReducer from './showModal';
import recordGameReducer from './recordGame';
import currentlyPlayingReducer from './currentlyPlaying';
import postGameStatsReducer from './postGameStats';


import { combineReducers } from 'redux'

const allReducers = combineReducers({
    teamReducer,
    selectedTeamReducer: currentRosterTeamReducer,
    showModal: showModalReducer,
    recordGame: recordGameReducer,
    currentlyPlaying: currentlyPlayingReducer,
    postGameStats: postGameStatsReducer,
})

export default allReducers;