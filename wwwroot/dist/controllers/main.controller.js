	(function() {
		'use strict';

		angular
		.module('Usuarios')
		.controller('mainController', mainController)
		.controller('modalInstaceController', modalInstaceController);

		/** @ngInject */
		function mainController($scope, $rootScope, $timeout, $uibModal,mainService,utilService) {
			
			var self = this,
			today = new Date();
			self.usuarios = [];
			self.toAdd = {userName:null,email:null};

			self.getClass= function(lastLogin) {
				var date =new Date(lastLogin);
				var dias = utilService.diasEntre(date ,today);
				if(dias > 60) return 0;
				if(dias > 30) return 1;
				return null;
			};

			self.remove = function(index,usuario) {

				mainService.borrarUsuario(usuario.id).then(function(argument) {

					self.usuarios.splice(index, 1);

				},onError);
			};

			self.openPopUp = function () {
				var modalInstance = $uibModal.open({
					templateUrl: 'views/myModalContent.html',
					controller: 'modalInstaceController',
					controllerAs:'modal',
					size: 'lg',
					backdrop: 'static',
					resolve: {
						userToAdd: function () {
							return self.toAdd;
						}
					}
				});

				modalInstance.result.then(function (argument) {
					$scope.selected = selectedItem;
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};

			var init = function () {

				mainService.obtenerUsuarios().then(function(argument) {

					self.usuarios = argument;
				},onError);
			};

			var onError = function(argument) {
				console.log("Error");

			};


			init();

		}

		function modalInstaceController($scope, $uibModalInstance, userToAdd, mainService) {

			$scope.userToAdd = userToAdd;

			$scope.ok = function () {
				if($scope.new.$valid){
					var user = $scope.userToAdd;
					mainService.crearUsuario(user).then(function(argument) {

						$uibModalInstance.close(argument);
					},onError);
				}
			};


			$scope.cancel = function () {
				$uibModalInstance.dismiss();
			};

			var onError = function(argument) {
				console.log("Error");

			};

		}


	})();
