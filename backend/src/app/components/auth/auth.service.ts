import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string = "";
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // For Token Use
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get CurrentUser() {
    return this.currentUser.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) { }

  authLogin(res: any) {
    if (res.id === 0) {
      this.message = "Please eneter valid username and password";
      localStorage.clear();
      this.currentUser.next(null);
      this.loggedIn.next(false);
    } else {
      this.message = "";
      localStorage.setItem("userDetails", JSON.stringify(res));
      this.currentUser.next(res);
      this.loggedIn.next(true);
      this.router.navigate(['dashboard/default']);
    }
  }

  getMessage(): string {
    return this.message;
  }

  logout() {
    this.message = "";
    localStorage.clear();
    this.currentUser.next(null);
    this.loggedIn.next(false);
    this.router.navigate(['auth/login']);
  }
}