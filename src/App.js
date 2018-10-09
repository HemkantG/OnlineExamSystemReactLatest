import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import "./lib/reactifyCss";
import Register from "./containers/register";
import Test from "./containers/Test";
import NotFound from "./components/404";
import InternalServerError from "./components/500";
import RefreshError from "./components/RefreshError";
import Success from "./components/Success";
import ThankYou from "./components/Thanks";
import Instructions from "./components/Instructions";
import AccessDenied from "./components/403";
import RetestPermissions from "./containers/RetestPermissions";
import { configureStore } from "./store";

const MainApp = () => (
  <Provider store={configureStore()}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/403" exact component={AccessDenied} />
          <Route path="/500" exact component={InternalServerError} />
          <Route path="/refreshError" exact component={RefreshError} />
          <Route path="/startTest" component={Test} />
          <Route path="/success" component={Success} />
          <Route path="/thanks" component={ThankYou} />
          <Route path="/register" exact component={Register} />
          <Route path="/retestPermissions" exact component={RetestPermissions} />
          <Route path="/" exact component={Instructions} />
          <Route path="/*" exact component={NotFound} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>
);
export default MainApp;
