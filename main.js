Prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Camera = document.getElementById("Camera");

Webcam.attach("Camera");

function Capture() {
    Webcam.snap(function (DataUrl) {
        document.getElementById("Result").innerHTML = "<img id='CapturedImage' src='" + DataUrl + "'/>";
    });
}

console.log("ml5 version:", ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FJtJTSZy8/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}

function Speak() {
    var Synth = window.speechSynthesis;
    SpeakData = "The prediction is " + Prediction;
    var UtterThis = new SpeechSynthesisUtterance(SpeakData);
    Synth.speak(UtterThis);
}

function Check() {
    Img = document.getElementById("CapturedImage");
    Classifier.classify(Img, GetResult);
}

function GetResult(Error, Results) {
    if (Error) {
        console.error(Error);
    } else {
        console.log(Results);
        document.getElementById("GestureName").innerHTML = Results[0].label;
        Prediction = Results[0].label;
        Speak();
        if (Results[0].label == "Amazing") {
            document.getElementById("Gesture").innerHTML = "&#128076;";
        }
        if (Results[0].label == "Best") {
            document.getElementById("Gesture").innerHTML = "&#128077;";
        }
        if (Results[0].label == "Victory") {
            document.getElementById("Gesture").innerHTML = "&#9996;";
        }
    }
}