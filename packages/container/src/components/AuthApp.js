// 'marketing' reference to "name" property in marketing webpack
// 'MarketingApp' reference to property in the "exposes" object in marketing webpack
import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            // since MemoryHistory does not keep complete record of url path
            // we need to provide it with initial beginning path
            initialPath: history.location.pathname,
            // { pathname } is object provided to us as a parameter from history
            onNavigate: ({ pathname: nextPathName }) => {
                const { pathname } = history.location;

                // only update/sync history objects (with container)
                // when pathnames do not match between container & marketing
                if (pathname !== nextPathName) {
                    // the push method updates the URL path
                    history.push(nextPathName);
                }
            },
            onSignIn
        });

        // this updates navigation for container
        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />
};
