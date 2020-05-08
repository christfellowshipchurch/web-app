import React from 'react';
import { ErrorBlock } from '../../ui';
import { useSandbox } from '../../sandbox';

const Live = () => {
    const { sandboxEnabled } = useSandbox();

    return sandboxEnabled
        ? (
            <div className="container-fluid my-6 px-2">
                <div className="row">
                    <div className="col" style={{ minHeight: '50vh' }}>
                        <iframe
                            src="https://player.theplatform.com/p/IfSiAC/_ea2Eu6JJcfP/embed?form=html"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            seamless="seamless"
                            allowFullScreen=""
                        />
                    </div>
                </div>
            </div>
        )
        : <ErrorBlock />;
};

export default Live;
