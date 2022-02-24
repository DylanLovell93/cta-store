import './ShopGrid.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GridItem from './GridItem/GridItem';
import { Link } from 'react-router-dom';

const ShopGrid = () => {
  const [products, setProducts] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await axios.get(`${URL}/products`);
      setProducts(allProducts.data.payload);
    };
    getProducts();
  }, [URL]);
  const items = products.map((e, i) => <GridItem product={e} key={'gi' + i} />);
  return (
    <div className="ShopGrid">
      <div className="container">
        <h1>
          Products
          <Link to="/products/new" className="btn btn-dark newProd">
            New
          </Link>
        </h1>
        <div className="gridContainer">{items}</div>
      </div>
    </div>
  );
};

export default ShopGrid;
