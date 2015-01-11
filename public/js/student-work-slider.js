$( document ).ready(function() {
    window.viewportWidth = $(window).width() + ( $(window).width() / 4 );
    window.reverse = viewportWidth * - 1;
    check_next_slide();

    setTimeout(function() {
        window.get_amount_of_projects = $( '#get-value' ).attr('value');
        check_amount_projects();
    }, 500);
});

function check_amount_projects () {
    if (get_amount_of_projects <= 6) {
        $( '#controles' ).css("visibility", "hidden");
    } else {
        console.log("I have a value off: " + get_amount_of_projects);
    }
}

function clicked (side) {
    var check_side = side;

    if(check_side === "left") {
        check_amount_projects();
        $( '.slide-student:nth-child(2)' ).css({left: 0});
        $( '.slide-student:nth-child(3)' ).css({left: viewportWidth});
    } else if (check_side === "right") {
        if (get_amount_of_projects > 6) {
            check_amount_projects();
            $( '.slide-student:nth-child(2)' ).css({left: reverse});
            $( '.slide-student:nth-child(3)' ).css({left: 0});
        } else {
            alert("boe");
        }
    } else {
        console.log(check_side + ' is not a valid side!');
    }
}

function check_next_slide () {
    var first_left_pos = get_style_value('left', '.slide-student:nth-child(2)');
    var last_right_pos = get_style_value('left', '.slide-student:last-child');
    if(first_left_pos === "0px") {
        $( '#left-student-slide' ).css('visibility', 'hidden');
        console.log('First value is 0: ' + first_left_pos);
    } else {
        console.log('First value is not 0 the value is: ' + first_left_pos);
    }

    if(last_right_pos === "0px") {
        $( '#left-student-slide' ).css('visibility', 'visible');
        console.log('Last value is 0: ' + last_right_pos);
    } else {
        console.log('Last value is not 0 the value is: ' + last_right_pos);
    }
}

function get_style_value(style, selector, sheet) {
    var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
    for (var i = 0, l = sheets.length; i < l; i++) {
        var sheet = sheets[i];
        if( !sheet.cssRules ) { continue; }
        for (var j = 0, k = sheet.cssRules.length; j < k; j++) {
            var rule = sheet.cssRules[j];
            if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                return rule.style[style];
            }
        }
    }
    return null;
}
