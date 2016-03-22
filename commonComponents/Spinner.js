const React = require('react');
const _ = require('lodash');
const {PropTypes} = React;

function Spinner({size, strokeColor, strokeWidth, style, className}) {
  return (
    <div style={_.extend({}, {width: size, height: size, display: 'inline-block'}, style)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        className={`nux-spinner ${className || ''}`}
        x="0px"
        y="0px"
        viewBox="0 0 612 612"
        enable-background="new 0 0 612 612"
        style={{width:'100%', height:'100%'}}
        >
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeMiterlimit="10" fill="none">
          <path strokeOpacity="1.0" d="M144.626,447.06 c-30.106-34.44-49.238-78.46-52.47-126.371" />
          <path strokeOpacity="0.9" d="M164.855,144.703 c34.425-30.125,78.435-49.281,126.343-52.537" />
          <path strokeOpacity="0.8" d="M92.156,291.47 c3.298-48.542,22.524-92.199,52.216-126.239" />
          <path strokeOpacity="0.7" d="M291.47,519.843 c-48.583-3.301-92.273-22.557-126.325-52.291" />
          <path strokeOpacity="0.6" d="M446.977,467.448 c-34.455,30.086-78.485,49.196-126.401,52.402" />
          <path strokeOpacity="0.5" d="M519.844,320.53 c-3.305,48.624-22.589,92.345-52.367,126.411" />
          <path strokeOpacity="0.4" d="M320.53,92.157 c48.502,3.296,92.126,22.492,126.154,52.14" />
          <path strokeOpacity="0.3" d="M467.222,164.771 c30.144,34.412,49.325,78.411,52.604,126.314" />
        </g>
      </svg>
    </div>
  );
}

Spinner.displayName = 'Spinner';
Spinner.propTypes = {
  size: PropTypes.number.isRequired,
  strokeColor: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired
};
Spinner.defaultProps = {
  size: 74,
  strokeColor: '#1a7ee7',
  strokeWidth: 40
};
module.exports = Spinner;
