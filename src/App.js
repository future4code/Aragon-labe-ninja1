import React from 'react';
import Cabecalho from './components/Pages/Cabecalho';
import CadastrarJob from './components/Pages/CadastrarJob';
import CarrinhoDeCompras from './components/Pages/CarrinhoDeCompras';
import ContratarJob from './components/Pages/ContratarJob';
import HomePage from './components/Pages/HomePage';
import DetalheJob from './components/Pages/DetalheJob';
import styled from 'styled-components';

const CardApp = styled.div`

  * {
      font-family: Arial;
   }
`

class App extends React.Component {
  state = {
    currentScreen: "homepage",
    detalhesJobId: ""
  }

  goToHomePage = () => {
    this.setState({ currentScreen: "homepage" })
  }

  goToCarrinhoDeCompras = () => {
    this.setState({ currentScreen: "carrinhodecompras" })
  }

  goToContratarJob = () => {
    this.setState({ currentScreen: "contratarjob" })
  }

  goToCadastrarJob = () => {
    this.setState({ currentScreen: "cadastrarjob" })
  }

  goToDetalheJob = (jobId) => {
    // console.log(jobId)
    this.setState({ currentScreen: "detalhejob", detalhesJobId: jobId })

  }

  selectPage = () => {
    switch (this.state.currentScreen) {
      case "homepage":
        return <HomePage
          goToContratarJob={this.goToContratarJob}
          goToCadastrarJob={this.goToCadastrarJob} />
      case "carrinhodecompras":
        return <CarrinhoDeCompras goToContratarJob={this.goToContratarJob} />
      case "contratarjob":
        return <ContratarJob
          goToDetalheJob={this.goToDetalheJob}
        />
      case "detalhejob":
        return <DetalheJob 
        goToContratarJob={this.goToContratarJob}
        detalhesJobId={this.state.detalhesJobId} 
        />
      case "cadastrarjob":
        return <CadastrarJob />
      default:
        <HomePage />
    }
  }

  render() {
    return (
      <CardApp>
        <Cabecalho goToHomePage={this.goToHomePage} goToCarrinhoDeCompras={this.goToCarrinhoDeCompras} />
        {this.selectPage()}
      </CardApp>
    );
  }
}

export default App;