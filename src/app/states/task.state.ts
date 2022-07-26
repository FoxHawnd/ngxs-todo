import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { map, tap } from "rxjs";
import { getTasks } from "../actions/task.action";
import { Tassk } from "../models/task.model";
import { TodoService } from "../services/todo.service";

export class TaskStateModel{
    tasks: any
}

@State({
    name: "taskstate",
    defaults: {
        tasks: []
    }
})
@Injectable()
export class TaskState{
    constructor(private service: TodoService){}
    @Selector()
    static selectTaskStateDatas(state: TaskStateModel){
        return state.tasks
    }

    @Action(getTasks)
    getTodos(taskStateContext: StateContext<TaskStateModel>){
        return this.service.getTasks().pipe(
            tap((tasksResult: Tassk[]) => {
                const state = taskStateContext.getState();
                console.log(tasksResult)
                taskStateContext.patchState({
                    ...state,
                    tasks: tasksResult
                })
            })
        )
    }
}