import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../src/assets/scss/app.scss'
import { SharedStateProvider } from './contexts/SharedStateProvider.jsx'
import i18n from '../i18n.js'

import MatomoTracker from './components/MatomoTracker.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <SharedStateProvider>
    <BrowserRouter>
      <MatomoTracker />
      <App />
    </BrowserRouter>
  </SharedStateProvider>
  // </React.StrictMode>
)
