import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ size = 'medium', fullScreen = false, text = 'Carregando...' }) => {
  const sizeClass = `loading-spinner--${size}`;
  const fullScreenClass = fullScreen ? 'loading-spinner--fullscreen' : '';

  return (
    <div className={`loading-spinner ${sizeClass} ${fullScreenClass}`}>
      <div className="loading-spinner__container">
        <div className="loading-spinner__animation"></div>
        {text && <p className="loading-spinner__text">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;