import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// createGenerateClassName is useful for avoiding css naming conflicts
// can be caused by the css class name generating process
const generateClassName = createGenerateClassName({
    // this option specifies a prefix to add to generated class names
    productionPrefix: 'ma'
});

// subapps should typically use MemoryHistory (i.e. Router)
// use createMemoryHistory in bootstrap.js to create "history" param
// container apps should use BrowserRouter

export default ({ history }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                  <Switch>
                      <Route exact path="/pricing" component={Pricing} />
                      <Route path="/" component={Landing} />
                  </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}
