import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {

    const [products, setproducts] = useState([])
    const [product, setproduct] = useState()
    const [currentPage, setcurrentPage] = useState(1)
    const [resPerPage, setresPerPage] = useState()
    const [productsCount, setproductsCount] = useState()
    const [loading, setloading] = useState(true)
    const [keyword, setkeyword] = useState('')
    const [minPrice, setminPrice] = useState(0)
    const [maxPrice, setmaxPrice] = useState(1000)
    const [category, setcategory] = useState('')
    const [user, setuser] = useState()
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [toggle, settoggle] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)
    const [cartItems, setcartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    const [shippingInfo, setshippingInfo] = useState(localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {})
    const [rating, setrating] = useState(0)
    const [adminProducts, setadminProducts] = useState([])
    const [isProductDeleted, setisProductDeleted] = useState(false)
    const [isProductUpdated, setisProductUpdated] = useState(false)
    const [editProduct, seteditProduct] = useState()
    const [adminOrders, setadminOrders] = useState([])

    return (
        <Context.Provider value={{
            products,
            setproducts,
            product,
            setproduct,
            currentPage,
            setcurrentPage,
            resPerPage,
            setresPerPage,
            productsCount,
            setproductsCount,
            loading,
            setloading,
            keyword,
            setkeyword,
            minPrice,
            setminPrice,
            maxPrice,
            setmaxPrice,
            category,
            setcategory,
            user,
            setuser,
            isAuthenticated,
            setisAuthenticated,
            toggle,
            settoggle,
            isUpdated,
            setisUpdated,
            cartItems,
            setcartItems,
            shippingInfo,
            setshippingInfo,
            rating,
            setrating,
            adminProducts,
            setadminProducts,
            isProductDeleted,
            setisProductDeleted,
            isProductUpdated,
            setisProductUpdated,
            editProduct,
            seteditProduct,
            adminOrders,
            setadminOrders
        }}
        >
            {children}
        </Context.Provider>
    )

}

export const ContextState = () => {
    return useContext(Context)
}

export default ContextProvider;