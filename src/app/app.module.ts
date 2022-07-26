import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from './states/todo.state';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsStoragePluginModule, StorageEngine, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskState } from './states/task.state';

export class MyStorageEngine implements StorageEngine {
  get length(): number {
    return this.length
  }

  getItem(key: string): any {
  }

  setItem(key: string, val: any): void {
    if(key==="todostate"){
      let state = JSON.parse(val)
      state.todos.forEach(todo => {
        delete todo._id; 
        delete todo.status
    });
    localStorage.setItem(key, JSON.stringify(state));
    }
    else{
      localStorage.setItem(key,val)
    }
  }

  removeItem(key: string): void {
  }

  clear(): void {
  }

  key(val: number): string {
    return this.key(val)
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([TodoState,TaskState]), 
    NgxsStoragePluginModule.forRoot({
      key: [TodoState, TaskState]
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    NgxsLoggerPluginModule.forRoot(), 
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
