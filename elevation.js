let fs = require('fs')
module.exports = {
    getfilename: function (lat, long) {
        let latData = lat;
        let longData = long;

        let filename = "";
        //let tilelatData,tilelongData;

        if (latData < 0) {
            filename = "S"
        } else {
            filename = "N"
        }

        filename += zeroPad(Math.floor(latData), 2);

        if (longData < 0) {
            filename += "W"
        } else {
            filename += "E"
        }

        filename += zeroPad(Math.floor(longData), 3);

        filename += ".hgt";
        return filename;
    },

    getelevation: function (lat, long) {

        let latData = lat;
        let longData = long;

        let filename = "";
        let tilelatData, tilelongData;


        if (latData < 0) {
            filename = "S"
        } else {
            filename = "N"
        }

        filename += zeroPad(Math.floor(latData), 2);
        tilelatData = zeroPad(Math.floor(latData), 2);

        if (longData < 0) {
            filename += "W"
        } else {
            filename += "E"
        }

        filename += zeroPad(Math.floor(longData), 3);
        tilelongData = zeroPad(Math.floor(longData), 3);

        filename += ".hgt"
        let resolution = 0.00027778;
        let size = 0;


        if (filename == "NNaNENaN.hgt") {
            return "error";
        }


        let h = getFileFromCache(filename);

        if (h.length === 12967201 * 2) {
            resolution = 1;
            size = 3601;
        } else if (h.length === 1442401 * 2) {
            resolution = 3;
            size = 1201;
        } else {
            console.log('Unknown tile format (1 arcsecond and 3 arcsecond supported).');
        }

        let row = Math.floor((latData - tilelatData) * size);
        let col = Math.floor((longData - tilelongData) * size);
        let offset = ((size - row - 1) * size + col) * 2;


        return h.readInt16BE(offset);



    }
}





const getFileFromCache = (filename) => {
    if (global.fileCache[filename]) {
        return global.fileCache[filename]
    }

    let fData = fs.readFileSync("data/" + filename)

    global.fileCache[filename] = fData
    return fData;
}



let zeroPad = function (v, l) {
    let r = v.toString();
    while (r.length < l) {
        r = '0' + r;
    }
    return r;
};