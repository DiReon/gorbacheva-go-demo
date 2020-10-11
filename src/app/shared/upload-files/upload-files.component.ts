import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';

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
  uploadCompleted = false;
  subscription: Subscription;
  selectedImage: any = null;
  constructor(
    @Inject(AngularFireStorage) 
    private storage: AngularFireStorage,
  ) {
    console.log(`URLs ${this.urls}`);
   }

  ngOnInit(): void {
    
  }
  uploadFile(event) {
    const files = event.target.files;
    // console.log(`Category: ${this.quiz.category}; Title: ${this.quiz.title}`);
    for (const file of files) {
      
      const filePath = (this.quiz ? `/quizzes/${this.quiz.category}/${this.quiz.title}/${file.name}` : `/answers/${this.userName}/${file.name}`);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      // this.uploadPercent = task.percentageChanges();

      // observe percentage changes
      // get notified when the download URL is available
      console.log("Trying to upload ", files.length, " files");
      task.snapshotChanges().pipe(
        finalize(() => this.subscription = fileRef.getDownloadURL().subscribe( u => {
          console.log("U is: ", u);
          if(u) {
            this.urls ? this.urls.push(u) : this.urls = [u];
            console.log("URL is: ", u, " all urls: ", this.urls);
            this.uploadCompleted = true;
            this.upload.emit(this.urls);
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
