import { Component, Input } from '@angular/core';
import { Projects } from '../../model/project.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'project-card',
    imports: [RouterModule],
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project: Projects = {
    uuid: 'uuid',
    name: 'Proyecto De Investigación',
    description: 'Laborum labore adipisicing culpa ut occaecat eiusmod Lorem reprehenderit occaecat ipsum. Incididunt exercitation aute quis cupidatat sint cillum non non reprehenderit. Eiusmod elit esse consectetur non. Mollit mollit excepteur qui velit est ullamco consequat.',
    creationDateTime: new Date(),
    updatedAt: new Date(),
    status:  'ACTIVE',
    imageUrl: "img/proyecto.png",
    evidences: [],
    members: [],
  };
}
