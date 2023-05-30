import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {}
  saveNewPost(postObj:any){
   return new Promise((resolve,reject)=>{
    this.http.post('http://localhost:3000/posts',postObj).subscribe(
      {next : res => resolve(res),
        error: error => reject(error)
      }
      
    );})
}

getposts(){
  return new Promise((resolve,reject)=>{
    this.http.get('http://localhost:3000/posts').subscribe(
      {
        next:res => resolve(res),
        error : error => reject(error)
      }
    )
  })
}

updateLikes(postObj: any){
  return new Promise ((resolve,reject)=>{
    this.http.put('http://localhost:3000/posts/'+ postObj.id , postObj).subscribe({
      next:res => resolve(res),
      error : error => reject(error)
    })
  })
}
updateComments(postObj: any){
  return new Promise ((resolve,reject)=>{
    this.http.put('http://localhost:3000/posts/'+ postObj.id , postObj).subscribe({
      next:res => resolve(res),
      error : error => reject(error)
    })
  })
}
}