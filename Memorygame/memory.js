$(document).ready(function(){
  function Memory(){
    this.m = 0;
    this.n = 0;
    this.timeleft = 60; //time in seconds
    this.numarr = [];
    this.oth = [];
    this.starttimer;
    this.iseasy = true;
    var starttimer;
  }
  var Memoryobj = new Memory();
  $('#settingsModal').modal('show');
  $(".js-startgame").unbind().bind("click", this, function(e) {
    var getSettings =  Memoryobj.getSettings();
    if(getSettings != false){
        Memoryobj.startGame();
    }
  });

  Memory.prototype.randomNoGenerate = function(currentdom){

    var r = Math.floor(Math.random() * (this.m*this.n))+1;
    if(this.numarr.indexOf(r)=== -1)
    {
      this.numarr.push(r);
      if(r > Math.floor((this.m*this.n)/2))
      {
        r = Math.abs(r -Math.floor((this.m*this.n)/2));
      }
      if(this.m*this.n >= 12 && this.iseasy == true  && r > Math.floor((this.m*this.n)/4))
      {
        r = Math.abs(r -Math.floor((this.m*this.n)/4));
      }
      this.oth.push(r);
      $(currentdom).val(r);
      return true;
    }
    else{
      return false;
    }
  };
  Memory.prototype.getSettings = function(){
    this.m = $("#m_value").val();
    this.n = $("#n_value").val();
    var m =this.m;
    var n =this.n;
    if(m == "")
    {
      $(".msg").html("<div>M of Grid Size cannot be empty!</div>");
      return false;
    }
    if(n == ""){
      $(".msg").html("<div>N of Grid Size cannot be empty!</div>");
      return false;
    }
    if(m*n%2 != 0){
      $(".msg").html("<div>Product of m & n should be even!</div>");
      return false;
    }
    if(m*n >= 36){
      this.timeleft = 2*this.timeleft;
    }
    if(m > 8 || n > 8){
      $(".msg").html("<div>Grid Size is too large to play a good game</div>");
      return false;
    }
    $("input[type=radio][name=level]").change(function(e) {
      if(this.value !="easy")
      {
        e.data.iseasy = false;
        e.data.timeleft = 2*e.data.timeleft;
      }
  });
};
  Memory.prototype.startGame = function(){
    $('#settingsModal').modal('hide');
    var timeleft = this.timeleft;
    starttimer = setInterval(function(){
      timeleft--;
      document.getElementById("countdowntimer").textContent = timeleft;
      if(timeleft == 0){
        $(".eachbox").unbind("click");
        clearInterval(starttimer);
        var score = $(".paired").length*5/2;
        alert("TIME UP! Your score is "+score+" ");
      }
    }, 1000);
    //Buidling a  m by n grid
    for(var i= 1; i<=this.m; i++)
    {
      var rowholder = $('<div class ="rowholder"></div>').appendTo($('.gridHolder'));
      for(var j=1; j<= this.n;j++)
      {
        $('<div class="eachbox"></div>').appendTo($(rowholder));
      }
    }
    $(".eachbox").each(function(){
      var returnval = false;
      while(!returnval){
        //var returnval = e.data.randomNoGenerate($(this));
        var returnval = Memoryobj.randomNoGenerate($(this));
      }
    });
    Memoryobj.BindTileClick();
  };
  Memory.prototype.BindTileClick = function(){
    $(".eachbox").unbind().bind("click", this, function(e) {
      $(this).append('<span>'+$(this).val()+'</span>');
      if($(".cardopened").length == 1){
        if($(this).val() == $(".cardopened").val()){
          $(this).addClass("cardopened");
          $(".eachbox.cardopened").find("span").fadeOut(800,function(){
            $(".eachbox.cardopened").addClass("paired").removeClass("cardopened");
            $(".paired").unbind("click");
            if($(".paired").length == e.data.m*e.data.n){
              var score = Number((e.data.m*e.data.n)) + Number($("#countdowntimer").text());
              setTimeout(function(){
                clearInterval(starttimer);
                alert("Superb! You won.Your score is "+score+" ");
              },500);
            }
          });
        }
        else{
            $(this).addClass("cardopened");
            $(".cardopened").find("span").fadeOut(800,function(){
              $(".cardopened").empty();
              $(".eachbox.cardopened").removeClass("cardopened");
            });
        }
      }
      else{
        $(this).addClass("cardopened");
      }
    });
  };
});
