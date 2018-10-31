import React from 'react';
import PropTypes from 'prop-types';

const Photo = (props) => {
  const { name, imgSrc, imgWidth, description, deg } = props;
  return (
    <div className="photo" style={{ transform: `rotate(${deg})` }}>
      <img src={imgSrc} alt={name} width={imgWidth} />
      <p className="description-text">{description}</p>
    </div>
  );
};

Photo.propTypes = {
  name: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imgWidth: PropTypes.string,
  description: PropTypes.string,
  deg: PropTypes.string,
};

Photo.defaultProps = {
  name: '',
  description: '',
  imgWidth: '200px',
  deg: '7deg',
};

export default Photo;
