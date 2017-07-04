
var counter = 0, //score counter
    level = "easy", //how many questions are there?
    difficulty = ["easy", "medium", "hard"]; //level of questions?
    var how_many_questions = 0; //how much questions are passed?
    var randNum =0; 

function update_stats()
{
  counter++;
  var newCounter = '<p><span>Score:</span> '+counter+'</p>';
  //console.log(newCounter);

$('#counter').html(newCounter);
}

function update_level()
{
  if(counter > 6)
  {
    level = difficulty[1];
  }
  else if(counter > 15)
  {
  level = difficulty[2];
  }
   
   var newLevel = '<p><span>Level:</span> '+level+'</p>';
  //console.log(newLevel);
  $('#level').html(newLevel);
  
}

function append_question_multiple(data){

  //alert(data.question);
  //get a random number
  var randNum = Math.floor((Math.random() * 10) + 4)%4; //for exchange the different answer in the multiple choise area
  var htmlCode;
  //console.log(randNum);
  if(randNum == 0)
  {
    htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="true" /> D) '+data.correct_answer,
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> B) '+data.incorrect_answers[1],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> C) '+data.incorrect_answers[2],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> A) '+data.incorrect_answers[0],
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}

if(randNum == 1)
  {
    htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="false" /> A) '+data.incorrect_answers[0],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="true" /> B) '+data.correct_answer,
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> C) '+data.incorrect_answers[2],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> D) '+data.incorrect_answers[1],
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}

if(randNum == 2)
  {
    htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="false" /> A) '+data.incorrect_answers[0],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> B) '+data.incorrect_answers[1],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="true" /> C) '+data.correct_answer,
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> D) '+data.incorrect_answers[2],
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}
else
{
htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="false" /> A) '+data.incorrect_answers[0],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> B) '+data.incorrect_answers[1],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> C) '+data.incorrect_answers[2],
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="true" /> D) '+data.correct_answer,
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}
  $("#questionHere").html(htmlCode);
}

function append_question_boolean(data){

  //alert(data.question);
  var isTrue = false;
  isTrue = data.correct_answer.toLowerCase();

  //console.log(isTrue);

  if(isTrue == "true"){
  var htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="true" /> True',
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> False',
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}
else
{
var htmlCode = [
    '<form class="q_check" action="#">',
    '<h4>'+data.question+'</h4>',
    '<div>',
    '<input name="test" type="radio" value="false" /> True',
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="true" /> False',
    '</div>',
    '</form>',
    '<br>'
].join("\n");

}
  $("#questionHere").html(htmlCode);
   // alert($(".q option:selected").val());
}


//define the behavior of submit button
$('#submit_button').click( function() {
var input_ans = $('input[name=test]:checked');

if(!input_ans.length)
{
  $('#questionHere').html("<h6>Error, you have'nt select anything click on 'Let's play' to continue.</h6>");
  $("#submit_button").hide();
  return;
}

var isRight = input_ans[0].value;

//console.log(isRight);
//check the value of the question, if it is right update counter and level if not, not

if(isRight == 'true')
{
  $('#questionHere').html("<h6>Congratulations you are right! :) click on 'Let's play' to continue.</h6>");
  update_level();
  update_stats();
}

if(isRight == 'false')
{
    $('#questionHere').html("<h6>Boo! you are wrong! :( click on 'Let's play' to continue.</h6>");
}

$("#submit_button").hide();
//update the successRATE

var htmlCode = '<p><span>Success Rate:</span> '+(counter/how_many_questions)*100+'%'+'</p>';
$('#success_rate').html(htmlCode);
});


function get_question(){

//alert("number of questions: " + $("#numberselector option:selected" ).text());

var type = $("#questiontypeselector option:selected").val();
var nquestions = 1;
var category = $("#catselector option:selected").val();

//alert("questionType: " + qtype[type]);
//alert("numQuestions: " + nquestions);
//alert("catQuestions: " + category);

//var requestMessege = 'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=boolean

var requestMessege = 'https://opentdb.com/api.php?amount='+nquestions+'&category='+category+'&difficulty='+level+'&type='+type;
var response = "";
    var form_data = {};
    $.ajax({
        type: "POST", 
        url: requestMessege, 
        data: form_data,
        success: function(response)
        {
          /**
          {
            //one question example
          "response_code":0
          ,"results":[{"category":"Entertainment: Video Games",
          "type":"multiple",
          "difficulty":"medium",
          "question":"In what Anno game did the eco balance an part of the game play?"
          ,"correct_answer":"Anno 2070"
          ,"incorrect_answers":["Anno 1404"
          ,"Anno 2205"
          ," Anno 1701"]}]}
          */

        for (var i in response) 
            {
            var jsObject = response[i];
            for (object in jsObject) {
                var property = jsObject[object];
                /*Now we can extract the questions and all of fields related to it*/
                //alert(properties.question);
                //alert(properties.correct_answer);
                if(property.type == "multiple")
                append_question_multiple(property);
                if(property.type == "boolean")
                append_question_boolean(property);
              }
            }
        $("#submit_button").show();
        },
        dataType: "json"//set to JSON
    });    
}

$('#lets_play_button').click( function() {
get_question();
//update the total questions counter
how_many_questions++;
  var htmlCode = '<p><span>Total Questions:</span> '+how_many_questions+'</p>';
  $('#total_questions').html(htmlCode);


});
