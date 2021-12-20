import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.component.html',
  styleUrls: ['./event-comments.component.css']
})
export class EventCommentsComponent implements OnInit {

  constructor( private formComment: FormBuilder,
    private shared:SharedService,
    private http: HttpClient,private route     : Router  ) { }
  post:any
  user:any
  form  : FormGroup;
  

  ngOnInit(): void {
   this.post=this.shared.getevent()
   this.user=this.shared.getuser()
   console.log('clicked',this.post)
   console.log('clicked',this.user)
   this.form = this.formComment.group({
      myComment:''
    
  })
   
  }
  submit(): void {
   
   this.http.put('http://localhost:8000/events/events', {_id:this.post._id,comment:{text:this.form.getRawValue().myComment,user:this.user}})
      .subscribe({
        next: Response => {
       this.post=Response
        this.route.navigateByUrl('/comments');
         
          
        },
        error: error   => {
          console.log(error)
          
        }
      });
     
  }
  verifyOwner(comment:any){
    console.log('verifyowner',this.user._id===comment.user._id)
   return this.user._id===comment.user._id
  }
  delete_comment(comment:any):void{
    console.log(comment)
    this.http.put('http://localhost:8000/events/comments', { _id:this.post._id,comment})
      .subscribe({
        next: Response => {
       console.log(Response)
        this.route.navigateByUrl('/comments');
         
          
        },
        error: error   => {
          console.log('thiserror',error)
          
        }
  })

  }
}
