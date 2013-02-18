angular.module( 'svg.element', [] )

.factory( 'svgElement', [ function () {
  
  /**
   * SvgElement inherits prototypically from JQLite. Unfortunately, due to some
   * instance checking, the entire constructor is reimplemented here with the
   * correct class name.
   */
  function SvgElement ( element ) {
    if ( element instanceof SvgElement ) {
      return element;
    }
    
    if (!(this instanceof SvgElement)) {
      if (angular.isString(element) && element.charAt(0) != '<') {
        throw new Error('selectors not implemented');
      }
      return new SvgElement(element);
    }

    if (angular.isString(element)) {
        throw new Error('creating elements from strings is not supported.');
    } else {
      svgElementAddNodes(this, element);
    }
  }

  /**
   * Ripped from jqLite's constructor.
   * FIXME: this shouldn't be duplicated here...
   */
  function svgElementAddNodes(root, elements) {
    if (elements) {
      elements = (!elements.nodeName && angular.isDefined(elements.length)) ? elements : [ elements ];
      for(var i=0; i < elements.length; i++) {
        root.push(elements[i]);
      }
    }
  }

  /**
   * A DRY method for retrieving the classes of an element.
   */
  function svgElementGetClasses ( element ) {
    return element.className ? element.className.baseVal : element.getAttribute( 'class' );
  }

  /**
   * Determines whether the provided class is on the element.
   */
  function svgElementHasClass ( element, cssClass ) {
    var val = ( (' ' + svgElementGetClasses( element ) + ' ').replace(/[\n\t]/g, " "))
      .indexOf( " " + cssClass + " " );

    return val > -1;
  }

  /**
   * Removes one or more classes from an element.
   */
  function svgElementRemoveClass ( element, cssClasses ) {
    var newClasses;
    if ( cssClasses ) {
      angular.forEach( cssClasses.split( ' ' ), function forEachClassToRemove ( cssClass ) {
        newClasses = ' ' + svgElementGetClasses( element ) + ' ';
        if ( element.className ) {
          element.className.baseVal = trim( 
            newClasses
            .replace(/[\n\t]/g, ' ')
            .replace( ' ' + trim( cssClass ) + ' ', ' ' )
          );
        }
      });
    }
  }

  /**
   * Lifted from Angular.js as it's not exported.
   */
  function trim( value ) {
    return angular.isString( value ) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
  }

  /**
   * These are the methods of jqLite that must be modified to work with the SVG
   * DOM.
   *
   * TODO: parent, children
   */
  SvgElement.prototype = Object.create( angular.element.prototype, {
    addClass: {
      value: function addClassToSvg ( cssClasses ) {
        var i, classes, element, currClasses;
      
        function forEachClass ( cssClass ) {
          if ( ! svgElementHasClass( element, cssClass ) ) {
            currClasses = svgElementGetClasses( element );
            classes = currClasses ? currClasses + ' ' + trim( cssClass ) : trim( cssClass );
            element.setAttribute( 'class', trim ( classes ) );
          }
        }
        
        for ( i = 0; i < this.length; i++ ) {
          element = this[i];
          angular.forEach( cssClasses.split(' '), forEachClass );
        }

        return this;
      }
    },
    hasClass: {
      value: function hasClass ( cssClass ) {
        if ( this.length ) {
          return svgElementHasClass( this[0], cssClass );
        }
      }
    },
    removeClass: {
      value: function removeClass ( cssClasses ) {
        var element;
        for ( i = 0; i < this.length; i++ ) {
          element = this[i];
          svgElementRemoveClass( element, cssClasses );
        }

        return this;
      }
    }
  });

  /**
   * Adds a new element.
   */
  SvgElement.prototype.add = function svgElementAdd ( element ) {
    svgElementAddNodes( this, element );
  };

  /**
   * Returns the bounding box of the element.
   */
  SvgElement.prototype.getBBox = function svgElementGetBBox () {
    if ( this.length ) {
      return this[0].getBBox();
    }
  };

  return SvgElement;
}]);

