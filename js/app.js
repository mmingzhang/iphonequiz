/* global $ */
$(document).ready(function() {

  var totalselection = 6;
  var invalidnum = -1;
  var fail = 0;
  var pass = 1;
  var quizanswers = [0, 2, 1, 2, 0, 1]; // answer number: 0, 1, 2  
  var questions = new Array(totalselection); 
  var answersarr = new Array(totalselection); 
  var lastresults = new Array(totalselection); 
  
  var useranswers = [];   //-1=invalid,0=fail,1=pass

  InitialData();

  // Click Next button
  $('.btn-nextclick').mouseup(function () {
    $('.btn-next').show();
    $('.btn-nextclick').hide();
    $('.btn-restart').hide();
    $('.btn-restartclick').hide();

    // update data 
    UpdateSelection();
    
  });

  $('.btn-next').mousedown(function () {
    $('.btn-next').hide();
    $('.btn-nextclick').show();
    $('.btn-restart').hide();
    $('.btn-restartclick').hide();
    
  });

 // Click Restart button
 $('.btn-restart').mousedown(function () {
    $('.btn-next').hide();
    $('.btn-nextclick').hide();
    $('.btn-restart').hide();
    $('.btn-restartclick').show();
    
  });
  $('.btn-restartclick').mouseup(function () {
    $('.btn-next').show();
    $('.btn-nextclick').hide();
    $('.btn-restart').hide();
    $('.btn-restartclick').hide();
    NewQuiz();
  });

  function ResetUserAnswers ()
  {
    for (var i=0; i<totalselection; i++)
      useranswers[i] = invalidnum;
  }

  function GetCurrentSel ()
  {
    for (var i=0; i<totalselection; i++)
      if (useranswers[i] === invalidnum)
        return i;
    return invalidnum;
  }

  function UpdateSelection() 
  {
    var sel = 0;
    var resultstr;
    var resultcolor;
    var currentsel = GetCurrentSel();
    
    if (currentsel != invalidnum) {
      if(document.getElementById('ans1').checked) {
        //alert("0 is checked");
        sel = 0;
      }else if($('#ans2').is(":checked")) {
        //alert("1 is checked");
        sel = 1;
      }else if($('#ans3').is(":checked")) {
        //alert("2 is checked");
        sel = 2;
      }
      else {
         alert("Please select an item.");
         return;
      }

      if (sel === quizanswers[currentsel])
      {
        useranswers[currentsel] = pass;
        resultcolor = "rgb(107,135,69)"; // green
      }
      else
      {
        useranswers[currentsel] = fail;
        resultcolor = "rgb(207,79,14)";  // red
      }

      resultstr = "#result" + (currentsel + 1);
      $(resultstr).css('background-color', resultcolor);

      // uncheck the radio buttons
      $('#ans1').prop('checked', false);
      $('#ans2').prop('checked', false);
      $('#ans3').prop('checked', false);
    }

    UpdateDisplay(currentsel);
  }

  function UpdateDisplay(currentsel) 
  {
    var finalstr;
    var passcnt;

    if (currentsel+1 < totalselection) {
        $('.question-text').text(questions[currentsel+1]);
        $('.itemtxt1').text(answersarr[currentsel+1][0]);
        $('.itemtxt2').text(answersarr[currentsel+1][1]);
        $('.itemtxt3').text(answersarr[currentsel+1][2]);
        $('#result-text').text(lastresults[currentsel]);
    }
    else {
      // complete quiz
      passcnt = 0;
      for (var i=0; i<totalselection; i++)
        if (useranswers[i] === pass)
          passcnt++;
      finalstr = "You got " + passcnt + " of 6!";

      $('#passcnt-text').text(finalstr); 
      $('#result-text').text(lastresults[totalselection-1]);
      $('#result-text').css('margin-top', '4em');

      $('.phone-normal').hide();
      $('.phone-final').show();
      $('.final-text').show(); 
      $('.question-text').hide();
      $('.answers').hide();

      $('.btn-next').hide();
      $('.btn-nextclick').hide();
      $('.btn-restart').show();
      $('.btn-restartclick').hide();
    }
  }

  function NewQuiz ()
  {
    var resultstr
    var resultcolor = "rgb(252,227,182)";

    ResetUserAnswers();
    $('.question-text').text(questions[0]);
    $('.itemtxt1').text(answersarr[0][0]);
    $('.itemtxt2').text(answersarr[0][1]);
    $('.itemtxt3').text(answersarr[0][2]);
    $('#result-text').text('');
    $('#result-text').css('margin-top', '0em');

    $('.phone-normal').show();
    $('.phone-final').hide();
    $('.final-text').hide(); 
    $('.question-text').show();
    $('.answers').show();

    // reset result color
    for (var i=0; i<totalselection; i++) {
      resultstr = "#result" + (i + 1);
      $(resultstr).css('background-color', resultcolor);
    }
      
  }

  function InitialData ()
  {
    ResetUserAnswers();

    questions[0] = "When did Steve Jobs announce the iPhone?";
    questions[1] = "How much did the 8-gigabyte iPhone cost in the United " +
                   "States when it first hit store shelves?";
    questions[2] = "In 2009, Apple introduced the first $99 iPhone. How much data can it store?";
    questions[3] = "What kind of camera does the iPhone 3GS have?";
    questions[4] = "Why did the FCC investigate Apple and AT&T in 2009?";
    questions[5] = "Which of these features isn't exclusive to the iPhone 3GS?";

    lastresults[0] = "Steve Jobs shocked the audience of Macworld 2007 when he unveiled the iPhone.";
    lastresults[1] = "On launch, Apple fans could buy an iPhone with 8 gigabytes of storage " +
                     "for $599. Apple also offered a 4-gigabyte version for $499.";
    lastresults[2] = "The 8 GB iPhone 3G is $99 with an AT&T contract in the United States. " +
                     "Compare that to the first 8 GB iPhone, which originally cost $599!";
    lastresults[3] = "The iPhone 3G has a 3-megapixel camera, an improvement over the iPhone 3G's 2-megapixel camera.";
    lastresults[4] = "The FCC wanted to know why Apple rejected applications using the Google Voice service.";
    lastresults[5] = "All current models of the iPhone support MMS services. Only the 3GS has voice control and a compass.";

    // answer two dimensional array
    answersarr[0] = ["At the keynote speech for Macworld",
                  "At the opening event for the 2007 Worldwide Developers Conference",
                  "At the 2008 It's Only \"Rock n Roll\" event"];
    answersarr[1] = ["$399",
                  "$499",
                  "$599"];
    answersarr[2] = ["4 gigabytes",
                  "8 gigabytes",
                  "16 gigabytes"];
    answersarr[3] = ["2 -megapixel camera",
                  "2.7-megapixel camera",
                  "3 -megapixel camera"];
    answersarr[4] = ["Apple had refused to let any Google Voice applications in its App Store.",
                  "The FCC was concerned that AT&T and Apple had created a monopoly.",
                  "The FCC never investigated the two companies."];
    answersarr[5] = ["Voice control",
                  "MMS support",
                  "A compass"];            
  }
  
});