import React, { Component } from 'react';

class CarrinhoDeCompras extends Component {
    

    render() {
        return (
            <div>
                <section>
                    <h2>Dados da compra</h2>
                    <p>Preço total: </p>
                    <button onClick={() => this.props.goToContratarJob()}>
                        Voltar para lista de jobs</button>
                    <button>Finalizar compra</button>
                </section>
                <hr />
                <section>
                    <h2>Carrinho</h2>
                </section>
            </div>
        );
    }
}

export default CarrinhoDeCompras;