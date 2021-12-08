Webcam.set({
    width:300,
    height:275,
    image_format:"png",
    image_quality:90
})
console.log("webcam is set");
camera=document.getElementById("camera")
Webcam.attach("#camera");
function snapshot(){
    Webcam.snap(function (datauri){
        document.getElementById("result").innerHTML="<img id='snapshot' src="+datauri+">"
    })
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tikNQOtwl/model.json",modelloaded)
function modelloaded(){
    console.log("model loaded");
}
function talk(){
    speak_synth=window.speechSynthesis;
    speak_data1="The first prediction is"+prediction1;

    utter=new SpeechSynthesisUtterance(speak_data1);
    speak_synth.speak(utter)
}
function check(){
    img=document.getElementById("snapshot");
    classifier.classify(img,gotresult)
}
function gotresult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("gesture").innerHTML=result[0].label
        
        prediction1=result[0].label;
        
        talk()
        if(result[0].label=="victory"){
            document.getElementById("gesture_name").innerHTML="&#9996;"
        }
        else if(result[0].label=="best"){
            document.getElementById("gesture_name").innerHTML="&#128077;"
        }
        else{
            document.getElementById("gesture_name").innerHTML="&#128076;"
        }
    }
}