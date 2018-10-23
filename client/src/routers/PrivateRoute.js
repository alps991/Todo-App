import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    loggedIn,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            loggedIn ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                    <Redirect to="/" />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(PrivateRoute);