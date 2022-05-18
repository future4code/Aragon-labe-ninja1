import React from 'react'
import axios from 'axios'
import { headersInput } from '../Constants/HeadersInput'
import { BASE_URL } from '../Constants/Url'
import converteData from '../Utils/converteData'
import styled from 'styled-components'

const CardJobs = styled.section`

    .busca {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 15px;
    }
    .filtro {
        display: grid;
        grid-template-columns: 0.5fr 0.5fr 2fr 2fr;
        column-gap: 10px;
    }
    .filtro-valor {
        border-radius: 15px;
        padding: 3px;
        padding-left: 10px;
        border: 1px solid grey;
        height: 20px;
    }
    .pesquisar {
        border-radius: 15px;
        padding: 3px;
        padding-left: 10px;
        border: 1px solid grey;
        height: 20px;
    }
    .ordenar {
        border-radius: 15px;
        padding-left: 5px;
        border: 1px solid grey;
        height: 20px;
    }

    @keyframes spinner {
     to {transform: rotate(360deg);}
    }
 
    .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #EA2949;
    animation: spinner .6s linear infinite;
    }

    .container-card-job {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        margin: 10px;
        height: 60vh;
    }

    .card-job {
        border: 1px solid black;
        padding: 10px;
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

    .botoes-card-job {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .botao-job {
        background-color: lightpink;
        color: black;
        border: none;
        border-radius: 15px;
        width: 30%;
        font-size: 1rem;
    }
    
    .botao-job:hover {
        cursor: pointer;
        color: white;
        background-color: #EA2949;
        font-weight: bold;
        border: 1px solid white;
    }
    

`

class ContratarJob extends React.Component {

    state = {
        jobs: [],
        valorMin: "",
        valorMax: "",
        pesquisar: "",
        ordenar: ""
    }

    componentDidMount() {
        this.listaJobs()
    }

    alteraValoresInput = (event) => {
        if (event.target.name === "valorMin" || event.target.name === "valorMax") {
            this.setState({ [event.target.name]: event.target.value ? Number(event.target.value) : "" })
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
        //por que o [event.target.name] tem que estar entre colchetes?
    }

    listaJobs = () => {
        axios.get(`${BASE_URL}/jobs`, headersInput)
            .then((response) => {
                this.setState({ jobs: response.data.jobs })
            })
            .catch((error) => {
                console.log(this.state.jobs)
                alert(error.response)
            })
    }

    deletaJob = (id) => {
        if (window.confirm("Tem certeza que deseja remover este job?")) {
            axios.delete(`${BASE_URL}/jobs/${id}`, headersInput)
                .then(() => {
                    alert(`Job excluído com sucesso!`)
                    this.listaJobs()
                })
                .catch((error) => {
                    alert(error.response)
                })
        }
    }

    adicionarAoCarrinho = (foiAdicionado, id) => {

        const body = {
            taken: foiAdicionado
        }

        axios.post(`${BASE_URL}/jobs/${id}`, body, headersInput)
            .then(() => {
                foiAdicionado ?
                    alert("Job adicionado ao carrinho!")
                    : alert("Job excluído do carrinho!")
                this.listaJobs()
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
    }

    render() {

        const allJobs = this.state.jobs
            .filter((job) => {
                if (this.state.valorMin) {
                    return job.price >= this.state.valorMin
                } else {
                    return true // dúvida: por que return true?
                }
            })

            .filter((job) => {
                if (this.state.valorMax) {
                    return job.price <= this.state.valorMax
                } else {
                    return true // dúvida: por que return true?
                }
            })

            .filter((job) => {
                const jobTitulo = job.title.toLowerCase()
                const jobDescricao = job.description.toLowerCase()
                const textoPesquisa = this.state.pesquisar.toLowerCase()
                return jobTitulo.includes(textoPesquisa) || jobDescricao.includes(textoPesquisa)
            })

            .sort((a, b) => {
                switch (this.state.ordenar) {
                    case "menorvalor":
                        return a.price - b.price
                    case "maiorvalor":
                        return b.price - a.price
                    case "titulo":
                        return a.title.localeCompare(b.title) // lacaleCompare para textos
                    case "prazo":
                        return a.dueDate.localeCompare(b.dueDate) // localeCompare para datas
                    default:
                        return 0
                }

            })

            .map((job) => {
                return (
                    <div className='card-job' key={job.id}>
                        <h3>{job.title}</h3>
                        <p>Preço: R$ {job.price.toFixed(2)}</p>
                        <p>Prazo: {converteData(job.dueDate)}</p>
                        <nav className='botoes-card-job'>
                        <button
                            className='botao-job'
                            onClick={() => this.props.goToDetalheJob(job.id)}
                        >
                            Ver detalhes</button>
                        <button
                            className='botao-job'
                            onClick={() => this.deletaJob(job.id)}
                        >
                            Remover Job</button>


                        {job.taken ?
                            <button className='botao-job' onClick={() => this.adicionarAoCarrinho(false, job.id)}>Remover do carrinho</button>
                            : <button className='botao-job' onClick={() => this.adicionarAoCarrinho(true, job.id)}>Adicionar ao carrinho</button>}
                        </nav>
                    </div>
                )
            })

        return (
            <CardJobs>

                <section className='busca'>
                    <nav>
                        <h2>Busca por Jobs</h2>
                    </nav>
                    <nav className='filtro'>
                        <input
                            className='filtro-valor'
                            id={"valorMin"}
                            name={"valorMin"}
                            type="number"
                            value={this.state.valorMin}
                            onChange={this.alteraValoresInput}
                            placeholder="Valor mínimo"
                        />


                        <input
                            className='filtro-valor'
                            id={"valorMax"}
                            name={"valorMax"}
                            type="number"
                            value={this.state.valorMax}
                            onChange={this.alteraValoresInput}
                            placeholder="Valor máximo"
                        />



                        <input
                            className='pesquisar'
                            id={"pesquisar"}
                            name={"pesquisar"}
                            type="text"
                            value={this.state.pesquisar}
                            onChange={this.alteraValoresInput}
                            placeholder="Pesquisar"
                        />

                        <select
                            className='ordenar'
                            name={"ordenar"}
                            onChange={this.alteraValoresInput}
                        >
                            <option value disabled>
                                Selecione uma opção...
                            </option>
                            <option value="">
                                Sem ordenação
                            </option>
                            <option value="menorvalor">
                                Menor valor
                            </option>
                            <option value="maiorvalor">
                                Maior valor
                            </option>

                            <option value="titulo">
                                Título
                            </option>

                            <option value="prazo">
                                Prazo
                            </option>
                        </select>
                    </nav>
                </section>

                <section>
                    {this.state.jobs.length === 0 && <p className='spinner'></p>}
                    <nav className='container-card-job'>
                        {allJobs}
                    </nav>
                </section>
            </CardJobs>
        );
    }
}

export default ContratarJob;