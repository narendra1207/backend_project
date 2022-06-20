import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';
import { DBOperation } from 'src/app/shared/services/db-operations';
import { Global } from 'src/app/shared/services/global';
import { CharFieldValidator, NoWhiteSpaceValidator, NumericFieldValidator } from 'src/app/validations/validations.validators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  productId: number = 0;
  addForm: FormGroup;
  submitted: boolean = false;
  dbops: DBOperation;
  buttonText: string = "Submit";
  objSizes: [];
  objTags: [];
  objColors: [];
  objCategories: [];
  bigImage = "assets/images/product-list/1.jpg";
  url = [
    { img: "assets/images/noimage.png" },
    { img: "assets/images/noimage.png" },
    { img: "assets/images/noimage.png" },
    { img: "assets/images/noimage.png" },
    { img: "assets/images/noimage.png" }
  ];
  fileToUpload = [];
  @ViewChild('file') elfile: ElementRef;
  counter: number = 1;

  constructor(private route: ActivatedRoute, private _fb: FormBuilder,
    private _toastr: ToastrService, private _commonService: CommonService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
    });
  }

  formErrors = {
    name: '',
    title: '',
    code: '',
    price: '',
    salePrice: '',
    discount: '',
    sizeId: '',
    colorId: '',
    tagId: '',
    categoryId: ''
  };

  validationMessage = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be less than 3 char long',
      maxlength: 'Name cannot be more than 20 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validCharField: 'Name must be contains char and space only'
    },
    title: {
      required: 'Title is required',
      minlength: 'Title cannot be less than 3 char long',
      maxlength: 'Title cannot be more than 20 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validCharField: 'Title must be contains char and space only'
    },
    code: {
      required: 'Code is required',
      minlength: 'Code cannot be less than 3 char long',
      maxlength: 'Code cannot be more than 20 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    },
    price: {
      required: 'Price is required',
      minlength: 'Price cannot be less than 1 char long',
      maxlength: 'Price cannot be more than 20 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validNumericField: 'Price must be contains numeric value only'
    },
    salePrice: {
      required: 'Sale Price is required',
      minlength: 'Sale Price cannot be less than 1 char long',
      maxlength: 'Sale Price cannot be more than 20 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validNumericField: 'Sale Price must be contains numeric value only'
    },
    discount: {
      required: 'Discount is required',
      minlength: 'Discount cannot be less than 1 char long',
      maxlength: 'Discount cannot be more than 4 char long',
      noWhiteSpaceValidator: 'Only whitespace is not allowed',
      validNumericField: 'Discount must be contains numeric value only'
    },
    sizeId: {
      required: 'Size is required'
    },
    colorId: {
      required: 'Color is required'
    },
    tagId: {
      required: 'Tag is required'
    },
    categoryId: {
      required: 'Category is required'
    }
  };

  setFormState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.addForm = this._fb.group({
      id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        CharFieldValidator.validCharField
      ])],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        CharFieldValidator.validCharField
      ])],
      code: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        NoWhiteSpaceValidator.noWhiteSpaceValidator
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        NumericFieldValidator.validNumericField
      ])],
      salePrice: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        NumericFieldValidator.validNumericField
      ])],
      discount: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(4),
        NoWhiteSpaceValidator.noWhiteSpaceValidator,
        NumericFieldValidator.validNumericField
      ])],
      sizeId: ['', Validators.required],
      tagId: ['', Validators.required],
      colorId: ['', Validators.required],
      categoryId: ['', Validators.required],
      quantity: [''],
      isSale: [false],
      isNew: [false],
      shortDetails: [''],
      description: ['']
    });

    this.addForm.valueChanges.subscribe(() => {
      this.onValueChanged();
    });

    this.addForm.controls['quantity'].setValue(1);
  }

  ngOnInit(): void {
    this.setFormState();
    this.getCategories();
    this.getColors();
    this.getSizes();
    this.getTags();
    if (this.productId && this.productId != null && this.productId > 0) {
      this.buttonText = "Update";
      this.dbops = DBOperation.update;
      this.getProductById();
    }
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

  get f() {
    return this.addForm.controls;
  }

  getProductById() {
    this._commonService.get(Global.BASE_API_PATH + "ProductMaster/GetbyId/" + this.productId).subscribe(res => {
      if (res.isSuccess) {
        this.addForm.patchValue(res.data);
        this.counter = res.data.quantity;

        this.addForm.controls['isSale'].setValue(res.data.isSale === 1 ? true : false);
        this.addForm.controls['isNew'].setValue(res.data.isNew === 1 ? true : false);

        this._commonService.get(Global.BASE_API_PATH + "ProductMaster/GetProductPicturebyId/" + this.productId).subscribe(res => {
          if (res.isSuccess && res.data.length > 0) {
            this.url = [
              { img: res.data[0].name != null ? Global.BASE_IMAGES_PATH + res.data[0].name : "assets/images/noimage.png" },
              { img: res.data[1].name != null ? Global.BASE_IMAGES_PATH + res.data[1].name : "assets/images/noimage.png" },
              { img: res.data[2].name != null ? Global.BASE_IMAGES_PATH + res.data[2].name : "assets/images/noimage.png" },
              { img: res.data[3].name != null ? Global.BASE_IMAGES_PATH + res.data[3].name : "assets/images/noimage.png" },
              { img: res.data[4].name != null ? Global.BASE_IMAGES_PATH + res.data[4].name : "assets/images/noimage.png" }
            ];
          }
        });

      } else {
        this._toastr.error(res.errors[0], "Add Product");
      }
    });
  }


  getCategories() {
    this._commonService.get(Global.BASE_API_PATH + "Category/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objCategories = res.data;
      } else {
        this._toastr.error(res.errors[0], "Add Product");
      }
    });
  }
  getTags() {
    this._commonService.get(Global.BASE_API_PATH + "TagMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objTags = res.data;
      } else {
        this._toastr.error(res.errors[0], "Add Product");
      }
    });
  }
  getColors() {
    this._commonService.get(Global.BASE_API_PATH + "ColorMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objColors = res.data;
      } else {
        this._toastr.error(res.errors[0], "Add Product");
      }
    });
  }
  getSizes() {
    this._commonService.get(Global.BASE_API_PATH + "SizeMaster/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objSizes = res.data;
      } else {
        this._toastr.error(res.errors[0], "Add Product");
      }
    });
  }

  increment() {
    this.counter = this.counter + 1;
    this.addForm.controls['quantity'].setValue(this.counter);
  }

  decrement() {
    if (this.counter > 1) {
      this.counter = this.counter - 1;
      this.addForm.controls['quantity'].setValue(this.counter);
    }
  }

  upload(files: any, i: number) {
    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this._toastr.error("Please upload a valid image !!", "Profile Master");
      this.elfile.nativeElement.value = "";
      this.bigImage = "assets/images/product-list/1.jpg";
    }

    this.fileToUpload[i] = files[0];

    // read image
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.url[i].img = reader.result.toString();
      this.bigImage = reader.result.toString();
    }
  }

  Submit() {
    this.submitted = true;

    // 8376817046 -- Ajeet

  }

  cancleForm() {
    this.addForm.reset({
      id: 0,
      name: '',
      title: '',
      code: '',
      price: '',
      salePrice: '',
      discount: '',
      sizeId: '',
      colorId: '',
      tagId: '',
      categoryId: '',

      quantity: '',
      isSale: false,
      isNew: false,
      shortDetails: '',
      description: ''
    });

    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    this.bigImage = "assets/images/product-list/1.jpg";
    this.url = [
      { img: "assets/images/noimage.png" },
      { img: "assets/images/noimage.png" },
      { img: "assets/images/noimage.png" },
      { img: "assets/images/noimage.png" },
      { img: "assets/images/noimage.png" }
    ];
    this.fileToUpload = [];
    this.counter = 1;

    this.router.navigate(['/products/physical/product-list']);
  }

  ngOnDestroy() {
    this.fileToUpload = [];
    this.objCategories = null;
    this.objColors = null;
    this.objSizes = null;
    this.objTags = null;
    this.url = null;
  }

}
