
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import retrieveProductExtend from "../logic/retrieveProductExtend";
import registerUserAnonymous from "../logic/registerUserAnonymous";
import addItemToCart from '../logic/addItemToCart'

import withContext from '../utils/withContext'
import './ProductView.css'
import './Carousel.css'
import IconButton from './Buttons/IconButton'
import ModalCart from "./ModalCart";

//TODO mejorar
function ProductView({ onCart, context: { handleFeedback } }) {
    const params = useParams()
    const [imgCurrent, setImgCurrent] = useState(0)
    const [productToDisplay, setProduct] = useState()
    const [modalState, setModalState] = useState(false)
    const [imagesToDisplay, setImagesToDisplay] = useState()
    const [selectedQty, setSelectedQty] = useState(1)
    const [cart, setCart] = useState({})
    const productId = params.productId
    const qtyImg = imagesToDisplay
    let size = useRef(null)

    useEffect(() => {
        try {
            retrieveProductExtend(productId, (error, product) => {
                if (error) handleFeedback({ message: error.message, level: 'error' })

                setProduct(product)
                setImagesToDisplay(product.gallery.length)

            })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })
            console.log(error)
        }
    }, [])


    // ======================= SLIDER =======================
    const nextImg = () => {
        setImgCurrent(imgCurrent === qtyImg - 1 ? 0 : imgCurrent + 1)
    }

    const prevImg = () => {
        setImgCurrent(imgCurrent === 0 ? qtyImg - 1 : imgCurrent - 1)
    }
    // ===========================================================
    const handleQtyChange = (event) => {
        const value = parseInt(event.target.value);
        setSelectedQty(isNaN(value) ? 0 : value);
    }
    //======================================================
    const sizeClick = () => {
        // size.children.forEach(button=>{
        //     //TODO BOTONES 

        // })
    }
    // TODO arreglar onAddItemToCart recibe 3 parametros y solo tengo 1



    const handleFormSubmitCart = (event, productToDisplayId, productToDisplayPrice, selectedQty) => {
        event.preventDefault()
        console.log(selectedQty)
        // Comprobar si hay un usuario registrado (con token) en la sesión o el localStorage
        const token = sessionStorage.token || localStorage.token;
        try {
            if (!token) {
                //TODO Si no hay token, entonces el usuario es anónimo
                // Creamos un usuario anónimo y agregamos el producto al carrito
                registerUserAnonymous(cart, function (error, token) {
                    if (error) {
                        handleFeedback({ message: error.message, level: 'error' })

                        return
                    }
                    handleFeedback({ message: error.message, level: 'error' })

                    localStorage.token = token

                    // Una vez creado el usuario anónimo, agregamos el producto al carrito

                    addItemToCart(token, productToDisplayId, productToDisplayPrice, selectedQty, error => {
                        if (error) {
                            handleFeedback({ message: error.message, level: 'error' })
                            return;
                        }

                        handleFeedback({ message: 'agregado', level: 'info' })
                        setModalState(productToDisplayId);
                    })
                })
            } else {
                //Si hay token, entonces el usuario ya esta registrado
                //Agregamos el producto al carrito directamente

                addItemToCart((sessionStorage.token || localStorage), productToDisplayId, productToDisplayPrice, selectedQty, error => {

                    if (error) {
                        handleFeedback({ message: error.message, level: 'error' })
                        console.log("error adentro")
                        return
                    }
                    handleFeedback({ message: "agregado", level: 'info' })
                    setModalState(productToDisplayId)
                })
            }
            // console.log(productToDisplayPrice)
        } catch (error) {
            console.log("Error en handleFormSubmitCart:", error);
            handleFeedback({ message: error.message, level: 'error' })
            console.log("error afuera catch")
        }
    }


    // =========================
    const handleCloseModal = () => setModalState(null)

    // =========================
    const handleReturnClick = () => {
        window.history.go(-1)
    }


    return <>{productToDisplay && <div className="container-section--product cat2" >
        <div className="container-product ">
            <div className="contClose">
                <IconButton addClass="close" text="close" onClick={handleReturnClick} />
            </div>


            <div className="container-title">
                <div className="nameGener">

                    <h1>{productToDisplay.name} ({productToDisplay.categ})</h1>

                </div>
                <div className="container-price">
                    <div className="product-price">
                        $ {productToDisplay.price}
                    </div>
                </div>
            </div>

            {/* =====================Slider====================== */}
            <div className="slider-product">
                <div className="slider-content">
                    <div className="contBtnLeft" onClick={prevImg}>
                        <IconButton addClass="btnLeftImg" text="west" />
                    </div>
                    {productToDisplay.gallery.map((image, index) => {
                        return (<div className="imgs">
                            {imgCurrent === index && <div className="slider-content--item" key={index}  >
                                <img className='featurette-img--products' src={image} alt="" />

                            </div>}
                        </div>)
                    })}
                    <div className="contBtnRight" onClick={nextImg}>
                        <IconButton addClass="btnRightImg" text="east" />
                    </div>

                </div>
            </div>

            {/* ================================================== */}

            <div className="container-pay">
                <p>Paga en 3 plazos sin intereses de 20,00€.
                    <span className="logo">Klarna</span>
                    .
                    <button className="link">Más información</button>
                </p>
            </div>
            {/* //TODO container size */}
            <div className="container-size">
                <div className="name-size">
                    <h3>Tallas</h3>
                </div>
                <div className="container-size--grid" ref={node => size = node}>
                    <button onClick={sizeClick} className="grid-item">3XS</button>
                    <button onClick={sizeClick} className="grid-item">2XS</button>
                    <button onClick={sizeClick} className="grid-item">XS</button>
                    <button onClick={sizeClick} className="grid-item">S</button>
                    <button onClick={sizeClick} className="grid-item">M</button>
                    <button onClick={sizeClick} className="grid-item">L</button>
                    <button onClick={sizeClick} className="grid-item">XL</button>
                    <button onClick={sizeClick} className="grid-item">2XL</button>
                </div>
            </div>


            <form onSubmit={(event) => {
                handleFormSubmitCart(event, productToDisplay.id, productToDisplay.price, selectedQty)
            }}>

                <div className="container-qty">
                    <h3>Cantidad</h3>
                    <input type="number" value={selectedQty} onChange={handleQtyChange} />

                </div>
                <div className="btn-cart">
                    <button type="submit">
                        <span >AÑADIR AL CARRITO</span>
                        <img className='featurette-icon--img' src="https://i.postimg.cc/KYqFk224/right-arrow.png" alt="" />
                    </button>
                </div>

            </form >

        </div>
        {/* TODO feedback modal añadido al carrito correctamente */}
        {modalState && <ModalCart onCart={onCart} onReturnBuy={handleCloseModal} onClose={handleCloseModal} />}
    </div>}

    </>

}

export default withContext(ProductView)