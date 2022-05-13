import React from 'react';
import styled from 'styled-components';
import fotoCliente from "../img/cliente.jpg" 
import fotoPrestador from "../img/prestador.jpg"

const CardHomePage = styled.div`
    background-color: #ef5871;
    height: 100vh;
    text-align: center;
    padding: 10px;

    margin: 3px;
    color: white;
    /* border-radius: 15px; */

    .cardAcesso {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 10vh;
    }
    .cardCliente {
        display: flex;
        flex-direction: column;
        justify-content: end;
        background-image: url(${fotoCliente});
        background-repeat: no-repeat;
        background-size: 100%;
        width: 450px;
        height: 450px;
        border-radius: 15px;
        font-size: 1.7rem;
        font-weight: bolder;
        text-shadow: black 0px 0px 10px;
        /* .botaoContratar {
            margin-bottom: 5px;
            padding: 8px;
            background-color: transparent;
            border: none;
            color: white;
            font-size: 1.3rem;
            font-weight: bold;
        } */
    }
    .cardCliente:hover {
        opacity: 90%;
        border: 2px solid white;
        cursor: pointer
    }
    .cardPrestador{
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: end;
        background-image: url(${fotoPrestador});
        background-size: 100%;
        width: 450px;
        height: 450px;
        border-radius: 15px;
        font-size: 1.7rem;
        font-weight: bolder;
        text-shadow: black 0px 0px 10px;
    }
    .cardPrestador:hover {
        opacity: 90%;
        border: 2px solid white;
        cursor: pointer
    }
`


class HomePage extends React.Component {
    render() {
        return (
            <CardHomePage>
                <h1>O que podemos fazer por você hoje?</h1>
                <section className='cardAcesso'>
                <main className='cardCliente' onClick={() => this.props.goToContratarJob()}>
                    <h3>Área do Cliente</h3>
                </main>
                <main className='cardPrestador' onClick={() => this.props.goToCadastrarJob()}>
                    <h3>Área do Prestador</h3>
                </main>
                </section>
           </CardHomePage>
        );
    }
}

export default HomePage;