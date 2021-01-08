import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Todo from './components/TodoComponent';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Todo} />
    </Layout>
);
