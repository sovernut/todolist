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
    // this.formTodo.controls['todolistForm'].
  }

  ngOnInit(){
    this.getTodoList()
  }

  getTodoList(){
    this.todolist = this._todoProvider.getAllTodo()
  }

  onTodoChange() {
    console.log(this.formTodo.controls['todo'].value)
  }

  onAddForm() {
    this.isAdding = true;
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

  updateList(ev){
    this.getTodoList()
  }
}
