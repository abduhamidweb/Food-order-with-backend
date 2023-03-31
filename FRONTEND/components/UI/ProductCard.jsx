import React from 'react';
import { Card, Button } from 'react-bootstrap';

function FoodCard(props) {
    return (
        <div className="cardProduc col-lg-3">
            <Card style={{ boxSizing: 'border-box', background: 'transparent', marginLeft: '20px', marginTop: "20px" }}>
                <Card.Img variant="top" src={props.image} style={{ width: '100%', height: '300px' }} />
                <Card.Body>
                    <Card.Title>{props.foodName}</Card.Title>
                    <Card.Text>
                        Number of orders: {props.numOrders}
                    </Card.Text>
                    <Button variant="danger" onClick={props.onDelete}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default FoodCard;