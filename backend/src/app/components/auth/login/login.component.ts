import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';
import { MustMatchValidator } from 'src/app/validations/validations.validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted: boolean = false;
  @ViewChild('nav') elnav: any;

  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _commonService: CommonService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.setLoginForm();
    this.setRegisterFrom();
  }

  setLoginForm() {
    this.loginForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  setRegisterFrom() {
    this.registerForm = this._fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userTypeId: [1],
      password: ['', Validators.compose([Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: MustMatchValidator('password', 'confirmPassword')
      });
  }

  get f() {
    return this.registerForm.controls;
  }

  login() {
    if (this.loginForm.get('userName').value == "") {
      this._toastr.error("UserName is required !!", "Login");
    } else if (this.loginForm.get('password').value == "") {
      this._toastr.error("Password is required !!", "Login");
    } else {
      if (this.loginForm.valid) {
        this._commonService.post(Global.BASE_API_PATH + "UserMaster/Login/", this.loginForm.value).subscribe(res => {
          if (res.isSuccess) {
            this._authService.authLogin(res.data);
            let msg: string = "";
            msg = this._authService.getMessage();
            if (msg !== "") {
              this._toastr.error(msg, "Login");
              this.loginForm.reset();
            }
          } else {
            this._toastr.error(res.errors[0], "Login");
          }
        });
      }
    }
  }

  register(formData: FormGroup) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this._commonService.post(Global.BASE_API_PATH + "UserMaster/Save/", formData.value).subscribe(res => {
      if (res.isSuccess) {
        this._toastr.success("Registration has been successfully done !!", "Register");
        this.registerForm.reset({
          firstName: '',
          lastName: '',
          email: '',
          userTypeId: 1,
          password: '',
          confirmPassword: ''
        });
        this.submitted = false;
        this.elnav.select('logintab');
      } else {
        this._toastr.error(res.errors[0], "Register");
      }
    });
  }
}
