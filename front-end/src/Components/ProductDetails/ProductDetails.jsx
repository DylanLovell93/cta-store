import React from 'react';
import './ProductDetails.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Img } from 'react-image';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const targetProduct = await axios.get(`${URL}/products/${id}`);
        setProduct(targetProduct.data.payload);
      } catch (error) {
        console.warn(error);
      }
    };
    getProduct();
  }, [id, URL]);

  const handleDelete = async (event) => {
    event.preventDefault();
    const authkey = '4be8ea38-70af-4fb0-a122-84a9a9013748';
    try {
      const deletedProd = await axios({
        method: 'DELETE',
        url: `${URL}/products/${id}`,
        data: {
          authkey,
        },
      });
      navigate('/products');
    } catch (error) {
      console.warn(error);
    }
  };

  const { name, image, description, price, rating, featured } = product;

  return (
    <div className="ProductDetails">
      <div className="container">
        <h1>
          <span>
            {price?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
          {name}
        </h1>
        <Img
          src={[
            image,
            'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg',
          ]}
        />
        <h2>{description}</h2>
        <h2>Rating: {rating}/5</h2>
        <h2>Featured: {featured ? 'Yes' : 'No'}</h2>
        <Link to={`/products`} className="btn btn-dark mx-2">
          Back
        </Link>
        <Link to={`/products/${id}/edit`} className="btn btn-dark mx-2">
          Edit
        </Link>
        <button className="btn btn-danger mx-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
