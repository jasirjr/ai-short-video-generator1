"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData=''
const FILEURL=''

const VideoSCRIPT=[
  {
    "imagePrompt": "A bustling ancient Roman forum, filled with people in togas, merchants selling goods, and grand marble buildings under a clear blue sky. Realistic style, wide shot, bright daylight.",
    "contentText": "Imagine ancient Rome, not just the emperors and gladiators, but the heart of everyday life...the bustling Roman Forum."
  },
  {
    "imagePrompt": "A close up shot of a hand holding a small clay tablet with cuneiform writing, partially cracked and aged, illuminated by soft sunlight coming through a window. Realistic, slightly shallow depth of field.",
    "contentText": "Amongst the noise and trade, a quiet revolution was taking place: the development of written language. Forget pen and paper, they used clay tablets!"
  },
]

function CreateNew(){

  const [formData,setFormData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [videoScript,setVideoScript]=useState();
  const [audioFileUrl,setAudioFileUrl]=useState();
  const [captions,setCaptions]=useState();
  const [imageList,setImageList]=useState();
  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))

  }

  const onCreateClickHandler=()=>{
    GetVideoScript();
    GenerateAudiofile(scriptData);
    GenarateAudioCaption(FILEURL);
    GenerateImage();
  }

  //Get Video Script
  const GetVideoScript=async()=>{
    setLoading(true)
    const prompt="write a script to generate "+formData.duration+" video on topic:"+formData.topic+" along with Ai image prompt in "+formData.imageStyle+" format for each scene and give me result in JSON format with imagePrompt and contentText as field "
    console.log(prompt)
    const result=await axios.post('/api/get-video-script',{
      prompt:prompt
    }).then(resp=>{
      
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
    });
    setLoading(false);
  }

  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
      let script='';
      const id=uuidv4(); 
      // videoScriptData.data.forEach(item => {
      //   script += item.ContentText+' ';
      // })

      await axios.post('/api/generate-audio',{
        text:videoScriptData,
        id:id
      }).then(resp=>{
        setAudioFileUrl(resp.data.result);
      })

      setLoading(false)
    
  }
  
  const GenerateAudioCaption=async(fileUrl)=>{
    setLoading(true);

    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result);
      setCaptions(resp?.data?.result);
      GenerateImage();
    })

    setLoading(fasle);
  }

  const GenerateImage=()=>{
    let images=[];
    VideoSCRIPT.forEach(async(element)=>{
      await axios.post('/api/generate-image',{
        prompt:element?.imagePrompt
      }).then(resp=>{
        console.log(resp.data.result);
        images.push(resp.data.result);
      })
    })
    console.log(images);
    setImageList(images)
    setLoading(false);
  
  }

  return(
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange}/>
        {/* Create Button */}

        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
      </div>

      <CustomLoading loading={loading}/>
    </div>
  );
}

export default CreateNew