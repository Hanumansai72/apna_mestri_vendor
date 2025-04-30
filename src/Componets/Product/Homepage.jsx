import React, { useRef } from 'react';
import NavaPro from './navbarproduct';
import "./Homepage.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const technicalServices = [
  {
    id: 1,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2f28936f2d-a208eb5ca3375c5f586b.png",
    title: "Electrician",
    name: "Bright Current Solutions",
    price: "₹499"
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/57c291b3a0-4ba63983832e7c5ba33e.png",
    title: "Plumber",
    name: "CoolTech Services",
    price: "₹999"
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e8de11e6ab-d4d5a81b9beee79b056b.png",
    title: "CCTV Camera Installation",
    name: "SecureView Experts",
    price: "₹1,499"
  },
  {
    id: 4,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1752303a0d-5cc92cccee41d64c563c.png",
    title: "Inverter Installation & Repair",
    name: "PowerHub Technicians",
    price: "₹799"
  },
  {
    id: 5,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/413c80d496-7d650fa1eb3a09fecd7f.png",
    title: "AC Technician",
    name: "AirCare Pros",
    price: "₹899"
  },
  {
    id: 6,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/413c80d496-7d650fa1eb3a09fecd7f.png",
    title: "AC Technician",
    name: "AirCare Pros",
    price: "₹899"
  }
];

const nonTechnicalServices = [
  {
    id: 1,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Home Cleaning",
    name: "Sparkle Clean Services",
    price: "₹399"
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Pest Control",
    name: "Bug-Free Solutions",
    price: "₹799"
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Salon at Home",
    name: "GlamOn Professionals",
    price: "₹599"
  },
  {
    id: 4,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Laundry Pickup",
    name: "Wash & Go",
    price: "₹249"
  },
  {
    id: 5,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Salon at Home",
    name: "GlamOn Professionals",
    price: "₹599"
  },
  {
    id: 6,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f6dab2a7f-ff5c6d38463a473db53c.png",
    title: "Laundry Pickup",
    name: "Wash & Go",
    price: "₹249"
  }
];

const products = [
  {
    id: 1,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c316c78c39-2c9f9e037c01e3914970.png",
    name: "Cement",
    brand: "Bosch",
    price: "₹2,499"
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c6a815ce41-53a12c7af61e12a99acb.png",
    name: "Steels",
    brand: "Black+Decker",
    price: "₹999"
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fe0f96ab71-3e8dc65d5c5324c8b8a0.png",
    name: "Sand",
    brand: "Taparia",
    price: "₹299"
  },
  {
    id: 4,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fe0f96ab71-3e8dc65d5c5324c8b8a0.png",
    name: "Measuring Tape",
    brand: "Stanley",
    price: "₹149"
  },
  {
    id: 5,
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fe0f96ab71-3e8dc65d5c5324c8b8a0.png",
    name: "Pliers",
    brand: "DeWalt",
    price: "₹349"
  }
];

function Homepage() {
  const techRef = useRef(null);
  const nonTechRef = useRef(null);
  const productRef = useRef(null);

  const handleScroll = (ref, direction) => {
    const container = ref.current;
    if (container) {
      container.scrollLeft += direction === 'left' ? -300 : 300;
    }
  };

  return (
    <div>
      <NavaPro />
      <div className="Hero-Section text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center">
          Find Trusted Professionals <br /> &amp; Products
        </h1>
        <p className="text-lg md:text-xl text-white text-center mb-4">
          Your one-stop solution for all construction and service needs
        </p>

        <div className="Hero-Section-Dropdown mx-auto">
          <DropdownButton
            id="dropdown-basic-button"
            title="Select Your City"
            className="Dropedown mb-3"
            variant="light"
            style={{ width: '100%' }}
          >
            <Dropdown.Item href="#/action-1">Mumbai</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Delhi</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Bangalore</Dropdown.Item>
          </DropdownButton>

          <Form>
            <Row className="g-2">
              <Col xs={8}>
                <Form.Control type="text" placeholder="Search for services..." className='Input_bx ' />
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      <h3 className='Techincal-Heading'>Technical Services</h3>

      <div className="scroll-buttons">
        <Button variant="light" onClick={() => handleScroll(techRef, 'left')}><i className="bi bi-chevron-left"></i></Button>
        <Button variant="light" onClick={() => handleScroll(techRef, 'right')}><i className="bi bi-chevron-right"></i></Button>
      </div>

      <div className="Technical-scroll-wrapper" ref={techRef}>
        {technicalServices.map(service => (
          <Card key={service.id} className="card">
            <Card.Img variant="top" src={service.image} style={{ height: "200px" }} />
            <Card.Body>
              <Card.Title>{service.title}</Card.Title>
              <Card.Text>Starting from {service.price}</Card.Text>
              <Button variant="primary" style={{ width: "10rem", marginLeft: "18px" }}>Book Now</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h3 className="Non-Techincal-Heading">Non-Technical Services</h3>

      <div className="scroll-buttons">
        <Button variant="light" onClick={() => handleScroll(nonTechRef, 'left')}><i className="bi bi-chevron-left"></i></Button>
        <Button variant="light" onClick={() => handleScroll(nonTechRef, 'right')}><i className="bi bi-chevron-right"></i></Button>
      </div>

      <div className="Non-Technical-scroll-wrapper" ref={nonTechRef}>
        {nonTechnicalServices.map(nonService => (
          <Card key={nonService.id} className="card">
            <Card.Img variant="top" src={nonService.image} style={{ height: "200px" }} />
            <Card.Body>
              <Card.Title>{nonService.title}</Card.Title>
              <Card.Text>Starting from {nonService.price}</Card.Text>
              <Button variant="primary" style={{ width: "10rem", marginLeft: "18px" }}>Book Now</Button>
            </Card.Body>
          </Card>
        ))}
      </div><br />

      <h3 className="Products-Heading">Products</h3>

      <div className="scroll-buttons">
        <Button variant="light" onClick={() => handleScroll(productRef, 'left')}><i className="bi bi-chevron-left"></i></Button>
        <Button variant="light" onClick={() => handleScroll(productRef, 'right')}><i className="bi bi-chevron-right"></i></Button>
      </div>

      <div className="Product-scroll-wrapper" ref={productRef}>
        {products.map(product => (
          <Card key={product.id} className="card">
            <Card.Img variant="top" src={product.image} style={{ height: "200px" }} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Starting from {product.price}</Card.Text>
              <Button variant="primary" style={{ width: "10rem", marginLeft: "18px" }}>Book Now</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
