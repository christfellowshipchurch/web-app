import { setContext } from 'apollo-link-context';
import {
    AUTH_TOKEN_KEY,
} from '../keys';

export default setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token || token === '') {
        return {};
    }

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});
