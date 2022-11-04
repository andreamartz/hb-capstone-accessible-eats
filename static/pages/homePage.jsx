"use strict";

const HomePage = ({currentUser}) => {
    const [searchTerm, setSearchTerm] = React.useState('55438');
    const [businesses, setBusinesses] = React.useState([]);
    const [mapMarkers, setMapMarkers] = React.useState([]);

    return (
        <>
            {/* TODO: uncomment and comment the two lines below once login is working */}
            {/* {currentUser && <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} */}
            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <CardList searchTerm={searchTerm}
                      businesses={businesses}
                      setBusinesses={setBusinesses} 
            />
        </>
    );
}