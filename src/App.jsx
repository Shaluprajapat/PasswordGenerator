import { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [passWord, setPassWord] = useState("");

    const passWordGenerator = useCallback(() => {
        let passWord = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()+_-";

        // Check if the string is diverse enough based on selected options
        if (str.length < 8 && length > 8) {
            alert("Please select more character options or reduce the password length.");
            setPassWord("");
            return;
        }

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            passWord += str.charAt(char);
        }
        setPassWord(passWord);
    }, [length, numberAllowed, charAllowed]);

    useEffect(() => {
        passWordGenerator();
    }, [length, numberAllowed, charAllowed, passWordGenerator]);

    const handleCopy = () => {
        if (passWord) {
            navigator.clipboard.writeText(passWord);
            alert("Password copied to clipboard!");
        }
    };

    return (
        <>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
                <h1 className='text-white text-center my-3'>Password Generator</h1>
                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                    <input
                        type="text"
                        value={passWord}
                        className='outline-none w-full py-1 px-3'
                        placeholder='Generated password'
                        readOnly
                    />
                    <button onClick={handleCopy} className='bg-blue-700 px-4 py-1 text-white'>
                        Copy
                    </button>
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Length: {length}</label>
                    <input
                        type="range"
                        min="4"
                        max="20"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className='w-full'
                    />
                </div>
                <div className='flex items-center mb-4'>
                    <input
                        type="checkbox"
                        checked={numberAllowed}
                        onChange={() => setNumberAllowed(!numberAllowed)}
                        className='mr-2'
                    />
                    <label className='text-white'>Include Numbers</label>
                </div>
                <div className='flex items-center mb-4'>
                    <input
                        type="checkbox"
                        checked={charAllowed}
                        onChange={() => setCharAllowed(!charAllowed)}
                        className='mr-2'
                    />
                    <label className='text-white'>Include Special Characters</label>
                </div>
            </div>
        </>
    );
}

export default App;
