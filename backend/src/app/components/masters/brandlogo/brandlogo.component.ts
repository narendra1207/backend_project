import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { DBOperation } from 'src/app/shared/services/db-operations';
import { Global } from 'src/app/shared/services/global';
import {
  CharFieldValidator,
  NoWhiteSpaceValidator,
} from 'src/app/validations/validations.validators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-brandlogo',
  templateUrl: './brandlogo.component.html',
  styleUrls: ['./brandlogo.component.scss']
})
export class BrandlogoComponent implements OnInit , OnDestroy { objRows: any[] = [];
  objRow: any;
  addForm: FormGroup;
  buttonText: string;
  dbops: DBOperation;

  @ViewChild('nav') elnav: any;

  addedImagePath: string = "assets/images/noimage.png";
  fileToUpload: any;
  @ViewChild('file') elfile: ElementRef;

  formErrors = {
    name: ''
  };

  validationMessage = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be less than 1 char long',
      maxlength: 'Name cannot be more than 10 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validCharField: 'Name must be contains char and space only'
    }
  };

  constructor(private _commonService: CommonService, private _toastr: ToastrService, private _fb: FormBuilder) { }

  setFormState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.addForm = this._fb.group({
      id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        CharFieldValidator.validCharField
      ])]
    });

    this.addForm.valueChanges.subscribe(() => {
      this.onValueChanged();
    });
  }

  onValueChanged() {
    if (!this.addForm) {
      return;
    }

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.addForm.get(field);

      if (control && control.dirty && control.invalid) {
        const message = this.validationMessage[field];

        for (const key of Object.keys(control.errors)) {
          if (key !== 'required') {
            this.formErrors[field] += message[key] + " ";
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.getData();
    this.setFormState();
  }

  get f() {
    return this.addForm.controls;
  }

  getData() {
    this._commonService.get(Global.BASE_API_PATH + "BrandLogo/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "BrandLogo Master");
      }
    });
  }

  upload(files: any) {
    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this._toastr.error("Please upload a valid image !!", "Profile Master");
      this.elfile.nativeElement.value = "";
      this.addedImagePath = "assets/images/noimage.png";
    }

    this.fileToUpload = files[0];

    // read image
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.addedImagePath = reader.result.toString();
    }

  }

  Submit() {
    if (this.dbops == DBOperation.create && !this.fileToUpload) {
      this._toastr.error("Please upload image !!", "BrandLogo Master");
      return;
    }

    const formData = new FormData();
    formData.append("Id", this.addForm.controls['id'].value);
    formData.append("Name", this.addForm.controls['name'].value);
    
    if (this.fileToUpload) {
      formData.append("Image", this.fileToUpload, this.fileToUpload.name);
    }



    switch (this.dbops) {
      case DBOperation.create:
        this._commonService.postImage(Global.BASE_API_PATH + "BrandLogo/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Record has been saved successfully !!", "BrandLogo Master");
            this.resetForm();
          } else {
            this._toastr.error(res.errors[0], "BrandLogo Master");
          }
        });
        break;
      case DBOperation.update:
        this._commonService.postImage(Global.BASE_API_PATH + "BrandLogo/Update/", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Record has been updated successfully !!", "BrandLogo Master");
            this.resetForm();
          } else {
            this._toastr.error(res.errors[0], "BrandLogo Master");
          }
        });
        break;
    }
  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });

    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
    this.fileToUpload = null;

    this.elnav.select('viewtab');
    this.getData();
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });

    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
    this.fileToUpload = null;

    this.elnav.select('viewtab');
  }

  Edit(_id: number) {
    this.buttonText = "Update";
    this.dbops = DBOperation.update;
    this.elnav.select('addtab');

    this.objRow = this.objRows.find(s => s.id === _id);

    // this.addForm.controls['id'].setValue(this.objRow.id);
    // this.addForm.controls['name'].setValue(this.objRow.name);

    // this.addForm.get('id').setValue(this.objRow.id);
    // this.addForm.get('name').setValue(this.objRow.name);

    this.addForm.patchValue(this.objRow);
  }

  tabChange(event: any) {
    this.addForm.reset({
      id: 0,
      name: ''
    });

    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
    this.fileToUpload = null;
  }

  Delete(_id: number) {
    let obj = {
      id: _id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!'
      ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this._commonService.post(Global.BASE_API_PATH + "BrandLogo/Delete/", obj).subscribe(res => {
          if (res.isSuccess) {
            this.getData();
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
          } else {
            this._toastr.error(res.errors[0], "BrandLogo Master");
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    }
    )
  }

  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
    this.fileToUpload = null;
  }

  onSort(event: any) {
    console.log(event);
  }

  onPage(event: any) {
    console.log(event);
  }

}