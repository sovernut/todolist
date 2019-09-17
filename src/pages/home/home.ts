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
  sortDateSymbol = ""
  sortPSymbol = ""
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

  sortByPriority(pSymbol){
    if (pSymbol == '') return;
    this.todolist.sort((a,b) => {
      if (pSymbol=='↑') {
        let temp = a
        a = b
        b = temp
      }
      return b.priority - a.priority
    });
  }
  sortByDate(dSymbol){
    if (dSymbol == '') return;
    this.todolist.sort((a,b) => {
      if (dSymbol=='↑') {
        let temp = a
        a = b
        b = temp
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    });
  }

  sortByDThenP(dateSymbol,prioritySymbol){    
    this.todolist.sort((a,b) => {
      let bDate = new Date(b.date).getTime(),
          aDate = new Date(a.date).getTime()
      let aPri = a.priority,
          bPri = b.priority
      if (dateSymbol=='↑') {
        let temp = aDate
        aDate = bDate
        bDate = temp
      }
      if (prioritySymbol=='↑'){
        let temp = aPri
        aPri = bPri
        bPri = temp
      }
      return (bDate - aDate) || (bPri - aPri)
    });
  }

  toggleSortByDatePriority(mode){
    if (mode=="P"){
      this.sortPSymbol = this.toggleStatus(this.sortPSymbol)
    } else {
      this.sortDateSymbol = this.toggleStatus(this.sortDateSymbol)
    }

    if (this.sortDateSymbol != '' && this.sortPSymbol != ''){
      this.sortByDThenP(this.sortDateSymbol,this.sortPSymbol)
    } else if (this.sortDateSymbol != '') {
      this.sortByDate(this.sortDateSymbol)
    } else if (this.sortPSymbol != '') {
      this.sortByPriority(this.sortPSymbol)     
    }
  }

  toggleStatus(symbol){
    let new_symbol = ''
    if (symbol== ""){
      new_symbol = "↓"
    } else if (symbol== "↓"){
      new_symbol = "↑"
    } else {
      new_symbol = ""
    }
    return new_symbol
  }
  

}
