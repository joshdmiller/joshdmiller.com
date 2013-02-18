angular.module( 'resume.skillschart', [ 'svg' ] )

.directive( 'resumeSkillsChart', [ 'SvgService', 'svgElement', function( SvgService, svgElement ) {
  return {
    scope: true,
    link: function( scope, element, attrs ) {
      var w = 940, h = 500,
          svg = new SvgService( element, w, h ),
          outerCircleRadius = 200,
          // shapes
          outerCircle = svg.circle( w / 2, h / 2, outerCircleRadius ).addClass( 'outer-circle' ),
          innerCircleOB = svg.circle( w / 2, h / 2, 170 ).addClass( 'inner-circle-ob' ),
          innerCircleIB = svg.circle( w / 2, h / 2, 130 ).addClass( 'inner-circle-ib' ),
          innerCircle = svg.circle( w / 2, h / 2, 150 ).addClass( 'inner-circle' ),
          centerCircle = svg.circle( w / 2, h / 2, 25 ).addClass( 'center-circle'),
          centerCircleOB = svg.circle( w / 2, h / 2, 25 ).addClass( 'center-circle-ob'),
          arc1, arc2, arc3, arc4,
          line1, line2, line3, line4,
          label1, label2, label3, label4,
          desc1, desc2, desc3, desc4,
          // text positioning elements; they must be objects so they can be
          // passed by reference.
          text1p = {},
          text2p = {}, 
          text3p = {},
          text4p = {},
          // sets of shapes
          arcs, lines, labels, descs
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
      function degreesToCoords( degrees, radius ) {
        var radians = degreesToRadians( degrees ),
            x = ( w / 2 ) + radius * Math.cos( radians ),
            y = ( h / 2 ) + radius * Math.sin( radians );

        return { x: x, y: y };
      }

      /**
       * Create an arc starting and ending at the provided points (in degrees).
       */
      function createArc ( start, end ) {
        var radius = 75,
            sc = degreesToCoords( start, radius ),
            ec = degreesToCoords( end, radius );

        return svg.path( 'M '+sc.x+' '+sc.y+' A '+radius+' '+radius+' 0 0 0 '+ec.x+' '+ec.y )
          .addClass( 'arc' );
      }

      /**
       * Determines based on the degrees provided whether the element is closer
       * to the top of the image or to the bottom.
       */
      function getYFactor ( degrees ) {
        return ( degrees <= -180 ) ? 1 : -1;
      }

      /**
       * Determines based on the degrees provided whether the element is closer
       * to the left of the image or to the right.
       */
      function getXFactor ( degrees ) {
        return ( degrees >= -90 || degrees <= -270 ) ? 1 : -1;
      }

      /**
       * Calculates a label line for an arc of the specified degrees. 
       *
       * The `xfactor` and `yfactor` variables are used to flip the line left
       * to right and top to bottom based on the position in the circle. See
       * @getYFactor and @getXFactor.
       *
       * @param {Number} degrees The number of degrees at which to draw the
       * line.
       * @param {Object} textp The text positioning element to which to assign
       * the final position of the line.
       *
       * @returns {svgElement} The SVG group containing the label line and its
       * circle decorator.
       */
      function createLabelPath ( degrees, textp ) {
        var yfactor = getYFactor( degrees ),
            xfactor = getXFactor( degrees ),

            // Where to start the diagonal.
            sc = degreesToCoords(degrees, 110 ),

            // Where to end the diagonal.
            xe = ( w / 2 ) + ( outerCircleRadius * xfactor ),
            ye = ( h / 2 ) + Math.abs( Math.tan( degreesToRadians( degrees ) ) * outerCircleRadius ) * yfactor,

            // Where to end the label plateau.
            plateau_end = xe + ( 50 * xfactor ),

            // The group is what gets returned.
            g = svg.g(),

            // The line is drawn away from the arc at the specified angle to a
            // point aligned with the outer circle, and then bends directly 
            // along the x-axis toward the nearest edge of of the image.
            line = svg.polyline([
              sc.x+','+sc.y,
              xe+','+ye,
              plateau_end+','+ye
            ], g).addClass( 'label-line' ),

            // The circle sits jsut outside the arc to start off the label line.
            circle_start = svg.circle( sc.x, sc.y, 4, g ).addClass( 'label-circle' ),
            circle_end = svg.circle( plateau_end, ye, 4, g ).addClass( 'label-circle' );

        // Assign the correct positioning to the text positioning object.
        textp.labelX = textp.descX = xfactor === 1 ? plateau_end + 10 : plateau_end - 10;
        textp.labelY = ye;
        textp.labelA = textp.descA = xfactor === 1 ? 'start' : 'end';
        textp.descY = yfactor === 1 ? ye - 5 : ye + 15;
        textp.yfactor = yfactor;
        textp.xfactor = xfactor;

        // And return the group.
        return g;
      }

      /**
       * Creates a text label to sit at the end of the label lines.
       *
       * @param {Object} textp A text positioning object. See {@link createLabelPath}.
       * @param {String} label The label text.
       * 
       * @returns {svgElement} The generated text object.
       */
      function createLabelText ( textp, label ) {
        var text = svg.text( textp.labelX, textp.labelY, label ).attr({
          'text-anchor': textp.labelA
        }).addClass( 'label-text' );

        return text;
      }

      /**
       * Creates a description element to sit beneath or above the label text.
       *
       * @param {Object} textp A text positioning object. See {@link createLabelPath}.
       * @param {String} desc The description text.
       * 
       * @returns {svgElement} The generated text object.
       */
      function createDescText ( textp, desc ) {
        var text = svg.text( textp.descX, textp.descY ).attr({
          'text-anchor': textp.descA
        }).addClass( 'label-desc' );

        if ( ! angular.isArray( desc ) ) {
          desc = [ desc ];
        }

        if ( textp.yfactor === 1 ) {
          desc = desc.reverse();
        }

        angular.forEach( desc, function ( t, idx ) {
          var dy = textp.yfactor === 1 ? -1.333 : 1.333;
          svg.tspan( t, text ).attr({
            'dy': dy + 'em',
            'x': textp.descX
          });
        });

        return text;
      }

      // Create the arcs.
      arc1 = createArc( 20, -89 ).addClass( 'one' );
      arc2 = createArc( -90, -159 ).addClass( 'two' );
      arc3 = createArc( -160, -289 ).addClass( 'three' );
      arc4 = createArc( -290, -339 ).addClass( 'four' );
      arcs = svg.set([ arc1, arc2, arc3, arc4 ]);

      // Create the label lines
      line1 = createLabelPath( -40, text1p ).addClass( 'one' );
      line2 = createLabelPath( -130, text2p ).addClass( 'two' );
      line3 = createLabelPath( -225, text3p ).addClass( 'three' );
      line4 = createLabelPath( -315, text4p ).addClass( 'four' );
      lines = svg.set([ line1, line2, line3, line4 ]);

      // Create the labels.
      label1 = createLabelText( text1p, "Leadership" ).addClass( 'one' );
      label2 = createLabelText( text2p, "Open Licensing" ).addClass( 'two' );
      label3 = createLabelText( text3p, "Passion" ).addClass( 'three' );
      label4 = createLabelText( text4p, "Third Skill" ).addClass( 'four' );
      labels = svg.set([ label1, label2, label3, label4 ]);

      // Create the label descriptions.
      desc1 = createDescText( text1p, [
        "This is my description text.",
        "It's on two lines." 
      ]);
      desc2 = createDescText( text2p, [
        "How about a fancy desc for here?",
        "And of course it has to go to line 2",
        "as well as line 3."
      ]);
      desc3 = createDescText( text3p, [
        "This is my description text.",
        "It's on two lines." 
      ]);
      desc4 = createDescText( text4p, [
        "This is my description text.",
        "It's on two lines." 
      ]);
      descs = svg.set([ desc1, desc2, desc3, desc4 ]);

      function hoverSet ( set ) {
        return function hoverThese () {
          svg.set( set ).addClass( 'hover' );
        };
      }

      // On mouseover of any of the arc, add the hover class to the hovered
      // element.
      svg.set([ arc1, label1, desc1 ]).bind( 'mouseenter', hoverSet([ arc1, line1, label1, desc1 ]) );
      svg.set([ arc2, label2, desc2 ]).bind( 'mouseenter', hoverSet([ arc2, line2, label2, desc2 ]) );
      svg.set([ arc3, label3, desc3 ]).bind( 'mouseenter', hoverSet([ arc3, line3, label3, desc3 ]) );
      svg.set([ arc4, label4, desc4 ]).bind( 'mouseenter', hoverSet([ arc4, line4, label4, desc4 ]) );

      svg.set([ arcs, labels, descs ]).bind( 'mouseleave', function arcMouseleave () {
        svg.set([ arcs, labels, descs, lines ]).removeClass( 'hover' );
      });
    }
  };
}]);
