import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ProdForm.css';

const ProdForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    image: '',
    description: '',
    price: 0,
    rating: 0,
    featured: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const isEdit = id + 1 ? true : false;

  const storage = window.localStorage;
  const testUser = storage.getItem('user');
  console.log(testUser);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const targetProduct = await axios.get(`${URL}/products/${id}`);
        setFormState(targetProduct.data.payload);
      } catch (error) {
        console.warn(error);
      }
    };
    if (isEdit) getProduct();
  }, [id, URL]);

  const handleFormChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleCheckChange = (event) => {
    setFormState({
      ...formState,
      [event.target.id]: !formState[[event.target.id]],
    });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const authkey = '4be8ea38-70af-4fb0-a122-84a9a9013748';
    formState.authkey = authkey;
    try {
      const editedProduct = await axios.put(`${URL}/products/${id}`, formState);
      navigate(`/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNew = async (event) => {
    event.preventDefault();
    const authkey = '4be8ea38-70af-4fb0-a122-84a9a9013748';
    formState.authkey = authkey;
    try {
      const newProduct = await axios.post(`${URL}/products/`, formState);
      navigate('/products/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ProdForm">
      <div className="container">
        <h1>{isEdit ? 'Edit Product' : 'Create Product'}</h1>
        <form onSubmit={isEdit ? handleEdit : handleNew}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={handleFormChange}
                value={formState.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="url"
                className="form-control"
                id="image"
                placeholder="Image"
                onChange={handleFormChange}
                value={formState.image}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={handleFormChange}
                value={formState.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Price"
                onChange={handleFormChange}
                value={formState.price}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              className="form-control"
              id="rating"
              placeholder="Rating"
              onChange={handleFormChange}
              value={formState.rating}
            />
          </div>
          <div className="form-group mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formState.featured}
                id="featured"
                onChange={handleCheckChange}
              />
              <label className="form-check-label" htmlFor="featured">
                Featured
              </label>
            </div>
          </div>
          <div className="btnContainer mt-3">
            <Link
              to={isEdit ? `/products/${id}` : '/products'}
              className="btn btn-dark backBtn"
            >
              Back
            </Link>
            <button type="submit" className="btn btn-dark submitBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdForm;
