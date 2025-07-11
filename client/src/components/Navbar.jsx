import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import logo from "../assets/logo.gif";

const Navbar = ({ useGemini, setUseGemini }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname === "/chat";

  const handleClose = () => {
    // Fade out navbar text before navigating
    gsap.to("#navbar h3", {
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        navigate("/");
      },
    });
  };

  return (
    <div
      id="navbar"
      className={`w-full flex items-center justify-between px-12 py-4 ${
        isChatPage ? "animate-slide-down" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="flex items-center rounded-full overflow-hidden cursor-pointer justify-between w-12 sm:w-10 sm:h-10 h-12">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </Link>

        {isChatPage && useGemini !== undefined && setUseGemini && (
          <div className="flex items-center gap-2 ml-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-white">Gemini AI</span>
              <input
                type="checkbox"
                checked={useGemini}
                onChange={() => setUseGemini((v) => !v)}
                className="appearance-none w-8 h-4 bg-gray-400 rounded-full relative transition-colors duration-300 outline-none focus:ring-2 focus:ring-purple-700
                  before:content-[''] before:absolute before:left-0 before:top-0 before:w-4 before:h-4 before:bg-white before:rounded-full before:shadow before:transition-transform before:duration-300
                  checked:bg-purple-700
                  checked:before:translate-x-4"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  position: "relative",
                  cursor: "pointer",
                }}
              />
            </label>
          </div>
        )}
      </div>

      <h3 className="text-white text-sm font-semibold sm:text-xl">
        {isChatPage ? (
          <button
            onClick={handleClose}
            className="hover:text-purple-700 transition-colors"
          >
            Close
          </button>
        ) : (
          <a
            href="https://organic-by-kabir.vercel.app"
            className="hover:text-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Organic
          </a>
        )}
      </h3>
    </div>
  );
};

export default Navbar;
