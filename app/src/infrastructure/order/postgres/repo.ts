import {OrderRepository} from "../../../application/order/interfaces";
import {Order} from "../../../domain/order/entity/order";
import {UUID} from "crypto";
import {Pool} from "postgresql-client";


export class OrderRepo implements OrderRepository{
    private pool: Pool
    constructor(pool: Pool) {
        this.pool = pool
    }
    saveOrder(order: Order) {
        this.pool.query(`
        
        `)
    }

    deleteOrder(id: UUID) {

    }

    updateOrderStatus(order: Order) {

    }

    findOrder(id: UUID): Order {

    }
}
