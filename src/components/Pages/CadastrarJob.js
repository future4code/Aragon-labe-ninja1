import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../Constants/Url'
import { headersInput } from '../Constants/HeadersInput'

class CadastrarJob extends React.Component {
    state = {
        titulo: "",
        descricao: "",
        preco: "",
        metodoPagamento: [],
        data: ""
    }

    // alteraMetodoPagamento = (event) => {
    //     const metodo = [event.target.value]
    //     this.setState({ metodoPagamento: metodo })
    // }

    alteraMetodoPagamento = (event) => {
        const metodo = Array.from(event.target.selectedOptions, option => option.value)
        this.setState({ metodoPagamento: metodo })
    }

    alteraEstados = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    criaJob = (event) => {
        event.preventDefault()
        console.log(this.state)
        const body = {
            title: this.state.titulo,
            description: this.state.descricao,
            price: Number(this.state.preco),
            dueDate: this.state.data,
            paymentMethods: this.state.metodoPagamento,
        };
        axios.post(`${BASE_URL}/jobs`, body, headersInput)
            .then(() => {
                alert(`O serviço ${this.state.titulo} foi criado com sucesso!`);
                this.setState({
                    titulo: "",
                    descricao: "",
                    preco: "",
                    metodoPagamento: [],
                    data: ""
                })
            })
            .catch((error) => {
                alert(`Tente novamente`)
            })
    }



    render() {
        return (
            <div>
                <h1>Cadastrar um Novo Job</h1>
                <section>
                    <label>
                        Título:
                        <input
                            id={"titulo"}
                            name={"titulo"}
                            type="text"
                            value={this.state.titulo}
                            onChange={this.alteraEstados}
                        />
                    </label>
                    <label>
                        Descrição:
                        <input
                            id={"descricao"}
                            name={"descricao"}
                            type="text"
                            value={this.state.descricao}
                            onChange={this.alteraEstados}
                        />
                    </label>
                    <label>
                        Preço:
                        <input
                            id={"preco"}
                            name={"preco"}
                            type="number"
                            value={this.state.preco}
                            onChange={this.alteraEstados}
                        />
                    </label>
                </section>
                <h2>Formas de Pagamento</h2>
                <section>
                    <select 
                    name={"metodoPagamento"}
                    onChange={this.alteraMetodoPagamento}
                    multiple
                    >
                        <option value disabled>Selecione uma opção...</option>
                        <option value={"Boleto"}>
                            Boleto
                        </option>
                        <option value={"Crédito"}>
                            Crédito
                        </option>
                        <option value={"Débito"}>
                            Débito
                        </option>
                        <option value={"Paypal"}>
                            PayPal
                        </option>
                        <option value={"Pix"}>
                            Pix
                        </option>
                    </select>
                    <br />
                    <br />
                    <label>
                        Data:
                        <input
                            id={"data"}
                            name={"data"}
                            type="date"
                            value={this.state.data}
                            onChange={this.alteraEstados}
                        />
                    </label>
                    <br />
                    <br />
                    <button onClick={this.criaJob}>Cadastrar Serviço</button>
                </section>
            </div>
        );
    }
}

export default CadastrarJob;