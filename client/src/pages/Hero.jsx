import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // SplitText animations
    const helloText = new SplitText("#hello", { type: "chars, words" });
    const organicText = new SplitText("#organic", { type: "chars, words" });

    // Initial text animation timeline
    const tl = gsap.timeline();

    gsap.from("#navbar h3", {
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from("#footer", {
      y: "100%",
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".txt", {
      x: "-100%",
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate "Hello!" text
    tl.from(helloText.chars, {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "power3.out",
    }).from(
      organicText.chars,
      {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
      },
      "-=0.3"
    ); // Start slightly before previous animation ends
    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Scroll trigger for redirect
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom bottom",
      end: "bottom top",
      onEnter: () => {
        // Reverse SplitText animation before redirect
        const reverseTl = gsap.timeline({
          onComplete: () => {
            navigate("/chat");
          },
        });

        reverseTl
          .to(organicText.chars, {
            x: "100%",
            opacity: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power3.in",
          })
          .to(
            helloText.chars,
            {
              x: "-100%",
              opacity: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "power3.in",
            },
            "-=0.2"
          )
          .to(
            ".txt",
            {
              x: "-100%",
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
            },
            "-=0.3"
          )
          .to(
            "#navbar h3",
            {
              opacity: 0,
              duration: 0.4,
              ease: "power3.in",
            },
            "-=0.2"
          )
          .to(
            "#footer",
            {
              y: "100%",
              duration: 0.4,
              ease: "power3.in",
            },
            "-=0.2"
          );
      },
    });

    // Alternative: Scroll down anywhere on the page
    let scrollCount = 0;
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        // Scrolling down
        scrollCount++;
        if (scrollCount >= 2) {
          // Reverse SplitText animation before redirect
          const reverseTl = gsap.timeline({
            onComplete: () => {
              navigate("/chat");
            },
          });

          reverseTl
            .to(organicText.chars, {
              x: "100%",
              opacity: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "power3.in",
            })
            .to(
              helloText.chars,
              {
                x: "-100%",
                opacity: 0,
                duration: 0.4,
                stagger: 0.02,
                ease: "power3.in",
              },
              "-=0.2"
            )
            .to(
              ".txt",
              {
                x: "-100%",
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
              },
              "-=0.3"
            )
            .to(
              "#navbar h3",
              {
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
              },
              "-=0.2"
            )
            .to(
              "#footer",
              {
                y: "100%",
                duration: 0.4,
                ease: "power3.in",
              },
              "-=0.2"
            );

          window.removeEventListener("wheel", handleWheel);
        }
      }
    };

    window.addEventListener("wheel", handleWheel);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-screen bg-[#0C0C0C] relative overflow-hidden"
    >
      <Navbar />

      <div
        ref={textRef}
        className="flex flex-col items-start justify-center h-[80%] px-10 sm:px-15"
      >
        <h1 id="hello" className="text-5xl sm:text-8xl font-bold text-white">
          Hello!
        </h1>
        <h1 id="organic" className="text-4xl sm:text-8xl font-bold text-white">
          I'm OrganicAI
        </h1>
        <div className="text-xl overflow-hidden sm:text-2xl font-medium sm:px-4 py-4">
          <p className="w-full txt sm:w-[70%] text-white">
            An organic-farming helpful assistant based on gemini.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute sm:block hidden bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      >
        <div className="text-sm mb-2">Scroll down to chat</div>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      <div
        id="footer"
        className="flex px-10 sm:px-15 items-center justify-between absolute bottom-4 left-0 right-0"
      >
        <div className="flex flex-col">
          <a
            href="https://organic-by-kabir.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-700 transition-colors"
          >
            Organic
          </a>
          <a
            href="https://github.com/weirdshxt/OrganicAI.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:weirdsht@yahoo.com"
            className="text-white hover:text-purple-700 transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="h-fit pr-2 text-xl font-semibold">
          <Link
            to="/chat"
            className="text-white hover:text-purple-700 transition-colors"
          >
            Chat |
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
