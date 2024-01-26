"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = React.useState(
    "Món ăn ưa thích của bạn trong dip Tết là gì?",
  );

  const [textes, setTextes] = React.useState<string[]>([]);

  return (
    <div className="text-2xl text-[#B72526] font-bold flex flex-col items-center h-full bg-[#FFF5D7] gap-32 pt-32">
      {textes.map((t) => {
        return (
          <TypeAnimation
            key={t}
            sequence={[
              `${t}`, // Types 'One'
              1000, // Waits 1s
              () => {
                console.log("Sequence completed");
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="text-6xl text-[#B72526] font-bold w-4/5 whitespace-pre-line leading-tight"
            speed={70}
          />
        );
      })}
      <div className="fixed bottom-4 w-fit flex gap-2 justify-center items-center">
        <Textarea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="w-[720px] h-32 text-xl"
        ></Textarea>
        <Button
          className="bg-[#B72526]"
          onClick={() => {
            setTextes([text]);
          }}
        >
          Animate
        </Button>
      </div>
    </div>
  );
}
