import React from 'react'
import classnames from 'classnames'

const Row = ({ children }) => {
    const classes = {
        row: classnames(
            'row',
            'align-items-center'
        )
    }

    return children.length
        ? (
            <div className={classes.row}>
                {children.map((n, i) => {
                    const classes = classnames(
                        // 'd-flex',
                        // 'align-items-center',
                        // 'justify-content-center',
                        // 'p-0',
                        'col-12',
                        i === children.length - 1
                            ? 'col-md'
                            : 'col-md-6'
                    )
                    return <div className={classes} key={i}>{n}</div>
                })}
            </div>
        )
        : <div className="col-12">{children}</div>
}


export default Row