import { Injectable } from '@angular/core';
import { Todo } from '../../model/todo'
import { Storage } from '@ionic/storage';
import { resolveDefinition } from '@angular/core/src/view/util';


@Injectable()
export class TodoStorageProvider {

  todolist = []
  constructor(private _storage: Storage) {
    console.log('Hello TodoStorageProvider Provider');
    // this.todolist = this.genDummy()
    // this._storage.set('todolist',this.todolist)
    // this._storage.get('todolist').then( item => {
    //   this.todolist = item
    //   console.log(this.todolist)
    // })
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
    this.updateStorage()

  }

  removeTodo(id){
    this.todolist = this.todolist.filter( (v,i) => {
      return v.todoid != id
    })
    this.updateStorage()
  }

  editTodo(id,item) {
    let todoToEdit = this.todolist.find( (v,i) => {
      return v.todoid == id
    })
    todoToEdit = item
    this.updateStorage()
  }

  
  async getAllTodo(){
    return new Promise((res,rej) => {
      this._storage.get('todolist').then( item => {
        console.log('getItem in storage >',item)
        this.todolist = item
        res(this.todolist)
      }).catch( (err) => {
        console.error('Error getAllTodo > ',err)
      })
    })
  }

  
  updateStorage(){
    new Promise((res,rej) => {
      this._storage.set('todolist',this.todolist).then( item => {

        console.log('Updated successfully',item)
        res('Updated storage successfully.')
      }).catch( (err) => {
        console.error('Error updateStorage > ',err)
      })
    }) 
  }


}
