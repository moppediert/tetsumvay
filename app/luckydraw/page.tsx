"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import backgroundImage from "../tet.png";
import logo from "../logo.png";
import logoTeam from "../logo-team.png";
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

  React.useEffect(() => {
    console.log("what");
    const down = (event: KeyboardEvent) => {
      event.preventDefault();
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
    let timer1 = setInterval(() => {
      let randomDigit = Math.floor(Math.random() * 10);
      setFirstDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setSecondDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setThirdDigit(randomDigit);
      counter += 1;
      if (counter > 50) {
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
    }, 30);
  }, [number]);

  return (
    <div className="flex flex-col justify-center items-center h-full bg-[#FFF5D7] gap-4">
      <div className="h-[80%] w-[80%] fixed"></div>
      <Image
        src={logoTeam}
        alt="logo-team"
        className="fixed left-0 top-0"
        height={240}
      />
      <Image
        src={logo}
        alt="logo"
        className="fixed right-0 top-0"
        height={240}
      />
      <div className="h-96 w-72 bg-[#B72526] rounded-3xl flex justify-center items-center">
        <div className="text-9xl text-[#ECC158] font-bold select-none">{`${firstDigit}${secondDigit}${thirdDigit}`}</div>
        {isExploding && (
          <Confetti
            recycle={false}
            numberOfPieces={3000}
            tweenDuration={10000}
            initialVelocityY={{ min: -20, max: 20 }}
          />
        )}
        <audio ref={audioRef} src="/kids-cheering.mp3" />
      </div>
      <Button
        className="h-24 w-72 text-5xl text-[#4E6618] font-bold border-[#B72526] border-4 rounded-2xl bg-transparent hover:bg-[#B72526] hover:text-[#ECC158] z-10"
        onClick={draw}
      >
        Xổ Số
      </Button>
      <Image
        src={backgroundImage}
        alt="background"
        height={480}
        className="fixed bottom-0 left-0"
      />
    </div>
  );
}
