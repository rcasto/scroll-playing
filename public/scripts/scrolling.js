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
        var currentScroll = getScrollPosition();
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
            x: xPos + currentScroll.x,
            y: yPos + currentScroll.y
        };
    }

    function animateScrollTo(x, y, duration, startTime) {
        startTime = (startTime || 0) + performance.now();

        var scrollPos = getScrollPosition();
        var scrollDelta = y - scrollPos.y;
        var endTime = startTime + duration;

        function _animate(animateTime) {
            if (animateTime > endTime) {
                animateTime = endTime;
            }
            var timeDelta = animateTime - startTime;
            var scrollTest = scrollDelta * Math.pow(timeDelta / duration, 2) + scrollPos.y;
            window.scrollTo(x, scrollTest);

            if (animateTime < endTime) {
                window.requestAnimationFrame(_animate);
            }
        }
        // Start the animation
        scrollDelta && window.requestAnimationFrame(_animate);
    }

    var buttons = document.querySelectorAll('.scroll-buttons button');

    buttons.forEach(function (button) {
        button.onclick = function () {
            var elem = document.querySelector(this.dataset.scrollSelector);
            if (elem) {
                var elemPos = getPosition(elem);
                animateScrollTo(0, elemPos.y, 800);
            }
        };
    });

}());