$(document).ready(function() {
  var previousval = "X";
  var currentval;
  var count = 0;
  $(".eachbox").one("click",function() {
    $(this).addClass("selected");
      if(previousval == "X")
      {
        currentval = "O";
      }
      else if (previousval == "O") {
        currentval = "X";
      }
      previousval = currentval;
      $(this).text(currentval);
      //check for  row match
      if($(this).siblings(".selected").length == 2)
      {
        $(this).parents(".eachrow").children(".eachbox").each(function(index){
          return winnerCheck(index, $(this));
        });
      }

      //check for column match
      var column = $(this).attr("class").split(" ")[1];
      if($("."+column+".selected").length == 3)
      {
        $("."+column+" ").each(function(index){
          return winnerCheck(index, $(this),column);
        });
      }

      //check for diagonal match
      if($(this).hasClass("js-diag1") || $(this).hasClass("js-diag2"))
      {
        var diagclass = $(this).hasClass("js-diag1")? "js-diag1" : "js-diag2";
        if($("."+diagclass+".selected").length == 3)
        {
          $("."+diagclass+" ").each(function(index){
            //return winnerCheck(index, $(this), $("."+diagclass+" ");
            return winnerCheck(index, $(this),diagclass);
          });
        }
      }
  });
  function winnerCheck(index, currentdom, classname="") {
    if($(currentdom).text() == currentval)
    {
      if(index == 2)
      {
        //to make vertical or horizontak strikes
        if(classname != "")
        {
          $("."+classname+" ").addClass("strikethrough");
        }
        else {
          $(currentdom).parents(".eachrow").children(".eachbox").addClass("strikethrough");
        }
        if(classname == "js-col1" || classname == "js-col2"  || classname == "js-col3" )
        {
          $("."+classname+" ").addClass("vertical");
        }
        else if (classname == "js-diag1") {
            $("."+classname+" ").addClass("crosspositive");
        }
       else if (classname == "js-diag2") {
            $("."+classname+" ").addClass("crossnegative");
        }
        //to make vertical or horizontak strikes ends
        setTimeout(function(){
          alert(" "+currentval+"  is winner!");
          location.reload();
        }, 800);
      }
    }
    else{
      if($(".selected").length == 9){
        ++count;
        if(count == 2)
        {
          setTimeout(function(){
            alert("Its a TIE! Play again");
            location.reload();
          }, 800);
        }
      }
      return false;
    }
  }
});
