import React from 'react'
import axios from 'axios'
import { headersInput } from '../Constants/HeadersInput'
import { BASE_URL } from '../Constants/Url'
import converteData from '../Utils/converteData'

class ContratarJob extends React.Component {

    state = {
        jobs: []
    }

    componentDidMount() {
        this.listaJobs()
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

        const allJobs = this.state.jobs.map((job) => {
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
                        <button onClick={()=>this.adicionarAoCarrinho(false,job.id)}>Remover do carrinho</button>
                        :<button onClick={()=>this.adicionarAoCarrinho(true,job.id)}>Adicionar ao carrinho</button>}
                    <hr />
                </div>
            )
        })

        return (
            <div>
                <h2>Busca por jobs</h2>
                <hr />

                {allJobs}
            </div>
        );
    }
}

export default ContratarJob;