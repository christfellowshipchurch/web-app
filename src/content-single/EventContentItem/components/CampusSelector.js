import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { isString } from 'lodash';

import { Card, Icon } from 'ui';

const CampusSelectToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="w-100"
    style={{
      verticalAlign: 'middle',
      cursor: 'pointer',
    }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="h4">
      {isString(children) ? children : 'Unknown Campus'}
      <Icon className="ml-2 float-right" name="angle-down" size="22" />
    </span>
  </div>
));

CampusSelectToggle.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
};

CampusSelectToggle.defaultProps = {
  children: {},
  onClick: () => {},
};

const CampusSelector = ({ campuses, onChange, defaultCampus }) => {
  const id = 'event-campus-selector';

  // Defaults to first Campus for now
  const options = [...campuses];
  const [selected, setSelected] = useState(
    options.includes(defaultCampus) ? defaultCampus : options[0]
  );

  // when the selection changes, call the onChange method
  useEffect(() => onChange(selected), [selected]);

  return (
    <Card className="mb-3">
      <Dropdown
        id={id}
        onSelect={(key, e) => {
          e.preventDefault();
          const index = parseInt(key, 10);
          setSelected(options[index]);
        }}
      >
        <Dropdown.Toggle variant="link" id={id} as={CampusSelectToggle}>
          {selected}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((campus, i) => (
            <Dropdown.Item
              key={`CampusSelector:${i}`}
              eventKey={i}
              active={campus === selected}
            >
              {campus}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
};

CampusSelector.propTypes = {
  campuses: PropTypes.object,
  onChange: PropTypes.func,
  defaultCampus: PropTypes.object,
};

CampusSelector.defaultProps = {
  campuses: {},
  onChange: () => {},
  defaultCampus: {},
};

export default CampusSelector;
