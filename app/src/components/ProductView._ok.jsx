
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import retrieveProductExtend from "../logic/retrieveProductExtend";
import withContext from '../utils/withContext'
import './ProductView.css'
import './Carousel.css'
// import './ProductsList.css'
import IconButton from './Buttons/IconButton'
import ModalCart from "./ModalCart";

//TODO mejorar
function ProductView({ onAddItemToCart,onCart, context: { handleFeedback } }) {
    const params = useParams()
    const [imgCurrent, setImgCurrent] = useState(0)
    const [productToDisplay, setProduct] = useState()
    const [modalState, setModalState] = useState(false)
    const [imagesToDisplay, setImagesToDisplay] = useState()
    const productId = params.productId
    const qtyImg = imagesToDisplay
    let size = useRef(null)

    useEffect(() => {
        try {
            // console.log(productId, "productID")
            retrieveProductExtend(productId, (error, product) => {
                // console.log(product, 'Product desde el callback')
                if (error) handleFeedback({ message: error.message, level: 'error' })
                // if (product !== undefined || product !== null) {
                //     setProduct(product)
                // }

                setProduct(product)
                setImagesToDisplay(product.gallery.length)

            })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })
            console.log(error)
        }
    }, [])

    // debugger
    // console.log(imagesToDisplay)
    // console.log(qtyImg)
    // console.log(productToDisplay, "afuera")
    // ======================= SLIDER =======================
    const nextImg = () => {
        setImgCurrent(imgCurrent === qtyImg - 1 ? 0 : imgCurrent + 1)
    }

    const prevImg = () => {
        setImgCurrent(imgCurrent === 0 ? qtyImg - 1 : imgCurrent - 1)
    }
    // ===========================================================

    const sizeClick = () => {
        // size.children.forEach(button=>{
        //     //TODO BOTONES 

        // })
    }

    const handleFormSubmitCart = (event, productToDisplayId) => {
        event.preventDefault()
        onAddItemToCart(productToDisplayId)
        setModalState()
        
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
                handleFormSubmitCart(event, productToDisplay.id)
            }}>

                {/* <div className="container-qty">
                    <h3>Cantidad</h3>
                    <input type="number" value="1" />
                    
                </div> */}
                <div className="btn-cart">
                    <button type="submit">
                        <span >AÑADIR AL CARRITO</span>
                        <img className='featurette-icon--img' src="https://i.postimg.cc/KYqFk224/right-arrow.png" alt="" />
                    </button>
                </div>

            </form >

        </div>
        {/* TODO feedback modal añadido al carrito correctamente */}
        {modalState && <ModalCart product={modalState}onCart={onCart} onReturnBuy={handleCloseModal} onClose={handleCloseModal} />}
    </div>}

    </>
    debugger
}

export default withContext(ProductView)