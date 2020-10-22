import React from "react"
import { CardColumns, Card,Row, Col } from "react-bootstrap";
import Footer from "./Footer";
import LoginForm from "./loginform";

function Login(props) {
    const updateRoute = (data) => {
        props.updateRoute(data)
    }

    return (
        <div className="container-fluid p-0">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div class="container">
                    <a class="navbar-brand js-scroll-trigger" href="#page-top">HMS</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link js-scroll-trigger" href="#about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link js-scroll-trigger" href="#services">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link js-scroll-trigger" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header class="bg-dark text-white">
                <div class="container-fluid text-center">
                    <div className="row h-100">
                        <div className="col-sm-4 my-auto mx-auto mt-4">
                            <LoginForm updateRoute={updateRoute} />
                        </div>
                    </div>
                </div>
            </header>

            <section id="about">
                <div class="container my-auto ">
                <div class="h-100">
                        <div className="text-center mt-4">
                            <h2 >About this page</h2>
                          </div>
                         <Row className="mt-4">
                            <div class="col  text-center">
                            <div class="mt-5">
                                <i class="fa fa-hospital-o fa-2x" style={{color:"#f4623a"}} aria-hidden="true" focusable="false" data-prefix="fas" ></i> 
                            <h3 class="h4 mb-2">Schedule Appointments</h3>
                                <p class="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                            </div>
                            </div>
                        <div class="col text-center">
                            <div class="mt-5">
                            <i class="fa fa fa-list fa-2x" style={{color:"#f4623a"}} aria-hidden="true" focusable="false" data-prefix="fas" ></i> 
                            <h3 class="h4 mb-2">View Appointments</h3>
                                <p class="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                            </div>
                        </div>
                        <div class="col text-center">
                            <div class="mt-5">
                            <i class="fa fa-tasks fa-2x" style={{color:"#f4623a"}} aria-hidden="true" focusable="false" data-prefix="fas" ></i> 
                                  <h3 class="h4 mb-2">Perform To-do Task</h3>
                                <p class="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                            </div>
                        </div>
                        <div class="col  text-center">
                            <div class="mt-5">
                            <i class="fa fa-calendar fa-2x" style={{color:"#f4623a"}} aria-hidden="true" focusable="false" data-prefix="fas" ></i> 
                                 <h3 class="h4 mb-2">View Events</h3>
                                <p class="text-muted mb-0">Is it really open source if it's not made with love?</p>
                            </div>
                        </div>
                        </Row>
                        <Row>
                        <div class="col  text-center">
                            <div class="mt-5">
                            <i class="fa fa-calendar fa-2x" style={{color:"#f4623a"}} aria-hidden="true" focusable="false" data-prefix="fas" ></i> 
                                 <h3 class="h4 mb-2">View Events</h3>
                                <p class="text-muted mb-0">Is it really open source if it's not made with love?</p>
                            </div>
                        </div>
                            </Row>
                    </div>
                </div>
            </section>

            <section id="services" class="bg-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col mb-4">
                            <h2 className="text-center mt-4">Services offered</h2>
                            <div className="mt-4">
                                <CardColumns className="mt-4 mb-4">
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/opd.png')} width="50" height="60" className="mr-3 " alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">Outpatient Clinic</h5>
												An outpatient department or outpatient clinic is the part of a hospital designed for the treatment of outpatients, people with health problems who visit the hospital for diagnosis or treatment, but do not at this time require a bed or to be admitted for overnight care.
											</div>
                                        </li>
                                    </Card>
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/Gastroenterology.png')} width="50" height="60" className="mr-3" alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">GastroEntrology</h5>
												Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Diseases affecting the gastrointestinal tract, which include the organs from mouth into anus, along the alimentary canal, are the focus of this speciality.
							 				</div>
                                        </li>
                                    </Card>
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/neurology.png')} width="50" height="60" className="mr-3" alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">Neurology</h5>
												Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems, including their coverings, blood vessels, and all effector tissue, such as muscle.
												</div>
                                        </li>
                                    </Card>
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/ENT.png')} width="50" height="60" className="mr-3" alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">ENT Department</h5>
												Otorhinolaryngology is a surgical subspecialty within medicine that deals with the surgical and medical management of conditions of the head and neck. Doctors who specialize in this area are called otorhinolaryngologists, otolaryngologists, head and neck surgeons, or ENT surgeons or physicians.
							 				</div>
                                        </li>
                                    </Card>
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/Onco.jpg')} width="50" height="60" className="mr-3" alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">Oncology</h5>
							Oncology is a branch of medicine that deals with the prevention, diagnosis, and treatment of cancer. A medical professional who practices oncology is an oncologist.
							</div>
                                        </li>
                                    </Card>
                                    <Card className="mt-2 rounded-border" style={{ width: '25rem' }}>
                                        <li className="media">
                                            <img src={require('../Appointments/images/infection.jpg')} width="50" height="60" className="mr-3" alt="..." />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1">Infection Control</h5>
                                                Primarily responsible for conducting surveillance of hospital-acquired infections and investigating and controlling outbreaks or infection clusters among patients and health care personnel.
                            </div>
                                        </li>
                                    </Card>
                                </CardColumns>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact " className="bg-dark">
                <div class="container my-auto">
                <h3 className="text-center text-primary mt-4">About Me</h3>
                    <div class="row">
                        <div class="mx-auto mt-4">
                            <Footer />
                        </div>
                    </div>
                </div>
                <footer class="py-5 bg-dark">
                <div class="container">
                    <p class="m-0 text-center text-white">Copyright © Ashwin Rishi  2020</p>
                </div>

            </footer>
            </section>

            
        </div>
    )
}
export default Login;