import React from 'react';
import PropTypes from 'prop-types';

const Section = (props) => {
  const { children } = props;
  return (
    <section
      data-index="0"
      data-background-video-loop="true"
      data-background-video-muted="true"
      data-background-color=""
      data-transition="slide-in slide-out"
    >
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
};

Section.defaultProps = {
  children: '',
};


export default Section;
