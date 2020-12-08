import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';

const App = () => {
  return (
  <div>
    <AmplifySignOut />
  </div>
)};

export default withAuthenticator(App);