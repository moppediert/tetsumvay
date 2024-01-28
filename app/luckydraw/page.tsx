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
  const [firstDigit, setFirstDigit] = React.useState(0);
  const [secondDigit, setSecondDigit] = React.useState(0);
  const [thirdDigit, setThirdDigit] = React.useState(0);

  const [number, setNumber] = React.useState(0);
  const [reset, setReset] = React.useState(true);
  const draw = () => {
    setReset(false);
    setIsExploding(false);
    // random between one and MAX
    setNumber(Math.floor(Math.random() * 150) + 1);
  };
  const [isExploding, setIsExploding] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const drumrollRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    console.log("what");
    const down = (event: KeyboardEvent) => {
      // event.preventDefault();
      console.log(event.key);
      if (event.key === " ") {
        draw();
      }
    };
    document.addEventListener("keydown", down);
    return document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (reset) return;
    let counter = 0;
    drumrollRef.current?.play();
    let timer1 = setInterval(() => {
      let randomDigit = Math.floor(Math.random() * 10);
      setFirstDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setSecondDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setThirdDigit(randomDigit);
      counter += 1;
      if (counter > 45) {
        clearInterval(timer1);
        let digits = number.toString().split("").map(Number);
        console.log(digits);
        if (digits.length == 2) {
          digits.splice(0, 0, 0);
        } else if (digits.length == 1) {
          digits.splice(0, 0, ...[0, 0]);
        }
        setFirstDigit(digits[0]);
        setSecondDigit(digits[1]);
        setThirdDigit(digits[2]);
        setIsExploding(true);
        audioRef.current!.currentTime = 0;
        audioRef.current?.play();
      }
    }, 70);
  }, [number]);

  return (
    <div className="flex flex-col items-center h-full w-full pb-8 overflow-auto gap-4">
      <div className="flex items-center justify-between w-full overflow-x-hidden min-h-[180px] sm:h-[20%]">
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
          <div className="w-full grow bg-[#B72526] rounded-3xl flex justify-center items-center px-6">
            {/* <Image */}
            {/*   src={flag} */}
            {/*   className="absolute self-start -translate-x-[14rem] -translate-y-[8rem]" */}
            {/*   alt="flag" */}
            {/*   height={240} */}
            {/* /> */}
            {/* <Image */}
            {/*   src={coin} */}
            {/*   className="absolute translate-x-[12rem] translate-y-[16rem]" */}
            {/*   alt="flag" */}
            {/*   height={180} */}
            {/* /> */}
            <div className="text-9xl text-[#ECC158] font-bold select-none grid grid-cols-3 w-full justify-items-center">
              <div className="">{firstDigit}</div>
              <div className="">{secondDigit}</div>
              <div className="">{thirdDigit}</div>
            </div>
            {isExploding && (
              <Confetti
                recycle={false}
                numberOfPieces={3000}
                tweenDuration={10000}
                initialVelocityY={{ min: -20, max: 20 }}
              />
            )}
            <audio ref={drumrollRef} src="/drumroll.wav" />
            <audio ref={audioRef} src="/kids-cheering.mp3" />
          </div>
          <Button
            autoFocus
            className=" w-full text-4xl text-[#ECC158] font-bold bg-[#B72526] rounded-2xl hover:bg-[#B72526EE] p-10"
            onClick={draw}
          >
            Xổ Số
          </Button>
        </div>
      </div>
    </div>
  );
}
