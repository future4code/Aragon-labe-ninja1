import React from 'react';


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h2>Bem-vindo a LabeNinjas!</h2>
                <button onClick={() => this.props.goToCadastrarJob()}>Cadastrar Job</button>
                <button onClick={() => this.props.goToContratarJob()}>Contratar Job</button>
            </div>
        );
    }
}

export default HomePage;