import angular from 'angular';

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
    .state('mfe-expose', {
        url: '/mfe-expose',
        template: require('./mfe-expose.html'),
    })
};
