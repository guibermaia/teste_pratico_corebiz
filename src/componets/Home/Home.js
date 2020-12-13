import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
    MdSearch,
    MdPerson,
    MdShoppingCart,
    MdEmail,
    MdHeadsetMic,
    MdChevronLeft,
    MdChevronRight,
    MdStar,
    MdStarBorder
} from "react-icons/md";

import './home.css';
import { SYMBOL_BRL, format } from '../FormatCurrency';

function Home() {
    const [product, setProduct] = useState([]);
    
    function getProducts() {
        Axios.get('https://corebiz-test.herokuapp.com/api/v1/products').then(result => {
            setProduct(result.data);
        }).catch(err => {
            console.error(err);
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
    }

    function renderStar(product) {
        for (let i = 0; i <= product; i++) {
            return <MdStar />
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    if (product) {
        return (
            <div>
                <header>
                    <div className="div-container-header">
                        <p>COREBIZ</p>
                        <div>
                            <input type="text" placeholder="O que está procurando? " />
                            <MdSearch />
                        </div>
                        <div className="content-div-header">
                            <p><MdPerson /> Minha conta</p>
                            <MdShoppingCart />
                        </div>
                    </div>
                </header>
                <div className="carousel"></div>
                <div className="products">
                    <MdChevronLeft className="size-svg" />
                    {product.map((item) => (
                        <div key={item.productId} className="card-product">
                            <img src={item.imageUrl} alt="Produto"></img>
                            {renderStar(item.stars)}
                            <p>{item.productName}</p>
                            <p>por: {format(item.price, SYMBOL_BRL)}</p>
                        </div>
                    ))}
                    <MdChevronRight className="size-svg" />
                </div>

                <form>
                    <div>
                        <h3>Participe de nossas news com promoções e novidades!</h3>
                        <input type="text" placeholder="Digite seu nome" name="userName" />
                        <input type="text" placeholder="Digite seu e-mail" name="email" />
                        <button onClick={handleSubmit}>EU QUERO!</button>
                    </div>
                </form>

                <footer>
                    <div>
                        <h3>Localização</h3>
                        <p className="div-trace"></p>
                        <p>Avenida Andrômeda, 2000. Bloco 6 e 8</p>
                        <p>Alphavile SP</p>
                        <p>brasil@corebiz.ag</p>
                        <p>+55 11 3090 1039</p>
                    </div>
                    <div className="content-div-footer">
                        <button> <MdEmail /> ENTRE EM CONTATO</button>
                        <button> <MdHeadsetMic /> FALE COM O NOSSO CONSULTOR ONLINE</button>
                    </div>
                    <div>
                        imagem
                        imagem
                </div>
                </footer>
            </div >
        );
    }
    return <div className="loading"><div className="loader"></div></div>
};

export default Home;
