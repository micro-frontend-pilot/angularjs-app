import angular from 'angular';
import { react2angular } from 'react2angular';

async function load () {
    return await import("common/AngularTestComponent");
}

const AngularTestComponent=await load();

angular.module('ngapp.mfe',[]).component('reactComponent', react2angular(AngularTestComponent.default,[]));
export default angular.module('ngapp.mfe').name;
