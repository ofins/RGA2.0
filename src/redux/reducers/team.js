let id = 2;

const teamReducer = (state = [
    {
        id: 1,
        name: 'couch potato',
        players: [{ name: 'Kobe Bryant', number: 24 }, { name: 'Lebron James', number: 6 }, { name: 'Michael Jordan', number: 23 }]
    },
    {
        id: 2,
        name: 'falcon taco',
        players: [{ name: 'Stephen Curry', number: 30 }, { name: 'Larry Bird', number: 33 }, { name: 'Magic J.', number: 32 }, { name: 'Allen Iverson', number: 26 }]
    },
], action) => {
    switch (action.type) {
        case 'ADD_TEAM':
            id = id + 1
            return [...state,
            {
                id: id,
                name: action.payload.teamName,
                players: []
            }
            ];
        case 'ADD_PLAYER':
            return state.map(team => {
                if (team.name === action.payload.teamName) {
                    team.players.push({
                        name: action.payload.playerName,
                        number: action.payload.playerNumber,
                    })
                }
                return team
            })
        case 'EDIT_PLAYER':
            return state.map(team => {
                if (team.name === action.payload.teamName) {
                    const pIndex = team.players.findIndex(player => player.name === action.payload.playerName)
                    team.players[pIndex].name = action.payload.updatedPlayerName;
                    team.players[pIndex].number = action.payload.updatedPlayerNumber
                }
                return team
            })
            return state
        case 'DELETE_PLAYER':
            return state.map(team => {
                if (team.name === action.payload.teamName) {
                    const pIndex = team.players.findIndex(player => player.name === action.payload.playerName);
                    team.players.splice(pIndex,1)
                }
                return team
            })
        default:
            return state;
    }
}

export default teamReducer;