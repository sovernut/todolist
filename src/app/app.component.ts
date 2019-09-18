import { TodoStorageProvider } from './../providers/todo-storage/todo-storage';
import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private _todoProv: TodoStorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.localNotifications.on('click').subscribe(() => {
          this._todoProv.getTodayTodo().then( (item) => {
              let todo = item.list.reduce( (a,c) => a + c.todoText + '<br>','')
              let titleText = "Today's Task" 
              if (item.length == 0) {
                titleText = "No task..."
                todo = "You have no task today."
              }
              let alert = this.alertCtrl.create({
                title: titleText,
                subTitle: todo
              });
              alert.present();
          })
        
    });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

