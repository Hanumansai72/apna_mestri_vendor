// components/ProductCard.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function ProductCard({ product }) {
  return (
    <Card  text="dark" className="shadow-sm h-100">
      <Card.Img variant="top" src={product.image} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          ₹{product.price} <br />
          <small className="text">{product.location}</small>
        </Card.Text>
        <div>
          {product.tags.map(tag => (
            <Badge key={tag} className="me-1" bg="info">
              {tag}
            </Badge>
          ))}
        </div>
        <Button className="mt-2 w-100" variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
