"use strict";

// const BASE_URL = 'http://localhost:5000';


/** API class 
 *
 * Class with static methods for the purpose of getting data from and sending 
 * data to the server.
*/
class Api {
    static async request(endpoint, data = {}, method='get') {
        const url = `/${endpoint}`;
        const params = method === 'get' ? data : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            // const message = err.message;
        }
    }

    /***********************
     * User methods
     ***********************/

    /**
     * signup
     * @param data is an object containing firstName, lastName,
     *    username, and password
     * @returns dictionary containing information about the new user
     */
    static async signup(data) {
        const res = await this.request('signup', data, 'post');
        return res;
    }

    /**
     * login
     * @param {*} data is an object containing username and password k, v pairs
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
        const res = await this.request('logout');
        return res;
    }

    /**
     * updateProfile
     * @param {*} 
     * @returns 
     */
    static async updateProfile(data) {
        const res = await this.request(`users/${data.id}`, data, 'PUT');
        return res;
    }

    /***********************
     * Business methods
     ***********************/

    /* Get business details. */
    static async getBusinessDetails(data) {
        const res = await this.request(`businesses/${data.yelp_id}`);
        /** return the result OR undefined (in the case where the object is 
        undefined or null)
        */
        return res;
    }

    /* Get businesses. */
    static async getBusinesses(zipCode) {
        const res = await this.request(`businesses/search?zipCode=${zipCode}`);
        /** return the result OR undefined */
        return res;
    }

    /***********************
     * Feedback methods
     ***********************/
    /**
     * getUserFeedbacks
     * @param {*} userId 
     * @returns 
     */
    static async getUserFeedbacks(data) {
        const res = await this.request(`users/${data.id}/feedbacks`);
        return res;
    }

    /**
     * giveFeedback
     * @param {*} 
     * @returns
     */
    static async giveFeedback(data) {
        const res = await this.request('feedbacks', data, 'post');
        return res;
    }

    /***********************
     * Geocoding methods
     ***********************/

    /**
     * getZipCodeCoords
     * @param {*}
     * @returns
     */
    static async getZipCodeCoords(zipCode) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}&key=AIzaSyA1gRlAhtrQi7SdN8_zRSwh11Yx7UYA1ks`;
        const params = zipCode;

        try {
            // return (await axios({ url, method:'get', data: {}, params })).data;
            return (await axios({ url, method:'get', })).data;

        } catch (err) {
            console.log("ERR: ", err);
        }
    }
}