import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Project } from '../model/project.model';
import { Member } from '../model/create-project.model';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }
  generateProjectPdf(project: Project) {
    const docDefinition: any = {
      content: [
        { text: 'Reporte de Proyecto', style: 'header' },
        {
          style: 'projectInfoTable',
          table: {
            widths: ['auto', '*'],
            body: [
              ['Código:', project.code],
              ['Tipo:', project.type],
              ['Nombre:', project.name],
            ],
          },
        },
        { text: 'Evidencias', style: 'subheader', margin: [0, 20, 0, 8] },
        ...project.evidences.map((ev, index) => ({
          style: 'evidenceBox',
          table: {
            widths: ['auto', '*'],
            body: [
              [
                { text: `Evidencia ${index + 1}`, bold: true, colSpan: 2 },
                {},
              ],
              ['Título:', ev.key],
              ['Descripción:', ev.description],
              ['Fecha:', ev.creationDateTime],
              ['participantes:', this.getMembesString(ev.participants)],
            ],
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 10],
        })),
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 18,
          bold: true,
        },
        projectInfoTable: {
          margin: [0, 0, 0, 20],
        },
        evidenceBox: {
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }

  private getMembesString(participants?: Member[]){
    if (!participants) return " ";
    return participants.map(p => `- ${p.email}: ${p.name} -`).join(', ');
  }
}
