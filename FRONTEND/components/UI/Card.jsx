import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ContactCard(props) {
    return (
        <div className="carduser" id={props.data.id} onClick={(e) => {
            props.funk(props.data.id)
        }}>
            <Card style={{ width: '100%', marginTop: '20px', marginRight: '20px' }}>
                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>{props.phone}</Card.Text>
                    </div>
                    <Button variant="danger">
                        <i className="bi bi-trash"></i>
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ContactCard;