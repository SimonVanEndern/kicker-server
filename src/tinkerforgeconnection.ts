function tinkerforgeconnection () {
    var Tinkerforge = require('tinkerforge');
    this.tinker = Tinkerforge;

    var HOST = 'localhost';
    var PORT = 4223;
    var UID = 'qoZ'; // Change to your UID

    var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
    var md = new Tinkerforge.BrickletMotionDetector(UID, ipcon); // Create device object

    ipcon.connect(HOST, PORT,
        function (error) {
            console.log('Error: ' + error);
        }
    ); // Connect to brickd
    // Don't use device before ipcon is connected

    // Register motion detected callback
    

    // Register detection cycle ended callback
    md.on(Tinkerforge.BrickletMotionDetector.CALLBACK_DETECTION_CYCLE_ENDED,
        // Callback function for detection cycle ended callback
        function () {
            console.log('Detection Cycle Ended (next detection possible in ~3 seconds)');
        }
    );

    this.md = md;

    this.motionListener = function motionListener (callbackFuntion) {
        this.md.on(this.tinker.BrickletMotionDetector.CALLBACK_MOTION_DETECTED,
            // Callback function for motion detected callback
            function () {
                callbackFuntion();
                console.log('Motion Detected');
            }
        );
    }
}

declare var module: any;

module.exports = new tinkerforgeconnection();