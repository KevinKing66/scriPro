import { Component, inject, OnInit } from '@angular/core';
import { ResearchGroupsService } from '../../../../core/service/research-groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchGroup } from '../../models/research-group.model';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { CommonModule } from '@angular/common';
import { ResearchGroupFormComponent } from '../../components/research-group-form/research-group-form.component';
import { StorageService } from '../../../../core/service/storage.service';

@Component({
  selector: 'app-research-group-create-edit-page',
  imports: [CommonModule, ResearchGroupFormComponent,FloatingButtonComponent],
  templateUrl: './research-group-create-edit-page.component.html',
  styleUrl: './research-group-create-edit-page.component.css'
})
export class ResearchGroupCreateEditPageComponent implements OnInit {
  group: ResearchGroup | null = null;
  isEditMode = false;
  errorMessage = '';

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly groupService: ResearchGroupsService = inject(ResearchGroupsService);
  private readonly storageService: StorageService = inject(StorageService);
  private readonly router: Router = inject(Router);

  owner = this.storageService.getUserEmailAndName();

  ngOnInit(): void {
    const _id = this.route.snapshot.paramMap.get('_id');
    if (_id) {
      this.isEditMode = true;
      this.groupService.findOne(_id).subscribe({
        next: (res: ResearchGroup) => (this.group = res),
        error: () => (this.errorMessage = 'No se pudo cargar el semillero'),
      });
    }
  }

  onSubmit(data: any): void {
    this.errorMessage = '';
    const request = this.isEditMode
      ? this.groupService.update(this.group!._id!, data)
      : this.groupService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/research-groups']),
      error: (err: any) => {
        console.error(err);
        this.errorMessage =
          err?.error?.message || 'Error al guardar el semillero';
      },
    });
  }
}

