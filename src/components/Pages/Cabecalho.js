import React, { Component } from 'react';

class Cabecalho extends Component {
    render() {
        return (
            <header>
                <h1>LabeNinjas</h1>
                <nav>
                    <button onClick={() => this.props.goToHomePage()}>Ir para HomePage</button>
                    <button onClick={() => this.props.goToCarrinhoDeCompras()}>Ir para o Carrinho de Compras</button>
                    <hr/>
                </nav>
            </header>
        );
    }
}

export default Cabecalho;