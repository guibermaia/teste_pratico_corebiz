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
                errors.name = 'Por favor, informe o nome!'
            }
            if (!email) {
                errors.email = 'Por favor, informe o email!'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = 'Por favor, informe um email válido!'
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
                console.log(values)
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
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </div>
            <button type="submit">EU QUERO!</button>
        </form>
    );
};


function Home() {
    const [product, setProduct] = useState([]);

    function getProducts() {
        Axios.get('https://corebiz-test.herokuapp.com/api/v1/products').then(result => {
            setProduct(result.data);
        }).catch(err => {
            console.error(err);
        })
    }

    function renderStar(product) {
        for (let i = 0; i <= product; i++) {
            return <div><MdStar /> <MdStarBorder /></div>
        }
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
                <div>
                    imagem
                    imagem
                </div>
            </footer>
        </div >
    );
};

export default Home;
