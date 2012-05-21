$(document).ready(function() {
   $("#boardTable").find("td:not(.filled)").click(function() {
      var color = $("#turn").hasClass("red") ? "red" : "blue";

      var div = $("<div>").addClass("tile").addClass(color).attr('row', $(this).parent().attr('id')).attr('col', $(this).attr('class'));
      $(this).html(div);
      $(this).addClass("filled");
      $(this).unbind("click");
      
      var tiles = $(".tile").filter("." + color);
      
      if(threeInRow(tiles) || threeInColumn(tiles) || threeInDiagonal(tiles)) {
          win();   
      } else {
          
          if($("td").not('.filled').length === 0) {
              $("#turn").fadeOut(500);
              showNewGame();
          } else {
              $("#turn").removeClass(color).addClass((color === "red") ? "blue" : "red");
              $("#turn").text(((color === "red") ? "Blue" : "Red") + "'s Turn!");
          }
      }
   });
});

function win() {
    var curTop = $("#turn").offset().top;
    var top = $("#boardTable").position().top;
    var left = $("#boardTable").offset().left;
    
    $("#turn").css({
        "position": "absolute",
        "left": left + "px",
        "top": curTop + "px"
    });
    
    $("#turn").text("");
    
    $("#turn").animate({ 
        top: top + "px",
        height: "360px",
        opacity: 0.85
    }, 500);
    
    showNewGame();
}

function showNewGame() {
    $("#newGame").fadeIn(500);
}

function threeInRow(tiles) {
       return (($(tiles).filter("[row='1']").length === 3) || ($(tiles).filter("[row='2']").length === 3) || ($(tiles).filter("[row='3']").length === 3))
}



function threeInColumn(tiles) {
       return (($(tiles).filter("[col='1']").length === 3) || ($(tiles).filter("[col='2']").length === 3) || ($(tiles).filter("[col='3']").length === 3))
}

function threeInDiagonal(tiles) {
    //No middle tile
    if($(tiles).filter("[col='2']").filter("[row='2']").length === 0) {
        return false;   
    }
    
    //None from first col
    if($(tiles).filter("[col='1']").filter("[row='1']").length === 0 && $(tiles).filter("[col='1']").filter("[row='3']").length === 0) {
        return false;
    }
    
    if($(tiles).filter("[col='1']").filter("[row='1']").length === 1 && $(tiles).filter("[col='3']").filter("[row='3']").length === 1) {
        console.log("negative");
        return true;
    }
    console.log($(tiles).filter("[col='1']").filter("[row='3']"));
    if($(tiles).filter("[col='1']").filter("[row='3']").length === 1 && $(tiles).filter("[col='3']").filter("[row='1']").length === 1) {
        console.log("positive");
        return true;
    }
    
    return false;
}