import { useDispatch } from "react-redux";
import { setFilter, resetFilter } from "./Reducers/anecdoteFilterReducer";

function Filter() {
  const dispatch = useDispatch();

  function handleTextChange(event) {
    const value = event.target.value.trim();
    if (value === "") {
      dispatch(resetFilter());  // Reset filter when input is empty
    } else {
      dispatch(setFilter(value));  // Set new filter value
    }
  }

  return (
    <div>
      <strong>Filter</strong>
      <input onInput={handleTextChange} />
    </div>
  );
}

export default Filter;