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
  @Output() deleteItemTodo: EventEmitter<number> = new EventEmitter();

  
  text: string;
  longPress: boolean;

  constructor(private _modalCtrl: ModalController,
    private _todoProvider: TodoStorageProvider) {
    console.log('Hello TodoListItemComponent Component');
    this.text = 'Hello World';
  }

  editTodo() {
    console.log('long press')
    const myModal = this._modalCtrl.create('CreateeditPage',
    {todoitem: this.ItemTodo,
     mode: 'Edit'},
    { cssClass: 'my-custom-modal-css'});
    myModal.present();
    myModal.onDidDismiss( () => {
      this.longPress = false
    })
    this.longPress = true
  }

  doneTodo() {
    if (!this.longPress) {
      console.log('TODO done')
      this.ItemTodo.done  = true
    }
    this.longPress = false;
  }

  deleteTodo(){
    console.log('TODO ',this.ItemTodo)
    let todoid = this.ItemTodo.todoid
    this._todoProvider.removeTodo(todoid)
    this.deleteItemTodo.emit(1)
  }

}
