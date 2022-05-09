import React, { Component } from 'react';
import CadastrarJob from './components/Pages/CadastrarJob';
import CarrinhoDeCompras from './components/Pages/CarrinhoDeCompras';
import ContratarJob from './components/Pages/ContratarJob';
import HomePage from './components/Pages/HomePage';

class App extends Component {
  state = {
    currentScreen: "carrinhodecompras"
  }

 goToContratarJob = () => {
   this.setState({currentScreen : "contratarjob"})
 }

  selectPage = () => {
    switch (this.state.currentScreen) {
      case "homepage":
        return <HomePage />
      case "carrinhodecompras":
        return <CarrinhoDeCompras goToContratarJob={this.goToContratarJob}/>
      case "contratarjob":
        return <ContratarJob />
      case "cadastrarjob":
        return <CadastrarJob />
      default:
        <HomePage />
    }
  }

  render() {
    return (
      <div>
        {this.selectPage()}
      </div>
    );
  }
}

export default App;