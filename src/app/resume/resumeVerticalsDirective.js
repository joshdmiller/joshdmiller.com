angular.module( 'resume.verticals', [ 'svg' ] )

.directive( 'resumeVerticals', [ 'SvgService', 'svgElement', function( SvgService, svgElement ) {
  return {
    scope: true,
    link: function( scope, element, attrs ) {
      var w = 460, h = 300,
          // data
          verticals = [
            {
              label: 'Vertical One',
              amt: 100
            },
            {
              label: 'Vertical Two',
              amt: 60
            },
            {
              label: 'Vertical Three',
              amt: 30
            },
            {
              label: 'Vertical Four',
              amt: 80
            },
            {
              label: 'Vertical Five',
              amt: 70
            }
          ],
          // Configuration
          verticalTotal = 0,
          verticalAdjFactor = 0.0,
          sliceGapDegrees = 2, sliceGap,
          chartWidth = 200,
          chartHeight = chartWidth,
          radius = chartWidth / 3,
          chartCenterX = chartWidth / 2,
          chartCenterY = chartCenterX,
          legendIconWidth = 20,
          legendIconHeight = legendIconWidth,
          legendPaddingLeft = legendIconWidth * 4,
          legendIconGap = 5,
          // elements
          svg = new SvgService( element, w, h ),
          legend, legendLabels, slices
          ;


      /**
       * Converts degrees to radians.
       */
      function degreesToRadians ( degrees ) {
        return degrees * Math.PI / 180.0;
      }

      /**
       * A utility function to convert the number of degrees on a circle I want
       * to span into the number of radians, and then using the calculated
       * radians and the provided radius to return a coordinate.
       */
      function degreesToCoords( degrees ) {
        var radians = degreesToRadians( degrees ),
            x = radius * Math.cos( radians ),
            y = radius * Math.sin( radians );

        return { x: x, y: y };
      }

      /**
       * For each vertical, draw a slice.
       */
      function drawSlices () {
        var x1, x2, y1, y2, radians, degrees, slice,
            currentRadians = 0,
            el = svg.g()
            ;

        angular.forEach( verticals, function forEachVertical ( vertical, idx ) {
          degrees = vertical.amt * verticalAdjFactor;
          radians = degreesToRadians( degrees );
          x1 = chartCenterX + ( radius * Math.cos( currentRadians ) );
          y1 = chartCenterY + ( radius * Math.sin( currentRadians ) );
          x2 = chartCenterX + ( radius * Math.cos( currentRadians + radians ) );
          y2 = chartCenterY + ( radius * Math.sin( currentRadians + radians ) );

          slice = svg.path( 
            'M'+chartCenterX+','+chartCenterY+' '+
            'L'+x1+','+y1+' '+
            'A'+radius+','+radius+' 0 0,1 '+x2+','+y2+' '+
            'z', el 
          ).addClass( 'item item'+idx );
          
          currentRadians += radians + sliceGap;
        });

        return el;
      }

      /**
       * For each vertical, add a legend icon.
       */
      function drawLegend () {
        var el = svg.g(),
            iconY, icon,
            iconX = chartWidth + legendPaddingLeft
            ;

        angular.forEach( verticals, function forEachVertical ( vertical, idx ) {
          iconY = ( idx * legendIconHeight ) + ( idx * legendIconGap );
          icon = svg.rect( iconX, iconY, legendIconWidth, legendIconHeight, el )
            .addClass( 'legend-icon item'+idx );
        });

        return el;
      }

      /**
       * For each skill, add a legend label.
       */
      function drawLegendLabels () {
        var el = svg.g(),
            labelX = chartWidth + legendPaddingLeft + legendIconWidth + legendIconGap,
            labelY
            ;

        angular.forEach( verticals, function forEachVertical ( vertical, idx ) {
          labelY = ( idx * legendIconHeight ) + ( idx * legendIconGap ) + ( legendIconHeight / 2 );
          svg.text( labelX, labelY, vertical.label, el )
            .attr( 'text-anchor', 'start' )
            .addClass( 'legend-label item'+idx );
        });

        return el;
      }

      /**
       * Add the appropriate effects to affect the bar and the legend.
       */
      function addEffects () {
        var slice_paths = slices.children(),
            legend_rects = legend.children(),
            legend_texts = legendLabels.children();

        angular.forEach( verticals, function forEachVertical ( vertical, idx ) {
          var set = svg.set([ 
                slice_paths[idx], 
                legend_rects[idx],
                legend_texts[idx]
              ]);

          set.bind( 'mouseenter', function mouseenter () {
            set.addClass( 'hover' );
          }).bind( 'mouseleave', function mouseleave () {
            set.removeClass( 'hover' );
          });
        });
      }

      /**
       * Set everything up.
       */

      angular.forEach( verticals, function forEachVertical ( vertical ) {
        verticalTotal += vertical.amt;
      });

      verticalAdjFactor = ( 360 - ( verticals.length * sliceGapDegrees ) ) / verticalTotal;
      sliceGap = degreesToRadians( sliceGapDegrees );

      label = svg.text( chartCenterX, chartHeight + 20, "% time in each" )
        .addClass( 'desc' );
      outerCircle1 = svg.circle( chartCenterX, chartCenterY, chartWidth / 2 )
        .attr({ stroke: '#DDD', fill: 'none' });
      outerCircle2OB = svg.circle( chartCenterX, chartCenterY, radius * 1.3 )
        .attr({ stroke: '#DDD', fill: '#EFEFEF' });
      outerCircle2IB = svg.circle( chartCenterX, chartCenterY, radius * 1.15 )
        .attr({ stroke: '#DDD', fill: '#FFF' });
      
      legend = drawLegend();
      legendLabels = drawLegendLabels();
      slices = drawSlices();
      
      centerCircleFill = svg.circle( chartCenterX, chartCenterY, radius * 0.6 )
        .attr({ stroke: 'none', fill: '#FFF' });
      centerCircle = svg.circle( chartCenterX, chartCenterY, radius * 0.3 )
        .attr({ stroke: '#DDD', 'stroke-width': 1, fill: '#EFEFEF' });

      /**
       * Animations & Effects
       */

      addEffects();
    }
  };
}]);
