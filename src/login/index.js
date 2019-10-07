import React, { useState } from 'react'
import classnames from 'classnames'
import { get } from 'lodash'

import FloatingCard from '../components/ui/FloatingCard'
import Identity from './Identity'
import Passcode from './Passcode'

const LoginCard = () => {
    const [identity, setIdentity] = useState(null)

    return (
        <FloatingCard>
            <h2
                className={classnames(
                    "text-center",
                    'mb-4'
                )}
            >
                Login
            </h2>
            <Identity
                update={(data) => {
                    console.log({ data })
                    setIdentity(get(data, 'identity', null))
                }}
            />
            <hr></hr>
            <Passcode
                identity={identity}
            />
        </FloatingCard>
    )
}

export default LoginCard