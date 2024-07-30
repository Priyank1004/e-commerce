import './App.css';
import Footer from './Componets/Footer';
import Navbar from './Componets/Navbar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Componets/Signup';
import PrivateComponet from './Componets/PrivateComponet';
import Login from './Componets/Login';
import AddProduct from './Componets/AddProduct';
import ProductList from './Componets/ProductList';
import UpdateProduct from './Componets/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponet />}>
            <Route path='/' element={<ProductList />}/>
            <Route path='/add' element={<AddProduct />}/>
            <Route path='/update/:id' element={<UpdateProduct />}/>
            <Route path='/logout' element={<h1>Logout page</h1>}/>
            <Route path='/profile' element={<h1>Profile Page</h1>}/>
          </Route>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
