(function() {
    'use strict';

    angular
        .module('cm.directives', [
            'cm.directives.vipColor',
            'cm.directives.activateSpinner',
            'cm.directives.currentSession',
            'cm.directives.buttonShrink',
            'cm.directives.adminOnly',
        ]);
})();