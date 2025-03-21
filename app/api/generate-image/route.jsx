import { NextResponse } from "next/server";
import Replicate from "replicate";
export async function POST(req){
  try{
      const {prompt}=await req.json();
      const replicate = new Replicate({
          auth:process.env.REPLICATE_API_TOKEN
      });

      const input ={
        prompt: prompt,
        height: 1280,
        width: 1024,
        num_output:1
      };

      const output = await repliccate.run("bytedance/sdxl-lightning-4step:")
      console.log(output)
      return NextResponse.json({'result':output[0]})
      //
  }catch(e)
  {

  }
}