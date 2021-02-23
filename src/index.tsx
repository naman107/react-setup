import React from 'react';
import ReactDOM from 'react-dom';

export default function App(): JSX.Element {
    return (
        <h1>
            Hello
        </h1>
    )
}

ReactDOM.render(<App />, document.getElementById('app-root'));