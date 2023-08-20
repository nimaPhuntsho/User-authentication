import { Observable } from "rxjs/internal/Observable";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { inject, Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire/app";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { HttpClient } from "@angular/common/http";

export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

export interface Claims {
  token: "";
}

export interface Roles {
  uid: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  curentName = new BehaviorSubject<string>("");
  source$ = this.curentName.asObservable();

  curentRole = new BehaviorSubject<Roles>({ uid: "", isAdmin: false });
  roleSource$ = this.curentRole.asObservable();

  currentError = new BehaviorSubject<boolean>(false);
  errorSource = this.currentError.asObservable();

  adminUid = new BehaviorSubject<User>({
    uid: "default",
    email: "default",
    displayName: "default",
  });
  admin$ = this.adminUid.asObservable();
  url = "http://localhost:3000/";

  constructor(private fs: Auth, private http: HttpClient) {}

  async createUser(email: string, password: string) {
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((user) => {
        user.user.displayName;
      })
      .catch((error) => {
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
    const currentUser = await userCredentials.user;
    this.curentName.next(currentUser.uid);
    this.adminUid.next({
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
    });
    localStorage.removeItem("roles");
  }

  async tokenSignIn(token: string) {
    const auth = getAuth();
    const userCredentials = await signInWithCustomToken(auth, token);
    const currentUser = await userCredentials.user;
    await currentUser.getIdTokenResult().then((data) => {
      let roles: Roles = {
        uid: currentUser.uid,
        isAdmin: data.claims["isAdmin"],
      };
      localStorage.removeItem("roles");
      localStorage.setItem("roles", JSON.stringify(roles));
      if (!roles.isAdmin) {
        this.currentError.next(false);
      }
    });
  }

  getFromServer() {
    return this.http.get(this.url);
  }

  login(uid: string): Observable<Claims> {
    return this.http.post<Claims>(this.url + "login", { id: uid });
  }

  postTest() {
    this.http.post(this.url + "test", { name: "Nima" }).subscribe((data) => {});
  }

  signOut() {
    // localStorage.removeItem("roles");
    this.fs.signOut();
  }
}
