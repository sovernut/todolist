import { Settings } from './../../model/setting.interface';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  constructor(private _storage: Storage) {
    console.log('Hello SettingsProvider Provider');
  }

  saveSettings(settings: Settings){
    return this._storage.set('Settings',settings)
  }

  loadSettings(){
    return this._storage.get('Settings').then( (item) => {
      return item || {}
    })
  }

}
