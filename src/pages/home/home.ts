import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  formTodo: FormGroup
  todolist = [
    {todo: 'Todo#1',
    priority: '!!!',
    date: '13/09/2019',
    done: false},
    {todo: 'Todo#2',
    priority: '!!',
    date: '12/09/2019',
    done: false}
  ]
  isAdding: Boolean = false
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder
    ) {
      this.formTodo = this.formBuilder.group({
        todo:'',
        priority: '!!!',
        date: '11/09/2019'
      });
      // this.formTodo.controls['todolistForm'].
  }

  onTodoChange(){
    console.log(this.formTodo.controls['todo'].value)
  }

  onAddForm(){
    this.isAdding = true;
    // this.formTodo.controls['todolistForm'].push(this.formTodoTemp)
  }

  onLostFocus(){
    this.isAdding = false;
  }

  editTodo(){
    console.log('ling press')
  }
}
