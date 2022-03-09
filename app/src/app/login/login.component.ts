import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegistred = true;
  isLoggedIn = false;

  isLoggedInMethod() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  constructor() {}

  onSubmit(f: NgForm) {
    const { username, password } = f.form.value;
    fetch('http://localhost:5000/u/signin', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json()).then(data => {
        localStorage.setItem('token', data._id);
        window.location.reload();

      })
  }

  onSubmitReg(f: NgForm) {
    const { username, password, fullname, email, role, password2 } = f.form.value;
    if (password !== password2) return;
    fetch('http://localhost:5000/u/singup', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "post",
      body: JSON.stringify({ username, password, fullname, role }),
    })
      .then(res => res.json()).then(data => {
        localStorage.setItem('token', data._id);
        window.location.reload();
      })
  }

  OpenRegisterModal() {
    this.isRegistred = !this.isRegistred;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.isLoggedInMethod();
  }

  CloseSesion(){
    localStorage.removeItem('token');
    window.location.reload();
  }

}
