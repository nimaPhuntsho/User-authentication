import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fs: Auth) {}

  async createUser(email: string, password: string) {
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.log(error.message);
    });
  }

  async signIn(email: string, password: string) {
    const auth = getAuth();
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  signOut() {
    this.fs.signOut();
  }
}
