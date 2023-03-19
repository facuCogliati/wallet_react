import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechProvider } from '@speechly/react-client';

import App from './App';
import {Provider} from './context/context';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpeechProvider
    appId="b1f05573-f8ea-41e7-9041-8174e3aecd5b"
    debug
    logSegments
    language="en-US"
    >
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </React.StrictMode>
);

