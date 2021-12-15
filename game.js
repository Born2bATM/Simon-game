var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstKeydownCount = true;
var level = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  firstKeydownCount = true;
}

function checkAnswer(currentLevel) {
  var checkAnswerLog = false;
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log(userClickedPattern);
    console.log(firstKeydownCount);
    console.log(gamePattern);
    console.log(level);
  }

  return checkAnswerLog;
}

$(document).keydown(function () {
  if (firstKeydownCount) {
    nextSequence();
    firstKeydownCount = false;
  }
});

$(".btn").click(function (event) {
  playSound(event.target.id);
  animatePress(event.target.id);
  userClickedPattern.push(event.target.id);
  checkAnswer(userClickedPattern.length - 1);
});
