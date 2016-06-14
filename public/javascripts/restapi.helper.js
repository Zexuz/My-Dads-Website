"use strict";

class RestApiHelper {


    constructor(baseUrl) {
        this.baseUrl = baseUrl; // <http://www.host:port/api>
    }

    makePost(endpoint, urlData, callback) {
        $.ajax({
            type: "POST",
            url: this.baseUrl + endpoint + '/' + urlData,
            dataType: 'JSON'
        }).always(function (data) {

            data.response = data.response || {};

            console.log(data);
            if (data.response.success === true) {
                callback(null, data.response.data);
                return
            }
            callback(data, null);
        });
    }


    makeGet(endpoint, urlData, callback) {
        $.ajax({
            type: "GET",
            url: this.baseUrl + endpoint + '/' + urlData,
            dataType: 'JSON'
        }).always(function (data) {
            data.response = data.response || {};
            if (data.response.success === true) {
                callback(null, data.response.data);
                return
            }
            callback(data, null);
        });
    }

    makePut(endpoint, urlData, callback) {
        $.ajax({
            type: "PUT",
            url: this.baseUrl + endpoint + '/' + urlData,
            dataType: 'JSON'
        }).always(function (data) {
            data.response = data.response || {};
            if (data.response.success === true) {
                callback(null, data.response.data);
                return
            }
            callback(data, null);
        });
    }

    makeDelete(endpoint, urlData, callback) {
        $.ajax({
            type: "DELETE",
            url: this.baseUrl + endpoint + '/' + urlData,
            dataType: 'JSON'
        }).always(function (data) {
            data.response = data.response || {};
            if (data.response.success === true) {
                callback(null, data.response.data);
                return
            }
            callback(data, null);
        });
    }


}

