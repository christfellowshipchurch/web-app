import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, find, sortBy, forEach, uniqBy } from 'lodash';
import classnames from 'classnames';
import zipcodes from 'zipcodes';
import moment from 'moment';

import { AngleDown } from '../../ui/Icons';

import InputIcon from '../../ui/inputs/inputIcon';
import { FloatingCard, Button, Loader, Media, CardGrid } from '../../ui';
import RsvpForm from '../RsvpForm';

import { GET_CAMPUSES } from './queries';

export const normalizeDate = (date) => {
  if (!date || date === '') return '';

  const m = moment(date);
  const valuesToNormalize = ['hour', 'minute', 'second', 'millisecond'];

  forEach(valuesToNormalize, (n) => m.set(n, 0));

  return m.toISOString();
};

const StyledCampusSelect = ({ value, onChange, background, campuses, disabled }) => (
  <div
    className={classnames(
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'w-100',
      background,
      'border-0',
      'p-3',
      'w-100',
      'p-3',
      'rounded'
    )}
  >
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={classnames('w-100', 'h-100', 'border-0')}
    >
      {campuses.map((n, i) => (
        <option value={get(n, 'id', 'null')} key={i}>
          {get(n, 'name', '!! ERROR !!')}
        </option>
      ))}
    </select>
    <InputIcon icon={AngleDown} />
  </div>
);

export const CampusTile = ({
  name,
  street1,
  city,
  state,
  postalCode,
  image,
  serviceTimes,
  onClick,
  className,
  isRsvp,
}) => {
  const location = `${street1}+${city}+${state}+${postalCode}`;

  return (
    <div className={classnames('row', 'max-width-1100', className)}>
      <div className="col-12 col-md px-3">
        <Media ratio="1by1" imageUrl={get(image, 'uri', '')} imageAlt={name} rounded />
      </div>
      <div className="col px-3">
        <h2>{name}</h2>

        {serviceTimes.length > 0 && (
          <>
            <h3 className="mt-4">Service Times</h3>
            {uniqBy(serviceTimes, 'time').map((n, i) => {
              const isDate = moment(`${n.day} ${n.time}`).isValid();
              const title = isDate ? n.time : `${n.day.substring(0, 3)} - ${n.time}`;

              return (
                <h4 key={i} className="pl-2">
                  {title}
                </h4>
              );
            })}
            <p className="text-dark mt-4 mb-2">{`${street1}`}</p>
            <p className="text-dark mb-3">
              {`${city}, ${state} ${postalCode.substring(0, 5)}`}
            </p>
          </>
        )}

        {serviceTimes.length < 1 && (
          <>
            <h4 className="font-weight-normal py-3">
              Join the live online experience from wherever you are!
            </h4>
            <Button
              className="mt-3"
              title="Watch Online"
              href="https://live.christfellowship.church/"
            />
          </>
        )}

        {serviceTimes.length > 0 && (
          <>
            <Button
              title="Get Directions"
              type="dark"
              newTab
              href={`https://www.google.com/maps/dir/?api=1&destination=${location}`}
            />
          </>
        )}

        {/* TEMPORARLY HIDING RSVP BUTTONS WHILE CAMPUSES ARE CLOSED */}

        {isRsvp && serviceTimes.length > 0 && (
          <>
            <h2 className="mt-3">Select a service time to RSVP for:</h2>
            <div className="row mx-n2">
              {uniqBy(serviceTimes, 'time').map((n, i) => {
                const isDate = moment(`${n.day} ${n.time}`).isValid();
                const title = isDate ? n.time : `${n.day.substring(0, 3)} ${n.time}`;

                return (
                  <div key={i} className="col-sm-4 px-1 m-0">
                    <Button
                      title={title}
                      className="m-1 px-1 w-100"
                      onClick={() =>
                        onClick({
                          day: moment().add(1, 'week').isoWeekday(n.day),
                          time: n.time,
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CampusTile.defaultProps = {
  className: '',
  postalCode: '',
};

const CampusSelect = ({ background, isRsvp }) => {
  const [rsvpForm, setRsvpForm] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [activeCampus, setActiveCampus] = useState(null);
  const { loading, error, data: campusesData } = useQuery(GET_CAMPUSES);

  if (loading) {
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
        <Loader />
      </div>
    );
  }

  const campuses = get(campusesData, 'campuses', []);

  const visibleCampus = activeCampus || campuses[0];
  const inputBackground = background === 'bg-white' ? 'bg-light' : 'bg-white';

  return (
    <div className="container-fluid py-6">
      <div className="row">
        <div className="col text-center">
          <h2>Choose a Location Near You</h2>
        </div>
      </div>
      {!loading && !error && campuses && (
        <div
          className={classnames(
            'row',
            'justify-content-center',
            'align-items-center',
            'my-4',
            'px-3',
            'max-width-800',
            'mx-auto'
          )}
        >
          <div className="col-12 col-md px-3 my-3">
            <StyledCampusSelect
              value={get(activeCampus, 'id')}
              disabled={disabled}
              onChange={(e) => setActiveCampus(find(campuses, ['id', e.target.value]))}
              background={inputBackground}
              campuses={campuses}
            />
          </div>
          <div className="col px-3">
            <input
              className={classnames(
                'rounded',
                inputBackground,
                'border-0',
                'text-center',
                'p-3',
                'w-100'
              )}
              type="number"
              disabled={disabled}
              placeholder="Or Enter Your Zip Code"
              maxLength="5"
              onChange={(e) => {
                const { value } = e.target;

                if (value.length === 5) {
                  setDisabled(true);

                  const sortedCampuses = sortBy(campuses, [
                    (n) =>
                      zipcodes.distance(
                        parseInt(value),
                        parseInt(n.postalCode.substring(0, 5))
                      ),
                  ]);

                  setActiveCampus(sortedCampuses[0]);
                  setDisabled(false);
                }
              }}
            />
          </div>
        </div>
      )}

      {visibleCampus && (
        <>
          <CampusTile
            {...visibleCampus}
            onClick={({ day, time }) => {
              setRsvpForm({
                visitDate: normalizeDate(day),
                visitTime: time,
                campus: get(visibleCampus, 'name', ''),
              });
            }}
            isRsvp={isRsvp}
          />
          {/* Removing What's available at this location, will be completely deprecated soon */}
          {/* {visibleCampus.campusFeatures.length ? (
            <>
              <h1 className={classnames('pt-6', 'pb-5', 'mb-0', 'text-center')}>
                What's Available at this Location
              </h1>
              <CardGrid data={visibleCampus.campusFeatures} />
            </>
          ) : null} */}
        </>
      )}

      {rsvpForm && (
        <FloatingCard onPressExit={() => setRsvpForm(null)}>
          <RsvpForm initialValues={rsvpForm} />
        </FloatingCard>
      )}
    </div>
  );
};

CampusTile.defaultProps = {
  onClick: () => true,
};

CampusTile.propTypes = {
  onClick: PropTypes.func,
};

CampusSelect.defaultProps = {
  background: 'bg-white',
  isRsvp: false,
};

CampusSelect.propTypes = {
  background: PropTypes.oneOf(['bg-white', 'bg-light', 'bg-transparent']),
  isRsvp: PropTypes.bool,
};

export default CampusSelect;
