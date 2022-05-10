import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags, setQuery }) => {
  const [scroll, setScroll] = useState('left');
  const tagsEl = useRef(null);

  const scrollToRight = () => {
    const width = tagsEl.current.scrollWidth;
    const currentScroll = tagsEl.current.scrollLeft;
    const parentWidth = tagsEl.current.parentElement.clientWidth;
    const scrollTo = currentScroll + (parentWidth * 3) / 5;
    tagsEl.current.scroll({
      left: scrollTo,
      top: 0,
      behavior: 'smooth',
    });
    if (scrollTo + parentWidth >= width) {
      setScroll('right');
    } else if (scrollTo !== 0 && scroll !== 'inProgress') {
      setScroll('inProgress');
    }
  };
  const scrollToLeft = () => {
    const width = tagsEl.current.scrollWidth;
    const currentScroll = tagsEl.current.scrollLeft;
    const parentWidth = tagsEl.current.parentElement.clientWidth;
    const scrollTo = currentScroll - (parentWidth * 3) / 5;
    tagsEl.current.scroll({
      left: scrollTo,
      top: 0,
      behavior: 'smooth',
    });
    if (scrollTo <= 0) {
      setScroll('left');
    } else if (scrollTo + parentWidth < width - 50 && scroll !== 'inProgress') {
      setScroll('inProgress');
    }
  };
  return (
    <>
      <div className={'relative'}>
        <div
          ref={tagsEl}
          className={'tags flex overflow-hidden gap-1 whitespace-nowrap'}
        >
          {scroll !== 'left' && (
            <button
              onClick={scrollToLeft}
              className={
                'absolute left-0 top-1/2 h-full -translate-y-1/2 pl-2 pr-5 gradient-r'
              }
            >
              <svg
                className="Hn_ gUZ ztu U9O kVc"
                height="8"
                width="8"
                viewBox="0 0 24 24"
                aria-label="Scroll"
                role="img"
              >
                <path d="M17.28 24c-.57 0-1.14-.22-1.58-.66L4.5 12 15.7.66a2.21 2.21 0 0 1 3.15 0c.87.88.87 2.3 0 3.18L10.79 12l8.06 8.16c.87.88.87 2.3 0 3.18-.44.44-1 .66-1.57.66"></path>
              </svg>
            </button>
          )}
          {tags.map((tag) => (
            <button
              type={'button'}
              onClick={() => setQuery(tag)}
              key={tag}
              className={
                'bg-gray-200 rounded-3xl text-xs font-medium py-1 px-2 inline-block cursor-pointer'
              }
            >
              {tag}
            </button>
          ))}
          {scroll !== 'right' && (
            <button
              onClick={scrollToRight}
              className={
                'absolute right-0 top-1/2 h-full -translate-y-1/2 pr-2 pl-5 gradient-l'
              }
            >
              <svg
                className="Hn_ gUZ ztu U9O kVc"
                height="8"
                width="8"
                viewBox="0 0 24 24"
                aria-label="Scroll"
                role="img"
              >
                <path d="M6.72 24c.57 0 1.14-.22 1.57-.66L19.5 12 8.29.66c-.86-.88-2.27-.88-3.14 0-.87.88-.87 2.3 0 3.18L13.21 12l-8.06 8.16c-.87.88-.87 2.3 0 3.18.43.44 1 .66 1.57.66"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      <style jsx={'true'}>
        {`
          .gradient-r {
            background: linear-gradient(
              to right,
              rgb(255, 255, 255) 25%,
              rgba(255, 255, 255, 0) 100%
            );
          }
          .gradient-l {
            background: linear-gradient(
              to left,
              rgb(255, 255, 255) 25%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        `}
      </style>
    </>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  setQuery: PropTypes.func,
};

export default Tags;
