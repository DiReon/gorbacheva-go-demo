import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/shared/models/quiz';

@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input("urls") urls:string[];
  @Input('quiz') quiz: Quiz;
  @Input('userName') userName: string;
  @Output() upload = new EventEmitter<string[]>();
  @Output() uploadIsValid = new EventEmitter<boolean>();
  uploadCompleted = false;
  subscription: Subscription;
  selectedImage: any = null;
  constructor(
    @Inject(AngularFireStorage) 
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {
    
  }
  uploadFile(event) {
    this.uploadIsValid.emit(false);
    console.log("Emit false")
    const files = event.target.files;
    for (const file of files) {
      
      const filePath = (this.quiz ? `/quizzes/${this.quiz.category}/${this.quiz.title}/${file.name}` : `/answers/${this.userName}/${file.name}`);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      console.log("Trying to upload ", files.length, " files");
      task.snapshotChanges().pipe(
        finalize(() => this.subscription = fileRef.getDownloadURL().subscribe( u => {
          if(u) {
            this.urls ? this.urls.push(u) : this.urls = [u];
            this.upload.emit(this.urls);

            if (this.urls && this.urls.length == files.length) {
              this.uploadIsValid.emit(true);
              console.log("Emit true")
              this.uploadCompleted = true;
            }
        
          }
        }))
      )
      .subscribe()
    }
  }

  deleteFile(url) {
    if (!confirm('Точно хотите удалить файл?')) return;
    this.urls.splice(this.urls.indexOf(url), 1);
    this.upload.emit(this.urls);
    this.storage.storage.refFromURL(url).delete();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
