import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageLink = ({ imageUrl, name, url }) => {
  const [imgLoading, setImageLoading] = useState(true);
  return (
    <>
      <a
        href={url}
        target={'_blank'}
        className={`item-link overflow-hidden rounded-2xl block mb-2 ${
          imgLoading ? `animate-pulse bg-grey h-52` : ''
        }`}
        rel="noreferrer"
        title={name}
      >
        <div className="img-wrapper relative">
          <img
            src={imageUrl}
            onLoad={() => setImageLoading(false)}
            alt={name}
            className={'w-full h-auto'}
          />
          <div
            className={
              'absolute top-0 left-0 w-full h-full flex justify-center opacity-0 text-white font-medium text-2xl bg-black/70 items-center link-text transition-all'
            }
          >
            Open
          </div>
        </div>
      </a>
      <style jsx={'true'}>{`
        .item-link:hover .link-text {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

ImageLink.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
};

export default ImageLink;
