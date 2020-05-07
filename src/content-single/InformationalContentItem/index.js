import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Placeholder from './Placeholder';
import Banner from '../Banner';
import Detail from './Detail';

import { ErrorBlock } from '../../ui';

const InformationalContentItem = ({
  itemId, content, loading, error,
}) => {
  if (loading) { return <Placeholder />; }

  if (error || (!loading && !content)) {
    console.log({ error });
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return (
      <ErrorBlock />
    );
  }

  return (
    <div>
      <Banner {...content} />
      <Detail {...content} />
    </div>
  );
};

InformationalContentItem.propTypes = {
  itemId: PropTypes.string,
};

InformationalContentItem.defaultProps = {
};

export default InformationalContentItem;
