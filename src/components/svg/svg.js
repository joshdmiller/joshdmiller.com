angular.module( 'svg', [ 'svg.element' ] )

.factory( 'SvgService', [ 'svgElement', function ( svgElement ) {
  var ns = 'http://www.w3.org/2000/svg',

      // A helper function for creating namespaced elements; without using
      // `createElementNS`, the SVG will not render. And we of course wrap it in
      // `angular.element` to make use of the familiar jqLite.
      element = function element ( type ) {
        var el = svgElement( document.createElementNS( ns, type ) );
        return el;
      },

      // The constructor for new SVGs.
      svg = function ( parentEl, width, height ) {
        this.element = element( 'svg' )
          .attr({ 
            'width': width,
            'height': height,
            'version': '1.1',
            'baseProfile': 'full'
          });
        
        parentEl.append( this.element );

        return this;
      };

  /**
   * Adds a new `text` element to the SVG at the specified position.
   */
  svg.prototype.text = function text ( x, y, txt, attachTo ) {
    var tspan,
        el = element( "text" )
          .attr({
            x: x,
            y: y,
            'text-anchor': 'middle'
          }),
        node = attachTo || this.element;

    if ( angular.isDefined( txt ) ) {
      tspan = element( "tspan" ).text( txt ).attr( 'dy', '0.333em' );
      el.append( tspan );
    }

    node.append( el );
    return el;
  };

  /**
   * Create a new `tspan` element with the specified content.
   */
  svg.prototype.tspan = function tspan ( txt, attachTo ) {
    var el = element( 'tspan' ).text( txt ),
        node = attachTo || this.element;

    node.append( el );
    return el;
  };

  /**
   * Adds a new `line` element to the SVG with the specified properties.
   */
  svg.prototype.line = function line ( x1, y1, x2, y2, attachTo ) {
    var el = element( 'line' )
        .attr({
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        }),
        node = attachTo || this.element;

    node.append( el );
    return el;
  };

  /**
   * Creates a new rectangle.
   */
  svg.prototype.rect = function rect ( x, y, w, h, attachTo ) {
    var el = element( 'rect' )
        .attr({
          x: x, 
          y: y,
          width: w, 
          height: h
        }),
        node = attachTo || this.element;

    node.append( el );
    return el;
  };

  /**
   * Creates a group.
   */
  svg.prototype.g = function g ( attachTo ) {
    var el = element( 'g' ),
        node = attachTo || this.element;

    node.append( el );
    return el;
  };

  /**
   * Creates a circle
   */
  svg.prototype.circle = function circle ( x, y, r, attachTo ) {
    var el = element( 'circle' ).attr({
          cx: x, cy: y, r: r
        }),
        node = attachTo || this.element;

    node.append( el );
    return el;
  };

  /**
   * Creates a path.
   */
  svg.prototype.path = function path ( d, attachTo ) {
    var el = element( 'path' ).attr( 'd', d ),
        node = attachTo || this.element;
    
    node.append( el );
    return el;
  };

  /**
   * Creates a polyline from an array of string coordinates.
   */
  svg.prototype.polyline = function polyline ( points, attachTo ) {
    var el = element( 'polyline' ).attr( 'points', points.join(' ') ),
        node = attachTo || this.element;
    
    node.append( el );
    return el;
  };

  /**
   * Creates a marker.
   */
  svg.prototype.marker = function marker ( id, attrs, attachTo ) {
    var el = element( 'marker' ).attr( 'id', id ),
        node = attachTo || this.element;

    if ( angular.isDefined( attrs ) ) {
      el.attr( attrs );
    }

    node.append( el );
    return el;
  };

  /**
   * Create a set of elements to operate on as a group.
   */
  svg.prototype.set = function set ( els ) {
    var all = svgElement();
    angular.forEach( els, function forEachElement ( el ) {
      all.add(el);
    });

    return all;
  };

  return svg;
}]);

