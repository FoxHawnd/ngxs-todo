import { Routes } from '@angular/router';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
    {path: 'todo', component: TodoListComponent},
    {path: 'todo/addtodo', component: AddTodoComponent},
    {path: 'task', component: TaskListComponent},
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
];
