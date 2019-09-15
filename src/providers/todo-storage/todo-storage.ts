import { Injectable } from '@angular/core';
import { Todo } from '../../model/todo'
/*
  Generated class for the TodoStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoStorageProvider {

  todolist: Todo[] = []
  constructor() {
    console.log('Hello TodoStorageProvider Provider');
    this.todolist = this.genDummy()
  }

  genDummy(){
    let n = 5
    let templist = []
    for (let i=0;i<n;i++){
      let temp = new Todo('uid'+i,`Todo#${i}`,'3','2019-09-09',false)
      templist.push(temp)
    }
    return templist
  }

  addTodo(item :Todo){
    item.done = false; // Default
    this.todolist.push(item)
  }

  removeTodo(id){
    this.todolist = this.todolist.filter( (v,i) => {
      return v.todoid != id
    })
  }

  editTodo(id,item) {
    let todoToEdit = this.todolist.find( (v,i) => {
      return v.todoid == id
    })
    todoToEdit = item
  }

  
  getAllTodo(){
    return this.todolist.slice()
  }


}
