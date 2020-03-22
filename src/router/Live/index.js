import React from 'react';
import { ErrorBlock } from '../../ui';

const Live = () => {
    const full = window.location.host;
    // window.location.host is subdomain.domain.com
    const parts = full.split('.');
    const sub = parts[0];
    const domain = parts[1];
    const type = parts[2];
    const show = full.includes('localhost') || sub === 'beta';

    return show
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
