import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { getTasks } from 'src/app/actions/task.action';
import { Tassk } from 'src/app/models/task.model';
import { TaskState } from 'src/app/states/task.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  @Select(TaskState.selectTaskStateDatas)tasks$!: Observable<Tassk[]>
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new getTasks())
    this.tasks$.subscribe(value => console.log(value))
  }

}
