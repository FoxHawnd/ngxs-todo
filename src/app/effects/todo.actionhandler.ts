import { Actions, ofAction, ofActionCompleted, ofActionDispatched, ofActionSuccessful } from "@ngxs/store";
import { tap } from "rxjs";
import { getTodos } from "../actions/todo.action";

export class TodoHandler{
    constructor(private actions$: Actions){
        this.actions$
        .pipe(ofAction(getTodos),
        tap(value => console.log("value"))).subscribe()
    }


}