import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header';
import Body from './components/Body';

const root = ReactDOM.createRoot(document.querySelector('#root'));


const App = () => {
    return (
        <div className='app'>
            <Header />
            <Body />
        </div>
    )
}

root.render(<App />)