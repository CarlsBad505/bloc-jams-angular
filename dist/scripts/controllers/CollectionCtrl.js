(function() {
	function CollectionCtrl() {
		this.albums = [];
		for (var i=0; i < 12; i++) {
			this.albums.push(angular.copy(albumPicasso)); // How does it know to grab albumPicasso from fixtures.js??
		}
	}
	
	angular
		.module('blocJams')
		.controller('CollectionCtrl', CollectionCtrl);
})();