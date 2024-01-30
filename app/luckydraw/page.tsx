"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import logo from "../logo.png";
import logoTeam from "../logo-team.png";
import coin from "../2.png";
import flag from "../1.png";
import dance from "../3.png";
import Confetti from "react-confetti";

export default function Home() {
  const [maxNum, setMaxNum] = React.useState(150);
  const params =
    typeof window !== "undefined"
      ? new URL(document.location.toString()).searchParams
      : undefined;
  const maxNumInput = params?.get("max");

  React.useEffect(() => {
    if (
      maxNumInput &&
      !isNaN(Number(maxNumInput)) &&
      Number(maxNumInput) < 1000
    ) {
      setMaxNum(Number(maxNumInput));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [number, setNumber] = React.useState(0);
  const [drawing, setDrawing] = React.useState(false);

  const drawn = React.useRef<number[]>([]);
  const draw = () => {
    if (drawing) return;
    setIsExploding(false);
    setDrawing(true);
    let counter = 0;
    drumrollRef.current!.currentTime = 0;
    drumrollRef.current?.play();
    let timer = setInterval(() => {
      setNumber(Math.floor(Math.random() * 999) + 1);
      counter += 1;
      if (counter > 35) {
        clearInterval(timer);
        if (drawn.current.length >= maxNum / 5) {
          console.log(
            `Drawn numbers: ${drawn.current}. Resetting repeatability guard.`,
          );
          drawn.current = [];
        }
        let finalNumber = Math.floor(Math.random() * maxNum) + 1;
        while (drawn.current.includes(finalNumber)) {
          finalNumber = Math.floor(Math.random() * maxNum) + 1;
        }
        drawn.current = drawn.current.concat([finalNumber]);
        setNumber(finalNumber);
        cheeringRef.current!.currentTime = 0;
        cheeringRef.current?.play();
        setIsExploding(true);
        setDrawing(false);
      }
    }, 70);
  };
  const [isExploding, setIsExploding] = React.useState(false);
  const cheeringRef = React.useRef<HTMLAudioElement | null>(null);
  const drumrollRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === " " && !drawing) {
        event.preventDefault();
        draw();
      }
    };
    document.addEventListener("keydown", down);
    return document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full pb-8 overflow-auto gap-4 overflow-x-hidden">
      <div className="flex items-center justify-between w-full overflow-x-hidden min-h-[180px] sm:h-[30%]">
        <div className="relative h-full aspect-square ">
          <Image src={logoTeam} alt="logo-team" className="object-cover" />
        </div>
        <div className="relative h-full aspect-square order-2">
          <Image src={logo} alt="logo" className="object-cover" />
        </div>
        <h1 className="text-5xl text-[#B72526] font-bold text-center grow sm:flex justify-center hidden">
          Bốc Thăm Trúng Thưởng
        </h1>
      </div>
      <h1 className="text-2xl pb-4 text-[#B72526] font-bold text-center grow sm:hidden">
        Bốc Thăm Trúng Thưởng
      </h1>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 w-[300px] h-[600px]">
          <div className="relative w-full grow bg-[#B72526] rounded-3xl flex justify-center items-center px-6">
            <div className="absolute self-start translate-x-[12rem] -translate-y-[4rem] sm:-translate-x-[14rem]">
              <Image
                src={flag}
                className="object-cover"
                alt="flag"
                height={240}
              />
            </div>
            <div className="absolute self-start translate-x-[12rem] translate-y-[20rem] sm:translate-x-[12rem]">
              <Image
                src={coin}
                className="object-cover"
                alt="flag"
                height={180}
              />
            </div>
            <div className="absolute self-start -translate-y-[2rem] sm:translate-y-[20rem] -translate-x-[12rem] scale-x-[-1] sm:hidden">
              <Image
                src={dance}
                className="object-cover"
                alt="flag"
                height={180}
              />
            </div>
            <div className="text-9xl text-[#ECC158] font-bold select-none flex w-full justify-center">
              <div>
                {number.toLocaleString("en-US", {
                  minimumIntegerDigits: 3,
                  useGrouping: false,
                })}
              </div>
            </div>
            <audio ref={drumrollRef} src="/drumroll.wav" />
            <audio ref={cheeringRef} src="/kids-cheering.mp3" />
          </div>
          <Button
            autoFocus
            className=" w-full text-4xl text-[#ECC158] font-bold bg-[#B72526] rounded-2xl hover:bg-[#B72526EE] p-10"
            onClick={draw}
          >
            Xổ Số
          </Button>
          {isExploding && (
            <Confetti
              recycle={false}
              numberOfPieces={3000}
              tweenDuration={10000}
              initialVelocityY={{ min: -20, max: 20 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
