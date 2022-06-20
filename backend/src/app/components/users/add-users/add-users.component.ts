import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { DBOperation } from 'src/app/shared/services/db-operations';

import { Global } from 'src/app/shared/services/global';
import { MustMatchValidator } from 'src/app/validations/validations.validators';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  userId: number = 0;
  addForm: FormGroup;
  submitted: boolean = false;
  buttonText: string;
  dbops: DBOperation;
  objUserTypes: any[] = [];

  constructor(private route: ActivatedRoute, private _fb: FormBuilder,
    private _toastr: ToastrService, private _commonService: CommonService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  setFromState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.addForm = this._fb.group({
      id: [0],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      userTypeId: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: MustMatchValidator('password', 'confirmPassword')
      });
  }

  get f() {
    return this.addForm.controls;
  }

  getUserTypes() {
    this._commonService.get(Global.BASE_API_PATH + "UserType/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objUserTypes = res.data;
      } else {
        this._toastr.error(res.errors[0], "Add User");
      }
    });
  }

  getUserById() {
    this._commonService.get(Global.BASE_API_PATH + "UserMaster/GetbyId/" + this.userId).subscribe(res => {
      if (res.isSuccess) {
        this.addForm.patchValue(res.data);
      } else {
        this._toastr.error(res.errors[0], "Add User");
      }
    });
  }

  ngOnInit(): void {
    this.setFromState();
    this.getUserTypes();

    if (this.userId && this.userId != null && this.userId > 0) {
      this.buttonText = "Update";
      this.dbops = DBOperation.update;
      this.getUserById();
    }
  }

  register() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    switch (this.dbops) {
      case DBOperation.create:
        this._commonService.post(Global.BASE_API_PATH + "UserMaster/Save/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Data has been saved successfully !!", "Add User");
            this.addForm.reset();
            this.submitted = false;
            this.router.navigate(['/users/list-user']);
          } else {
            this._toastr.error(res.errors[0], "Add User");
          }
        });
        break;
      case DBOperation.update:
        this._commonService.post(Global.BASE_API_PATH + "UserMaster/Update/", this.addForm.value).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Data has been updated successfully !!", "Add User");
            this.addForm.reset();
            this.submitted = false;
            this.router.navigate(['/users/list-user']);
          } else {
            this._toastr.error(res.errors[0], "Add User");
          }
        });
        break;
    }
  }
}
