import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tassk } from '../models/task.model';
import { Todo } from '../models/todo.model';
import { TodoList } from '../models/todo_list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addTodo(title:string, description: string): Observable<Todo>{
    return this.http.post<Todo>(this.baseUrl, {title, description});
  }

  getTodos(): Observable<TodoList>{
      return this.http.get<TodoList>(this.baseUrl);
  }

  deleteTodo(id: string): Observable<Todo> {
      return this.http.delete<Todo>(`${this.baseUrl}/${id}`);
  }

  updateTodo(id: string, changes:any): Observable<Todo> {
      return this.http.put<Todo>(`${this.baseUrl}/${id}`, changes);
  }

  getTasks(): Observable<Tassk[]> {
    return this.http.get<Tassk[]>("http://localhost:3003/tasks")
  }
}
