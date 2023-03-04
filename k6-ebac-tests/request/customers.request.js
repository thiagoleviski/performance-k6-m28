import http from 'k6/http';
import Utils from '../utils/utils';

export default class Customers {
    #codigo

    postCustomer(token) {

        let response = http.post(`${Utils.getBaseUrl()}/customers`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: {
                "address": {
                    "id": "joao_das_neves"
                },
                "email": "joaoneves@gmail.com",
                "firstName": "João",
                "lastName": "das Neves",
                "phone": "+5511912344321"
            }
        })

        this.#codigo = response.id;
        check(response, { 'criação de cliente deve retornar 201': r => r && r.status === 201 })
    }


    getCustomer(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'listagem de clientes deve retornar 200': r => r && r.status === 200 })
    }

    getCustomerById(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers/${this.#codigo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'listagem de cliente específico deve retornar 200': r => r && r.status === 200 })
    }

    patchCustomerById(token) {

        let response = http.patch(`${Utils.getBaseUrl()}/customers/${this.#codigo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: {
                "address": {
                    "id": "branca_de_neve"
                },
                "email": "brancaneve@gmail.com",
                "firstName": "Branca",
                "lastName": "de Neve",
                "phone": "+5511943211234"
            }
        })

        check(response, { 'alteração de cliente deve retornar 200': r => r && r.status === 200 })
    }

    deleteCustomerById(token) {
        let response = http.del(`${Utils.getBaseUrl()}/customers/${this.#codigo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'exclusão de cliente deve retornar 200': r => r && r.status === 200 })
    }

    // Orders by Customers

    getOrdersByCustomer(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers/${this.#codigo}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'listagem de ordens por cliente deve retornar 200': r => r && r.status === 200 })
    }
}