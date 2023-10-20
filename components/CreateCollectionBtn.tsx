"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSheet from "./CreateCollectionSheet";

function CreateCollectionBtn() {
  const [open, setOpen] = useState(true);

  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <div className="w-full bg-gradient-to-r from-cyan-200 via-blue-300 to-green-500 p-[1px]">
      <Button
        variant={"outline"}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-green-500 to-yellow-500 hover:to-orange-800 bg-clip-text text-transparent">
          Create collection
        </span>
      </Button>
      <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;
