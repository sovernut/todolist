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
    {
      todo: 'Todo#1',
      priority: '!!!',
      date: '13/09/2019',
      done: false
    },
    {
      todo: 'Todo#2',
      priority: '!!',
      date: '12/09/2019',
      done: false
    }
  ]
  isAdding: Boolean = false
  longPress: Boolean[] = []

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.formTodo = this.formBuilder.group({
      todo: '',
      priority: '!!!',
      date: '11/09/2019'
    });
    let itemlen = 3
    for (let i = 0; i < itemlen; i++) {
      this.longPress.push(false)
    }
    // this.formTodo.controls['todolistForm'].
  }

  onTodoChange() {
    console.log(this.formTodo.controls['todo'].value)
  }

  onAddForm() {
    this.isAdding = true;
    // this.formTodo.controls['todolistForm'].push(this.formTodoTemp)
  }

  onLostFocus() {
    this.isAdding = false;
  }

  editTodo(i) {
    console.log('long press')
    this.longPress[i] = true
  }



  doneTodo(i) {
    if (!this.longPress[i]) {
      console.log('done')
    }
    this.longPress[i] = false;
  }
}
