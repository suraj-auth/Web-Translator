import React from "react";
import languageCodes from "../country.js";
import { useContext } from "react";
import { LanguageContext } from "../context.js";
function RightPart() {
  const value = useContext(LanguageContext);
  async function speaker() {
    const text = value.OutputRef.current.value;
    if (text.trim() === "") {
      alert("Please enter some text in the box before playing it!");
      return;
    } else {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = value.RightSelectRef.current.value;
        utterance.pitch = 1;
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.log("bolne m error hai");
      }
    }
  }
  return (
    <div className="rounded-3xl w-full">
      <div className="border-b-2 min-h-[5vh] sm:min-h-[10vh] border-teal-300 flex items-center 800px:py-0 py-2 800px:px-0 px-5">
        <div className="w-3/4 flex items-center justify-start gap-3">
          <h1 className="font-semibold text-lg pl-4 800px:block hidden">
            Language
          </h1>
          <select
            ref={value.RightSelectRef}
            defaultValue="ru-RU"
            className="h-7 cursor-pointer rounded-lg bg-slate-700 text-white border-hidden outline-none custom-scroll"
          >
            {languageCodes.map((lg) => (
              <option
                key={lg.code}
                className="bg-slate-700 text-white"
                value={lg.code}
              >
                {lg.country}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4 flex justify-end">
          <h1 className="font-semibold text-lg pr-5 text-green-300">To </h1>
        </div>
      </div>
      <div className="h-[20vh] sm:h-[35vh] w-full">
        <textarea
          ref={value.OutputRef}
          className="p-5 text-xl font-medium h-full w-full bg-transparent border-hidden outline-none text-slate-300"
          placeholder="Enter Text here..."
        ></textarea>
      </div>
      <div className="border-t-2 min-h-[6vh] sm:min-h-[10vh] flex items-center justify-around border-teal-300">
        <h1 className="text-xl font-semibold text-gray-900">Click To Play</h1>
        <i
          className="fa-solid cursor-pointer fa-volume-high text-lime-400 text-3xl"
          onClick={() => {
            speaker();
          }}
        ></i>
      </div>
    </div>
  );
}

export default RightPart;
