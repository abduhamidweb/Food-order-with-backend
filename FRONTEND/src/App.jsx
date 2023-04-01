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
  const [user, setUser] = useState(null);
  console.log('user :', user);
  const [dataFood, setDataFood] = useState([]);
  const [dataById, setDataById] = useState(1);
  async function fetchDataUsersById(id) {
    const response = await fetch(`http://localhost:5000/users/${id}`);
    const data = await response.json();
  setData(data);
  }
  // setDataById(1)
  dataById > 0 ? console.log(user) : null
  useEffect(() => {
    dataById > 0 ? fetchDataUsersById(dataById) : null
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
    console.log(user);
  }, [])
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar" className="bg-primary">
          <Header txt={"LOOOK"} />
          <div className="cards">
            {
              data.length ? data.map((item) => {
                return <ContactCard name={item.username} data={item} phone={item.phoneNumber} funk={setDataById} />
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