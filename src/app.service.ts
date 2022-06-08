import { Injectable } from '@nestjs/common';

const MAX_MOVIES = 3;
 @Injectable()
export class AppService {
  
  data = {}

  startStream(userId:string,video:string): string {
    console.log(this.data)
    if(!this.data[userId]){
      this.data[userId] = {};
    }
    const currentTotalStreams = this.data[userId];
  
    if(currentTotalStreams[video]){
        //already streaming selected movie
        return video;
    }

     const currentUserStreams = Object.keys(currentTotalStreams);
     
     const total = currentUserStreams.filter((currentStream) => currentTotalStreams[currentStream]).length;

     if(total >= MAX_MOVIES){
        throw new Error("Max stream limit reached");
     }

     this.data[userId][video] = true;
     return video;
  }

  stopStream(userId:string,video:string) {

    console.log(this.data)

    if(!this.data[userId]){
       throw new Error("User doesn't exist");
    }

    if(!this.data[userId][video]){
      throw new Error("You're not currently watching the selected movie");
    }
    
    this.data[userId][video] = false;

    return  video
  }
  
  getUserStreams(userId:string){
    
    console.log(this.data)

    if(!this.data[userId]){
      throw new Error("User doesn't exist");
    }

    return this.data[userId];
  }


}
