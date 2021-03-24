import React from "react";
import { Toast } from 'react-bootstrap';
import { useSelector } from "react-redux";

export const SessionAppointments = () => {
    const state = useSelector(state => state.ScheduledAppointment);

    return (
        <>
            {!state ? <div >
                <Toast style={{ backgroundColor: "lightpink" }}>
                    <Toast.Body>No appointment Booked!. please Schedule an appointment</Toast.Body>
                </Toast>
            </div> :
                <>
                    <Toast style={{ backgroundColor: "lightpink" }}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Doctor:{state.doctorName} </strong>
                        </Toast.Header>
                        <Toast.Body>Time:{state.time}</Toast.Body>
                        <Toast.Body>Date:{state.date}</Toast.Body>
                        <Toast.Body>location:{state.location}</Toast.Body>
                        <Toast.Body>Contact:{state.email}</Toast.Body>
                    </Toast>
                </>
            }
        </>
    )
}