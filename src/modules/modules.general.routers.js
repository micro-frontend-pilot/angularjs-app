routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
    .state('mfe', {
        url: '/mfe',
        template: require('./mfe/mfe.html'),
        lazyLoad: ($transition$) => {
            return $transition$
                .injector()
                .get('lazyLoader').loadModules('./mfe/mfe.js');
        }
    })
};
