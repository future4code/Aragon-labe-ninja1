import React, { Component } from 'react';
import Cabecalho from './components/Pages/Cabecalho';
import CadastrarJob from './components/Pages/CadastrarJob';
import CarrinhoDeCompras from './components/Pages/CarrinhoDeCompras';
import ContratarJob from './components/Pages/ContratarJob';
import HomePage from './components/Pages/HomePage';

class App extends Component {
  state = {
    currentScreen: "homepage"
  }
goToHomePage = () => {
  this.setState({currentScreen: "homepage"})
}
goToCarrinhoDeCompras = () => {
  this.setState({currentScreen: "carrinhodecompras"})
}

  selectPage = () => {
    switch (this.state.currentScreen) {
      case "homepage":
        return <HomePage />
      case "carrinhodecompras":
        return <CarrinhoDeCompras />
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
        <Cabecalho goToHomePage={this.goToHomePage} goToCarrinhoDeCompras={this.goToCarrinhoDeCompras}/>
        {this.selectPage()}
      </div>
    );
  }
}

export default App;