import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from './global/config';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import Layout from './components/layouts/default'
import DashboardPage from './pages/dashboard';
import ShowUserPage from './pages/users/show';
import CreateTaskPage from './pages/lists/createTask';
import UpdateTaskPage from './pages/lists/updateTask';
import CreateUserPage from './pages/users/create'


const client = new AWSAppSyncClient({
  url: config.graphqlEndpoint,
  region: config.region,
  auth: {
    type: config.authenticationType,
    apiKey: config.apiKey,
  }
});

const App = () => (
  <Router>
    <Layout>
      <Route exact={true} path="/" component={ DashboardPage } />
      {console.log("log",client)}
      <Switch>
      <Route path="/users/form" component={ CreateTaskPage } />
        <Route path="/users/create" component={ CreateUserPage } />
        <Route path="/users/:id/edit" component={ UpdateTaskPage } />
        <Route path="/users/:id" component={ ShowUserPage } />
      </Switch>
    </Layout>
  </Router>
);

const WithProvider = () => (
  <ApolloProvider client={ client }>
  {console.log("provider",client)}
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;