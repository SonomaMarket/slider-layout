import React, { FC } from 'react'

import { useSliderState } from './SliderContext'
import sliderCSS from './slider.css'

const SliderTrack: FC = ({ children }) => {
  const {
    transform,
    slideWidth,
    slidesPerPage,
    currentSlide,
    totalItems,
    isOnTouchMove,
    slideTransition: { speed, timing, delay },
  } = useSliderState()

  const isSlideVisibile = (
    index: number,
    currentSlide: number,
    slidesToShow: number
  ): boolean => {
    return index >= currentSlide && index < currentSlide + slidesToShow
  }

  return (
    <div
      className={`${sliderCSS.sliderTrack} flex relative pa0 ma0`}
      style={{
        transition: isOnTouchMove
          ? undefined
          : `transform ${speed}ms ${timing}`,
        transitionDelay: `${delay}ms`,
        transform: `translate3d(${transform}px, 0, 0)`,
      }}
      aria-atomic="false"
      aria-live="polite"
    >
      {React.Children.toArray(children).map((child, index) => (
        <div
          key={index}
          className={`flex relative ${sliderCSS.slide}`}
          data-index={index}
          style={{
            width: `${slideWidth}px`,
          }}
          aria-hidden={
            isSlideVisibile(index, currentSlide, slidesPerPage)
              ? 'false'
              : 'true'
          }
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${totalItems}`}
        >
          <div className="w-100">{child}</div>
        </div>
      ))}
    </div>
  )
}

export default SliderTrack
