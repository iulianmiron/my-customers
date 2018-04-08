(function() {
    'use strict';

    angular
        .module('cm.dataservices', [])
        .service('ClientsDataService', ClientsDataService)
        .service('HistoryDataService', HistoryDataService)
        .service('ServicesDataService', ServicesDataService)
        .service('ServiceTypesDataService', ServiceTypesDataService)
        .service('ProductsDataService', ProductsDataService)
        .service('StaffDataService', StaffDataService)
        .service('RolesDataService', RolesDataService)
        .service('ConsumablesDataService', ConsumablesDataService);
    
    function ClientsDataService(DataService) {
        var service = this;
        var baseUrl = '/api/clients';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function HistoryDataService(DataService) {
        var service = this;
        var baseUrl = '/api/history';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.getAllById  = function getAllById(itemId)   { return DataService.serverCall(baseUrl + '/client/' + itemId, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function ServicesDataService(DataService) {
        var service = this;
        var baseUrl = '/api/services';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function ServiceTypesDataService(DataService) {
        var service = this;
        var baseUrl = '/api/service-types';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function ProductsDataService(DataService) {
        var service = this;
        var baseUrl = '/api/products';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function StaffDataService(DataService) {
        var service = this;
        var baseUrl = '/api/staff';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function RolesDataService(DataService) {
        var service = this;
        var baseUrl = '/api/roles';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    function ConsumablesDataService(DataService) {
        var service = this;
        var baseUrl = '/api/consumables';

        service.getAll      = function getAll()             { return DataService.serverCall(baseUrl, 'GET'); };
        service.addNew      = function addNew(item)         { return DataService.serverCall(baseUrl, 'POST', item); };
        service.getOne      = function getOne(itemId)       { return DataService.serverCall(baseUrl + '/' + itemId, 'GET'); };
        service.updateOne   = function updateOne(item)      { return DataService.serverCall(baseUrl + '/' + item._id, 'PUT', item); };
        service.deleteOne   = function deleteOne(itemId)    { return DataService.serverCall(baseUrl + '/' + itemId, 'DELETE'); };
        service.searchAll   = function searchAll(query)     { return query && DataService.serverCall(baseUrl + '/search/' + query, 'GET'); };
    }

    ClientsDataService.$inject      = ['DataService'];
    HistoryDataService.$inject      = ['DataService'];
    ServicesDataService.$inject     = ['DataService'];
    ServiceTypesDataService.$inject = ['DataService'];
    ProductsDataService.$inject     = ['DataService'];
    StaffDataService.$inject        = ['DataService'];
    RolesDataService.$inject        = ['DataService'];
    ConsumablesDataService.$inject  = ['DataService'];

})();
