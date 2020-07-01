import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../../ui/Icons'

import SearchFeed from './SearchFeed'
import { PreSearchFeed } from './OtherFeeds'

const Search = ({ onChange }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [onClear, setOnClear] = useState(false)
    const [value, setValue] = useState('')

    const unFocusAndShowBrowse = () => {
        onChange({hide: false})
        setIsFocused(false)
        setOnClear(false)
    }

    const onClearAndShowBrowse = () => {
        onChange({hide: false})
        setOnClear(true)
    }

    const hideBrowse = () => {
        onChange({hide: true})
        setOnClear(false)
    }

    return (
        <div className='w-100 mb-3'>
            <div className={classnames(
                'd-flex', 
                'align-items-center', 
                'border-bottom', 
                'mb-2',
                'px-3',
                'pb-1',
            )}>
                <Icon 
                    name='search'
                    fill='#828282'
                    className='mr-2'
                />
                <input 
                    id='searchBox'
                    className={classnames(
                        'h2',
                        'w-100',
                        'mb-0'
                    )}
                    placeholder={'Search'}
                    value={value}
                    onFocus={(e) => {
                        e.preventDefault()
                        onChange({hide: true})
                        setIsFocused(true)
                    }}
                    onBlur={(() => value === '' && unFocusAndShowBrowse())}
                    onChange={e => setValue(e.target.value)}
                    onKeyPress={() => value === '' && hideBrowse()}
                />
                {value && value !== '' &&
                    <Icon
                        name='times'
                        fill='#828282'
                        className='ml-2'
                        onClick={() => {
                            setValue('')
                            document.getElementById('searchBox').focus()
                            onClearAndShowBrowse()
                        }}
                    />
                }
            </div>
            {isFocused &&
                <div
                    style={{
                        zIndex: 1000,
                    }}
                    className={classnames(
                        'container-fluid',
                        'mb-4',
                        'rounded',
                        'h-100',
                    )}
                >
                    {value && value !== '' 
                        ? <SearchFeed 
                            searchText={value}
                        />
                        : <PreSearchFeed 
                            hide={onClear}
                        />
                    }
                </div>
            }
        </div>
    )
}

Search.propTypes = {
    onChange: PropTypes.func,
};

Search.defaultProps = {
    onChange: () => {}
};

export default Search