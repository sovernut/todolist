import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';

/**
 * Generated class for the CreateeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createedit',
  templateUrl: 'createedit.html',
})
export class CreateeditPage {
  text: string = ""
  priority: string = ""
  date: string = ""
  min: string = ""
  done: boolean = false
  mode: string = "Add"
  index: number = 0
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     private _navParams: NavParams,
     private datePicker: DatePicker) {

      
      this.mode = this._navParams.get('mode')

      if (this.mode == "Add"){
        this.text = this._navParams.get('todotext')
      } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateeditPage');
  }

  onClose(){
    console.log(this.text)
    this.viewCtrl.dismiss()
  }

  onAdd(){

    this.viewCtrl.dismiss()

  }

  onEdit(){
    console.log(this.date)
  }

  pickDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  getYearPlus(num=0){
    let date = new Date;
    return date.getFullYear()+num+'';
  }

}
