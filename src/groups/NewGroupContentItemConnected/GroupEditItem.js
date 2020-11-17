import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from 'react-bootstrap';
import styled from 'styled-components';
import { AngleDown } from 'ui/Icons';

const IconRotator = styled.span`
  transform: rotate(0deg);
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.rotate ? `rotate(180deg)` : '')};
`;

const Header = styled.div``;

const GroupEditItem = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header
        onClick={() => setIsOpen(!isOpen)}
        className={classnames(
          'p-3',
          'w-100',
          'text-left',
          'bg-transparent',
          'rounded',
          'focus-indicator-none',
          'd-flex',
          'flex-row',
          'justify-content-between',
          'align-items-center',
          'border-0',
          'text-dark'
        )}
        style={{ cursor: 'pointer' }}
      >
        <span>{title}</span>
        <IconRotator rotate={isOpen}>
          <AngleDown size="48" />
        </IconRotator>
      </Header>
      <Collapse in={isOpen}>
        <div className="mx-3" style={{ position: 'relative' }}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

GroupEditItem.propTypes = {
  title: PropTypes.string,
};

export default GroupEditItem;
