import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useQuery } from 'react-apollo';
import { get, find, kebabCase } from 'lodash';

import { Carousel } from 'react-bootstrap';
import FilterRow from './FilterRow';
import CategoryList from './CategoryList';
import SeeAllCategory from './SeeAllCategory';
import Search from './Search';
import { GET_FILTERS } from './queries';

const Browse = ({
  filter: defaultFilter,
  category: defaultCategory,
  title: defaultTitle,
}) => {
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeFilterTitle, setActiveFilterTitle] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [index, setIndex] = useState(0);

  const { data } = useQuery(GET_FILTERS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const filters = get(
        data,
        'getBrowseFilters[0].childContentItemsConnection.edges',
        []
      );
      const firstFilter = get(filters, '[0].node', '');
      const filterId = defaultFilter
        ? get(
            find(filters, (n) => kebabCase(defaultFilter) === kebabCase(n.node.title)),
            'node.id',
            firstFilter.id
          )
        : firstFilter.id;

      const filterTitle = defaultFilter
        ? get(
            find(filters, (n) => kebabCase(defaultFilter) === kebabCase(n.node.title)),
            'node.title',
            firstFilter.title
          )
        : firstFilter.title;

      setActiveFilterId(filterId);
      setActiveFilterTitle(filterTitle);
    },
  });

  const filters = get(
    data,
    'getBrowseFilters[0].childContentItemsConnection.edges',
    []
  ).map((edge) => edge.node);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={classnames('container-fluid', 'mt-4', 'mt-lg-6', 'mb-0', 'px-2')}>
      <div className="row">
        <Search onChange={({ hide }) => setSearchMode(hide)} />
      </div>

      <div
        className={classnames({
          'd-none': searchMode,
        })}
      >
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={false}
          indicators={false}
          interval={null}
          touch={false}
        >
          <Carousel.Item>
            <FilterRow
              filters={filters}
              selected={{ id: activeFilterId, title: activeFilterTitle }}
              onChange={({ id, title }) => [
                setActiveFilterId(id),
                setActiveFilterTitle(title),
              ]}
            />

            {!!activeFilterId && (
              <CategoryList
                filterId={activeFilterId}
                onClick={({ id, title }) => {
                  setActiveCategory({ id, title });
                  handleSelect(1);
                }}
              />
            )}
          </Carousel.Item>
          <Carousel.Item>
            {!!activeCategory && (
              <SeeAllCategory
                categoryId={activeCategory.id}
                title={activeCategory.title}
                onBack={() => {
                  handleSelect(0);
                }}
              />
            )}
          </Carousel.Item>
          <Carousel.Item />
        </Carousel>
      </div>
    </div>
  );
};

Browse.propTypes = {
  filter: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
};

Browse.defaultProps = {
  filter: null,
  category: null,
  title: null,
};

export default Browse;
