import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth/auth-service.service';
import { UserDTO } from '../DTOs/UserDTO';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { AppStore } from '../AppStore/AppStore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthServiceService, private router: Router, private messageService: MessageService, public store$:AppStore) {}

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      let userDTO  = {
          email : credentials.username || "",
          name : credentials.username || "",
          password : credentials.password || ""
      } as UserDTO;

      this.authService.login(userDTO).subscribe(
        (user) => {
          if(user.token!=null){
            this.authService.loggedInSubject.next(true);
           localStorage.setItem("token",user.token)
           if(user.employee!=null){
            localStorage.setItem("employeeId",user?.employee?.id+"")
            localStorage.setItem("username",user?.name+"")
          }
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Welcome '+user.name+ ' 😁.'});

        }else{
          localStorage.removeItem("token")
        }},
        (error) => {
          this.authService.loggedInSubject.next(false);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
          console.error('Login failed:', error);
          // Handle login failure (e.g., show a notification)
        }
      );
    } else {
      console.warn('Form is not valid');
      // Handle form validation failure (e.g., highlight fields)
    }
  }
}