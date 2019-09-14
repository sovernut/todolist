import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  done: boolean = false
  mode: string = "Add"
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     private _navParams: NavParams) {

      
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
    
  }

}
