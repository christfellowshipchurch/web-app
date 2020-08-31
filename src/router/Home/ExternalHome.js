import React from 'react'
import classnames from 'classnames'
import { useAuth } from '../../auth';

import { HeroSection, Button } from 'ui'
import backgroundImage from './home-background.jpg'


const ExternalHome = () =>{

    const { logIn } = useAuth();

    const buttonClass = classnames(
        'mx-2',
        'my-2',
    )

    const customPrimaryButtons = (
        <div className="my-6">
            <Button
                className={buttonClass}
                call="I'm new here"
                href='/about'
            />
            <Button
                className={buttonClass}
                call="I attend Christ Fellowship"
                onClick={() => logIn()}
            />
        </div>
    )

    return(
        <HeroSection
            title='Live Your Best Life'
            htmlContent='A church in South Florida that helps you thrive in every area of life.'
            image={{
                uri: backgroundImage,
            }}
            children={customPrimaryButtons}
            swoop={false}
        />
    )
}
    

ExternalHome.propTypes = {
}

ExternalHome.defaultProps = {
}

export default ExternalHome