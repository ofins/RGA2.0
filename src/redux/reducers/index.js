
import teamReducer from './team'
import currentRosterTeamReducer from './currentRosterTeam';
import showModalReducer from './showModal';


import { combineReducers } from 'redux'

const allReducers = combineReducers({
    teamReducer,
    selectedTeamReducer: currentRosterTeamReducer,
    showModal: showModalReducer,
})

export default allReducers;