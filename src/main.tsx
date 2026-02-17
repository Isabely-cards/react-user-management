import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRoutes } from './app/routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
)
