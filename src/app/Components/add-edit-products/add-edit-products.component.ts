import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        imageUrl: ['', [Validators.required]],
        quantity: ['', Validators.required],
        price: ['', Validators.required],
       
    });

    if (!this.isAddMode) {
        this.productService.getById(this.id)
            .pipe(first())
            .subscribe(x => this.form.patchValue(x));
    }
}

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }
      this.loading = true;
      if (this.isAddMode) {
          this.createProduct();
      } else {
          this.updateProduct();
      }
  }

  private createProduct() {
      this.productService.create(this.form.value)
          .pipe(first())
          .subscribe(() => {
              this.router.navigate(['../'], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

  private updateProduct() {
      this.productService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe(() => {
              this.router.navigate(['../../'], { relativeTo: this.route });
          })
          .add(() => this.loading = false);
  }

}

