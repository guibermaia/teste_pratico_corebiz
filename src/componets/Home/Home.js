import Axios from 'axios';
import React from 'react';
import { MdSearch, MdPerson, MdShoppingCart, MdEmail, MdHeadsetMic } from "react-icons/md";

import './home.css';

function Home() {

    function getProducts() {
        Axios.get('https://corebiz-test.herokuapp.com/api/v1/products').then(result => {
            console.log(result);
        }).catch(err => {
            console.error(err);
        })
    }
    // getProducts();
    return (
        <div>
            <header>
                <p>COREBIZ</p>
                <div>
                    <input type="text" placeholder="O que está procurando? " />
                    <MdSearch />
                </div>
                <div className="content-div-header">
                    <p><MdPerson /> Minha conta</p>
                    <MdShoppingCart />
                </div>
            </header>
            <div className="carousel">
                <h1>img carrosel</h1>
            </div>
            <div className="products">
                <div className="card-product">
                </div>
            </div>

            <form>
                <h3>Participe de nossas news com promoções e novidades</h3>
                <input type="text" placeholder="Digite seu nome" />
                <input type="text" placeholder="Digite seu e-mail" />
                <button>EU QUERO!</button>
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
        </div>
    );
};

export default Home;
