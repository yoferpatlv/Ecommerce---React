import './ContMain.css'
import { useState, useRef } from 'react'
import withContext from '../utils/withContext'
import ProductsList from './ProductsList'
// import ProductsList from './NN'
// import IconButton from './Buttons/IconButton'

function ContMain({ products, onProductClick }) {
    const [view, setView] = useState('play')
    //use ref vid
    let vid = useRef(null)

    const handleOnClickPlayVideo = () => {
        setView('play')
        // let vid = document.getElementById("videoOne");
        vid.play();
    }
    const handleOnClickStopVideo = () => {
        setView('stop')
        // let vid = document.getElementById("videoOne");
        vid.pause()
    }
    const handleProductClick = (product) => {
        onProductClick(product.id)
    }
    const _products = products

    return <div className="container ContMain">
        <section className="container-section promotionOne container">
            <div className='video-sectionOne'>
                {/* <video className='video-promotionOne' controls src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto/video/upload/FW22-Outdoor-UBS-hero-launch-HP-Masthead-dual-m_cwpxqw.mp4" preload='auto' autoPlay type="video/mp4"></video> */}
                <video id='videoOne' className='video-promotionOne' autoPlay loop muted ref={node => vid = node} >
                    <source src="https://brand.assets.adidas.com/video/upload/q_auto,vc_auto/video/upload/FW22-Outdoor-UBS-hero-launch-HP-Masthead-dual-m_cwpxqw.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='control-play'>
                {view === "stop" && <a onClick={handleOnClickPlayVideo}><img className='featurette-icon--img' src="https://i.postimg.cc/mZQXnvMk/play.png" alt="play video" /></a>}
                {view === "play" && <a onClick={handleOnClickStopVideo}><img className='featurette-icon--img' src="https://i.postimg.cc/2yDYngbJ/pause.png" alt="pause video" /></a>}
            </div>
            <div className="container-portrait">
                <div className="portrait-title">
                    <h2>LA CUMBRE NOS UNE</h2>
                    <h3>¡Atentos! Las cumbres no entienden de mapas ni grados de dificultad. ¿Te atreves a encontrar la tuya?</h3>
                    <div className='btn--portrait-title'>
                        <a href="https://www.javascript.com/" >
                            <span>MÁS INFORMACIÓN</span>
                            <img className='featurette-icon--img' src="https://i.postimg.cc/KYqFk224/right-arrow.png" alt="" />
                        </a>
                    </div>
                </div>
            </div>

        </section>

        <section className="container-section promotionTwo container">
            <div className='img-sectionTwo'>
                <img className='img-promotionTwo' src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_960,w_960/esES/Images/football-fw22-federations-spain-hp-mh-t_tcm190-920814.jpg" alt="" />
            </div>
            {/* <div className='backgroundSlider'>
                <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esES/Images/football-fw22-federations-spain-catlp-psc-m_tcm190-920832.jpg" alt="" />
            </div> */}
            <div className="container-portrait">
                <div className="portrait-title">
                    <h3>EQUIPACIONES ESPAÑA COPA MUNDIAL DE LA FIFA 2022™</h3>

                    <div className='btn--portrait-title'>
                        <a href="https://www.javascript.com/" >
                            <span>COMPRAR</span>
                            <img className='featurette-icon--img' src="https://i.postimg.cc/KYqFk224/right-arrow.png" alt="" />
                        </a>
                    </div>
                </div>
            </div>

        </section>

        <section className="container-section products slider ">
            <div className='backgroundSlider'>
                <div className='favTittle'>
                    <h2 >LOS MÁS COMPRADOS</h2>
                </div>

                <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esES/Images/football-fw22-federations-spain-catlp-psc-m_tcm190-920832.jpg" alt="" />

            </div>

            <div className="container-products slider">
                {_products && _products.filter(_product => _product.nivel === 5
                ).map(product => <div className="item--products slider" key={product.id} onClick={() => handleProductClick(product)}>
                    <div className="featurette-icon slider">
                        <img className='featurette-icon--img products slider' src={product.img} alt="" />
                    </div>
                    <p>${product.price}</p>
                    <h3>{product.name}</h3>
                </div>)}
            </div>

        </section>
        {/* <ProductsList products={products} /> */}


    </div>
}
export default withContext(ContMain)