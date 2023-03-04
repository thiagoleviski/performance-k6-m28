import { group } from 'k6';
import Login from '../request/login.request.js';
import data from '../data/usuarios.json';
import User from '../request/user.request.js';
import Orders from '../request/orders.request.js';
import Customers from '../request/customers.request.js';


export const options = {
  stages: [
    {duration: '10s', target: 10},
    {duration: '5s', target: 50},
    {duration: '10s', target: 10},
    {duration: '5s', target: 0},
  ],
  thresholds:{
    http_req_duration:['p(99) < 1000']
  }
}

export default function () {
  
  let login = new Login()
  let user = new User()
  let orders = new Orders()
  let customers = new Customers()

  group('login and get token', ()=>{
    login.access(data.usuarioOk.user,data.usuarioOk.pass)
  })

  group('list user', ()=>{
    user.list(login.getToken())
  })
  
  group('orders flow', ()=>{
    orders.postOrder(login.getToken());
    orders.getOrder(login.getToken());
    orders.getOrderById(login.getToken());
    orders.patchOrderById(login.getToken());
    orders.deleteOrderById(login.getToken())
  })

  group('customers flow', ()=>{
    customers.postCustomer(login.getToken());
    customers.getCustomer(login.getToken());
    customers.getCustomerById(login.getToken());
    customers.patchCustomerById(login.getToken());
    customers.deleteCustomerById(login.getToken())
  })
}
