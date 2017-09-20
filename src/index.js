import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Blueprint css
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


//Paste this at the bottom of your `index.js` in your `create-react-app`-project
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}