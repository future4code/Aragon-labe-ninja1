import axios from 'axios';
import React from 'react';
import { headersInput } from '../Constants/HeadersInput';
import { BASE_URL } from '../Constants/Url';

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
                <div key={job.id}>
                    <span>   {job.title} - </span>
                    <span>  R$ {job.price.toFixed(2)} - </span>
                    <button onClick={() => this.removeJobCarrinho(job.id)}>Remover do carrinho</button>
                    <hr />
                </div>
            )
        })
        return (
            <div>
                <section>
                    <h2>Dados da compra</h2>

                    <p>Preço total: R$ {this.state.precoTotal.toFixed(2)}</p>
                    <button onClick={() => this.props.goToContratarJob()}>
                        Voltar para lista de jobs</button>
                    <button onClick={() => this.finalizaCompra()}>Finalizar compra</button>
                </section>
                <hr />
                <section>
                    <h2>Carrinho</h2>
                    {jobsNoCarrinho}
                </section>
            </div>
        );
    }
}

export default CarrinhoDeCompras;