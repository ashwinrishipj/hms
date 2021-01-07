import toggleSideBar from "./ToggleSideBar";
import currentPage from "./currentPage";
import routePage from "./routePage";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    toggleSideBar,
    currentPage,
    routePage
});

export default allReducers;
