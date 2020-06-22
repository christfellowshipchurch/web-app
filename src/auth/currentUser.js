import { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useAuth } from '.';

const useAuthQuery = (query) => {
    const { token, isLoggedIn, logout } = useAuth();
    const {
        data,
        error,
        loading,
        refetch,
    } = useQuery(query, {
        // if the user is not logged in,
        //  we want to skip the query all together
        //  and wait for refetch after the token changes
        skip: !isLoggedIn,
        // Required to ensure we always get fresh
        //  data from every request
        fetchPolicy: 'network-only',
        onError: () => {
            console.error('Authentication error: logging out');
            logout();
        },
    });

    useEffect(() => {
        // Catch statement is required if you want
        //  to manually handle the error callback
        //  specifically in regards to the refetch.
        // In this case, there's no need to make that
        //  error visible, so we're overwriting it with
        //  our own.
        if (isLoggedIn) refetch().catch(() => console.error('Authentication error'));
    }, [token]);

    return {
        data,
        loading,
        error,
        isLoggedIn,
    };
};

export {
    useAuthQuery,
};
