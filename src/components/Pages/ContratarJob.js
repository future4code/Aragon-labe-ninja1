import React from 'react'
import axios from 'axios'
import { headersInput } from '../Constants/HeadersInput'
import { BASE_URL } from '../Constants/Url'
import converteData from '../Utils/converteData'
import { eventWrapper } from '@testing-library/user-event/dist/utils'

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

            .sort((a,b) => {
                switch(this.state.ordenar) {
                    case "menorvalor" :
                        return a.price - b.price
                    case "maiorvalor" :
                        return b.price - a.price
                    case "titulo" :
                        return a.title.localeCompare(b.title) // lacaleCompare para textos
                    case "prazo" :
                        return a.dueDate.localeCompare(b.dueDate) // localeCompare para datas
                    default :
                        return 0                
                }
                
            })

            .map((job) => {
                return (
                    <div key={job.id}>
                        <h3>{job.title}</h3>
                        <p>Preço: R$ {job.price.toFixed(2)}</p>
                        <p>Prazo: {converteData(job.dueDate)}</p>

                        <button onClick={() => this.props.goToDetalheJob(job.id)}
                        >
                            Ver detalhes</button>
                        <button
                            onClick={() => this.deletaJob(job.id)}
                        >
                            Remover Job</button>


                        {job.taken ?
                            <button onClick={() => this.adicionarAoCarrinho(false, job.id)}>Remover do carrinho</button>
                            : <button onClick={() => this.adicionarAoCarrinho(true, job.id)}>Adicionar ao carrinho</button>}
                        <hr />
                    </div>
                )
            })

        return (
            <div>
                <section>
                    <h2>Busca por Jobs</h2>

                    <label>
                        Valor mínimo:
                        <input
                            id={"valorMin"}
                            name={"valorMin"}
                            type="number"
                            value={this.state.valorMin}
                            onChange={this.alteraValoresInput}
                        />

                    </label>
                    <br />
                    <br />
                    <label>
                        Valor máximo:
                        <input
                            id={"valorMax"}
                            name={"valorMax"}
                            type="number"
                            value={this.state.valorMax}
                            onChange={this.alteraValoresInput}
                        />

                    </label>
                    <br />
                    <br />
                    <label>
                        Nome ou título:
                        <input
                            id={"pesquisar"}
                            name={"pesquisar"}
                            type="text"
                            value={this.state.pesquisar}
                            onChange={this.alteraValoresInput}
                        />
                    </label>
                    <br />
                    <br />
                    <select
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
                </section>
                <br />
                <hr />
                <section>
                    { this.state.jobs.length === 0 && <p>Carregando...</p> } 
                    {allJobs}
                </section>
            </div>
        );
    }
}

export default ContratarJob;