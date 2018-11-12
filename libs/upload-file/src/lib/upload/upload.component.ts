
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'lib-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() runUpload: Subject<string> = new Subject();
  @Output() fileUrl: EventEmitter<string> = new EventEmitter<string>();
  @Output() imageAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  isHovering: boolean;
  file: File;
  showPreview = false;
  imageSrc = '/assets/images/image.jpg';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.runUpload.subscribe(eventId => {
      this.startUpload(eventId);
      //console.log(eventId)
    })
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  previewImage(event: FileList): void {

    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event: any) => {
      this.imageSrc = _event.target.result;
      this.imageAdded.emit(true);
    }

    this.file = file;
    this.showPreview = true;
  }

  startUpload(eventId: string) {
    
    if(!this.showPreview){
      return;
    }
    
    // The File object
    const file = this.file;

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `glui/${eventId}/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Glui Event' };

    // The main task
    const fileRef = this.storage.ref(path)
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      }),
      // The file's download URL
      finalize(() => { 
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
          this.fileUrl.emit(this.downloadURL);
        })
      })
    )
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
