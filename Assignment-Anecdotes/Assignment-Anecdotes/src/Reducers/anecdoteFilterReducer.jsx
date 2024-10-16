function filterReducer(state = "", action) {
    switch (action.type) {
        case "FILTER":
            return action.payload;  // Update with the new filter
        case "RESET_FILTER":
            return "";  // Reset to show all anecdotes
        default:
            return state;
    }
}

export default filterReducer;