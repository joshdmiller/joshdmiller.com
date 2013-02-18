angular.module( 'resume.timeline', [ 'svg' ] )

.directive( 'resumeTimeline', [ 'SvgService', 'svgElement', function( SvgService, svgElement ) {
  return {
    scope: true,
    link: function( scope, element, attrs ) {
      var w = 940, h = 500,
          svg = new SvgService( element, w, h ),
          barHeight = 30,
          barRadius = 8,
          barPosition = {
            xs: 0,
            xe: w,
            ys: (h - barHeight) / 2,
            ye: h - ( (h - barHeight) / 2 )
          },
          firstYear = 2002,
          numYears = 12,
          yearWidth = w / numYears,
          positionData = [
            {
              label: 'Development Lead',
              org: 'Web Services',
              start_year: 2002,
              start_month: 11,
              end_year: 2004,
              end_month: 12
            },
            {
              label: 'Consultant',
              org: 'Educational Web Apps',
              start_year: 2004,
              start_month: 8,
              end_year: 2006,
              end_month: 12
            },
            {
              label: 'IS Manager',
              org: 'Healthcare Analytics',
              start_year: 2005,
              start_month: 8,
              end_year: 2007,
              end_month: 5
            },
            {
              label: 'Project Manager',
              org: 'Healthcare Analytics',
              start_year: 2007,
              start_month: 3,
              end_year: 2009,
              end_month: 3
            },
            {
              label: 'Product Manager',
              org: 'Web Services',
              start_year: 2009,
              start_month: 4,
              end_year: 2013,
              end_month: 7
            },
            {
              label: 'PM',
              org: 'Special Effects',
              start_year: 2013,
              start_month: 1,
              end_year: 2013,
              end_month: 7
            }
          ],
          // shapes
          timelineBg = svg.rect( barPosition.xs, barPosition.ys, w, barHeight )
            .addClass( 'bg' ).attr( 'rx', barRadius ),
          // sets of shapes
          yearLabels = svgElement(),
          positions = svgElement()
          ;
      
      function drawYearLabels () {
        var i, x, label,
            y = barPosition.ys + ( barHeight / 2 );

        for ( i = 0; i <  numYears; i++ ) {
          x = ( i * yearWidth ) + ( yearWidth / 2 );
          label = svg.text( x, y, '' + ( i + firstYear ) )
            .addClass( 'year-label' )
            .attr( 'text-anchor', 'middle' );

          if ( i === numYears - 1 ) {
            label.addClass( 'current-year' );
          }

          yearLabels.add( label );
        }
      }

      function isEven ( n ) {
        return n % 2 === 0 ? true : false;
      }

      function getXFromDate ( y, m ) {
        return  ( ( y - firstYear ) * yearWidth ) +
          ( ( ( m - 1 ) / 12 ) * yearWidth );
      }

      function drawPositions () {
        var el, box, labelText, orgText, line, lineMarker,
            start_x, middle_x, end_x, start_y, width, even, line_offset;

        angular.forEach( positionData, function forEachPosition ( pos, idx ) {
          // Perform the maths.
          start_x = getXFromDate( pos.start_year, pos.start_month );
          end_x = getXFromDate( pos.end_year, pos.end_month );
          width = end_x - start_x;
          even = isEven( idx );
          start_y = even ?
            barPosition.ys - ( barHeight + 5 ) : // above the years
            barPosition.ye + 5;                  // below the years
          middle_x = start_x + ( width / 2 ),
          line_offset = even ?
            ( idx % 4 === 0 ? 90 : 30 ) :
            ( idx % 3 === 0 ? 90 : 30 ),
          line_end = even ? 
            start_y - (line_offset + 5) : 
            start_y + barHeight + line_offset + 5
          ;
          
          // Create the group to hold all the components.
          el = svg.g()
            .addClass( 'position'+idx );

          // Create the box that surrounds the position title.
          box = svg.rect( start_x, start_y, width, barHeight, el )
            .addClass( 'position-bar' )
            .attr( 'rx', barRadius );

          // Create the label that sits in the box.
          labelText = svg.text( 
            middle_x, 
            start_y + ( barHeight / 2 ), 
            pos.label,
            el
          ).addClass( 'position-label' );

          // Create the line that comes off the box.
          line = svg.line(
            middle_x,
            even ? start_y : start_y + barHeight,
            middle_x,
            line_end,
            el
          ).addClass( 'position-line' );

          // Create the line marker.
          lineMarker = svg.circle(
            middle_x,
            line_end,
            4,
            el
          ).addClass( 'position-line-marker' );

          // Draw the organization text
          orgText = svg.text(
            middle_x,
            even ? line_end - 15 : line_end + 15,
            pos.org,
            el
          ).addClass( 'position-org-label' );

          // Add the elements to the svgElement.
          positions.add( el );
        });
      }

      drawYearLabels();
      drawPositions();

      /**
       * Interactivity
       */

      positions.bind( 'mouseenter', function mouseenterPosition ( evt ) {
        var el = svgElement( evt.srcElement ).parent();

        // If we didn't hit the g, go up another element.
        if ( el[0].nodeName !== 'g' ) {
          el = el.parent();
        }

        el = svgElement( el );
        el.addClass( 'hover' );
      }).bind( 'mouseleave', function mouseleavePosition ( evt ) {
        var el = svgElement( evt.srcElement ).parent();

        // If we didn't hit the g, go up another element.
        if ( el[0].nodeName !== 'g' ) {
          el = el.parent();
        }

        el = svgElement( el );
        el.removeClass( 'hover' );
      });
    }
  };
}]);
