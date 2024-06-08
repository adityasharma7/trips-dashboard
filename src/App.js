import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.querySelector('#root'));


const App = () => {
    return (
        <div className='app'>
            <h1>Trips Dashboard</h1>
        </div>
    )
}

root.render(<App />)