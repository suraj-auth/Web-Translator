import React, { useRef } from "react";
import languageCodes from "../country.js";
import audios from "../assets/beep.wav";
import { useContext } from "react";
import { LanguageContext } from "../context.js";
function LeftPart() {
  const value = useContext(LanguageContext);
  const LeftBtnRef = useRef();
  const audioRef = useRef();
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  async function startListening() {
    const permissionStatus = await navigator.permissions.query({
      name: "microphone",
    });
    if (permissionStatus.state != "granted") {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } else {
      audioRef.current.playbackRate += 2.5;
      audioRef.current.play();
      recognition.lang = value.LeftSelectRef.current.value;
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.start();
      recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        value.TextRef.current.value = transcript;
      });
    }
  }
  async function stopListening() {
    recognition.stop();
  }
  return (
    <div className="rounded-3xl w-full">
      <div className="border-b-2 min-h-[5vh] sm:min-h-[10vh] 800px:px-0 px-5 border-teal-300 flex items-center py-2">
        <div className="w-3/4 flex items-center justify-start gap-3">
          <h1 className="font-semibold 800px:block hidden text-lg pl-4">
            Language
          </h1>
          <select
            ref={value.LeftSelectRef}
            defaultValue="en-US"
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
          <h1 className="font-semibold text-lg pr-5 text-green-300">From </h1>
        </div>
      </div>
      <div className="h-[20vh] sm:h-[35vh] w-full">
        <textarea
          ref={value.TextRef}
          className="p-5 text-xl font-medium h-full w-full bg-transparent border-hidden outline-none text-slate-300"
          name=""
          id=""
          placeholder="Enter Text here..."
        ></textarea>
      </div>
      <div className="border-t-2 flex items-center justify-around min-h-[6vh] sm:min-h-[10vh] border-teal-300">
        <h1 className="text-xl text-gray-900 font-semibold">Hold To Speak</h1>
        <i
          ref={LeftBtnRef}
          className="fa-solid select-none fa-microphone text-lime-400 text-3xl cursor-pointer"
          onMouseDown={() => {
            LeftBtnRef.current.classList.remove("text-lime-400");
            LeftBtnRef.current.classList.add("text-red-500");
            startListening();
          }}
          onMouseUp={() => {
            stopListening();
            LeftBtnRef.current.classList.remove("text-red-500");
            LeftBtnRef.current.classList.add("text-lime-400");
          }}
          onTouchStart={() => {
            LeftBtnRef.current.classList.remove("text-lime-400");
            LeftBtnRef.current.classList.add("text-red-500");
            startListening();
          }}
          onTouchEnd={() => {
            stopListening();
            LeftBtnRef.current.classList.remove("text-red-500");
            LeftBtnRef.current.classList.add("text-lime-400");
          }}
        ></i>
        <audio ref={audioRef} src={audios}></audio>
      </div>
    </div>
  );
}
export default LeftPart;
