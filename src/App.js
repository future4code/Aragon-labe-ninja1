import React, { Component } from 'react';
import Cabecalho from './components/Pages/Cabecalho';
import CadastrarJob from './components/Pages/CadastrarJob';
import CarrinhoDeCompras from './components/Pages/CarrinhoDeCompras';
import ContratarJob from './components/Pages/ContratarJob';
import HomePage from './components/Pages/HomePage';

class App extends Component {
  state = {
    currentScreen: "carrinhodecompras"
  }
goToHomePage = () => {
  this.setState({currentScreen: "homepage"})
}
goToCarrinhoDeCompras = () => {
  this.setState({currentScreen: "carrinhodecompras"})
}

 goToContratarJob = () => {
   this.setState({currentScreen : "contratarjob"})
 }

  goToContratarJob = () => {
    this.setState({currentScreen : "contratarjob"})
  }

  goToCadastrarJob = () => {
    this.setState({currentScreen : "cadastrarjob"})
  }

  selectPage = () => {
    switch (this.state.currentScreen) {
      case "homepage":
        return <HomePage 
        goToContratarJob = {this.goToContratarJob}
        goToCadastrarJob = {this.goToCadastrarJob}/>
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
        <Cabecalho goToHomePage={this.goToHomePage} goToCarrinhoDeCompras={this.goToCarrinhoDeCompras}/>
        {this.selectPage()}
      </div>
    );
  }
}

export default App;