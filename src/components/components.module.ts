import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoListItemComponent } from './todo-list-item/todo-list-item';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [TodoListItemComponent],
	imports: [IonicModule],
	exports: [TodoListItemComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
