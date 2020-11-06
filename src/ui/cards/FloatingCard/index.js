import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Media } from 'ui';
import { Icon } from '../../Icons';

const FloatingCard = ({ children, overlay, onPressExit, headerImg }) => (
  <div
    className={classnames('p-fixed', 'vw-100', 'vh-100', 'overflow-y-scroll')}
    style={{
      zIndex: 1000,
      top: 0,
      left: 0,
    }}
  >
    <div
      className={classnames(
        'p-fixed',
        'w-100',
        'h-100',
        'bg-dark',
        'opacity-65',
        `bg-${overlay}`
      )}
    ></div>

    <div
      className={classnames('card', 'floating-card')}
      style={{
        maxWidth: 600,
        width: '90%',
        border: 'none',
      }}
    >
      {headerImg ? (
        <Media
          ratio={'16by9'}
          imageUrl={headerImg}
          imageAlt={`Christ Fellowship Church `}
          mediaItemStyles={{
            zIndex: -100,
            borderRadius: '0.3rem 0.3rem 0 0',
          }}
        >
          <div
            className={classnames(
              'location-banner',
              'd-flex',
              'justify-content-end',
              'align-items-start'
            )}
          >
            <div
              className="border-0 cursor-hover opacity-hover p-2"
              onClick={onPressExit}
            >
              <Icon
                name="times"
                className={'bg-dark py-2 px-1 rounded-circle'}
                size={30}
                fill={'#FFFFFF'}
              />
            </div>
          </div>
        </Media>
      ) : (
        <div
          className={classnames(
            'card-header',
            'bg-white',
            'text-right',
            'border-0',
            'sticky-top'
          )}
        >
          <button className="border-0 bg-white" onClick={onPressExit}>
            <Icon name="times" size={30} />
          </button>
        </div>
      )}

      <div className="card-body px-4 pt-0 pb-4">{children}</div>
    </div>
  </div>
);

FloatingCard.defaultProps = {
  overlay: 'dark',
  headerImg: null,
};

FloatingCard.propTypes = {
  overlay: PropTypes.oneOf(['dark', 'light', 'white']),
  headerImg: PropTypes.object,
};

export default FloatingCard;
