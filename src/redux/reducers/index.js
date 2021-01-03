import toggleSideBar from "./ToggleSideBar";
import currentPage from "./currentPage";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    toggleSideBar,
    currentPage
});

export default allReducers;
