import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import Image from "next/image";

function CustomLoading({loading}){
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
          <AlertDialogTitle className="bg-white flex flex-col items-center my-10 justify-center ">
              <Image src={'/progress.gif'} alt="gif" width={100} height={100}/>
              <AlertDialogDescription>Generating your viideo...Do not Refresh</AlertDialogDescription>
          </AlertDialogTitle>
      </AlertDialogContent>
    </AlertDialog>
      
  

  )
}

export default  CustomLoading