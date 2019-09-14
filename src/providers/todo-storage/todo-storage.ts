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
      let temp = new Todo(`Todo#${i}`,'!!!','13/09/2019',false)
      templist.push(temp)
    }
    return templist
  }

  addTodo(item :Todo){
    this.todolist.push(item)
  }

  removeTodo(index){
    this.todolist = this.todolist.filter( (v,i) => {
      return i != index
    })
  }
  
  getAllTodo(){
    return this.todolist.slice()
  }


}
