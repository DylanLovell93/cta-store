import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Index from './Pages/Index/Index';
import NewProd from './Pages/NewProd/NewProd';
import ShowProd from './Pages/ShowProd/ShowProd';
import EditProd from './Pages/EditProd/EditProd';
import NotFound from './Pages/NotFound/NotFound';
import ShowProfile from './Pages/ShowProfile/ShowProfile';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="myprofile" element={<ShowProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Index />} />
        <Route path="/products/new" element={<NewProd />} />
        <Route path="/products/:id" element={<ShowProd />} />
        <Route path="/products/:id/edit" element={<EditProd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
