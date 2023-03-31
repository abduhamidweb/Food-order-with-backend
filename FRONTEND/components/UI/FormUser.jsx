import React from 'react';
import { Form, Button } from 'react-bootstrap';

function ContactForm(props) {
    return (
        <Form style={{background:"White", margin:'20px', textAlign:"center", padding:'10px'}}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{width:'100%', marginTop:"10px"}}>
                Submit
            </Button>
        </Form>
    );
}

export default ContactForm;