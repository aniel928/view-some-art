import './App.css';
import { useRef, useState } from 'react';

function App() {
    const [image, updateImage] = useState('');
    const searchRef = useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        updateSearchResults(searchRef.current.value);
    }

    const updateSearchResults = async (searchTerm) => {
        const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&fields=id,title,image_id&limit=100`;
        const data = await fetch(url);
        const imgData = await data.json();

        const length = imgData.data.length;
        const randomImage = imgData.data[Math.floor(Math.random() * length)]

        updateImage(
            <div>
                <div className='frame'>
                    <img
                        className='artwork'
                        src={`${imgData.config.iiif_url}/${randomImage.image_id}/full/843,/0/default.jpg`}
                        alt={`${randomImage.title}`}
                    />
                </div>
                <p className='title'>{randomImage.title}</p>
            </div>
        );
    }

    return (
        <div className="App">
            <form className="searchForm" onSubmit={(e) => { handleSearch(e) }}>
                <fieldset>
                    <label>Search for: </label>
                    <input
                        ref={searchRef}
                        type='text'
                    />
                    <button type='submit'>Go</button>
                </fieldset>
            </form>
            <div className='imgDiv'>{image}</div>
        </div>
    );
}

export default App;
