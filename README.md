## Thoranee is api Get elevation map from lat and long
- run on nodejs
- data file hgt from nasa base on thailand
### Features
- api for get data lat and long 
### Start run on docker
#### donwload file hgt from https://e4ftl01.cr.usgs.gov/MEASURES/SRTMGL1.003/2000.02.11/index.html into folder /Data

`$ git clone https://github.com/thabot/thoranee`

`$ docker build -t thoranee:master .`

`$ docker run -d --name thoranee --restart=always -p 5003:3000 thoranee:master node index.js`

### run web API
### check elevation
`$ http://localhost:3000/getelevation/?lat=13.15&long=100.23`

#### return json
    [
        {
            "lat": "13.15",
            "long": "100.23",
            "elevation": 0
        }
    ]


