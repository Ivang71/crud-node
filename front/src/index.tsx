import { StrictMode } from 'react'
import { render } from 'react-dom'
import { App } from './components'

/*import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALoJ-_n1apZxFyrhI1vP2_UI-qM5z6qO4",
  authDomain: "todo-7a070.firebaseapp.com",
  projectId: "todo-7a070",
  storageBucket: "todo-7a070.appspot.com",
  messagingSenderId: "717589455735",
  appId: "1:717589455735:web:26a2ac84084b63e5fbb772",
  measurementId: 'G-L3NVM1ENBS',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)*/

render(
    <StrictMode>
      <App/>
    </StrictMode>,
    document.querySelector('#app')
)

