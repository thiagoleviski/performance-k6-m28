import http from 'k6/http';
import Utils from '../utils/utils';

export default class Orders {
    #identificador

    postOrder(token) {
        
        let response = http.post(`${Utils.getBaseUrl()}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: {
                "customer": {
                    "id": "joao_das_neves"
                },
                "discount": 0,
                "product": {
                    "id": "Great sword of all dragons"
                },
                "quantity": 1,
                "totalPrice": 10000
            }
        })

        this.#identificador = response.customer.id;
        check(response, { 'criação de produtos deve retornar 201': r => r && r.status === 201 })
    }


    getOrder(token) {
        let response = http.get(`${Utils.getBaseUrl()}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'listagem de produtos deve retornar 200': r => r && r.status === 200 })
    }

    getOrderById(token) {
        let response = http.get(`${Utils.getBaseUrl()}/orders/${this.#identificador}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'listagem de produto específico deve retornar 200': r => r && r.status === 200 })
    }

    patchOrderById(token) {
        
        let response = http.patch(`${Utils.getBaseUrl()}/orders/${this.#identificador}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            },
            body: {
                "customer": {
                    "id": "branca_de_neve"
                },
                "discount": 0,
                "product": {
                    "id": "Dwarf's magic book"
                },
                "quantity": 3,
                "totalPrice": 5000
            }
        })

        check(response, { 'alteração de produtos deve retornar 200': r => r && r.status === 200 })
    }

    deleteOrderById(token) {
        let response = http.del(`${Utils.getBaseUrl()}/orders/${this.#identificador}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        check(response, { 'exclusão de produto deve retornar 200': r => r && r.status === 200 })
    }
}