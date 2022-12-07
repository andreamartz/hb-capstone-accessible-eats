"use strict";

const SearchForm = ({searchTerm, 
    setSearchTerm, 
    currentUser
}) => {
    const handleChange = (evt) => {
        setSearchTerm(evt.target.value.trim());
    }

    return (
        <div className="row g-3 align-items-center mb-3">
            <div className="col-auto">
                <label htmlFor="searchZipCode" className="col-form-label">Find restaurants near </label>
            </div>
            <div className="col-auto">
                <input 
                    type="text"
                    id="searchZipCode"
                    name="zipCode" 
                    disabled={!currentUser}
                    className="form-control" 
                    placeholder="Enter a zip code"
                    onChange={handleChange}
                    value={searchTerm}/>
            </div>
        </div>
    );
}