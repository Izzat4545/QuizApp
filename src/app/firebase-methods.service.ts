import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Category, categoryId } from '../types/response';

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

  public readData = async (path: string) => {
    try {
      const snapshot = await get(ref(this.database, `${path}`));
      return snapshot.val();
    } catch (e) {
      console.log(e);
    }
  };

  public async postData(data: Category[] | categoryId, path: string) {
    try {
      const tasksRef = ref(this.database, path);
      await set(tasksRef, data);
    } catch (e) {
      console.log(e);
    }
  }

  public async logInUser(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public logOutUser() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.log(error.message);
    });
  }

  public isUserSignedIn(): Promise<boolean> {
    const auth = getAuth();
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Unsubscribe to avoid memory leaks
        resolve(!!user); // Resolve with true if user is signed in, false otherwise
      });
    });
  }

  public async deleteData(path: string): Promise<void> {
    try {
      const databaseRef = ref(this.database, path);
      await remove(databaseRef);
    } catch (e) {
      console.error('Error deleting data:', e);
      throw e;
    }
  }
}
