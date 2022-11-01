"use strict";

const BASE_URL = 'http://localhost:5000/businesses';

/**
 * Get details about a business from Yelp Fusion API
 * @param {string} businessId - the Yelp business id
 */
function getBusinessDetails(businessId) {
    const url = `${BASE_URL}/${businessId}`;

    fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
            console.log('JSONDATA: ', jsonData)
            return jsonData
        });
}