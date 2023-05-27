
const currentRosterTeamReducer = (state = null, action) => {
    switch(action.type) {
        case 'SELECT_TEAM':
            return state = action.payload.teamName;
        default:
            return state;
    }
}

export default currentRosterTeamReducer;