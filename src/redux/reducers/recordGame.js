const recordGameReducer = (state = {
    title:'',
    date:'',
    home:{
        team:'',
        score:0,
    },
    away:{
        team:'',
        score:0,
    },
    game_id:'',
    gameStats:[]
}, action) => {
    switch(action.type) {
        case 'record_Teams':
            return {...state, 
                home: {
                    ...state.home,
                    team: action.payload.homeTeam,
                },
                away: {
                    ...state.away,
                    team: action.payload.awayTeam,
                },
                title: action.payload.title,
                date: action.payload.date,
                game_id: action.payload.game_id,
            };
        
        default:
            return state;
    }
}

export default recordGameReducer;