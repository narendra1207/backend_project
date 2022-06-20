import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { Global } from 'src/app/shared/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userImage: string = 'assets/images/user.png';
  fullName: string = '';
  emailId: string = '';
  firstName: string = '';
  lastName: string = '';
  userDetails: any;

  addedImagePath: string = 'assets/images/noimage.png';
  fileToUpload: any;

  @ViewChild('file') elfile: ElementRef;

  constructor(
    private _toastr: ToastrService,
    private _commonService: CommonService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Swal.fire('Hello world!');
    // Swal.fire('Oops...', 'Something went wrong!', 'error');
    // Swal.fire('done...', 'Successfully !', 'success');

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this imaginary file!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it',
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your imaginary file has been deleted.',
    //       'success'
    //     );
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
    //   }
    // });



    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userImage =
      this.userDetails.imagePath == '' || this.userDetails.imagePath == null
        ? 'assets/images/user.png'
        : Global.BASE_USERS_IMAGES_PATH + this.userDetails.imagePath;
    this.fullName = `${this.userDetails.firstName} ${this.userDetails.lastName}`;
    this.emailId = this.userDetails.email;
    this.firstName = this.userDetails.firstName;
    this.lastName = this.userDetails.lastName;
  }

  upload(files: any) {
    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this._toastr.error('Please upload a valid image !!', 'Profile Master');
      this.elfile.nativeElement.value = '';
      this.addedImagePath = 'assets/images/noimage.png';
    }

    this.fileToUpload = files[0];

    // read image
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.addedImagePath = reader.result.toString();
    };
  }

  changeProfileImage() {
    if (!this.fileToUpload) {
      this._toastr.error('Please upload image !!', 'Profile Master');
      return;
    }

    const formData = new FormData();
    formData.append('Id', this.userDetails.id);
    formData.append('Image', this.fileToUpload, this.fileToUpload.name);
    this._commonService
      .postImage(Global.BASE_API_PATH + 'UserMaster/UpdateProfile/', formData)
      .subscribe((res) => {
        if (res.isSuccess) {
          this._toastr.success(
            'Profile Image has been updated !!',
            'Profile Master'
          );
          this.elfile.nativeElement.value = '';
          this.addedImagePath = 'assets/images/noimage.png';
          this.fileToUpload = null;

          Swal.fire({
            title: 'Are you sure?',
            text: 'Are you want to see this changes rightnow ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, rightnow!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/auth/login'])
            } else if (result.dismiss === Swal.DismissReason.cancel) {

              
            }
          });
        } else {
          this._toastr.error(res.errors[0], 'Profile Master');
        }
      });
  }

  tabChange(event) {
    // debugger
    this.elfile.nativeElement.value = '';
    this.addedImagePath = 'assets/images/noimage.png';
    this.fileToUpload = null;
  }
}
