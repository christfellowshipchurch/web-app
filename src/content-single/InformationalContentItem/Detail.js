import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Card,
} from '../../ui';

import { htmlToReactParser } from '../../utils';

const Detail = ({
  id,
  title,
  summary,
  htmlContent,
  tags,
  callsToAction,
}) => (
    <div className={classnames(
      'container-fluid',
      'mb-4',
      'px-3',
    )}
    >
      {(title !== ''
        || summary !== '')
        && (
          <div className="mt-4 mb-2">
            <h1 className="mb-2 text-dark">
              {title}
            </h1>
            <h3 className="mt-1 content-subtitle font-weight-light">
              {summary}
            </h3>
          </div>
        )}

      <div className="row mx-n2">
        {callsToAction.length > 0 && (
          <div className="col-12 col-md-5 col-lg-4 p-2">
            <Card>
              {callsToAction.map((cta, i) => (
                <a
                  key={`${cta.call}:${i}`}
                  className={classnames(
                    'btn',
                    'btn-primary',
                    'btn-block',
                    'my-3',
                  )}
                  href={cta.action}
                  target={cta.action.includes('http') ? '_blank' : ''}
                >
                  {cta.call}
                </a>
              ))}
            </Card>
          </div>
        )}

        <div className="col-12 col-md-7 col-lg-8 p-2">
          <Card
            className=""
          >
            <h3 className="text-dark">
              Details
          </h3>
            <div className="">
              {htmlToReactParser.parse(htmlContent)}
            </div>

            <div className="mx-n1">
              {tags.map((n, i) => (
                <span
                  key={i}
                  className={classnames(
                    'badge',
                    'badge-light',
                    'font-weight-normal',
                    'py-2',
                    'px-3',
                    'mx-1',
                  )}
                >
                  {n}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-12 col-lg-4 p-2">
          <EventShare />
        </div>
      </div> */}
    </div>
  );

Detail.propTypes = {
  htmlContent: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.string,
  ),
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }),
  ),
};

Detail.defaultProps = {
  htmlContent: '',
  tags: [],
  callsToAction: [],
};

export default Detail;
