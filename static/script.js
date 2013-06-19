$(document).ready(function() {
    // click listener
    $(".little_table").find("td:not(.filled)").click(function() {
        if($(this).closest('.live').length === 0) {
            // the clicked td was not live
            return;
        }

        // whose turn is it?
        var colour = $("#turn").hasClass("red") ? "red" : "blue";

        little_table = $(this).closest('.little_table');
        little_col = $(this).attr('class');
        little_row = $(this).closest('tr').attr('class');
        little_pos = '.col-' + little_col + '.row-' + little_row;

        $(".live").removeClass('live');
        if($(".little_table" + little_pos + " td").not('.filled').length === 0) {
            $(".big_table").addClass('live');
        } else {
            $(".little_table" + little_pos).addClass('live');
        }

        var div = $("<div>").addClass("tile").addClass(colour).addClass('col-' + little_col).addClass('row-' + little_row);
        $(this).html(div); // add the tile
        $(this).addClass("filled"); // mark the td as filled
        $(this).unbind("click"); // prevent this td being clicked again

        tiles = little_table.find(".tile").filter("." + colour);

        if(threeInRow(tiles) || threeInColumn(tiles) || threeInDiagonal(tiles)) {
            little_table.addClass(colour);
            if(colour === 'red') {
                little_table.find('td').css('backgroundColor', '#ffaaaa');
            } else {
                little_table.find('td').css('backgroundColor', '#aaaaff');
            }
        }

        tiles = $('.little_table').filter("." + colour);

        if(threeInRow(tiles) || threeInColumn(tiles) || threeInDiagonal(tiles)) {
            win();
        } else {
            if($("td").not('.filled').length === 0) {
                // wow - what a boring game!
                $("#turn").fadeOut(500, function() {
                    showNewGame();
                });
            } else {
                $("#turn").removeClass(colour).addClass((colour === "red") ? "blue" : "red");
                $("#turn").text(((colour === "red") ? "Blue" : "Red") + "'s Turn!");
            }
        }
    });
});

function win() {
    var curTop = $("#turn").offset().top;
    var top = $(".big_table").position().top;
    var left = $(".big_table").offset().left;

    $("#turn").css({
        "position": "absolute",
        "left": left + "px",
        "top": curTop + "px"
    });

    $("#turn").text("");

    $("#turn").animate({
        top: top + "px",
        height: "560px",
        opacity: 0.85
    }, 500, function() {
        showNewGame();
    });
}

function showNewGame() {
    $("#newGame").css('display', 'block').hide().fadeIn(500);
}

function threeInRow(tiles) {
       return (($(tiles).filter(".row-1").length === 3) || ($(tiles).filter(".row-2").length === 3) || ($(tiles).filter(".row-3").length === 3));
}

function threeInColumn(tiles) {
       return (($(tiles).filter(".col-1").length === 3) || ($(tiles).filter(".col-2").length === 3) || ($(tiles).filter(".col-3").length === 3));
}

function threeInDiagonal(tiles) {
    //No middle tile
    if($(tiles).filter(".col-2").filter(".row-2").length === 0) {
        return false;
    }

    if($(tiles).filter(".col-1").filter(".row-1").length === 1 && $(tiles).filter(".col-3").filter(".row-3").length === 1) {
        return true;
    }

    if($(tiles).filter(".col-1").filter(".row-3").length === 1 && $(tiles).filter(".col-3").filter(".row-1").length === 1) {
        return true;
    }

    return false;
}