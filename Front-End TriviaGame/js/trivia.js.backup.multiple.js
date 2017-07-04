
var counter = 0, //score counter
    level = "easy", //how many questions are there?
    difficulty = ["easy", "medium", "hard"]; //level of questions?
    var SRVanswer; //result from API Trivia Server
    var randNum; //for exchange the different answer in the multiple choise area
    var rightAnswers;

function init_number_selector()
{
   var selectNumbers = '';
for (i=1;i<=50;i++){
    selectNumbers += '<option val=' + i + '>' + i + '</option>';
}
$('#numberselector').html(selectNumbers);
}

function update_counter()
{
   counter++;
   var newCounter = '<p><span>Score:</span> '+counter+'</p>';
    //console.log(newCounter);

$('#counter').html(newCounter);
}

function update_level()
{

  if(level == difficulty[0])
  {
    level = difficulty[1];
  }
  else if(level == difficulty[1])
  {
  level = difficulty[2];
  }
   
   var newLevel = '<p><span>Level:</span> '+level+'</p>';
  //console.log(newLevel);
  $('#level').html(newLevel);
  
}

$('#q_check input').on('change', function() {
   alert($('input[name=test]:checked', '#q_check').val()); 
});


//function submit_and_score(){
//if($("#input").is(':checked'))
//{
  //  $("#this").hide();  // unchecked

//}
//else
//{
//
// }


//$('input[type=radio]:checked').each(function () {
  //         if (this.checked) 
    //       {
      //         console.log($(this).val()); 
        //  }
//});


  //using jQuery loop over and tags --->     '<form class="q_check" action="#">
  //and for each form add the result(true or false)
  //than update the score of the User
  //if the score is larger than X update to the next level
//}

$(document).ready(function() {
    init_number_selector();
});



function append_question_multiple(data){

  //alert(data.question);
  randNum++;
  var htmlCode;
  if(randNum%2 == 0)
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
    '<div style="color: #f00;">',
    '<input name="test" type="radio" value="true" /> D) '+data.correct_answer,
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
    '<div style="color: #f00;">',
    '<input name="test" type="radio" value="true" /> D) '+data.correct_answer,
    '</div>',
    '<div>',
    '<input name="test" type="radio" value="false" /> C) '+data.incorrect_answers[2],
    '</div>','<div>',
    '<input name="test" type="radio" value="false" /> C) '+data.incorrect_answers[1],
    '</div>',
    '</form>',
    '<br>'
].join("\n");
}
  $("#questionHere").append(htmlCode);
}

function append_question_boolean(data){

  //alert(data.question);
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

  $("#questionHere").append(htmlCode);
   // alert($(".q option:selected").val());
}


//define the behavior of submit button
$('#submit_button').click( function() {
$('#questionHere').html("<h6> </h6>");
$('#submit_button').hide();
update_counter();

submit_and_score();

});

$('#lets_play_button').click( function() {

//alert("number of questions: " + $("#numberselector option:selected" ).text());

var type = $("#questiontypeselector option:selected").val();
var nquestions = $("#numberselector option:selected").val();
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
              else
                append_question_boolean(property);
              }
            }
        $("#submit_button").show();
        },
        dataType: "json"//set to JSON
    });    
});