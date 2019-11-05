(function() {
    'use strict';

    function addEvent() {
        let timer = null;
        window.addEventListener(
            'scroll',
            () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    let clientHeight = document.documentElement.clientHeight;
                    let scrollTop =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;
                    let pre = 30;
                    if (clientHeight + scrollTop >= clientHeight + pre) {
                        $('#backTop').show('slow');
                    } else {
                        $('#backTop').hide('slow');
                    }
                });
            },
            300
        );

        $('#backTop').on('tap', function() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }

    function init() {
        addEvent();
    }
    init();
})();
