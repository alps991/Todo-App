import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    loggedIn,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            loggedIn ? (
                <Redirect to="/dashboard" />
            ) : (
                    <Component {...props} />
                )
        )} />
    );

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(PublicRoute);