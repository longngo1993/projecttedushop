(function (app) {
    app.controller('homeController', homeController);
    homeController.$inject = ['authenticationService'];
    function homeController(authenticationService) {
        authenticationService.setHeader();
    }
})(angular.module('tedushop'));