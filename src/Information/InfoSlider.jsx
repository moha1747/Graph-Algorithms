import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../Context/AppContext";
import GitHubLogo from "../Icons/GitHub_Logo.png";
import GitHubMark from "../Icons/github-mark.png";
import { SliderArrow } from "./SliderArrow";
import { SliderContent } from "./SliderContent";

export const InfoSlider = () => {
  const { setIsInfoRendered, slideIndex, setSlideIndex } =
    useContext(AppContext);

  // Go to slide to the right, unless at last index, then go to first slide
  const nextSlideButton = () => {
    if (slideIndex === SliderContent.length - 1) setSlideIndex(0);
    else setSlideIndex(slideIndex + 1);
  };

  // Go to slide to the left, unless at first index, then go to last slide
  const prevSlideButton = () => {
    if (slideIndex === 0) setSlideIndex(SliderContent.length - 1);
    else setSlideIndex(slideIndex - 1);
  };

  // Change which dot is marked at the bottom of InfoWindow
  const moveDot = (index) => {
    setSlideIndex(index);
  };

  // useRef for popup window
  const windowRef = useRef(null);

  useEffect(() => {
    // Close Information popup when clicking outside of Information window
    function handleClickOutside(event) {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        setIsInfoRendered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="popupBackground">
      <div ref={windowRef} className="popupBackdrop infoBackdrop">
        <div className="infoContainer">
          <div className="infoButtonBack">
            <button
              className="popupButton"
              onClick={() => setIsInfoRendered(false)}
            >
              Close
            </button>
          </div>
          <div className="infoMain">
            {/* Show left arrow button if prev slide is available */}
            <div className="sliderSideContainer">
              <SliderArrow changeSlide={prevSlideButton} direction={"prev"} />
            </div>
            <div className="sliderContentContainer">
              {/* Fill each slide with corresponding index in SliderContent */}
              {SliderContent.map((obj, index) => {
                return (
                  <div
                    key={obj.id}
                    className={
                      slideIndex === index ? "slide slideCurrent" : "slide"
                    }
                  >
                    {SliderContent[index].title}
                    {SliderContent[index].text}
                  </div>
                );
              })}
            </div>

            {/* Show right arrow button if next slide is available */}
            <div className="sliderSideContainer">
              <SliderArrow changeSlide={nextSlideButton} direction={"next"} />
            </div>
          </div>
          {/* Create clickable dots at bottom of window based on SliderContent elements */}
          <div className="sliderDots">
            {Array.from({ length: SliderContent.length }).map((item, index) => (
              <div
                key={`slider-dot-${index}`}
                onClick={() => moveDot(index)}
                className={slideIndex === index ? "dot active" : "dot"}
              ></div>
            ))}
          </div>
          <div
            className="githubContainer"
            title="Visit the project's GitHub repo"
          >
            <a
              className="githubLink"
              href="https://github.com/moha1747/Graph-Algorithms"
              target="_blank"
              rel="noreferrer"
            >
              <img src={GitHubMark} alt="GitHub Mark" width={30} />
              <img src={GitHubLogo} alt="GitHub Logo" width={73} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
