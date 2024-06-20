// src/app/upload.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, file: File): Observable<number> {
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.percentageChanges();
  }

  getFileURLs(folderPath: string): Observable<string[]> {
    const folderRef = this.storage.ref(folderPath);
    return folderRef.listAll().pipe(
      switchMap(result => {
        const urls$ = result.items.map(item => item.getDownloadURL());
        return forkJoin(urls$);
      })
    );
  }
}
