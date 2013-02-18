angular.module( 'resume.skills', [ 'svg' ] )

.directive( 'resumeSkills', [ 'SvgService', 'svgElement', function( SvgService, svgElement ) {
  return {
    scope: true,
    link: function( scope, element, attrs ) {
      var w = 460, h = 300,
          // data
          skills = [
            {
              label: 'Skill One',
              level: 90
            },
            {
              label: 'Skill Two',
              level: 60
            },
            {
              label: 'Skill Three',
              level: 30
            },
            {
              label: 'Skill Four',
              level: 80
            },
            {
              label: 'Skill Five',
              level: 70
            }
          ],
          // Configuration
          notchSize = 5,
          chartLabelWidth = 60,
          chartHeight = 175,
          chartPaddingTop = 20,
          chartWidth = 175,
          barGap = 3,
          numBars = skills.length,
          barWidth = ( chartWidth / numBars ) - barGap - ( barGap / numBars ),
          legendIconWidth = barWidth * 0.666,
          legendIconHeight = legendIconWidth,
          legendPaddingLeft = barWidth * 2,
          legendIconGap = barGap * 2,
          heightFactor = chartHeight / 100,
          // elements
          svg = new SvgService( element, w, h ),
          axes, axisLabels, bars, legend, legendLabels
          ;

      /**
       * Draws the axis of the bar chart, from x,0 to 0,0 to y,0.
       */
      function drawChartAxis () {
        var line, label1, label2,
            g = svg.g(),
            axisLabels = svg.g(),

            // The polyline to draw
            segments = [
                // start
                ''+
                chartLabelWidth +
                ','+
                chartPaddingTop,

                // the horizontal notch
                ''+
                (chartLabelWidth + notchSize) +
                ','+
                chartPaddingTop,

                // the labeled vertical axis on left
                ''+
                (chartLabelWidth + notchSize) +
                ','+
                (chartHeight + chartPaddingTop),

                // the unlabeled horizontal axis on bottom
                ''+
                (chartLabelWidth + notchSize + chartWidth) +
                ','+
                (chartHeight + chartPaddingTop),

                // the vertixal notch
                ''+
                (chartLabelWidth + notchSize + chartWidth) +
                ','+
                (chartHeight + chartPaddingTop + notchSize)
            ]
            ;

        label1 = svg.text( chartLabelWidth - 5, chartPaddingTop, "Master" )
          .attr( 'text-anchor', 'end' )
          .addClass( 'chart-axis-label' );

        label2 = svg.text( chartLabelWidth - 5, chartPaddingTop + chartHeight, "Competent" )
          .attr( 'text-anchor', 'end' )
          .addClass( 'chart-axis-label' );

        line = svg.polyline( segments, g ).addClass( 'chart-axis' );

        return g;
      }

      /**
       * For each skill, adds a bar of the correct height to the chart.
       */
      function drawBars () {
        var el = svg.g(),
            barX, barY, barH, bar
            ;

        angular.forEach( skills, function forEachSkill ( skill, idx ) {
          barX = ( chartLabelWidth + notchSize ) + ( idx * barWidth ) + ( idx * barGap ) + barGap;
          barH = ( skill.level * heightFactor ) - barGap;
          barY = ( chartHeight + chartPaddingTop ) - barH - barGap;

          bar = svg.rect( barX, barY, barWidth, barH, el ).addClass( 'item item'+idx );
        });

        return el;
      }

      /**
       * For each skill, add a legend icon.
       */
      function drawLegend () {
        var el = svg.g(),
            iconY, icon,
            iconX = chartWidth + chartLabelWidth + notchSize + legendPaddingLeft
            ;

        angular.forEach( skills, function forEachSkill ( skill, idx ) {
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
            labelX = chartWidth + chartLabelWidth + notchSize + legendPaddingLeft + legendIconWidth + legendIconGap,
            labelY
            ;

        angular.forEach( skills, function forEachSkill ( skill, idx ) {
          labelY = ( idx * legendIconHeight ) + ( idx * legendIconGap ) + ( legendIconHeight / 2 );
          svg.text( labelX, labelY, skill.label, el )
            .attr( 'text-anchor', 'start' )
            .addClass( 'legend-label item'+idx );
        });

        return el;
      }

      /**
       * Add the appropriate effects to affect the bar and the legend.
       */
      function addEffects () {
        var bar_rects = bars.children(),
            legend_rects = legend.children(),
            legend_texts = legendLabels.children();

        angular.forEach( skills, function forEachSkill ( skill, idx ) {
          var set = svg.set([ 
                bar_rects[idx], 
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

      axes = drawChartAxis();
      bars = drawBars();
      legend = drawLegend();
      legendLabels = drawLegendLabels();


      /**
       * Animations & Effects
       */

      addEffects();
    }
  };
}]);
