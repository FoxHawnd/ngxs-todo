import { Component, OnInit } from '@angular/core';
import { Actions, ofAction, Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DeleteTodo, getTodos, UpdateTodo } from 'src/app/actions/todo.action';
import { Todo } from 'src/app/models/todo.model';
import { TodoState } from 'src/app/states/todo.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  @Select(TodoState.selectTodoStateDatas)todos$: Observable<Todo[]>
  private unsubscribe: Subject<void> = new Subject();

  constructor(private store: Store) { 
  
  }

  ngOnInit(): void {
    this.store.dispatch(new getTodos());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  changeStatusToDone(todoname, tododesc, todoid){
    let todo = {
      id: todoid,
      name: todoname,
      desc: tododesc,
    }
    console.log(todo);
    this.store.dispatch(new UpdateTodo(todoid, {status: "done"}));
  }

  taskIsDone(todo){
    if(todo.status==='done'){
      return "todo-done";
    }
    return '';
  }

  deleteTodo(todoId: string){
    this.store.dispatch(new DeleteTodo(todoId));
  }

}
