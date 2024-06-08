import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateCategoryComponent {
  categoryService = inject(CategoryService);

  router = inject(Router);

  categoryform: FormGroup = new FormGroup({
    // FormControl : gia tri ban dau, Validator
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', []),
  });

  handleSubmit() {
    if (this.categoryform.valid) {
      this.categoryService.createCategory(this.categoryform.value).subscribe({
        next: () => {
          // Hiển thị thông báo thành công và xác nhận chuyển trang
          if (window.confirm('Thêm sản phẩm thành công!')) {
            // Chuyển trang về trang quản trị
            this.router.navigate(['/admin/products/list']);
          }
        },
        error: (error) => {
          // Hiển thị thông báo lỗi
          window.alert(`Lỗi: ${error.message}`);
          console.error(error.message);
        },
      });
    } else {
      // Hiển thị thông báo lỗi xác thực biểu mẫu
      window.alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
}
