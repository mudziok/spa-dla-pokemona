import * as React from 'react';

const SvgArrow = (props) => (
  <svg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M9 1 5.187 4.813 1.376 1'
      stroke={props}
      strokeWidth={1.2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default SvgArrow;
