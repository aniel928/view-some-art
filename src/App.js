import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const [image, updateImage] = useState('');
    const [searchTerm, updateSearchTerm] = useState('');
    const searchRef = useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        if (searchRef.current.value === searchTerm) {

        }
        updateSearchResults(searchRef.current.value);
    }
    const updateSearchResults = async (searchTerm) => {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=id,title,image_id&limit=100`;
        const data = await fetch(url);
        const imgData = await data.json();

        const length = imgData.data.length;
        const randomImage = imgData.data[Math.floor(Math.random() * length)]

        updateImage([
            <div>
                <img
                    className='artwork'
                    src={`https://www.artic.edu/iiif/2/${randomImage.image_id}/full/843,/0/default.jpg`}
                    alt={`${randomImage.title}`}
                />
                <p>{randomImage.title}</p>
            </div>
        ]);
    }

    return (
        <div className="App">
            <form className="searchForm" onSubmit={(e) => { handleSearch(e) }}>
                <label>Search for</label>
                <input
                    ref={searchRef}
                    type='text'
                />
                <button type='submit'>Go</button>
            </form>
            <header className="App-header">
                {image}
            </header>
        </div>
    );
}

export default App;
