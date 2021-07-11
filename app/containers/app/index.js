import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { string, addMethod } from 'yup';
import Layout from '../../components/layout';
import Routes from '../../routes';
import ErrorBoundary from '../error/errorBoundry';
import { AuthProvider } from '../../context/authContext';
import './style.css';
import { noWhitespace } from '../../utils/functions';

export default function App() {
  addMethod(string, 'noWhitespace', noWhitespace);
  return (
    <>
      <AuthProvider>
        <Router>
          <Layout>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  );
}
