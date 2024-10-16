import { useDispatch } from "react-redux";


function Filter() {
    const dispatch = useDispatch();

    function handleTextChange(event) {
        const value = event.target.value.trim();

        if (value === "") {
            dispatch({ type: "RESET_FILTER" });  // Use RESET_FILTER action
        } else {
            console.log('Dispatching with filter');
            dispatch({ type: 'FILTER', payload: value });
        }
    }

    return(
        <div>
            <strong>Filter</strong><input onInput={handleTextChange} />
        </div>
    );
}

export default Filter;