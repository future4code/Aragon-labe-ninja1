import axios from 'axios';
import React from 'react';
import { headersInput } from '../Constants/HeadersInput';
import { BASE_URL } from '../Constants/Url';
import converteData from '../Utils/converteData'
import styled from 'styled-components';


const CardDetalhes = styled.div`
        .card-detalhe {
        margin: 10px;
        border: 1px solid black;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* background-color: #EF5871; */
        background-color: white;
        box-shadow: #EA2949 0 0 3px;
        border: none;
        border-radius: 15px;
        color: black;
        /* font-weight: bold; */
    }

    .lista {
        list-style: none;
    }

    .botao-voltar {
        margin-top: 30px;
        background-color: lightpink;
        color: black;
        border: none;
        border-radius: 15px;
        width: 20%;
        height: 25px;
        font-size: 1rem;
    }

    .botao-voltar:hover {
        cursor: pointer;
        color: white;
        background-color: #EA2949;
        font-weight: bold;
        border: 1px solid white;
    }
`

class DetalheJob extends React.Component {

    state = {
        job: {}
    }

    componentDidMount() {
        this.buscaDadosJob()
    }

    buscaDadosJob = () => {
        axios.get(`${BASE_URL}/jobs/${this.props.detalhesJobId}`, headersInput)
            .then((response) => {
                this.setState({ job: response.data })
                console.log(this.state.job.paymentMethods)
                console.log(response)
            })
            .catch((error) => {
                alert(error.response)
            })
    }

    render() {



        return (
            <CardDetalhes>
                {/* {this.state.job.length === 0 && <p>Carregando...</p>} dúvida */}
                <div className='card-detalhe' key={this.state.job.id}>
                    <h3>{this.state.job.title}</h3>
                    <p>Preço: R$ {this.state.job.price},00</p>
                    {this.state.job.dueDate && <p>Prazo: {converteData(this.state.job.dueDate)}</p>}
                    <p>Descrição: {this.state.job.description}</p>
                    
                    <ul className='lista'>
                    <h4>Formas de Pagamento</h4>
                        {this.state.job.paymentMethods && this.state.job.paymentMethods.map((metodo) => {
                            return (
                                <li key={metodo}>
                                    {metodo}
                                </li>
                            )
                        })}
                    </ul>
                    <button className='botao-voltar' onClick={() => this.props.goToContratarJob()}>
                        Voltar para lista de jobs
                    </button>
                </div>
            </CardDetalhes>
        )

    }
}

export default DetalheJob;