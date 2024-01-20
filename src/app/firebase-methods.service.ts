import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMethodsService {
  // Import the functions you need from the SDKs you need

  private firebaseConfig = {
    apiKey: 'AIzaSyB66kfiwGzb4T5kyZjrBrkegdpZawQbtSc',
    authDomain: 'quizapp-3e1fe.firebaseapp.com',
    projectId: 'quizapp-3e1fe',
    storageBucket: 'quizapp-3e1fe.appspot.com',
    messagingSenderId: '162080294627',
    appId: '1:162080294627:web:ae5f49d50deeed422527d6',
  };

  // Initialize Firebase
  private app = initializeApp(this.firebaseConfig);
  private database = getDatabase(this.app);

  public readData = async () => {
    try {
      const snapshot = await get(ref(this.database, `test`));
      return snapshot.val();
    } catch (e) {
      console.log(e);
    }
  };

  postData(data: string) {
    try {
      const tasksRef = ref(this.database, ``);
      set(tasksRef, data);
    } catch (e) {
      console.log(e);
    }
  }
}
