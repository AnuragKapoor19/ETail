import React, { useState } from 'react'
import { ContextState } from '../contextAPI'
import { countries } from 'countries-list'
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

export default function ShippingForm() {
    const { setshippingInfo } = ContextState();
    const [credentials, setcredentials] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : { address: '', city: '', phoneNo: '', postalCode: '', country: '' })
    const countriesList = Object.values(countries);
    const navigate = useNavigate('/')

    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setshippingInfo(credentials)
        await localStorage.setItem('shippingInfo', JSON.stringify(credentials))
        navigate('/confirm/order')
    }

    return (
        <>
            <Header />
            <div className='bg-container'>
                <CheckoutSteps shipping />
                <div className='shipping-form-container d-flex justify-content-center align-items-center mt-2' style={{ height: '90vh' }}>
                    <form className='f-container col-sm-8 col-md-6 col-lg-4 py-3 px-5 text-light' onSubmit={handleSubmit}>
                        <h3 className='text-center text-warning'>Shipping Details</h3>
                        <div className="mt-4 mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" name='address' className="form-control border-warning fw-bold" id="address" placeholder="Example: 122, Street No.4, SG Colony" value={credentials.address} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" name='city' className="form-control border-warning fw-bold" id="city" value={credentials.city} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phoneNo" className="form-label">Phone No.</label>
                            <input type="text" name='phoneNo' className="form-control border-warning fw-bold" id="phoneNo" value={credentials.phoneNo} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="postalCode" className="form-label">Postal Code</label>
                            <input type="number" name='postalCode' className="form-control border-warning fw-bold" id="postalCode" value={credentials.postalCode} onChange={handleChange} required />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="country" className="form-label">Country</label>
                            <select name='country' className="form-control border-warning fw-bold" id="country" value={credentials.country} onChange={handleChange} style={{ appearance: "auto" }} required >
                                {countriesList.map((country) => (
                                    <option key={country.name} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-warning w-100'>Continue</button>
                    </form>
                </div>
            </div>
        </>
    )
}
