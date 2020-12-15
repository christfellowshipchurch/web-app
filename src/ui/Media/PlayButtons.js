import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from '../Icons';

export const CenterPlayButton = ({ onClick }) => (
  <div
    className="fill d-flex justify-content-center align-items-center"
    style={{ zIndex: 900 }}
  >
    <div
      className={classnames(
        'cursor-hover',
        'd-flex',
        'align-items-center',
        'justify-content-center'
      )}
      onClick={onClick}
    >
      <Icon
        className={classnames(
          'd-flex',
          'justify-content-center',
          'bg-dark',
          'p-3',
          'rounded-circle'
        )}
        name="play"
        fill="white"
        size={35}
      />
    </div>
  </div>
);

export const ImagePlayButton = ({ onClick, image }) => (
  <div
    className="fill d-flex justify-content-start align-items-end"
    style={{ zIndex: 900 }}
  >
    <div
      className={classnames(
        'cursor-hover',
        'scale-media-up-on-hover',
        'ml-3',
        'd-flex',
        'align-items-center',
        'justify-content-center'
      )}
      onClick={onClick}
      style={{
        position: 'relative',
        top: 20,
      }}
    >
      <img
        alt=""
        className="rounded gradient-black"
        src={image}
        style={{
          height: 60,
          width: 'auto',
          zIndex: 950,
        }}
      />
      <div
        className="p-absolute flex-column"
        style={{
          zIndex: 1000,
        }}
      >
        <Icon
          className="d-flex justify-content-center"
          name="play"
          fill="white"
          size={20}
        />
        <p
          className="text-white mb-0"
          style={{
            fontSize: 12,
          }}
        >
          Play
        </p>
      </div>
    </div>
  </div>
);
