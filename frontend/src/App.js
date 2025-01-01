import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';
import Signin from './pages/Signin';
import { ContextState } from './contextAPI';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Cart from './pages/Cart';
import ShippingForm from './pages/ShippingForm';
import ConfirmOrder from './pages/ConfirmOrder';
import Payment from './pages/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './pages/Orders';
import SingleOrder from './pages/SingleOrder';
import Dasboard from './pages/Dasboard';
import AdminProducts from './pages/AdminProducts';

function App() {
  const { setuser, setisAuthenticated, isAuthenticated, isUpdated, user } = ContextState();
  const [stripeApiKey, setstripeApiKey] = useState('')

  const getUserProfile = async () => {
    const res = await fetch('http://localhost:5000/api/v1/me', {
      method: 'GET',
      credentials: 'include',
    })

    const data = await res.json();

    if (!data.success) {
      console.log(data.error || data.message)
      setuser()
      setisAuthenticated(false)
    }
    else {
      setuser(data.user)
      setisAuthenticated(true)
    }
  }

  const getStripeApiKey = async () => {
    const res = await fetch('http://localhost:5000/api/v1/stripeapi', {
      method: "GET",
      credentials: 'include'
    })
    const data = await res.json();
    setstripeApiKey(String(data.stripeApiKey))
  }

  useEffect(() => {
    getUserProfile();
    getStripeApiKey();
    //eslint-disable-next-line
  }, [isAuthenticated, isUpdated])

  return (
    <>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/productdetails' element={<SingleProduct />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/resetpassword' element={<ResetPassword />} />
            <Route exact path='/password/reset/:token' element={<ResetPassword />} />
            <Route exact path='/forgotpassword' element={<ForgotPassword />} />
            {isAuthenticated
              ?
              <>
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/me/profile' element={<Profile />} />
                <Route exact path='/me/updateprofile' element={<UpdateProfile />} />
                <Route exact path='/shipping' element={<ShippingForm />} />
                <Route exact path='/confirm/order' element={<ConfirmOrder />} />
                <Route exact path='/my/orders' element={<Orders />} />
                <Route exact path='/order/:id' element={<SingleOrder />} />
                {stripeApiKey && <Route exact path='/payment' element={<Payment />} />}
                {user.role === 'admin'
                  ?
                  <>
                    <Route exact path='/admin/dashboard' element={<Dasboard />} />
                    <Route exact path='/admin/products' element={<AdminProducts />} />
                  </>
                  :
                  ''
                }
              </>
              :
              ''
            }
          </Routes>
        </Router>
      </Elements>
    </>
  );
}

export default App;
