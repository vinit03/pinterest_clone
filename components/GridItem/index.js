import React from 'react';
import PropTypes from 'prop-types';
import ImageLink from './ImageLink';
import Tags from './Tags';

const GridItem = ({ item }) => {
  const { image_url: imageUrl, name, url, tags } = item;
  return (
    <div className={'item'}>
      <ImageLink imageUrl={imageUrl} name={name} url={url} />
      {tags && <Tags tags={tags.split(',')} />}

      <a href={url} target={'_blank'} title={name} rel="noreferrer">
        <h3 className={'name text-sm mt-2 truncate '}>{name}</h3>
      </a>
    </div>
  );
};

GridItem.propTypes = {
  item: PropTypes.object,
};

export default GridItem;
