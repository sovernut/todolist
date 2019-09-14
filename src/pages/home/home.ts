import { CreateeditPage } from './../createedit/createedit';
import { TodoStorageProvider } from './../../providers/todo-storage/todo-storage';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  formTodo: FormGroup
  todolist = []
  isAdding: Boolean = false
  longPress: Boolean[] = []
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _todoProvider: TodoStorageProvider,
    private _modalCtrl: ModalController
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

  ngOnInit(){
     this.todolist = this._todoProvider.getAllTodo()
  }

  onTodoChange() {
    console.log(this.formTodo.controls['todo'].value)
  }

  onAddForm() {
    this.isAdding = true;
    // this.formTodo.controls['todolistForm'].push(this.formTodoTemp)
  }

  onCreateTodo(){
    const myModal = this._modalCtrl.create('CreateeditPage',
    {todotext: this.formTodo.controls['todo'].value,
    mode: 'Add'},
    { cssClass: 'my-custom-modal-css'});
    myModal.present();
    myModal.onDidDismiss((res) => {
      this.formTodo.controls['todo'].setValue('')
      this.isAdding = false;
    })
  }
  

  onLostFocus() {
    this.isAdding = false;
  }

  editTodo(i) {
    console.log('long press')
    const myModal = this._modalCtrl.create('CreateeditPage',
    {todoitem: this.todolist[i],
     mode: 'Edit'},
    { cssClass: 'my-custom-modal-css'});
    myModal.present();
    myModal.onDidDismiss( () => {
      this.longPress[i] = false
    })
    this.longPress[i] = true
  }



  doneTodo(i) {
    if (!this.longPress[i]) {
      console.log('done')
      this.todolist[i].done  = true
    }
    this.longPress[i] = false;
  }
}
