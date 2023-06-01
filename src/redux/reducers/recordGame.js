const recordGameReducer = (state = {
    title: '',
    date: '',
    home: {
        team: '',
        score: 0,
    },
    away: {
        team: '',
        score: 0,
    },
    game_id: '',
    quarter: 1,
    gameStats: []
}, action) => {
    switch (action.type) {
        case 'record_Teams':
            return {
                ...state,
                home: {
                    ...state.home,
                    team: action.payload.homeTeam,
                    score:0,
                },
                away: {
                    ...state.away,
                    team: action.payload.awayTeam,
                    score:0,
                },
                title: action.payload.title,
                date: action.payload.date,
                game_id: action.payload.game_id,
                quarter:1,
                gameStats:[]
            };
        case 'input_stats':
            return {
                ...state,
                gameStats: [

                    {
                        player: action.payload.player,
                        team: action.payload.team,
                        quarter: action.payload.quarter,
                        stats: action.payload.stats,
                        number: action.payload.number,
                    },
                    ...state.gameStats,
                ]
            }
        case 'delete_stats':
            return {
                ...state,
                ...state.gameStats.splice(action.payload.index, 1)
            }
        case 'toggle_quarter':
            return {
                ...state,
                quarter: state.quarter + 1
            }
        case 'toggle_prevQuarter':
            return {
                ...state,
                quarter: state.quarter - 1
            }
        case 'toggle_quarterEnd':
            return {
                ...state,
                quarter: 'End Game'
            }
        case 'toggle_quarterNew':
            return {
                ...state,
                quarter: 1
            }
        case 'record_score' :
            return {
                ...state,
                home: {
                    ...state.home,
                    score: action.payload.homeScore
                },
                away: {
                    ...state.away,
                    score: action.payload.awayScore
                }
            }
        default:
            return state;
    }
}

export default recordGameReducer;