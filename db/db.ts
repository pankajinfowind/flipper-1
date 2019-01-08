var config = require('./knex');
var knex = require('knex')(config);

import { from, Observable } from 'rxjs';
import { Customer } from '../src/app/customers/customer';
import { Orders } from '../src/app/orders/orders';
export class DB {
    static select(table: string): Observable<any> {
        let promise = knex.raw('select * from ' + table);
        return from(promise);
    }
    static insert(table: string, insertable: Customer | Orders): Observable<any> {
        let promise = knex(table).insert(insertable);
        return from(promise);
    }
}