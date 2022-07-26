import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map, tap } from "rxjs";
import { AddTodo, DeleteTodo, getTodos, UpdateTodo } from "../actions/todo.action";
import { Todo } from "../models/todo.model";
import { TodoService } from "../services/todo.service";

export class TodoStateModel{
    todos: any
}

@State({
    name: "todostate",
    defaults: {
        todos: []
    }
})
@Injectable()
export class TodoState{
    constructor(private service: TodoService){}
    @Selector()
    static selectTodoStateDatas(state: TodoStateModel){
        return state.todos
    }

    @Action(getTodos)
    getTodos(todoStateContext: StateContext<TodoStateModel>){
        return this.service.getTodos().pipe(
            map(todoList => todoList.data),
            tap((todosResult: Todo[]) => {
                const state = todoStateContext.getState();
                todoStateContext.patchState({
                    ...state,
                    todos: todosResult
                })
            })
        )
    }

    @Action(UpdateTodo)
    UpdateTodo(todoState: StateContext<TodoStateModel>, {id, status} : UpdateTodo){
        return this.service.updateTodo(id, status).pipe(
            tap(todo => {
                const state = todoState.getState();
                const todoList = state.todos;
                const index = todoList.findIndex(todo =>todo._id === id);
                todoList[index] = {
                    ...todoList[index],
                    status: status.status  
                }
                todoState.setState({
                    ...state,
                    todos : todoList
                })
            })
        )
    }

    @Action(DeleteTodo)
    DeleteTodo(todoState: StateContext<TodoStateModel>, {id}: DeleteTodo){
        return this.service.deleteTodo(id).pipe(
            tap(todos => {
                const state = todoState.getState();
                let todoList = state.todos.filter(todo => todo._id !== id);
                todoState.setState({
                    ...state,
                    todos : todoList
                })
            })
        )
    }

    @Action(AddTodo)
    AddTodo(todoState: StateContext<TodoStateModel>, {title, description}: AddTodo){
        return this.service.addTodo(title, description).pipe(
            tap(todo => {
                const state = todoState.getState();
                todoState.setState({
                    ...state,
                    todos : [...state.todos, todo]
                })
            })
        )
    }
}