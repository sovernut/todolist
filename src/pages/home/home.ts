import { CreateeditPage } from './../createedit/createedit';
import { TodoStorageProvider } from './../../providers/todo-storage/todo-storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  formTodo: FormGroup
  todolist: any
  isAdding: Boolean = false
  @ViewChild(Content) list: Content;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _todoProvider: TodoStorageProvider,
    private _modalCtrl: ModalController
  ) {
    this.formTodo = this.formBuilder.group({
      todo: ['',Validators.required],
    });
    // this.formTodo.controls['todolistForm'].
  }

  ngOnInit(){
    this.getTodoList()
  }

  async getTodoList(){
    this.todolist = await this._todoProvider.getAllTodo()
    console.log('getTodoList from provider >',this.todolist)
  }

  onTodoChange() {
    console.log(this.formTodo.controls['todo'].value)
  }

  onAddForm() {
    this.list.scrollToTop();
    this.isAdding = true;
  }

  onCreateTodo(){
    console.log('create todo')

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
  

  onCloseForm() {
    this.isAdding = false;
  }

  async updateList(ev){
    console.log('delete >> update ')
    await this.getTodoList()
  }

  sortByPriority(){
    this.todolist.sort((a,b) => {
      return b.priority - a.priority
    });
  }
  sortByDate(){
    this.todolist.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    });
  }

  sortByDateThenPririty(){
    this.sortByDate()
    this.todolist.sort((a,b) => {
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) || (b.priority - a.priority)
    });
  }
}
