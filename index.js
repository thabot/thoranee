const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.post('/getelevation', (req, res) => {
    var datatmp = JSON.parse(req.body.data);
    let startEV = 0
    let minEV = 100000000000
    let maxEV = 0
    let endEV = 0

    for (var i = 0; i < datatmp.length; i++) {

        //console.log("lat=" + datatmp[i].lat + ",long="+datatmp[i].long)
        datatmp[i].elevation = elevation.getelevation(datatmp[i].lat, datatmp[i].long)
        //console.log(elevation.getfilename(datatmp[i].lat,datatmp[i].long));

        if (i == 0) {
            startEV = datatmp[i].elevation;
        }

        if (i == datatmp.length - 1) {
            endEV = datatmp[i].elevation;
        }

        if (datatmp[i].elevation < minEV) {
            minEV = datatmp[i].elevation
        }

        if (datatmp[i].elevation > maxEV) {
            maxEV = datatmp[i].elevation
        }

        //datatmp[i].elevation=i+1;
        if (i == 0) {
            datatmp[i].distance = 0
        } else {
            datatmp[i].distance = distance.getDistanceFromLatLonInKm(datatmp[i].lat, datatmp[i].long, datatmp[i - 1].lat, datatmp[i - 1].long)

            //datatmp[i].distance=0

        }

    }

    let dr = { data: datatmp, startelevation: startEV, endelevation: endEV, minelevation: minEV, maxelevation: maxEV };
    //console.log(dr);
    res.json(JSON.stringify(dr))
});



app.listen(9901, () => {
    console.log('Start server api elevation at port 9901.')
  });