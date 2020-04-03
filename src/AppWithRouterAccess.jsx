// src/AppWithRouterAccess.jsx

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) { 
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }
  
  onAuthRequired() { 
    this.props.history.push('/login');
  }

  render() {
    return (
      <Security issuer='https://middle-earth.okta.com/oauth2/default'
                clientId='0oa3fjq4fiTfmgnRQ357'
                redirectUri='http://localhost:3000/implicit/callback'
                onAuthRequired={this.onAuthRequired}
                pkce={true} >
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <Login baseUrl='https://middle-earth.okta.com' />} />
        <Route path='/implicit/callback' component={LoginCallback} />
      </Security>
    );
  }
});