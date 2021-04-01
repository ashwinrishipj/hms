import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Card, Container, Toast, Button,Breadcrumb } from "react-bootstrap";
import { FetchData } from "../helpers/Fetch";

export default function Notes() {
    const [show, setshow] = useState(false)
    const [noteValue, setnoteValue] = useState("");
    const [toastContent, setToastContent] = useState([]);
    const [alertContent, setalertContent] = useState();
    const [alert, setalert] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleString());
    const [notesDescription, setnotesDescription] = useState();
    const [clearValue, setclearValue] = useState("");

    useEffect(() => {
        setInterval(() => {
            setDate(new Date().toLocaleString());
        }, 1000)
    }, [date]);

    const openToastDescription = (data) => {
        setnotesDescription(data);
        setshow(true);
    }

    const handleClose = () => {
        setshow(false);
    }

    const fetchNotes = (body, type) => {
        FetchData(body).then((response) => {
            if (type === "getNotesDetails") {
                if (response.data.getNotesDetails.notes.length !== (0 || null || undefined || NaN)) {
                    setToastContent(response.data.getNotesDetails.notes);
                } else {
                    setalert(true);
                    setalertContent(response.data.errors);
                }
            }
            else {
                if (response.data.createNotes.notes.length !== (0 || null || undefined || NaN)) {
                    setToastContent(response.data.createNotes.notes)
                    setalertContent("success");
                    setalert(true);
                } else {
                    setalert(true);
                    setalertContent(response.data.errors);
                }
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem('userToken'));
            userId = userId.validateUser.userId;
            
        let requestBody = {
            query: `
            query{getNotesDetails(userId:"${userId}"){userId,notes{_id,notesContent,date}}}
              `,
        };
        fetchNotes(requestBody, "getNotesDetails");
    }, [])

    const handleNote = (e) => {
        var str = e.target.value;
        str = str.replace(/(?:\r\n|\r|\n)/g, ''); 
        setnoteValue(str);
        setclearValue(e.target.value);
    }

    const createNote = () => {
        let userId = JSON.parse(localStorage.getItem('userToken'));
        userId = userId.validateUser.userId;

        setclearValue("")
        if (noteValue.length !== 0) {
            let requestBody = {
                query: `
                mutation{
                    createNotes(userId:"${userId}",notesContent:"${noteValue}",date:"${date}"){
                      userId,
                      notes{
                        _id,
                        notesContent,
                        date
                      }
                    }
                  }
                  `,
            };
            fetchNotes(requestBody, "createNotes");
        } else {
            setalert(true);
            setalertContent("notes cannot be empty:");
        }
    }

    return (
        <>
        {alert ? 
         <div className="alert alert-success alert-dismissible fade show">
         <strong>{alertContent} </strong>
         <button type="button" className="close" data-dismiss="alert">&times;</button>
        </div>
        :" "}
        <Container className="mt-4">
                {show ?
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Date Created On:{notesDescription.date}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {notesDescription.notesContent}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                close
						</Button>
                        </Modal.Footer>
                    </Modal>
                    : ""}
            
                <Card body style={{ boxShadow: "1px 1px 1px 1px grey", border: "1px gray"}}>
                <Row>
                    <Col className="col-border" md={3}>
                        <Row>
                            <Col className="mt-2 text-info">
                                <h4><i className="fa fa-sticky-note"></i>Notes</h4>
                            </Col>
                        </Row>
                        <Row className="ml border-bottom mt-2">

                        </Row>
                            <form className="form-inline input-wrapper mt-3 ml-2"><input className="form-control input-wrapper" placeholder="Search Images" aria-label="Search" />
                            </form>

                            <div className="mt-4 ml-2 toast-onclick scroll-auto">
                                {(toastContent.length !== 0 || null) ?
                                    <>
                                        {toastContent.map((data, index) => {
                                            return (
                                                <>
                                                <Toast  onClick={() => openToastDescription(data)} key={index} >
                                                    <Toast.Header closeButton={false}>
                                                        <strong className="mr-auto"> {index + 1}</strong>
                                                        <small> {data.date}</small>
                                                    </Toast.Header>
                                                    <Toast.Body>{data.notesContent.slice(0, 100)} <br /> <br /> <strong>Click to know more... </strong></Toast.Body>

                                                </Toast>
                                                </>
                                            );
                                        })}
                                    </>
                                    :
                                    <Toast variant={"warning"}>
                                        <Toast.Header  closeButton={false}>
                                            <strong className="mr-auto">Not found</strong>
                                            <small>10 sec ago</small>
                                        </Toast.Header>
                                        <Toast.Body>No notes has been created!. Create one.</Toast.Body>
                                    </Toast>
                                }

                            </div>
                    </Col>

                    <Col md={9}>
                        <Row>
                            <Col className="mt-3 border-bottom ">
                                <p>clock: <span className="text-danger">{date} </span> </p>
                            </Col>
                        </Row>
                        <Row className="ml-4 mt-4">
                            <div className="form">
                                <textarea onChange={(e) => handleNote(e)} value={clearValue} style={{ backgroundColor: "#c1eade" }} rows="15" cols="90" name="textarea" placeholder="type your notes here" className="form-control">
                                </textarea>
                            </div>
                            <Button className="mt-4 float-right" onClick={() => createNote()}> Submit Note </Button>
                        </Row>

                    </Col>
                </Row>
            </Card>
        </Container>
        </>
    )
}