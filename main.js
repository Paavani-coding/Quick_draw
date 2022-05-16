var sketch;
timer_counter = 0;
timer_check="";
drawn_sketch="";
answer_holder= "";
score=0;
var x= document.getElementById("myAudio");

function updateCanvas(){
    quick_draw_data_set = ["airplane","alarm_clock","apple","axe","banana","bandage","basketball","bathtub","bear","beard","bed","bicycle","binoculars","bird","birthday_cake"];
    random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch= quick_draw_data_set[random_no];
    console.log(sketch);
     document.getElementById("sketch_to_be_drawn").innerHTML= "Sketch to be drawn: "+ sketch;
}

function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas= createCanvas(450,380);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth= window.speechSynthesis;
    updateCanvas();
}

function draw(){

    x.volume= 0.2;
    x.play();
    x.loop=true;
    strokeWeight(20);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
    check_sketch();
    
    
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('sketch_identified').innerHTML= 'Your Sketch: '+ results[0].label;
    document.getElementById('sketch_confidence').innerHTML= 'Confidence: '+ Math.round(results[0].confidence* 100)+ '%';

    drawn_sketch= results[0].label;

    utterThis= new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
   
}

function clearCanvas(){
    canvas.background("white");
}

function check_sketch(){

    if(drawn_sketch==sketch){
        answer_holder="set";
        score= score+1;
        console.log(score);
        document.getElementById("sketch_score").innerHTML= 'Score: '+ score;
    }

   timer_counter= timer_counter+1;
   document.getElementById("skecth_timer").innerHTML= 'Timer: '+ timer_counter;
   if (timer_counter== 1000){
       timer_counter=0;
       timer_check="Completed";
   }
   
   
   

   if (timer_check== "Completed"|| answer_holder=="set"){
    timer_check="";
    answer_holder="";
    canvas.background("white")
    updateCanvas();

}

}