import { useGSAP } from "@gsap/react";
import React, { useRef, useEffect } from "react";
import audioclick from "./assets/audio-click.wav";
import logo from "./assets/logo.png";
import { LanguageContext } from "./context";
import bgi from "./assets/bg1.jpg";
import LeftPart from "./components/LeftPart";
import RightPart from "./components/RightPart";
import gsap from "gsap";
function App() {
  const adRef = useRef();
  const imgRef = useRef();
  const bgRef = useRef();
  const btnRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const headRef = useRef();
  const LeftSelectRef = useRef();
  const RightSelectRef = useRef();
  const TextRef = useRef();
  const OutputRef = useRef();
  useEffect(() => {
    // Create a gsap.matchMedia instance
    const mm = gsap.matchMedia();

    // Animation for screens larger than 640px (greater than or equal to 'sm')
    mm.add("(min-width: 640px)", () => {
      const timeline = gsap.timeline();
      timeline.from(bgRef.current, {
        scale: 0,
        duration: 0.7,
        delay: 0.5,
      });
      timeline.fromTo(
        imgRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          delay: 0.7,
          opacity: 1,
        }
      );
      timeline.to(imgRef.current, {
        delay: 0.7,
        rotation: 720,
        top: "13%",
        left: "5%",
        transformOrigin: "50% 50%",
        duration: 1.3,
        ease: "power2.out",
      });
      timeline.fromTo(
        headRef.current,
        {
          top: "10%",
          left: "5%",
          opacity: 0,
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          top: "10%",
          left: "11%",
          transformOrigin: "50% 50%",
        }
      );

      gsap.from(leftRef.current, {
        delay: 4.5,
        opacity: 0,
        x: -300,
      });
      gsap.from(rightRef.current, {
        delay: 4.5,
        opacity: 0,
        x: 300,
      });
      gsap.from(btnRef.current, {
        y: 200,
        opacity: 0,
        delay: 4.5,
      });
    });

    // Animation for screens smaller than 640px (less than 'sm')
    mm.add("(max-width: 639px)", () => {
      const timeline = gsap.timeline();
      timeline.from(bgRef.current, {
        scale: 0, // Adjust scale for smaller screens
        duration: 0.7,
        delay: 0.5,
      });
      timeline.fromTo(
        imgRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 0.8, // Smaller image scale for smaller screens
          delay: 0.7,
          opacity: 1,
        }
      );
      timeline.to(imgRef.current, {
        delay: 0.7,
        rotation: 360, // Fewer rotations for smaller screens
        top: "5%", // Adjust position for smaller screens
        left: "15%",
        transformOrigin: "50% 50%",
        duration: 1.3,
        ease: "power2.out",
      });
      timeline.fromTo(
        headRef.current,
        {
          top: "3%",
          left: "10%",
          opacity: 0,
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          top: "3%",
          left: "30%",
          transformOrigin: "50% 50%",
        }
      );

      gsap.from(leftRef.current, {
        delay: 4.5,
        opacity: 0,
        x: -200, // Adjust X movement for smaller screens
      });
      gsap.from(rightRef.current, {
        delay: 4.5,
        opacity: 0,
        x: 200, // Adjust X movement for smaller screens
      });
      gsap.from(btnRef.current, {
        y: 150, // Adjust Y movement for smaller screens
        opacity: 0,
        delay: 4.5,
      });
    });

    // Clean up the matchMedia instance when the component unmounts
    return () => mm.revert();
  }, []);
  async function translater() {
    try {
      let l = LeftSelectRef.current.value;
      let r = RightSelectRef.current.value;
      let left = l.slice(0, l.indexOf("-"));
      let right = r.slice(0, r.indexOf("-"));
      if (left == "zh") left = "zh-CN";
      else if (right == "zh") right = "zh-CN";
      let query = TextRef.current.value.trim();
      if (query === "") {
        alert("Please enter some text in the box before playing it!");
        return;
      }
      const url = `https://free-google-translator.p.rapidapi.com/external-api/free-google-translator?from=${left}&to=${right}&query=${query}`;
      const options = {
        method: "POST",
        headers: {
          "x-rapidapi-key":
            "7079ae9c40msh2da0fdac9243c40p15823ajsnb7c3c39f0109",
          "x-rapidapi-host": "free-google-translator.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: {
          translate: "rapidapi",
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      OutputRef.current.value = result.translation;
    } catch (error) {
      OutputRef.current.value =
        "There Is Some Server Issue , Sorry for Inconvenience";
      console.error(error);
    }
  }
  return (
    <>
      <LanguageContext.Provider
        value={{ LeftSelectRef, RightSelectRef, TextRef, OutputRef }}
      >
        <div className="relative border-2 border-teal-400 h-screen w-screen overflow-hidden box-border">
          <h1
            ref={headRef}
            className="absolute text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 z-10 bg-clip-text text-transparent"
          >
            Web-Translator
          </h1>
          <img
            ref={imgRef}
            className="h-[12vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 absolute rounded-full "
            src={logo}
            alt=""
          />
          <img
            ref={bgRef}
            src={bgi}
            alt=""
            className="h-[100vh] sm:h-[95vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute sm:rounded-3xl sm:w-[98vw] w-[100vw]"
          />
          <div className="z-30 sm:flex-row flex-col sm:top-1/2 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5 absolute overflow-hidden">
            <div
              ref={leftRef}
              className="rounded-3xl backdrop-blur-sm w-[80vw] sm:w-[40vw] lg:w-[30vw] border-2 border-teal-300"
            >
              <LeftPart />
            </div>
            <div
              ref={rightRef}
              className="rounded-3xl backdrop-blur-sm w-[80vw] sm:w-[40vw] lg:w-[30vw] border-2 border-teal-300"
            >
              <RightPart />
            </div>
          </div>
          <div className="z-30 top-[85%] sm:top-[87%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute">
            <button
              className="bg-emerald-700 text-white font-semibold text-lg border-2 border-black rounded-full w-28 h-10"
              ref={btnRef}
              onClick={() => {
                adRef.current.play();
                translater();
              }}
            >
              Translate
            </button>
          </div>
          <audio ref={adRef} src={audioclick}></audio>
        </div>
      </LanguageContext.Provider>
    </>
  );
}
export default App;
