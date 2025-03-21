import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Header(){
  return(
  <div className="p-3 p-5 flex item-center justify-between shadow-md" >
    <div className="flex gap-3 item-center">
      <Image src={'/logo.svg'} alt={'svg image'} width={30} height={30}/>
      <h2 className="font-bold text-xl">Ai Short Vid</h2>
    </div>
    <div className="flex gap-3 item-center">
      <Button>Dashboard</Button>
      <UserButton/>
    </div>
  </div>
  )
}

export default Header