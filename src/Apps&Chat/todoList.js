import React, { useState, useEffect } from 'react';
import { Nav, Modal, Card, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import TodoTaskDescription from './displayToDo';

export default function TodoList() {
	const [show, setShow] = useState(false);
	const [isTaskContent, setIsTaskContent] = useState(false);
	const [taskContent, setTaskContent] = useState([]);
	const [toDoDescription, setToDoDescription] = useState({});
	const [taskCategory, setTaskCategory] = useState('');
	const [toDoDescriptionVisible, setToDoDescriptionVisible] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const validate = (apiResponse) => {
		if (apiResponse.data.getTodoList.length < 1 && apiResponse.data.getTodoList.length === (null || undefined)) {
			console.log('failed:', JSON.stringify(apiResponse));
		} else {
			localStorage.setItem('todoTasks', JSON.stringify(apiResponse.data.getTodoList));
			setTaskContent(apiResponse.data.getTodoList.tasks);
			setIsTaskContent(true);
			console.log('Success:', JSON.stringify(apiResponse));
		}
	};

	const updateTaskContent = (taskType) => {
		var updateToDo = JSON.parse(localStorage.getItem('todoTasks'));
		setIsTaskContent(true);
		setToDoDescriptionVisible(false);
		switch (taskType) {
			case 'tasks':
				setTaskCategory('tasks');
				setTaskContent(updateToDo.tasks);
				break;
			case 'completed':
				setTaskCategory('completed');
				setTaskContent(updateToDo.completed);
				break;
			case 'deleted':
				setTaskCategory('deleted');
				setTaskContent(updateToDo.deleted);
				break;
			default:
				break;
		}
	};

	const handleTaskOnClick = (data) => {
		setToDoDescription(data);
		setToDoDescriptionVisible(true);
	};

	useEffect(() => {
		let requestBody = {
			query: ` query{
				getTodoList(userId: "5e9df7a7327a33165026b98f"){
				  userId,
				  tasks{
					_id
					title,
					content,
					date,
				  },
				  completed{
					_id,
					title,
					content,
					date
				  },
				  deleted{
					_id,
					 title,
					content,
					date
				  }
				}
			  }
			`,
		};

		const storedData = JSON.parse(localStorage.getItem('todoTasks'));
		if (!storedData) {
			fetch('http://localhost:4000/graphql', {
				method: 'POST',
				body: JSON.stringify(requestBody),
				headers: {
					Accept: 'appliction/json',
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((responseJSON) => {
					validate(responseJSON);
				})
				.catch((error) => console.error('error in fetching todo:', error));
		}
	}, []);

	const noTask = () => {
		return (
			<li
				className="list-group-item list-group-item-action bg-secondary disabled text-white"
				aria-disabled="true"
			>
				There are no task. Please create/add new task
				<i className="mt-2 float-right fas fa-hand-point-up"></i>
			</li>
		);
	};

	const displayTodo = () => {
		return (
			<div className="row justify-content-center mt-4 ml-1">
				<Card>
					<Card.Header>
						<Nav fill variant="tabs" defaultActiveKey="#1" text="danger">
							<Nav.Item>
								<Nav.Link eventKey="#1" onClick={() => updateTaskContent('tasks')}>
									Active Tasks
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="#2" onClick={() => updateTaskContent('completed')}>
									Completed Tasks
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="#3" onClick={() => updateTaskContent('deleted')}>
									Deleted Tasks
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Card.Header>
					{isTaskContent ? (
						taskContent && taskContent.length ? (
							<ul className=" list-group to_do_list_box-shadow">
								{taskContent.map((data, index) => {
									return (
										<li
											className="list-group-item list-group-item-action"
											key={index}
											onClick={() => handleTaskOnClick(data)}
											aria-disabled="true"
										>
											{data.content}
											<i className="mt-2 float-right fa fa-chevron-right"></i>
										</li>
									);
								})}
							</ul>
						) : (
							<>{noTask()}</>
						)
					) : (
						<>{noTask()}</>
					)}
				</Card>
			</div>
		);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-5">
					<h3>
						<i className="fa fa-tasks mt-2">ToDo</i>
					</h3>
				</div>
				<div className="col-md-4 mx-auto">
					<Button variant="outline-info mt-2 " className="button-search" onClick={handleShow}>
						<i className="fa fa-plus-circle fa-1x" aria-hidden="true">
							{' '}
							new task{' '}
						</i>
					</Button>

					<Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div className="col-md-3 ml-auto">
					<input
						type="search"
						name="tasks"
						placeholder="Search Tasks..."
						className="form-control mt-2"
						required=""
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-3  mt-4 ">
					<Calendar className=" bg-info calendar-width sticky-top" />
				</div>
				<div className="col-lg-4">{displayTodo()}</div>
				<div className="col-lg-5 mt-4 ">
					{toDoDescriptionVisible ? (
						<TodoTaskDescription
							updateTaskContent={() => updateTaskContent()}
							category={taskCategory}
							data={toDoDescription}
						/>
					) : (
						''
					)}{' '}
				</div>
			</div>
		</div>
	);
}
