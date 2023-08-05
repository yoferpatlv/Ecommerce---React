import { useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'
import retrieveProducts from '../logic/retrieveProducts'
import searchProducts from '../logic/searchProducts'

import withContext from '../utils/withContext'
import Profile from '../components/Profile'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ContMain from '../components/ContMain'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Search from '../components/Search'
import ProductsList from '../components/ProductsList'
import ProductsListMen from '../components/ProductsListMen'
import ProductsListWomen from '../components/ProductsListWomen'
import ProductsListKids from '../components/ProductsListKids'
import ProductView from '../components/ProductView'
import ProductsFavourites from '../components/ProductsFavourites'
import Cart from '../components/Cart'
import Context from '../utils/Context'
// import Menu from '../components/Menu'

function HomePage({ onLogoutClick, onLoginClick, context: { handleFeedback } }) {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [products, setProducts] = useState(null)
    const [productsSearch, setProductsSearch] = useState(null)
    const [query, setQuery] = useState(null)


    // const [view, setView] = useState('list')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (sessionStorage.token) {
            try {
                retrieveUser(sessionStorage.token, (error, user) => {
                    if (error) {
                        handleFeedback({ message: error.message, level: 'error' })

                        onLogoutClick()
                        return
                    }
                    setName(user.name)
                    setEmail(user.email)
                })
            } catch (error) {
                handleFeedback({ message: error.message, level: 'error' })
            }
            loadProducts()
        }
        else {
            loadProducts()
        }
    }, [])

    useEffect(() => {
        loadProducts()
    }, [query])

    const loadProducts = () => {
        try {
            if (!query)
                retrieveProducts((error, products) => {
                    if (error) {
                        handleFeedback({ message: error.message, level: 'error' })

                        return
                    }

                    setProducts(products)
                })
            else
                searchProducts(query, (error, products) => {
                    if (error) {
                        handleFeedback({ message: error.message, level: 'error' })

                        return
                    }

                    setProductsSearch(products)
                })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })
        }
    }

    const handleUserClick = () => {
        if (!sessionStorage.token) {
            onLoginClick()
            // console.log(name)
        }
        else {
            navigate('profile')
            // console.log(name) 
        }

        // onLoginClick()

    }

    const handleProfileClick = () => {
        // navigate('profile')

        // loadProducts()
    }

    const handleSearchClick = () => {
        loadProducts()
        navigate('search')
    }

    const handleReturnMain = () => {
        loadProducts()
        navigate('/')
    }

    const handleListProducts = () => {

        navigate('listProducts')
    }
    const handleListProductsSearch = () => {

        navigate('listProductsSearch')
    }

    const handleListProductsMen = () => {

        navigate('listProductsMen')
    }
    const handleListProductsWomen = () => {

        navigate('listProductsWomen')
    }
    const handleListProductsKids = () => {

        navigate('listProductsKids')
    }
    const handleCart = () => {
        navigate('cart')
    }
    const handleFavouritesProducts = () => {
        navigate('favourite')
    }
    const handleLogoutClick = () => {
        onLogoutClick()
    }

    // const handleUpdateName = (newName) => setName(newName)
    // const handleUpdateEmail = (newEmail) => setEmail(newEmail)
    const handleSearch = query => setQuery(query)

    const handleProductClick = productId => navigate(`products/${productId}`)



    // return email?
    // listProducts
    // const locationsHeader = ['/', 'listProducts']

    //TODO location pathname no funciona en header

    return <div className="container container--full c  ontainer--width homePage">
        {(location.pathname === "/" || location.pathname === "listProducts") && <Header products={products} onUserClick={handleUserClick} onListProducts={handleListProducts} onListProductsMen={handleListProductsMen} onListProductsWomen={handleListProductsWomen} onListProductsKids={handleListProductsKids} onProfileClick={handleProfileClick} onSearchClick={handleSearchClick} onCartClick={handleCart} onFavouritesProducts={handleFavouritesProducts} />}

        <main className="main-home">
            <Routes>
                <Route path="/" element={<ContMain products={products} onProductClick={handleProductClick} />} />
                <Route path='search' element={<Search onProductsSearch={handleListProductsSearch} onCloseClick={handleReturnMain} onQuery={handleSearch} />} />
                {/* <Route path="menu" element={<Menu products={products} onCloseClick={handleReturnMain}/>} /> */}
                <Route path='favourite' element={<ProductsFavourites products={products} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />
                <Route path='listProductsSearch' element={<ProductsList products={productsSearch} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />
                <Route path='listProducts' element={<ProductsList products={products} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />
                <Route path='listProductsMen' element={<ProductsListMen products={products} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />
                <Route path='listProductsWomen' element={<ProductsListWomen products={products} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />
                <Route path='listProductsKids' element={<ProductsListKids products={products} onProductClick={handleProductClick} onCloseClick={handleReturnMain} />} />

                {/* TODO test context.provider for pass productId from ProductView to Cart  */}
                <Context.Provider value={"productID"}>
                    <Route path='products/:productId' element={<ProductView onCart={handleCart} />} />
                    <Route path='cart' element={<Cart />} />
                </Context.Provider>

                <Route path="profile" element={<Profile onCloseClick={handleReturnMain} onLogoutClick={handleLogoutClick} />} />

                {/* {email ?
                    <Route path="profile" element={<Profile onCloseClick={handleReturnMain} email={email} onUpdateEmail={handleUpdateEmail} onUpdateName={handleUpdateName} />} />
                    :
                    <Route path="login" element={<ContMain />} />
                } */}
            </Routes>
        </main>

        <Footer />
    </div>
    // :
    // null
}
export default withContext(HomePage)