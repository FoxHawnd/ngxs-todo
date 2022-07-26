import { Todo } from "../models/todo.model"

export class getTodos {
    static readonly type = "[Todo] Get Todos"
}

export class AddTodo {
    static readonly type= "[Todo] Add Todo"
    constructor (public title:string, public description: string){}
}

export class UpdateTodo {
    static readonly type = "[Todo] Update Todo"
    constructor(public id: string, public status: any){}
}

export class DeleteTodo {
    static readonly type = "[Todo] Delete Todo"
    constructor(public id:string){}
}