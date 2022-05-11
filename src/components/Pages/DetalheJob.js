import axios from 'axios';
import React from 'react';
import { headersInput } from '../Constants/HeadersInput';
import { BASE_URL } from '../Constants/Url';

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
            <div key={this.state.job.id}>
                <h3>{this.state.job.title}</h3>
                <p>Preço: R$ {this.state.job.price},00</p>
                <p>Descrição: {this.state.job.description}</p>
                <h4>Formas de Pagamento</h4>
                <ul>
                    <li>
                        {this.state.job.paymentMethods}
                    </li>
                </ul>
                <button onClick={() => this.props.goToContratarJob()}>   
                    Voltar para lista de jobs               
                </button>
            </div>
        )

    }
}

export default DetalheJob;