import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header';
import Body from './components/Body';
import "react-datepicker/dist/react-datepicker.css";
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.querySelector('#root'));


const App = () => {
    return (
        <div className='app'>
            <Header />
            <Body />
        </div>
    )
}

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)