(function () {

    function getScrollPosition() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    }

    /*
        Method taken and modified from: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
    */
    function getPosition(el) {
        var xPos = 0;
        var yPos = 0;
        var xScroll, yScroll;

        while (el) {
            // deal with browser quirks with body/window/document and page scroll
            xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);

            el = el.offsetParent;
        }

        return {
            x: xPos,
            y: yPos
        };
    }

// elemPos.y + scrollPos.y
    function animateScrollTo(x, y, duration, time) {
        time = time || 0;

        var scrollPos = getScrollPosition();
        var scrollDistance = scrollPos.y + y;

        console.log('Elem:', x, y);
        console.log('Scroll:', scrollPos.x, scrollPos.y, scrollDistance);
    }

    var buttons = document.querySelectorAll('.scroll-buttons button');

    buttons.forEach(function (button) {
        button.onclick = function () {
            var elem = document.querySelector(this.dataset.scrollSelector);
            if (elem) {
                var elemPos = getPosition(elem);
                var scrollPos = getScrollPosition();
                animateScrollTo(0, elemPos.y, 2);
            }
        };
    });

}());