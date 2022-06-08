import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

// createGenerateClassName is useful for avoiding css naming conflicts
// can be caused by the css class name generating process
const generateClassName = createGenerateClassName({
    // this option specifies a prefix to add to generated class names
    productionPrefix: 'au'
});

// subapps should typically use MemoryHistory (i.e. Router)
// use createMemoryHistory in bootstrap.js to create "history" param
// container apps should use BrowserRouter

export default ({ history, onSignIn }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                  <Switch>
                      <Route path="/auth/signin">
                        <SignIn onSignIn={onSignIn} />
                      </Route>
                      <Route path="/auth/signup">
                          <SignUp onSignIn={onSignIn} />
                      </Route>
                  </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
}
