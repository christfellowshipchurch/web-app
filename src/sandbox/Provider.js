import React, {
    useState,
    useContext,
    createContext,
} from 'react';

const defaultState = { theme: 'default' };
const SandboxContext = createContext();
const useSandbox = () => useContext(SandboxContext);
const sandboxEnabled = () => {
    const full = window.location.host;
    const parts = full.split('.');
    const sub = parts[0];
    // const domain = parts[1];
    // const type = parts[2];

    // Sandbox should be enabled for both the beta site,
    //  but only if specified on a dev environment so you
    //  can simulate each environment
    return (full.includes('localhost') && process.env.REACT_APP_ENABLE_SANDBOX) || sub === 'beta';
};

const SandboxProvider = (props) => {
    const [sandbox, setSandbox] = useState({ ...defaultState, ...props });

    const setSandboxValueByKey = (key, value) => {
        const keyValue = {};

        keyValue[key] = value;

        setSandbox({ ...sandbox, ...keyValue });
    };

    return (
        <SandboxContext.Provider
            value={{
                sandbox: sandboxEnabled() ? sandbox : defaultState,
                setSandbox,
                setSandboxValue: setSandboxValueByKey,
                sandboxEnabled: sandboxEnabled(),
            }}
        >
            {props.children}
        </SandboxContext.Provider>
    );
};

export {
    SandboxContext,
    SandboxProvider,
    useSandbox,
};
