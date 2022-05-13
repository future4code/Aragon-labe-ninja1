import React from 'react';
import styled from 'styled-components';
import logo from "../img/logo.png"
import logoCarrinho from "../img/carrinho.png"

const CardHeader = styled.header`
    /* como zerar a margin e o padding nativo?? */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: #EA2949 0 0 3px;
    /* border-radius: 15px; */
    background-color: white;
   

    .logo {
        width: 25%;
        margin: 5px;
    }

    .nav-batao {
        width: 200px;
        display: block;
        margin-right: 30px;
        /* flex-direction: column; */
        /* justify-self: flex-end; */
        
    }
    .logo-carrinho {
        width: 40px;
    }
    .botao {
        background-color: #EA2949;
        border-radius: 10px;
        color: white;
        border: none;
        margin: 10px;
        padding: 10px;
        width: 100%;
        height: 60px;
        font-weight: bold;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .botao:hover {
        opacity: 80%;
        box-shadow: 10px 5px 5px grey;
        cursor: pointer;
    }
    .botao:active {
        background-color: white;
        color: #FF1616;
    }
`
class Cabecalho extends React.Component {
    render() {
        return (
            <CardHeader>
                {/* <h1>LabeNinjas</h1> */}
                <img className='logo' src={logo} alt="logo labeninja"/>
                <nav className='nav-batao'>
                    <button className='botao' onClick={() => this.props.goToHomePage()}>HomePage</button>
                    <button className='botao' onClick={() => this.props.goToCarrinhoDeCompras()}>Carrinho <img className='logo-carrinho' src={logoCarrinho} alt="imagem de carrinho de compras"/></button>
                </nav>
            </CardHeader>
        );
    }
}

export default Cabecalho;