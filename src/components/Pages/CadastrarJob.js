import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../Constants/Url'
import { headersInput } from '../Constants/HeadersInput'
import styled from 'styled-components'

const Cadastro = styled.div`
    color: white;
    margin: auto;
    margin-top: 10px;
    text-align: center;
    /* margin: 10px 420px;
    padding: 10px 350px; */
    background-color: #EF5871 ;
    border-radius: 15px;
    width: 40vw;

    .label-input {
        display: flex;
        padding: 2px 10px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .input-job {
        margin: 5px;
        width: 20rem;
        height: 25px;
        padding: 5px;
        border-radius: 15px;
        border: none;
    }
    .select-pagamento{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2px 10px;
    }

    .metodos-pagamento {
        margin: 10px;
        width: 15rem;
        padding: 3px;
        border: none;
    }

    [type="date"] {
  background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
    .input-data {
        border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
  width: 190px;
    }

    .botao-cadastrar{
        margin-top: 30px;
        margin-bottom: 5px;
        background-color: white;
        color: black;
        border: none;
        border-radius: 15px;
        width: 11rem;
        height: 30px;
        font-size: 1rem;
    }
    .botao-cadastrar:hover{
        cursor: pointer;
        background-color: #ff93a3;
        font-weight: bold;
        border: 1px solid white;
    }

`

class CadastrarJob extends React.Component {
    state = {
        titulo: "",
        descricao: "",
        preco: "",
        metodoPagamento: [],
        data: ""
    }


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
            <Cadastro>
                <div>
                <h1>Cadastrar um Novo Job</h1>
                </div>
                {/* <section className='inputs-job'> */}
                    <div className='label-input'>
                    <label>Título</label>
                    <input
                            placeholder='Ex: Jardineiro'
                            className='input-job'
                            id={"titulo"}
                            name={"titulo"}
                            type="text"
                            value={this.state.titulo}
                            onChange={this.alteraEstados}
                        />
                    </div>
                    <div className='label-input'>
                    <label>Descrição</label>
                    <input
                            placeholder='Ex: Jardinagem em geral'
                            className='input-job'
                            id={"descricao"}
                            name={"descricao"}
                            type="text"
                            value={this.state.descricao}
                            onChange={this.alteraEstados}
                        />
                    </div>
                    <div className='label-input'>
                    <label>Preço</label>
                    <input
                            placeholder='Ex: 100'
                            className='input-job'
                            id={"preco"}
                            name={"preco"}
                            type="number"
                            value={this.state.preco}
                            onChange={this.alteraEstados}
                        />
                    </div>
                {/* </section> */}
                
                {/* <section> */}
                <div className='select-pagamento'>
                <p>Formas de Pagamento</p>
                    <select
                    className='metodos-pagamento'
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
                    </div>
                    <div className='label-input'>
                    <label>Disponível até:</label>
                    <input
                            className='input-data'
                            id={"data"}
                            name={"data"}
                            type="date"
                            value={this.state.data}
                            onChange={this.alteraEstados}
                        />
                    </div>

                    <button className='botao-cadastrar' onClick={this.criaJob}>Finalizar Cadastro</button>
                {/* </section> */}
            </Cadastro>
        );
    }
}

export default CadastrarJob;