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
        const params = method === 'get' ? data : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            // const message = err.message;
            console.log("ERR FROM Api: ", err);
        }
    }

    // -------------------------
    // Individual route methods
    // -------------------------

    /**
     * signup
     * @param data is an object containing firstName, lastName,
     *    username, and password
     * @returns dictionary containing information about the new user
     */
    static async signup(data) {
        const res = await this.request('signup', data, 'post');
        console.log("INSIDE SIGNUP");
        return res;
    }

    /**
     * login
     * @param data is an object containing username and password k, v pairs
     * @returns dictionary containing information about the logged in user
     */
    static async login(data) {
        const res = await this.request('login', data, 'post');
        return res;
    }

    /**
     * logout
     * @param {*} null 
     * @returns result object with keys for user, success, and message
     */
    static async logout() {
        const res = await this.request('/logout');
        return res;
    }




    /* Get business details. */
    // static async getBusinessDetails(yelp_id) {
    //     const res = await this.request(`businesses/${yelp_id}`);
    //     /** return the result OR undefined (in the case where the object is 
    //     undefined or null)
    //     */
    //     console.log(res);
    //     return res;
    // }

    /* Get businesses. */
    static async getBusinesses(zipCode) {
        console.log("ZIP: ", zipCode);
        const res = await this.request(`businesses/search?zipCode=${zipCode}`);
        /** return the result OR undefined */
        console.log("RES: ", res, typeof res);
        return res;
    }

    /**
     * getUserFeedbacks
     * @param {*} userId 
     * @returns 
     */
    static async getUserFeedbacks(data) {
        const res = await this.request(`users/${data.id}/feedbacks`);
        console.log("RETURNED JSON: ", res)
        return res;
    }

    /**
     * giveFeedback
     * @param {*} 
     * @returns
     */
    static async giveFeedback(data) {
        const res = await this.request('', data, 'post');
        return res;
    }
}
