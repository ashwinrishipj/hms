const ScheduledAppointment = (state=false,action) =>{
    if (action.type === 'Appointments') {
        return action.payload;
    } else {
        return state;
    }
}

export default ScheduledAppointment;