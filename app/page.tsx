"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const [firstDigit, setFirstDigit] = React.useState(0);
  const [secondDigit, setSecondDigit] = React.useState(0);
  const [thirdDigit, setThirdDigit] = React.useState(0);

  const [number, setNumber] = React.useState(0);
  const draw = () => {
    // random between one and MAX
    setNumber(Math.floor(Math.random() * 150) + 1);
  };
  React.useEffect(() => {
    let timer1 = setTimeout(async (num) => {
      let randomDigit = Math.floor(Math.random() * 10);
      setFirstDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setSecondDigit(randomDigit);
      randomDigit = Math.floor(Math.random() * 10);
      setThirdDigit(randomDigit);

      await new Promise((r) => setTimeout(r, 100));
    }, 3 * 1000);

    let digits = number.toString().split("").map(Number);
    if (digits.length == 2) {
      digits.splice(0, 0, 0);
    } else if (digits.length == 1) {
      digits.splice(0, 0, ...[0, 0]);
    }
    console.log(digits);
    setFirstDigit(digits[0]);
    setSecondDigit(digits[1]);
    setThirdDigit(digits[2]);

    clearTimeout(timer1);
  }, [number]);
  return (
    <div className="flex flex-col justify-center items-center h-full bg-[#FFF5D7] gap-4">
      <div className="h-96 w-72 bg-[#B72526] rounded-3xl flex justify-center items-center">
        <div className="text-9xl text-[#ECC158] font-bold">{`${firstDigit}${secondDigit}${thirdDigit}`}</div>
      </div>
      <Button
        className="h-24 w-72 text-5xl text-[#4E6618] font-bold border-[#B72526] border-4 rounded-2xl bg-transparent hover:bg-[#B72526] hover:text-[#ECC158]"
        onClick={draw}
      >
        Xổ Số
      </Button>
    </div>
  );
}
