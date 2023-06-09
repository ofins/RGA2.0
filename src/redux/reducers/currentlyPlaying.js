const currentlyPlayingReducer = (state = [
    {
        position: 1,
        player: '',
        number: 0,
        selected: false,
        team:'',
    },
    {
        position: 2,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 3,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 4,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 5,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 6,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 7,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 8,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 9,
        player: '',
        number: 0,
        selected: false
    },
    {
        position: 10,
        player: '',
        number: 0,
        selected: false
    },
], action) => {
    switch (action.type) {
        case 'input_currentlyPlaying':
            return state.map(slot => {
                if (slot.position === action.payload.position) {
                    return {
                        ...slot,
                        player: action.payload.player,
                        number: action.payload.number,
                        team: action.payload.team,
                    }
                }
                return slot
            });
        case 'select_currentlyPlaying':
            return state.map(slot => {
                if (slot.position === action.payload.position) {
                    return {
                        ...slot,
                        selected: true
                    }
                }
                return {
                    ...slot,
                    selected: false
                }
            })
        case 'reset_currentlyPlaying':
            return state.map(item => {
                return {
                    ...item,
                    player:'',
                    number: 0,
                    selected:false,
                }
            })
        default:
            return state
    }
}

export default currentlyPlayingReducer;