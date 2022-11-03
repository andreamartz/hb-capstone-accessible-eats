"use strict";

function SearchForm({searchTerm, setSearchTerm}) {
    const handleChange = (evt) => {
        console.log(evt.target.value);
        setSearchTerm(evt.target.value.trim());
    }

    return (
        // <form action="">
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="zipCode" className="col-form-label">Find restaurants near </label>
                </div>
                <div className="col-auto">
                    <input 
                        type="text"
                        id="zipCode"
                        name="zipCode" 
                        className="form-control" 
                        placeholder="Enter a zip code"
                        onChange={handleChange}
                        value={searchTerm}/>
                </div>
                {/* <div className="col-auto">
                    <button type="submit">Find</button>
                </div> */}
            </div>
        // </form>
    );
}