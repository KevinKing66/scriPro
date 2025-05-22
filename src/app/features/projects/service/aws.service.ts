import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FileModel } from '../model/file.model';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private readonly backendUrl = environment.url;
  private readonly bucketName = environment.awsBucket;
  private readonly apiUrl = this.backendUrl + '/aws';

  constructor(private http: HttpClient) { }
  async uploadToS3(file: File): Promise<FileModel> {
    const fileName = `${Date.now()}-${file.name}`;

    // Pedir URL firmada al backend
    const res = await this.http
      .get<string>(`${this.apiUrl}/presigned-url?fileName=${fileName}&fileType=${file.type}`);
    const presignedUrl = await firstValueFrom(res, { defaultValue: '' });

    // mandar el archivo a S3
    await fetch(presignedUrl!, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    const publicUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;

    console.log('Archivo subido:', publicUrl);
    return {key: fileName, url: publicUrl};
  }
}
