import React, { useState, useEffect } from 'react';
import { ListGroup, Nav, Form, Card, Button, Modal, Col, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';

export default function TodoList() {
	const [taskContent, setTaskContent] = useState('');
	const [displayTask, setDisplayTask] = useState('');
	const [taskVisible, setTaskVisible] = useState(false);

	const handleSubmit = () => {
		alert('submitted');
	};

	const completeTask = (taskData) => {
		alert(JSON.stringify(taskData));
		fetch(`http://localhost:3004/completed/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(taskData),
		})
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	};

	const validate = (apiResponse) => {
		if (apiResponse.length === 0) {
			console.log('failed:', JSON.stringify(apiResponse));
			setTaskVisible(false);
		} else {
			setTaskContent(apiResponse);
			setTaskVisible(true);
			console.log('Success:', JSON.stringify(apiResponse));
		}
	};

	useEffect(() => {
		fetch(`http://localhost:3004/tasks/`)
			.then((response) => response.json())
			.then((data) => {
				validate(data);
			})
			.catch((error) => console.error('Error:', error));
	}, []);

	const fetchData = (taskType) => {
		fetch(`http://localhost:3004/${taskType}`)
			.then((response) => response.json())
			.then((data) => {
				validate(data);
			})
			.catch((err) => console.log('err', err));
	};

	const displayToDoList = ({ data }) => {
		return (
			<>
				<ListGroup vertical className="to_do_list_box-shadow">
					<ListGroup.Item onClick={setDisplayTask(data)}>
						{data.content} <i className="fa fa-chevron-right float-right" aria-hidden="true"></i>
					</ListGroup.Item>
				</ListGroup>
			</>
		);
	};

	const insertTask = () => {
		return (
			<Form>
				<Form.Group controlId="formBasicEmail" className="mt-2 ml-4">
					<Row>
						<Col sm={5}>
							<Form.Control className="md" type="text" placeholder="Add new task" />
						</Col>
						<Col sm={2}>
							<Button variant="info">submit </Button>
						</Col>
					</Row>
				</Form.Group>
			</Form>
		);
	};

	const displayTodo = () => {
		return (
			<>
				<div className="row justify-content-center mt-2 ml-1">
					<Card>
						<Card.Header>
							<Nav fill variant="tabs" defaultActiveKey="#1" text="info">
								<Nav.Item>
									<Nav.Link href="#1" onClick={() => fetchData('tasks')} id="tasks">
										Active Tasks
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href="#2" onClick={() => fetchData('completed')}>
										Completed Tasks
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href="#3" onClick={() => fetchData('deleted')}>
										Deleted Tasks
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Card.Header>
						{taskVisible
							? taskContent.map((data) => displayToDoList({ data }))
							: 'no Task for the selected date'}
					</Card>
				</div>
			</>
		);
	};

  const briefTodoTask = () =>{
    return (
      <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      {displayTask}
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
    );
  }

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"><h3><i className="fa fa-tasks mt-2">ToDo</i></h3></div>
				<div className="col-md-7">{insertTask()}</div>
				<div className="col-md-2"><input type="search" name="tasks" placeholder="Search Tasks..." className="form-control mt-2" required=""/></div>
			</div>

			<div className="row">
				<div className="col-lg-4">{displayTodo()}</div>
				<div className="col-lg-5 mt-4 ">{briefTodoTask()} </div>
				<div className="col-lg-3  mt-4 ">
					<Calendar className=" bg-info calendar-width sticky-top" />
				</div>
			</div>
		</div>
	);
}
