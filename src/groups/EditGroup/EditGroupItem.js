import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { themeGet, theme } from 'styles/theme';

const Action = styled.span`
  font-size: ${themeGet('fontSize.xsmall')};
  cursor: pointer;
`;

const EditGroupItem = ({ children, title, action, actionLabel }) => {
  return (
    <div>
      <div
        className={classnames(
          'mt-3',
          'd-flex',
          'flex-row',
          'justify-content-between',
          'align-items-center',
          'border-0',
          'text-dark'
        )}
        style={{ fontSize: theme.fontSize.h4 }}
      >
        <span>{title}</span>
        <Action className="btn-link" onClick={action}>
          {actionLabel}
        </Action>
      </div>
      <div style={{ position: 'relative', minHeight: 50 }}>{children}</div>
    </div>
  );
};

EditGroupItem.defaultProps = {
  action: () => {},
};

EditGroupItem.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  actionLabel: PropTypes.string,
};

export default EditGroupItem;
