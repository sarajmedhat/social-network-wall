import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
@Injectable({
  providedIn: 'root'
})
export class PostsComponent implements OnInit {
  constructor(public userService: UserService, private router: Router, private storage: AngularFireStorage,public postService:PostService,private snackbar:MatSnackBar) {}
  ngOnInit() {
    if (this.userService.user == undefined || this.userService.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userService.user = JSON.parse(str);
      } else {
        this.router.navigate(['/login']);
      }
    }
    this.postService.getposts().then((res:any)=>
    {this.posts = res
    for (let post of this.posts){
    this.commentText.push('');
    }
  }
   ).catch((err:any)=>
   {console.log(err)})
  }
  
  
  selectedFile: any;
  text = "";
  posts : Array<any>=[];
 commentText : Array<string> = [] ;
  post(){
    this.snackbar.open("creating post ....",'',{duration : 15000})
    if(this.selectedFile != undefined || this.selectedFile != null){
      this.uploadImage().then((imageurl:any)=>{
        console.log(imageurl)
        let postObj = {
          username : this.userService.user.username,
          text : this.text,
          imageUrl:imageurl,
          likes:[],
          comments:[]
        }
        this.posts.push(postObj);
        this.postService.saveNewPost(postObj).then((res)=>{console.log(res);
          this.snackbar.open('posted succefully',"ok")})
        .catch((err)=>console.log(err))
        this.selectedFile = undefined;
      }).catch((err:any)=>{
        console.log(err)
      })
    }
    else{
      let postObj = {
        username : this.userService.user.username,
        text : this.text,
        imageUrl:'',
        likes:[],
        comments:[]
      }
      this.posts.push(postObj);
      this.postService.saveNewPost(postObj).then((res)=>{console.log(res);
      this.snackbar.open('posted succefully',"ok")})
      .catch((err)=>console.log(err))
    }
  }
  like(postId : any){
    for(let i = 0 ;  i < this.posts.length  ; i++){
     if (this.posts[i].id == postId ){
      if(this.posts[i].likes.indexOf(this.userService.user.id) >= 0){
        this.posts[i].likes.splice(this.posts[i].likes.indexOf(this.userService.user.id),1)
      }
      else{
      this.posts[i].likes.push(this.userService.user.id)
      }
     }
     this.postService.updateLikes(this.posts[i]).then((res)=>console.log(res)).catch((err) => console.log(err))
    }
  }
  comment(postId:any, commentIndex : any){
    for(let i = 0 ;  i < this.posts.length  ; i++){
      if (this.posts[i].id == postId ){
       let commentObj = {
        username : this.userService.user.username,
        comment : this.commentText[commentIndex]
       }
       this.posts[i].comments.push(commentObj)
       this.commentText[commentIndex] = "";
       this.postService.updateComments(this.posts[i]);
      }
  }
}
  commentObj(commentObj: any) {
    throw new Error('Method not implemented.');
  }
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];

  }
  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          let imageURL = fileRef.getDownloadURL();
          imageURL.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url);
            }
          });
        })
      ).subscribe(
        (url)=>{
          if(url){
            console.log(url);
          }
        }
      );
    });
  }


  postSchema = {
    username: '',
    imageUrl: '',
    text: '',
    likes: [],
    comments: [{ username: '', comment: '' }]
  };
}
