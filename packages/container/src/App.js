import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

// createGenerateClassName is useful for avoiding css naming conflicts
// can be caused by the css class name generating process
const generateClassName = createGenerateClassName({
    // this option specifies a prefix to add to generated class names
    productionPrefix: 'co'
});

// subapps should typically use MemoryHistory (i.e. Router)
// container apps should use BrowserRouter

export default () => {
    const [isSignedIn, setIsSignIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}
