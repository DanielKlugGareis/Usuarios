(function() {
  'use strict';

  angular
  .module('Usuarios')
  .service('mainService', mainService);

  /** @ngInject */
  function mainService($log, $http, $q) {

    var apiHost = "http://localhost:5000/api/usuarios";

    var service = {
      obtenerUsuarios: obtenerUsuarios,
      obtenerUsuario: obtenerUsuario,
      crearUsuario: crearUsuario,
      editarUsuario: editarUsuario,
      borrarUsuario: borrarUsuario
    };

    return service;

    function obtenerUsuarios() {

      var config = {};

      return $http.get(apiHost,config).then(complete,failed);
      

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return logErrorCall('ObtenerUsuarios', error);
      }
    }

    function obtenerUsuario(id) {

      var config = {};

      return $http.get(apiHost+"/"+id,config).then(complete,failed);
      

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return logErrorCall('Obtener usuario', error);
      }
    }


    function crearUsuario(data) {
      var today = new Date();
      var user = {
        UserName : data.userName,
        Email : data.email,
        LastLogin : null,
        Status : "Activación pendiente",
        Pais: data.pais
      };

      var config = {};

      return $http.post(apiHost, user, config).then(complete,failed);      

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return logErrorCall('Crear Usuario', error);
      }
    }

    function editarUsuario(data) {


      var config = {};

      return $http.put(apiHost+"/"+data.id, data, config).then(complete,failed);      

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return logErrorCall('Editar Usuarios', error);
      }
    }

    function borrarUsuario(id) {


      var config = {};

      return $http.delete(apiHost+"/"+ida, config).then(complete,failed);      

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return logErrorCall('Borrar Usario', error);
      }
    }

    function logErrorCall(call, error){
      $log.error('Failed on Task' + call + 'endpoint call.\n' + angular.toJson(error, true));
      var deferred = $q.defer();
      deferred.reject(error);
      return deferred.promise;      
    }
  }
})();
