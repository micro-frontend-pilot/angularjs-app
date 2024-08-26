routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        template: `<div>home</div>`,
    })
    .state('notfound', {
        url: '/notfound',
        template: `<div>Not Found</div>`,
    })
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
