import toggleSideBar from "./ToggleSideBar";
import currentPage from "./currentPage";
import routePage from "./routePage";
import onScrollEvent from "./OnScrollEvent";
import FormRoute from "./FormRoute";
import ScheduledAppointment from "./ScheduledAppointment"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    toggleSideBar,
    currentPage,
    routePage,
    onScrollEvent,
    FormRoute,
    ScheduledAppointment,
});

export default allReducers;
