const showModalReducer = (
    state = [
        {
            modalNum: 0,
            name: "new_team",
            status: false,
        },
        {
            modalNum: 1,
            name: "add_player",
            status: false,
        },
        {
            modalNum: 2,
            name: "edit_team",
            status: false,
        },
    ],
    action
) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return state.map((modal) => {
                if (modal.modalNum === action.payload.number) {
                    return { ...modal, status: true };
                }
                return modal;
            });
        case "CLOSE_MODAL":
            return state.map((modal) => {
                if (modal.modalNum === action.payload.number) {
                    return { ...modal, status: false };
                }
                return modal;
            });
        default:
            return state;
    }
};

export default showModalReducer;
