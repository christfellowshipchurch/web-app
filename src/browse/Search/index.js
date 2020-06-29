import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../../ui/Icons'

import SearchFeed from './SearchFeed'
import { PreSearchFeed } from './OtherFeeds'

const Search = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')

    return (
        <div className='w-100 mb-3'>
            <div className={classnames(
                'd-flex', 
                'align-items-center', 
                'border-bottom', 
                'mb-2'
            )}>
                <Icon 
                    name='search'
                    fill='#828282'
                    className='mr-2'
                />
                <input 
                    id='search'
                    className={classnames(
                        'h2',
                        'w-100',
                        'mb-0'
                    )}
                    placeholder={'Search'}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => value === '' ? setIsFocused(false) : {}}
                    onChange={e => setValue(e.target.value)}
                />
                {value && value !== '' &&
                    <Icon
                        name='times'
                        fill='#828282'
                        className='ml-2'
                        onClick={() => {
                            setValue('')
                            document.getElementById('search').focus()
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
                        'bg-light',
                        'mb-4',
                        'rounded',
                    )}
                >
                    {value && value !== '' 
                        ? <SearchFeed 
                            searchText={value}
                        />
                        : <PreSearchFeed/>
                    }
                </div>
            }
        </div>
    )
}

export default Search