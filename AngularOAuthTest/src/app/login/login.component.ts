import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any; // ✅ global script object

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    console.log("ID Token:", idToken);

    this.http.post('http://localhost:8000/auth/google', { idToken })
    .subscribe(res => {
      console.log("Login success:", res);
      // redirect or show logged-in UI
    }, err => {
      console.error("Login error:", err);
    });

  }
}
