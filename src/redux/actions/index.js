export const addTeam = (name) => {
    return {
        type:'ADD_TEAM',
        payload: {
            teamName: name,
        }
    }
}

export const selectRosterTeam = (name) => {
    return {
        type: 'SELECT_TEAM',
        payload: {
            teamName: name,
        }
    }
}

export const addPlayer = (obj) => {
    return {
        type:'ADD_PLAYER',
        payload:{
            teamName: obj.teamName,
            playerName: obj.playerName,
            playerNumber: obj.playerNumber,
        }
    }
}

export const editPlayerName = (teamName, playerName, updatedPlayerName, updatedPlayerNumber) => {
    return {
        type: 'EDIT_PLAYER',
        payload:{
            teamName,
            playerName,
            updatedPlayerName,
            updatedPlayerNumber,
        }
    }
}

export const deletePlayerName = (teamName, playerName) => {
    return {
        type: 'DELETE_PLAYER',
        payload:{
            teamName,
            playerName,
        }
    }
}

export const showModal = (num) => {
    return {
        type:'SHOW_MODAL',
        payload: {
            number: num,
        }
    }
}

export const closeModal = (num) => {
    return {
        type:'CLOSE_MODAL',
        payload: {
            number: num,
        }
    }
}