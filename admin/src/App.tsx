import React from 'react';
import { Admin, Resource } from 'react-admin';

import AuthProvider from './Providers/AuthProvider';
import Provider from './Providers/DataProvider';
import { SocketProvider } from './Providers/SocketProvider';

import StatisticsReducer from './Reducers/Statistics';

import Layout from './General/Layout';
import Theme from './General/Theme';

import Dashboard from './Pages/Dashboard';
import { QuestionList, QuestionCreate, QuestionEdit } from './Resources/Question';

const App = () => (

  <Admin layout={Layout} dataProvider={Provider()} authProvider={AuthProvider()} dashboard={Dashboard} theme={Theme} customReducers={{ statistics: StatisticsReducer }}>
    <SocketProvider />
    <Resource name="questions" options={{ label: 'Questions' }} list={QuestionList} create={QuestionCreate} edit={QuestionEdit} />
  </Admin>

);

export default App;