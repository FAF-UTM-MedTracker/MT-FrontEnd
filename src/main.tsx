import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import SignupLayout from './components/SignupLayout.tsx'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from './redux-toolkit/store/store'
import SigninLayout from './components/SigninLayout.tsx';
import PatientsPage from './components/PatientsPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PageNotFound from './components/PageNotFound.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupLayout/>}/>
          <Route path="/login" element={<SigninLayout/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/patients" element={<PatientsPage/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
