import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';

const GridItem = ({
  product: { id, name, image, description, price, rating, featured },
}) => {
  return (
    <div className="card GridItem">
      <Img
        src={[
          image,
          'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg',
        ]}
        alt={`Picture of ${name}`}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <span>
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
        <p className="card-text">{description}</p>
        <Link to={`/products/${id}`} className="btn btn-dark">
          View
        </Link>
      </div>
    </div>
  );
};

export default GridItem;
