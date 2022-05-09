import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Bem-vindo a LabeNinjas!</h1>
                <button onClick={() => this.props.goToContratarJob()}>Contratar Job</button>
                <button onClick={() => this.props.goToCadastrarJob()}>Cadastrar Job</button>
            </div>
        );
    }
}

export default HomePage;