"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useToPng } from "@hugocxl/react-to-image";
import { Input } from "@/components/ui/input";

export default function Home() {
  const isDownload = React.useRef(false);
  const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
    onSuccess: (data) => {
      if (isDownload.current) {
        download(data);
      }
    },
  });

  const download = (data: string) => {
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `image-${Math.floor(Math.random() * 10000)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
    isDownload.current = false;
  };

  const [text, setText] = React.useState("");

  return (
    <div className="text-xl text-[#B72526] font-bold flex flex-col items-center h-full bg-[#FFF5D7] pt-32 gap-32">
      <div
        ref={ref}
        className="bg-[#B72526] text-[#FFF5D7] rounded-lg px-2 py-1"
      >
        {text}
      </div>
      <form
        className="w-[50%] flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          isDownload.current = true;
          convertToPng();
        }}
      >
        <Input
          value={text}
          onChange={(e) => {
            setText(e.currentTarget.value);
            convertToPng();
          }}
          className="rounded-lg p-4"
        ></Input>
        <Button className="bg-[#B72526] hover:bg-[#4E6618]" type="submit">
          Download
        </Button>
      </form>
    </div>
  );
}
