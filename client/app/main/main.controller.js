'use strict';

var app = angular.module('homeApp')
  .controller('MainCtrl', function ($scope, $http, socket, $interval) {
    $scope.weather = {};
    $scope.format = 'h:mm:ss a';
    
    
    var kTof = function(kalvin){
      return (kalvin - 273.15)*1.8000 + 32.00;
    };
    
    var getWeather = function() {
      $http.get('http://api.openweathermap.org/data/2.5/weather?q=San-Francisco,usa').success(function(currentWeather) {
        $scope.weather = parseInt(kTof(currentWeather.main.temp));
      });
    };
    
    getWeather();
    $interval(getWeather, 100000);
  });
app.directive('zarniCam', function(){
  return {
    template: '<h4 class="label-1">24th</h4><iframe type="text/html" frameborder="0"  src="//video.nest.com/embedded/live/bRAvkP?autoplay=1" />'
  };
})
app.directive('mattCam', function(){
  return {
    template: '<h4 class="label-2">Potrero</h4><iframe type="text/html" frameborder="0"  src="//video.nest.com/embedded/live/fzxVRs?autoplay=1" />'
  };
})
app.directive("myCurrentTime", function(dateFilter){
    return function(scope, element, attrs){
        var format;
        
        scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
        });
        
        function updateTime(){
            var dt = dateFilter(new Date(), format);
            element.text(dt);
        }
        
        function updateLater() {
            setTimeout(function() {
              updateTime(); // update DOM
              updateLater(); // schedule another update
            }, 1000);
        }
        
        updateLater();
    }
});