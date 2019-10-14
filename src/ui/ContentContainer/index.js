import React from 'react'

export default ({
    children,
    className
}) => (
        <div className={`container-fluid ${className}`}>
            <div className="row">
                <div className="col">
                    {children}
                </div>
            </div>
        </div>
    )