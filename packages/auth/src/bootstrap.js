import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

/**
 * @param {HTMLElement} el 
 * @returns {void}
 */
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
    // "createMemoryHistory" used when container is running
    // i.e. enivronment === "development"
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        // listens to changes in history/navigation
        // called whenever URL path changes
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        el
    )

    return {
        onParentNavigate({ pathname: nextPathName }) {
            const { pathname } = history.location;

            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

// to run sub-app in isolation
if (process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector("#_auth-dev-root");

    // when running in isolation use Browserhistory nott Memoryhistory
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };
