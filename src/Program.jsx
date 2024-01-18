import { useState } from "react";

const Program = () => {
    const [name, setName] = useState('hanan');
    const [result, setResult] = useState('');

    const handle = () => {
        let isUnique = true;

        for (let i = 0; i < name.length; i++) {
            for (let j = i + 1; j < name.length; j++) {
                if (name[i] === name[j]) {
                    isUnique = false;
                    break;
                }
            }
        }

        setResult(isUnique ? 'All characters are unique' : 'Duplicate characters found');
    }

    return (
        <>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={handle}>Click me</button>
            <h1>{result}</h1>
        </>
    );
}

export default Program;
