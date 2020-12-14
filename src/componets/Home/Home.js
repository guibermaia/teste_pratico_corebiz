import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { useFormik } from 'formik';

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

const NewsForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
        },
        validate: values => {
            const { name, email } = values
            const errors = {}
            if (!name) {
                errors.name = 'Preencha com seu nome completo'
            }
            if (!email) {
                errors.email = 'Preencha com seu melhor e-mail'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = 'Preencha com um email válido!'
            }

            return errors
        },
        onSubmit: values => {
            if (formik) {
                Axios.post('https://corebiz-test.herokuapp.com/api/v1/newsletter', values).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Digite seu nome"
                />
                {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
            </div>
            <div>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Digite seu email"
                />
                {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
            </div>
            <button type="submit">EU QUERO!</button>
        </form>
    );
};

function ShowQtCart() {
    var info = localStorage.getItem('cart')
    return info ? <div className="info-cart">{info}</div> : <></>;
}


function Home() {
    const [product, setProduct] = useState([]);

    var [qtdCart, setQtdCart] = useState(0);

    function addCart() {
        var info = localStorage.getItem('cart');
        if (!info || info == 0) {
            let quantity = qtdCart + 1;
            setQtdCart(quantity);
            localStorage.setItem('cart', quantity);
        } else {
            let quantity = info;
            quantity = parseInt(info) + 1;
            setQtdCart(quantity);
            localStorage.setItem('cart', quantity);
        }
    }

    function renderStar(product) {
        for (let i = 0; i <= product; i++) {
            return <div><MdStar /> <MdStarBorder /></div>
        }
    }
    function getProducts() {
        Axios.get('https://corebiz-test.herokuapp.com/api/v1/products').then(result => {
            setProduct(result.data);
        }).catch(err => {
            console.error(err);
        })
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <header>
                <div className="div-container-header">
                    <p>COREBIZ</p>
                    <div>
                        <input type="text" placeholder="O que está procurando? " />
                        <span><MdSearch /></span>
                    </div>
                    <div className="content-div-header">
                        <p><MdPerson /> Minha conta</p>
                        <MdShoppingCart />
                        <ShowQtCart />
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
                        <p className="product-name">{item.productName}</p>
                        <p className="product-price">por: {format(item.price, SYMBOL_BRL)}</p>
                        <button className="btn-card-product" onClick={addCart}>COMPRAR</button>
                    </div>
                ))}
                <MdChevronRight className="size-svg" />
            </div>

            <NewsForm />

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
                <div className="img-footer"></div>
            </footer>
        </div >
    );
};

export default Home;
