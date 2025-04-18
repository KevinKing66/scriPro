import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Roles } from '../../../../shared/enums/role.enum';
import { RoleLabelPipe } from '../../../../shared/pipes/role-label.pipe';
import { DocumentTypeLabelPipe } from '../../../../shared/pipes/document-type-label.pipe';

@Component({
  selector: 'app-register-user-form',
  imports: [CommonModule, RoleLabelPipe, DocumentTypeLabelPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css', '../../../../shared/styles/form.css'],
})
// RegisterUserFormComponent
export class RegisterUserFormComponent {
  @Output() submitted = new EventEmitter<User>();

  roleKeys = Object.keys(Roles);
  roles = Roles;

  documentTypeKeys = Object.keys(Roles);
  documentTypes = Roles;

  private formBuilder = inject(FormBuilder);

  form = new FormGroup({
    name: this.formBuilder.control('', Validators.required),
    lastName: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', Validators.required),
    studentCode: this.formBuilder.control('', Validators.required),
    docNum: this.formBuilder.control('', Validators.required),
    docType: this.formBuilder.control(this.documentTypeKeys[0], Validators.required),
    phone: this.formBuilder.control('', Validators.required),
    role: this.formBuilder.control(this.roleKeys[0], Validators.required),
    researchGroupId: this.formBuilder.control(0, Validators.required),
    status: this.formBuilder.control('ACTIVE', Validators.required),
  });


  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue() as User);
    }
  }
}
