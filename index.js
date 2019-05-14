var cmd = require('node-cmd');
var NodeWebcam = require("node-webcam");
var regex = /CU([a-z]|[0-9]|[A-Z])+BE/;
var opts = {
    //Picture related
    width: 1080,
    height: 720,
    quality: 100,
    //Delay to take shot
    delay: 0,
    //Save shots in memory
    saveShots: true,
    output: "png",
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",
    //Logging
    verbose: false
};


function detectCode() {
    console.log("Called")
    NodeWebcam.capture("test_picture", opts, function (err, data) {
        
    });
}

var fs = require('fs');
var http = require('http');
//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
    var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    var request = http.get(url, function (response) {
        response.pipe(file);
    });
}

function detectImageFromRemoteIPCamera() {
    setInterval(() => {
        saveImageToDisk("http://172.16.91.158:8080/shot.jpg", "test_picture.png");
    }, 1000);
}

cmd.get(
    'tesseract testa.png stdout',
    function (err, data, stderr) {
        console.log(data);
        if (found = regex.exec(data)) {
            console.log(found[0]);
        }
        detectCode();
    }
);