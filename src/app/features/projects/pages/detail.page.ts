import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { ProjectDetailsComponent } from '../components/others/project-details/project-details.component';
import { ProjectService } from '../service/project.service';
import { Evidences, Project } from '../model/project.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-project-detail-page',
  imports: [CommonModule, ProjectDetailsComponent, FloatingButtonComponent, LoadingComponent],
  template: `
    @if(project) {
      <app-project-details [project]=project></app-project-details>
    }
    @else {
      <app-loading></app-loading>
    }
    <floating-button [route]=destiny></floating-button>
  `
})
export class ProjectDetailPage implements OnInit {

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id') || '';

    if (!this._id) {
      this.router.navigate(['/projects']);
      return;
    }
    // this.fakeFind();
    this.find();
  }

  _id: string = '';
  destiny: string | string[] = ['/projects/create'];

  project: Project | null = null;

  find() {
    this.projectService.findOne(this._id).subscribe((res: Project) => {
      if(!res) {
        this.router.navigate(['/projects']);
        return;
      }
      this.project = res;
    });
  }

  fakeFind() {
    let evidenceDoc1: Evidences = {
      url: 'https://docs.google.com/document/d/1uEozck9GgM4dqYYV2AHPtPP4AGL1Pczi/edit?usp=sharing&ouid=110218061838182811166&rtpof=true&sd=true',
      uuid: 'evidence-uuid',
      projectUuid: this._id,
      creationDateTime: new Date(),
      description: 'Este es prueba de un documento',
      fileName: 'Documento.docx',
      type: 'application/msword'
    };
    let evidencePdf: Evidences = {
      ...evidenceDoc1,
      url: 'https://docs.google.com/document/d/1uEozck9GgM4dqYYV2AHPtPP4AGL1Pczi/edit?usp=sharing&ouid=110218061838182811166&rtpof=true&sd=true',
      uuid: 'evidence-uuid',
      description: 'Este es prueba de un pdf',
      fileName: 'prueba.pdf',
      type: 'application/pdf'
    };
    let evidenceImg: Evidences = {
      ...evidencePdf,
      url: 'img/proyecto.png',
      uuid: 'evidence-uuid',
      description: 'Este es prueba de un pdf',
      fileName: 'proyecto.png',
      type: 'image/png'
    };


    this.project = {
      code: this._id,
      name: "Proyecto De Investigación y detencion por IA",
      description: "Laborum labore adipisicing culpa ut occaecat eiusmod Lorem reprehenderit occaecat ipsum. Incididunt exercitation aute quis cupidatat sint cillum non non reprehenderit. Eiusmod elit esse consectetur non. Mollit mollit excepteur qui velit est ullamco consequat.",
      status: "ACTIVE",
      creationDateTime: new Date(),
      updatedAt: new Date(),
      members: [
        { email: '123456', name: 'Juan Perez' },
        { email: '654321', name: 'Maria Lopez' }
      ],
      evidences: [evidenceDoc1, evidencePdf, evidenceImg,],
      image: {url: "img/proyecto.png"},
    } as Project;

  }
}
