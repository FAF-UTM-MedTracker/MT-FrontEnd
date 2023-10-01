import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import SignupLayout from './components/SignupLayout.tsx'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from './redux-toolkit/store/store'
import SigninLayout from './components/SigninLayout.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupLayout/>}/>
          <Route path="/" element={<SigninLayout/>}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
