import axios from 'axios';
import React from 'react';
import { headersInput } from '../Constants/HeadersInput';
import { BASE_URL } from '../Constants/Url';
import styled from 'styled-components';

const Carrinho = styled.div`
    .produto-carrinho {
        margin: 10px;
        border: 1px solid black;
        padding: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* background-color: #EF5871; */
        background-color: white;
        box-shadow: #EA2949 0 0 3px;
        border: none;
        border-radius: 15px;
        color: black;
        /* font-weight: bold; */
    }

    .titulo-carrinho {
        text-align: center;
        margin: 10px;
    }

    .titulo {
        margin-right: 30px;
    }

    .resumo-compra {
        margin: 10px;
        border: 1px solid black;
        padding: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        /* background-color: #EF5871; */
        background-color: white;
        box-shadow: #EA2949 0 0 3px;
        border: none;
        border-radius: 15px;
        color: black;
        /* font-weight: bold; */
    }

    .botao-carrinho {
        background-color: lightpink;
        color: black;
        border: none;
        border-radius: 15px;
        width: 20%;
        height: 25px;
        font-size: 1rem;
    }

    .botao-carrinho:hover {
        cursor: pointer;
        color: white;
        background-color: #EA2949;
        font-weight: bold;
        border: 1px solid white;
    }

`

class CarrinhoDeCompras extends React.Component {
    state = {
        carrinho: [],
        precoTotal: 0
    }

    componentDidMount() {
        this.listaJobsCarrinho()
    }


    listaJobsCarrinho = () => {
        axios.get(`${BASE_URL}/jobs`, headersInput)
            .then((response) => {
                let somaValores = 0
                const jobsAdicionados = response.data.jobs.filter((job) => {
                    return job.taken === true
                })
                console.log(response.data.jobs)
                for (let job of jobsAdicionados) {
                    somaValores += job.price
                }
                this.setState({ carrinho: jobsAdicionados, precoTotal: somaValores })
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    removeJobCarrinho = (id) => {
        const body = {
            taken: false
        }
        axios.post(`${BASE_URL}/jobs/${id}`, body, headersInput)
            .then(() => {
                alert("Job removido do carrinho")
                this.listaJobsCarrinho()
            })
            .catch((error) => {
                console.log(error)
                alert("tente novamente")
            })
    }

    finalizaCompra = () => {
        const body = {
            taken: false
        }
        for (let job of this.state.carrinho) {
            axios
                .post(`${BASE_URL}/jobs/${job.id}`, body, headersInput)
                .then()
                .catch((error) => {
                    alert(error.response)
                })
        }
        alert("pedido finalizado com sucesso")
        this.listaJobsCarrinho()
    }

    render() {
        const jobsNoCarrinho = this.state.carrinho.map((job) => {
            return (
                <div className='produto-carrinho' key={job.id}>
                    <div>
                    <span className='titulo'>{job.title}</span>
                    <span>R$ {job.price.toFixed(2)}</span>
                    </div>
                    <button className='botao-carrinho' onClick={() => this.removeJobCarrinho(job.id)}>Remover do carrinho</button>
                </div>
            )
        })
        return (
            <Carrinho>
                <h2 className='titulo-carrinho'>Carrinho</h2>
                <section>
                    {jobsNoCarrinho}
                </section>
                <section className='resumo-compra'>
                    <h3>Resumo da compra</h3>
                    <p>Total: R$ {this.state.precoTotal.toFixed(2)}</p>
                    <button className='botao-carrinho' onClick={() => this.props.goToContratarJob()}>
                        Continuar comprando
                    </button>
                    <button className='botao-carrinho' onClick={() => this.finalizaCompra()}>Finalizar compra</button>
                </section>
            </Carrinho>
        );
    }
}

export default CarrinhoDeCompras;