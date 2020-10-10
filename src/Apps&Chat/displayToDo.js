import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const TodoTaskDescription = (props) => {
	var from = props.category;

	const updateCompleted = (data) => {
		var updateTo = 'completed';
		updateData(data, updateTo);
	};

	const updateDeleted = (data) => {
		var updateTo = 'deleted';
		updateData(data, updateTo);
	};

	const updateData = async (data, updateTo) => {
		let requestBody = {
			query: ` mutation{
                updateTask(input:{userId:"5e9df7a7327a33165026b98f", id:"${data.id}",title:"${data.title}",content:"${data.content}",date:"${data.date}",from:"${from}",updateTo:"${updateTo}"}){
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

		const response = await fetch('http://localhost:4000/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				Accept: 'appliction/json',
				'Content-Type': 'application/json',
            },});
            
        if (!response.errors){
            var responseJSON = response.json();
            localStorage.setItem('todoTasks', JSON.stringify(responseJSON));
            props.validate(responseJSON);
        }else{
            console.log("error in updating task:", response.errors);
        }
	
	};

	return (
		<React.Fragment>
			<Card className="text-center">
				<Card.Header>DateCreated: {props.data.date}</Card.Header>
				<Card.Body>
					<Card.Title>{props.data.title}</Card.Title>
					<Card.Text>{props.data.content}</Card.Text>
				</Card.Body>
				{props.category !== 'deleted' ? (
					<Card.Footer>
						<Row>
							{props.category !== 'completed' ? (
								<Col md={4}>
									{' '}
									<Button
										onClick={() => updateCompleted(props.data)}
										className="mr-auto"
										size="sm"
										variant="primary"
									>
										Complete
									</Button>
								</Col>
							) : (
								''
							)}
							<Col md={{ span: 4, offset: 4 }}>
								<Button onClick={() => updateDeleted(props.data)} className="ml-auto" variant="warning">
									delete
								</Button>
							</Col>
						</Row>
					</Card.Footer>
				) : (
					''
				)}
			</Card>
		</React.Fragment>
	);
};

export default TodoTaskDescription;
