import React, { useState } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import { Carousel } from 'react-bootstrap';
import { FloatingCard } from '../ui';
import Identity from './Identity';
import Passcode from './Passcode';
import ProfileInformation from './ProfileInformation';

import { useAuth } from '../auth';

const LoginCard = () => {
    const { hideLogIn, setToken } = useAuth();
    const [payload, setPayload] = useState(null);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const columnSizes = [
        'col-12',
        'col-lg-8',
    ];

    return (
        <FloatingCard
            onPressExit={() => hideLogIn()}
        >
            <h2
                className={classnames(
                    'text-center',
                    'mt-2',
                    'mb-3',
                )}
            >
                Login
      </h2>

            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={null}
                touch
            >
                <Carousel.Item>
                    <Identity
                        update={({ identity, userExists, type }) => {
                            setPayload({ identity, userExists, type });
                            setIndex(userExists ? 2 : 1);
                        }}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <ProfileInformation
                        identity={get(payload, 'identity', null)}
                        type={get(payload, 'type', null)}
                        update={(props) => {
                            setPayload(props);
                            setIndex(2);
                        }}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <Passcode
                        identity={get(payload, 'identity', null)}
                        userProfile={get(payload, 'userProfile', [])}
                        isExistingIdentity={get(payload, 'userExists', false)}
                        type={get(payload, 'type', 'sms')}
                        update={({ token }) => {
                            if (token) setToken(token);
                            hideLogIn();
                        }}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <h2 className="text-center text-success">
                        You're now logged in!
          </h2>
                </Carousel.Item>

                <Carousel.Item>
                    <h1 className="text-center text-primary">
                        <i className="fal fa-envelope fa-3x" />
                    </h1>

                    <h3 className="text-center text-primary">
                        You should get an email with instructions on how to reset your password.
          </h3>
                </Carousel.Item>
            </Carousel>
        </FloatingCard>
    );
};

export default LoginCard;
