import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

const client = createClient({
  url: 'redis://default:terrence@redis-db:6379'
});
(async () => {
  await client.connect()
})()

const MAX_MOVIES = 3;
@Injectable()
export class AppService {
  async startStream(userId:string,stream:string): Promise<string> {
    const stringifiedUserStreams = await client.get(userId)
    const currentTotalStreams = JSON.parse(stringifiedUserStreams || '{}');
  
    if(currentTotalStreams[stream]){
        //already streaming selected movie
        return stream;
    }

     const currentUserStreams = Object.keys(currentTotalStreams);
     
     const total = currentUserStreams.filter((currentStream) => currentTotalStreams[currentStream]).length;

     if(total >= MAX_MOVIES){
        throw new Error("Max stream limit reached");
     }

     currentTotalStreams[stream] = true;

     await client.set(userId, JSON.stringify(currentTotalStreams));
     return stream;
  }

  async stopStream(userId:string,stream:string) {
    const stringifiedUserStreams = await client.get(userId)

    if(!stringifiedUserStreams){
      throw new Error("User doesn't exist");
    }

    const currentTotalStreams = JSON.parse(stringifiedUserStreams);

    if(!currentTotalStreams[stream]){
      throw new Error("You're not currently watching the selected movie");
    }
    
    currentTotalStreams[stream] = false;
    await client.set(userId, JSON.stringify(currentTotalStreams));

    return  stream
  }
  
  async getUserStreams(userId:string){
    const stringifiedUserStreams = await client.get(userId)
    
    if(!stringifiedUserStreams){
      throw new Error("User doesn't exist");
    }
    
    const currentTotalStreams = JSON.parse(stringifiedUserStreams);
    return currentTotalStreams;
  }
}
