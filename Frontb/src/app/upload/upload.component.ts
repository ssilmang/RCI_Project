import { Component } from '@angular/core';
import { ImportService } from '../_helpers/import.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  fileToUpload: File | null = null;

  constructor(private importService: ImportService) { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    if (this.fileToUpload) {
      this.importService.uploadFile(this.fileToUpload).subscribe(data => {
        console.log('File uploaded successfully', data);
      }, error => {
        console.error('Error uploading file', error);
      });
    }
  }

}
