"use strict";

class Data {

    constructor(options) {

        options = options || {};

        this.data = options;
    }

    isValid() {

        if (typeof this.data.year === "undefined") {
            return false;
        }

        if (typeof this.data.month === "undefined") {
            return false;
        }

        if (typeof this.data.day === "undefined") {

            return false;
        }
        if (typeof this.data.houseEnergy === "undefined") {

            return false;
        }
        if (typeof  this.data.pumpEnergy === "undefined") {

            return false;
        }
        if (typeof this.data.brineIn === "undefined") {

            return false;
        }
        if (typeof  this.data.brineOut === "undefined") {

            return false;
        }
        if (typeof this.data.outTemp === "undefined") {

            return false;
        }


        return true;
    }

    fromUrl(urlString) {
        var array = urlString.split('/');

        this.year = array[0];
        this.month = array[1];
        this.day = array[2];

        this.houseEnergy = array[3];
        this.pumpEnergy = array[4];

        this.brineIn = array[5];
        this.brineOut = array[6];
        this.tempOut = array[7];
    }

    // TODO make this function take a mongoDB param instead?
    static toUrl(year, month, day, houseEnergy, pumpEnergy, brineIn, brineOut, tempOut) {
        return year + "/" +
            month + "/" +
            day + "/" +
            houseEnergy + "/" +
            pumpEnergy + "/" +
            brineIn + "/" +
            brineOut + "/" +
            tempOut;

    }

    log() {
        console.log("Year, " + this.year);
        console.log("month: ", this.month);
        console.log("day: ", this.day);
        console.log("houseEnergy:", this.houseEnergy);
        console.log("pumpEnergy:", this.pumpEnergy);
        console.log("brineIn: ", this.brineIn);
        console.log("BrineOut: ", this.brineOut);
        console.log("outTemp: ", this.tempOut);
    }
}

module.exports = Data;