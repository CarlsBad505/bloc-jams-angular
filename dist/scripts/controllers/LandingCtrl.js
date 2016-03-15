// When Angular instantiates a new Controller object, a child scope is created and made available as an injectable parameter to the Controller's constructor function as $scope.

(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn the Music Up!";
	}
	
	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();