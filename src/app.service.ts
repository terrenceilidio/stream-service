import { Injectable } from '@nestjs/common';

const MAX_MOVIES = 3;
 @Injectable()
export class AppService {
  
  data = {}

  startStream(userId:string,stream:string): string {
    if(!this.data[userId]){
      this.data[userId] = {};
    }
    const currentTotalStreams = this.data[userId];
  
    if(currentTotalStreams[stream]){
        //already streaming selected movie
        return stream;
    }

     const currentUserStreams = Object.keys(currentTotalStreams);
     
     const total = currentUserStreams.filter((currentStream) => currentTotalStreams[currentStream]).length;

     if(total >= MAX_MOVIES){
        throw new Error("Max stream limit reached");
     }

     this.data[userId][stream] = true;
     return stream;
  }

  stopStream(userId:string,stream:string) {

    if(!this.data[userId]){
       throw new Error("User doesn't exist");
    }

    if(!this.data[userId][stream]){
      throw new Error("You're not currently watching the selected movie");
    }
    
    this.data[userId][stream] = false;

    return  stream
  }
  
  getUserStreams(userId:string){

    if(!this.data[userId]){
      throw new Error("User doesn't exist");
    }

    return this.data[userId];
  }
}
