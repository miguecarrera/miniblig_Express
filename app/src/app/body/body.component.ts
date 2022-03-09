import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  isLoggedIn = false;
  posts: any;

  constructor() {}

  deleteItem(id: String) {
    let token = localStorage.getItem('token');
    fetch('http://localhost:5000/p/' + id, { method: "delete" })
      .then(res => {
        fetch('http://localhost:5000/p/all/' + token, { method: "post" })
          .then(res => res.json())
          .then(data => { this.posts = data; console.log(this.posts) });
      });
  }

  editItem(id: String) {
    let token = localStorage.getItem('token');

    fetch('http://localhost:5000/p/' + id, { method: "put" })
      .then(res => {
        fetch('http://localhost:5000/p/all/' + token, { method: "post" })
          .then(res => res.json())
          .then(data => { this.posts = data; console.log(this.posts) });
      });
  }

  onSubmit(f : NgForm){
    const {title, content} = f.form.value;
    let token = localStorage.getItem('token');
    fetch('http://localhost:5000/p/add',{
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      method:'post',
      body: JSON.stringify({title, content, userId: token}),
  })
  .then(res => {
    fetch('http://localhost:5000/p/all/' + token, { method: "post" })
      .then(res => res.json())
      .then(data => { this.posts = data; console.log(this.posts) });
  });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      let token = localStorage.getItem('token');
      fetch('http://localhost:5000/p/all/' + token, { method: "post" })
        .then(res => res.json())
        .then(data => this.posts = data);
    }
    else {
      fetch('http://localhost:5000/p/all/', { method: "post" })
        .then(res => res.json())
        .then(data => { this.posts = data; console.log(this.posts) });
    }
  }
}
