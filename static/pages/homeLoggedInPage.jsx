"use strict";

function HomeLoggedInPage() {
    const [searchTerm, setSearchTerm] = React.useState('55438');
    const [businesses, setBusinesses] = React.useState([]);
    const [mapMarkers, setMapMarkers] = React.useState([]);

    return (
        <>
            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* <CardList zipCode={'55438'}/> */}
            <CardList searchTerm={searchTerm} 
                      businesses={businesses} 
                      setBusinesses={setBusinesses} />
        </>
    )
}