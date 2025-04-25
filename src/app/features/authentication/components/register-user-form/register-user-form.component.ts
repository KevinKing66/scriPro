import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Roles } from '../../../../shared/enums/role.enum';
import { RoleLabelPipe } from '../../../../shared/pipes/role-label.pipe';
import { DocumentTypeLabelPipe } from '../../../../shared/pipes/document-type-label.pipe';
import { UserStatus } from '../../../../shared/enums/status.enum';
import { DocumentTypes } from '../../../../shared/enums/document-type.enum';
import { UserStatusLabelPipe } from '../../../../shared/pipes/user-status-label.pipe';
import { ResearchGroup } from '../../../projects/model/project.model';
import { ResearchGroupsService } from '../../../../core/service/research-groups.service';

@Component({
  selector: 'app-register-user-form',
  imports: [CommonModule, RoleLabelPipe, DocumentTypeLabelPipe, UserStatusLabelPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css', '../../../../shared/styles/form.css'],
})
// RegisterUserFormComponent
export class RegisterUserFormComponent implements OnInit {
  @Input() state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  @Output() submitted = new EventEmitter<User>();

  @Input()
  errorMsg: string = "";

  roleKeys: string[] = Object.keys(Roles);

  documentTypeKeys: string[] = Object.keys(DocumentTypes);

  statusKeys: string[] = Object.keys(UserStatus);

  researchGroups: ResearchGroup[] = [];

  ngOnInit() {
    this.loadResearchGroups();
  }


  private researchGroupsService = inject(ResearchGroupsService);
  private formBuilder = inject(FormBuilder);

  form = new FormGroup({
    name: this.formBuilder.control('', Validators.required),
    lastName: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ]),
    code: this.formBuilder.control('', Validators.required),
    docNum: this.formBuilder.control('', Validators.required),
    docType: this.formBuilder.control(this.documentTypeKeys[0], Validators.required),
    phone: this.formBuilder.control('', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]),
    role: this.formBuilder.control(this.roleKeys[0], Validators.required),
    researchGroupId: this.formBuilder.control(0, Validators.required),
    status: this.formBuilder.control('ACTIVE', Validators.required),
  });


  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value as User);
      // this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  loadResearchGroups() {
    this.researchGroupsService.findAll().subscribe({
      next: (data: any[]) => {
        this.researchGroups = data.map(item => ({
          code: item.code,
          name: item.name,
          description: item.description,
          faculty: item.faculty,
          creationDate: item.creationDate || '',
          admin: item.admin,
          status: item.status,
          knowledgeArea: item.knowledgeArea,
          contactEmail: item.contactEmail,
          contactPhone: item.contactPhone,
        }));
      },
      error: (err: any) => {
        console.log("Error: ", err);
        this.state = "ERROR";
        setTimeout(() => {
          this.state = "FREE";
        }, 15000);
        this.errorMsg = err.error.message || err.error || err.message || err;
        console.error(err);
      }
    });
  }
}
