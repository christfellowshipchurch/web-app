import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { ErrorBlock } from '../../ui'
import SEO from '../../seo'

import Placeholder from './Placeholder';
import Banner from '../Banner';
import Detail from './EventDetail';

const EventContentItem = ({
  itemId, content, loading, error,
}) => {
  if (loading) { return <Placeholder />; }

  if (error || (!loading && !content)) {
    console.log({ error });
    return <ErrorBlock />
  }

  return (
    <div>
      <SEO 
        title={get(content, 'title', 'Christ Fellowship')}
        image={get(content, 'coverImage.sources[0].uri', '')}
        // openGraphProtocols={[
        //   {
        //     property: 'title',
        //     content: get(content, 'title', 'Christ Fellowship')
        //   },
        //   {
        //     property: 'image',
        //     content: get(content, 'coverImage.sources[0].uri', '')
        //   }
        // ]}
      />
      <Banner {...content} />
      <Detail {...content} />
    </div>
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
};

EventContentItem.defaultProps = {
};

export default EventContentItem;
