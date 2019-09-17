import { TodoStorageProvider } from './../../providers/todo-storage/todo-storage';
import { ModalController } from 'ionic-angular';
import { Todo } from './../../model/todo';
import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the TodoListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo-list-item',
  templateUrl: 'todo-list-item.html'
})
export class TodoListItemComponent {
  @Input() ItemTodo: Todo = new Todo('','','','',false)
  @Input() isAdding: boolean = false
  @Output() updateTodo: EventEmitter<string> = new EventEmitter();

  
  text: string;
  longPress: boolean;

  constructor(private _modalCtrl: ModalController,
    private _todoProvider: TodoStorageProvider) {
    console.log('Hello TodoListItemComponent Component');
  }

  editTodo() {
    const myModal = this._modalCtrl.create('CreateeditPage',
    {todoitem: this.ItemTodo,
     mode: 'Edit'},
    { cssClass: 'my-custom-modal-css'});
    myModal.present();
    myModal.onDidDismiss( () => {
      this.longPress = false
      this.updateTodo.emit("")
    })
    this.longPress = true
  }

  calcDate(){
    let datesetHoursToZero = new Date(this.ItemTodo.date)
    datesetHoursToZero.setHours(23,59)
    let diff_date = new Date().getTime() - datesetHoursToZero.getTime()
    let one_day=1000*60*60*24;
    diff_date /= one_day
    diff_date = Math.round(diff_date)
    let day = "Today"
    if (diff_date < 0){
      day = `In ${Math.abs(diff_date)} day(s)`
    } else if (diff_date > 0) {
      day = `${Math.abs(diff_date)} day(s) ago.`
    }
    return day
  }


  doneTodo() {
    if (!this.longPress) {
      console.log('TODO done')
      this.ItemTodo.done  = !this.ItemTodo.done
    }
    this.longPress = false;
  }

  async deleteTodo(){
    console.log('TODO ',this.ItemTodo)
    let todoid = this.ItemTodo.todoid
    await this._todoProvider.removeTodo(todoid)
    this.updateTodo.emit(todoid)
  }

}
