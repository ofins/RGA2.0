const postGameStatsReducer = (state = {
    home: [],
    away: [],
}, action) => {
    switch (action.type) {
        case 'input_postGameStatsHome':
            return {
                ...state,
                home: [
                    ...state.home,
                    {
                        playerName: action.payload.player,
                        playerNumber: action.payload.number,
                        points: action.payload.points,
                        two_points: action.payload.two_points,
                        two_points_attempt: action.payload.two_points_attempt,
                        two_points_per: action.payload.two_points_per,
                        three_points: action.payload.three_points,
                        three_points_attempt: action.payload.three_points_attempt,
                        three_points_per: action.payload.three_points_per,
                        foul_points: action.payload.foul_points,
                        foul_points_attempt: action.payload.foul_points_attempt,
                        foul_points_per: action.payload.foul_points_per,
                        offensive_rebound: action.payload.offensive_rebound,
                        defensive_rebound: action.payload.defensive_rebound,
                        all_rebound: action.payload.all_rebound,
                        assists: action.payload.assists,
                        steals: action.payload.steals,
                        blocks: action.payload.blocks,
                        turnOver: action.payload.turnOver,
                        foul: action.payload.foul,
                    }
                ]
            };
        case 'input_postGameStatsAway':
            return {
                ...state,
                away: [
                    ...state.away,
                    {
                        playerName: action.payload.player,
                        playerNumber: action.payload.number,
                        points: action.payload.points,
                        two_points: action.payload.two_points,
                        two_points_attempt: action.payload.two_points_attempt,
                        two_points_per: action.payload.two_points_per,
                        three_points: action.payload.three_points,
                        three_points_attempt: action.payload.three_points_attempt,
                        three_points_per: action.payload.three_points_per,
                        foul_points: action.payload.foul_points,
                        foul_points_attempt: action.payload.foul_points_attempt,
                        foul_points_per: action.payload.foul_points_per,
                        offensive_rebound: action.payload.offensive_rebound,
                        defensive_rebound: action.payload.defensive_rebound,
                        all_rebound: action.payload.all_rebound,
                        assists: action.payload.assists,
                        steals: action.payload.steals,
                        blocks: action.payload.blocks,
                        turnOver: action.payload.turnOver,
                        foul: action.payload.foul,
                    }
                ]
            };
        case 'reset_postGameStats':
            return {
                ...state,
                home: [],
                away: []
            }
        default:
            return state
    }
}

export default postGameStatsReducer;