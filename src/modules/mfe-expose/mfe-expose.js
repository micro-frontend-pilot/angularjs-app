import angular from 'angular';

// React로 변환 후에 micro frontend로 expose하기 위해서 만든 angularjs 컴포넌트
export let $injector

export const mfeExpose = {
   bindings: {
      foobar: '<',
      baz: '<'
   },
   template: `
        <p>FooBar: {{this.$ctrl.foobar}}</p>
        <p>Baz: {{this.$ctrl.baz}}</p>
   `
}

angular.module("ng_mfe_expose", []).component('mfeExpose', mfeExpose).run(['$injector', function(_$injector) { $injector=_$injector }]);

// 내부 테스트를 해 보기 위해서 만든 angularjs 컴포넌트
function mfeExposeCtrl() {
    console.log(this);
}
  
const mfeExposeComponent = {
    bindings: {
        foobar: '<',
        baz: '<',
    },
    template: `
        <p>FooBar: {{ this.$ctrl.foobar }}</p>
        <p>Baz: {{ this.$ctrl.baz }}</p>
    `,
    controller: mfeExposeCtrl,
}

export default mfeExposeComponent;
