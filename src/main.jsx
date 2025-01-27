import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
