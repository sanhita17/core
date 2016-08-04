/*** appLayout.js ***/
encapsulatedScript(function($localPath) {

  var css = angular.css("vsl.velocity.ui.layout");

  angular.module("vsl.velocity.ui.layout",["ngAnimate","angular.css"])
    .directive('appLayout',function($timeout) {
      return {
        transclude: true,
        restrict: 'EA',
        replace: true,
        templateUrl: $localPath.combineUrls('appLayout.html'),
        css: css,
        link: function link(scope,elem,attr,ctrl,transclude) {
          
          /*
          transclude(function(clone) {
            angular.forEach(clone,function(cloneEl) {
              if(cloneEl.nodeType !== 3) {
                var destinationId = cloneEl.attributes["transclude-to"].value;
                var dest = elem.find('[transclude-id="'+ destinationId +'"]');
                if (dest.length) {
                  dest.html(cloneEl);
                  cloneEl.style.display = "block";
                } 
                else { 
                  cloneEl.remove();
                }
              }
            });
          });
          */
        }
      }
    })
    .directive('appScale',function($window) {
      return function(scope,element,attrs) {
        var _window = angular.element($window);

        scope.getDimensions = function() {
          return {
            "h": element.parent().height(),
            "w": element.parent().width(),
            "ew": element.width(),
            "eh": element.height()
          }
        }

        scope.$watch(scope.getDimensions,function(nv,ov) {
          setScale(nv);
          setTimeout(function() {
            setScale(scope.getDimensions());
          },1);
        },true);

        _window.bind('resize',function() {
          scope.$apply();
        });

        //: setScale
        function setScale(w) {
          var _appEl = angular.element(element[0]);

          var _appEl_W = parseInt(_appEl.css('width'));
          var _appEl_H = parseInt(_appEl.css('height'));

          var _page_W = w.w;
          var _page_H = w.h;

          var _page_AR = _page_W/_page_H;
          var _appEl_AR = _appEl_W/_appEl_H;


          if(_page_AR <= _appEl_AR) {
            scale = _page_W/_appEl_W;
          }
          else {
            scale = _page_H/_appEl_H;
          }

          attrs.appScale = scale;
          
          console.log(
            'Page Aspect Ratio: '
            + _page_AR 
            + ' --- App Aspect Ratio: ' 
            + _appEl_AR + ' --- Scale: ' 
            + attrs.appScale
          );
            
          _appEl.css({transform: "scale(" + scale + ") translateX(-50%)"});
          //_appEl.css({transform: "scale(" + scale + ")"});
        }
        //#

        element.on("drag", function(event, ui) {
            //console.log("Dragging..", ui);
            if (ui) {
              var zoomScale = scale;
              var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
              var newLeft = ui.originalPosition.left + changeLeft / (( zoomScale)); // adjust new left by our zoomScale

              var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
              var newTop = ui.originalPosition.top + changeTop / zoomScale; // adjust new top by our zoomScale

              ui.position.left = newLeft;
              ui.position.top = newTop;
            }
        });

        if ($.ui && $.ui.ddmanager && $.ui.ddmanager.prepareOffsets) {
          $.ui.ddmanager.prepareOffsets = function(t, event) {
            var i, j,
              m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
              type = event ? event.type : null, // workaround for #2317
              list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

            droppablesLoop: for ( i = 0; i < m.length; i++ ) {

              // No disabled and non-accepted
              if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
                continue;
              }

              // Filter out elements in the current dragged item
              for ( j = 0; j < list.length; j++ ) {
                if ( list[ j ] === m[ i ].element[ 0 ] ) {
                  m[ i ].proportions().height = 0;
                  continue droppablesLoop;
                }
              }

              m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
              if ( !m[ i ].visible ) {
                continue;
              }

              // Activate the droppable if used directly from draggables
              if ( type === "mousedown" ) {
                m[ i ]._activate.call( m[ i ], event );
              }

              m[ i ].offset = m[ i ].element.offset();
              m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth * scale, height: m[ i ].element[ 0 ].offsetHeight * scale });

            }
          };
        }
      }


    })
    .directive('zone',function($timeout,$window) {
      return {
        restrict: 'EA',
        link: function(scope,element,attr) {

          scope.$watch('identifyZones',function(nv) {
            if(nv) {
              var zoneID = attr.zone ? attr.zone : '';
              var spanEl = '<span class="z"><span>Zone&nbsp;'
                +zoneID+'</span></span>';

              angular.element(element[0]).prepend(spanEl);
            }
            else {
              angular.element(element[0].querySelector('.z')).remove();
            }
          });

        }
      }
    })
    .directive('toggleGuides',function($timeout) {
      return {
        restrict: 'EA',
        link: function(scope,element,attr) {

          var _$keysPressed = [];
          var _$shiftKey = 16;
          var _$gKey = 71;
          var _$zKey = 90;
          var _$keyCriteria = [_$shiftKey,_$gKey,_$zKey];

          angular.element(element[0]).click(function() {
            
            if($_keyActions.met()) {
              scope.showGuides = !scope.showGuides;
            }

            if($_keyActions.identifyZones()) {
              console.log('IdentifyZones!');
              scope.identifyZones = !scope.identifyZones;
            }
            
            scope.$apply();
          });

          angular.element(document.body).on('keydown keyup',function(e) {
            $_keyActions[e.type](e);
            scope.$apply();
          });

          var $_keyActions = {
            keydown: function(e) {
              _$keysPressed.push(e.keyCode);
            },
            keyup: function(e) {
              _$keysPressed = [];
            },
            met: function() {
              return _$keysPressed.indexOf(_$shiftKey) >= 0 
                && _$keysPressed.indexOf(_$gKey) >= 0;
            },
            identifyZones: function() {
              return _$keysPressed.indexOf(_$shiftKey) >= 0 
                && _$keysPressed.indexOf(_$zKey) >= 0;
            }
          };
        }
      }
    })
    .directive('guide',function($q,$timeout) {
      var cssDeferred = $q.defer();
          
      css
        .load($localPath.combineUrls("appLayout.css"))
        .then(cssDeferred.resolve);

      return {
        restrict: 'EA',
        link: function(scope,element,attr) {
          
          $timeout(function() {
            angular.element(element[0])
              .css({'border':'1px solid transparent'});

            cssDeferred.promise.then(function() {
              scope.uiReady = true;
            });

          },0);

          scope.$watch('showGuides',function(nv) {
            if(nv) {
              angular.element(element[0]).addClass('guide');
            } else {
              angular.element(element[0]).removeClass('guide');
            }
          });

          scope.$watch('identifyZones',function(nv) {
            if(!nv) {
              //removeZones();
            }
          });

          
          //: removeZones
          function removeZones() {
            angular.element(element[0].querySelector('.z')).remove();
          }
          //#
        }
      }
    })

});
