"use strict";

const BASE_URL = 'http://localhost:5000';

/** API class 
 *
 * Class with static methods for the purpose of getting data from and sending 
 * data to the server.
*/
class Api {
    static async request(endpoint, data = {}, method='get') {
        const url = `${BASE_URL}/${endpoint}`;
        const params = method === 'get' ? data: {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            const message = err.message;
        }
    }

    // -------------------------
    // Individual route methods
    // -------------------------

    /* Get business details. */
    static async getBusinessDetails(yelpId) {
        const res = await this.request(`businesses/${yelpId}`);
        /** return the result OR undefined (in the case where the object is 
        undefined or null)
        */
        console.log(res);
        return res;
    }
}
