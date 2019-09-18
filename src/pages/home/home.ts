import { SettingsProvider } from './../../providers/settings/settings';
import { CreateeditPage } from './../createedit/createedit';
import { TodoStorageProvider } from './../../providers/todo-storage/todo-storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, Content, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Settings } from '../../model/setting.interface';

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
  saveOnSort: boolean = false;
  settings: Settings = {NOTI: false, SAVESORT: false}
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _todoProvider: TodoStorageProvider,
    private _modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private _settingsProvider: SettingsProvider
  ) {
    this.formTodo = this.formBuilder.group({
      todo: ['',Validators.required],
    });
    // this.formTodo.controls['todolistForm'].
  }

  ngOnInit(){
    this.getTodoList()
    this.loadSetting().then( () => {
      if (this.settings.NOTI) {
        this.showNotification()
      }
    })
  }

  showNotification(){
    this._todoProvider.getTodayTodo().then( (v) =>{
      this.localNotifications.schedule({
        id: 1,
        title: 'Todo',
        text: `You have todo ${v.length} Item`,
        trigger: {at: new Date(new Date().getTime() + 1000)},
      });
    })
  }

  async getTodoList(){
    this.todolist = await this._todoProvider.getAllTodo()
    console.log('getTodoList from provider >',this.todolist)
  }

  loadSetting(){
    return this._settingsProvider.loadSettings().then( (item) => {
      this.settings = item
      console.log('loaded settings ..',this.settings)
    })
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
    this.sortNow()
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

    this.sortNow()
  }

  sortNow(){
    if (this.sortDateSymbol != '' && this.sortPSymbol != ''){
      this.sortByDThenP(this.sortDateSymbol,this.sortPSymbol)
    } else if (this.sortDateSymbol != '') {
      this.sortByDate(this.sortDateSymbol)
    } else if (this.sortPSymbol != '') {
      this.sortByPriority(this.sortPSymbol)     
    }
    if (this.settings.SAVESORT){
      this._todoProvider.updateStorage()
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
  onClickSetting(){
    const showAlert = this.alertCtrl.create({
      title: 'Settings',
      inputs: [
        {
          label: 'Notification on Time',
          value: 'NOTI',
          type: 'checkbox',
          checked: this.settings.NOTI || false
        },
        {
          label: 'Save on sort',
          value: 'SAVESORT',
          type: 'checkbox',
          checked: this.settings.SAVESORT || false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            data.forEach(element => {
              this.settings[element] = true
            });

            this._settingsProvider.saveSettings(this.settings).then( () => this.loadSetting())
          }
        }
      ]
    });
    showAlert.present()
    
    
  }

}
