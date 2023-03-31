import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header/Header';
import ContactCard from '../components/UI/Card';
import "./App.css"
import ContactForm from '../components/UI/FormUser';
import FoodOrderForm from '../components/UI/FormOrder';
import FoodCard from '../components/UI/ProductCard';
import { useState } from 'react';
function App() {
  const handleDelete = () => {
    console.log('Deleted!');
  };
  const BASEURL = `http://localhost:5000/`
  const [data, setData] = useState([]);
  const [dataFood, setDataFood] = useState([]);
  useEffect(() => {
    async function fetchDataUsers() {
      const response = await fetch('http://localhost:5000/users/');
      const data = await response.json();
      setData(data);
    }
    fetchDataUsers()
    async function fetchDataFoods() {
      const response = await fetch('http://localhost:5000/food/');
      const data = await response.json();
      setDataFood(data);
    }
    fetchDataFoods()
  }, [])
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar" className="bg-primary">
          <Header txt={"LOOOK"} />
          <div className="cards">
            {
              data.length ? data.map((item) => {
                return <ContactCard name={item.username} phone={item.phoneNumber} />
              }) : null
            }
          </div>
          <ContactForm />
        </Col>
        <Col xs={10} id="main" className="bg-secondary">
          <Header txt={"ORDERS"} />
          <main className='main'>
            <div className="container">
              <div className="row">
                  {
                    dataFood.length ? dataFood.map((item) => {
                      return <FoodCard
                        image="https://via.placeholder.com/300x400.png"
                        foodName="Pizza"
                        numOrders={3}
                        onDelete={handleDelete}
                      />
                    }) : null
                  }
              </div>
         </div>
          </main>
          <FoodOrderForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;