/**
 * Created by kelvin on 8/14/15.
 */

angular.module("vssmApp")
    .config(function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('enUS');
        $translateProvider.usePostCompiling(true);
    })
    .controller("mainCtrl",function ($rootScope,$scope,$http,$location,$timeout,$translate,DTOptionsBuilder) {
        //Variables Initialization
        $scope.data = {};

        //date picker initialization
        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            dateFormat: 'yyyy-mm-dd'
        };

        //getting the recipients level2
        $http.get("index.php/loggenInuser").success(function(data){
            $scope.logedInUser = data;
            console.log(data);
            $scope.logedInUserName = data.first_name +" "+ data.last_name;
        });
        //setting common Translations
        $translate('error.save_success').then(function (save_success) {
            $scope.saveSuccess = save_success;
        });
        $translate('error.save_falure').then(function (save_falue) {
            $scope.saveError = save_falue;
        });
        //Datatables Language Options
        $scope.dataTableEn = {
            "sEmptyTable":     "No data available in table",
            "sInfo":           "Showing _START_ to _END_ of _TOTAL_ entries",
            "sInfoEmpty":      "Showing 0 to 0 of 0 entries",
            "sInfoFiltered":   "(filtered from _MAX_ total entries)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLengthMenu":     "Show _MENU_ entries",
            "sLoadingRecords": "Loading...",
            "sProcessing":     "Processing...",
            "sSearch":         "Search:",
            "sZeroRecords":    "No matching records found",
            "oPaginate": {
                "sFirst":    "First",
                "sLast":     "Last",
                "sNext":     "Next",
                "sPrevious": "Previous"
            },
            "oAria": {
                "sSortAscending":  ": activate to sort column ascending",
                "sSortDescending": ": activate to sort column descending"
            }
        };
        $scope.dataTableDe = {
            "sEmptyTable":     "No hay datos disponibles en la tabla",
            "sInfo":           "Mostrando _START_ a _END_ de entradas _TOTAL_",
            "sInfoEmpty":      "Mostrando 0-0 de 0 entradas",
            "sInfoFiltered":   "(filtrada de las entradas totales _MAX_)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLengthMenu":     "Mostrar entradas _MENU_",
            "sLoadingRecords": "Cargando...",
            "sProcessing":     "Procesamiento ...",
            "sSearch":         "Buscar:",
            "sZeroRecords":    "No se encontraron registros coincidentes",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "previo"
            },
            "oAria": {
                "sSortAscending":  ": aactivar para ordenar la columna ascendente",
                "sSortDescending": ": activar para ordenar la columna descendente"
            }
        };
        $scope.langToUse = $scope.dataTableEn;
        //changing language
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            if(langKey == "enUS"){
              $scope.langToUse = $scope.dataTableEn;
                $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap().withLanguage($scope.langToUse);
            }else if(langKey == "deDE"){
                $scope.langToUse = $scope.dataTableDe;
                $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap().withLanguage($scope.langToUse);
            }
        };
        //setting active link on top menu
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withBootstrap().withLanguage($scope.langToUse);


        //getting the recipients level2
        $http.get("index.php/recipients/2").success(function(data){
            $scope.data.recipientsLevel2 = data;
        });

        //getting the recipients level3
        $http.get("index.php/recipients/3").success(function(data){
            $scope.data.recipientsLevel3 = data;
        });

        //getting the recipients level4
        $http.get("index.php/recipients/4").success(function(data){
            $scope.data.recipientsLevel4 = data;
        });
    }).controller("homeCtrl",function ($scope,$mdDialog,$mdToast) {

    });

