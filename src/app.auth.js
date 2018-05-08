(function() {
	'use strict';

	angular
		.module('cm')
		.config(appAuth);

	appAuth.$inject = ['authConfProvider'];
	function appAuth(authConfProvider) {

		authConfProvider.default.endpointUrl = window.location.origin + '/api/users/login';
		authConfProvider.default.logoutEndpointUrl = window.location.origin + '/api/users/logout';
		authConfProvider.default.loginState = 'login';
		authConfProvider.default.usernameFormProperty = 'username';
		authConfProvider.default.passwordFormProperty = 'password';
		authConfProvider.default.usernameProperty = 'username';
		authConfProvider.default.tokenProperty = 'token';
		authConfProvider.default.rolesProperty = 'roles';
		authConfProvider.default.refreshTokenProperty = 'refresh_token';
		authConfProvider.default.tokenTypeProperty = 'token_type';
		authConfProvider.default.adminRole= 'ROLE_ADMIN';
		authConfProvider.default.functionIfDenied = function(stateService, toState) {
			//what to do if user can't access this state
		};
		authConfProvider.default.functionIfAuthenticated = function(authService, responseData) {
			//what to do if user is successfully authenticated
		};
		authConfProvider.default.setFunctionIfLoggedOff = function() {
			//what to do if user is successfully logged off
		};
	}

})();