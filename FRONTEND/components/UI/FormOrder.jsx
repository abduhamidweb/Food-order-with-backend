import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FoodOrderForm(props) {
    const [food, setFood] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleFoodChange = (event) => {
        setFood(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`You ordered ${quantity} ${food}(s).`);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFood">
                <Form.Label>Food</Form.Label>
                <Form.Control as="select" value={food} onChange={handleFoodChange}>
                    <option value="">Select food</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Taco">Taco</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: '100%', margin: '10px' }}>
                Submit
            </Button>
        </Form>
    );
}

export default FoodOrderForm;