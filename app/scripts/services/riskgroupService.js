'use strict';

/**
 * @ngdoc service
 * @name re2App.riskGroup
 * @description
 * # riskGroup
 * Service in the re2App.
 */
angular.module('re2App')
  .service('riskGroupService', function (_,tinycolor) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var otherData = [
			{ name : 'LUXURY', narrative: 'Luxury', appreciation : 10.8, color : {r: 68,  g: 193, b: 199} },
			{ name : 'A+', narrative: 'A', appreciation : 7.0, color : {r: 156, g: 215, b: 247} },
			{ name : 'A', narrative: 'A', appreciation : 8.0, color : {r: 101, g: 190, b: 236} },
			{ name : 'A-', narrative: 'A', appreciation : 7.7, color : {r: 59,  g: 146, b: 213} },
			{ name : 'B+', narrative: 'B', appreciation : 7.8, color : {r: 127, g: 195, b: 126} },
			{ name : 'B', narrative: 'B', appreciation : 7.8, color : {r: 131, g: 207, b: 66} },
			{ name : 'B-', narrative: 'B', appreciation : 7.7, color : {r: 33,  g: 142, b: 95} },
			{ name : 'C+', narrative: 'C', appreciation : 6.5, color : {r: 247, g: 224, b: 58} },
			{ name : 'C', narrative: 'C', appreciation : 6.4, color : {r: 249, g: 197, b: 91} },
			{ name : 'C-', narrative: 'C', appreciation : 4.0, color : {r: 248, g: 165, b: 50} },
		];

    _.each(otherData, function(itm){
				var tcColor = tinycolor(itm.color);
				var hslColor = tcColor.toHsl();
				var hexColor = tcColor.toHex();
				var lgtHslColor = hslColor;
				lgtHslColor.l = (1.0+lgtHslColor.l)*0.5;
				var lgtTcColor = tinycolor({h : lgtHslColor.h, s : lgtHslColor.s, l : lgtHslColor.l });
				var lgtHexColor = lgtTcColor.toHex();
				_.extend(itm.color,hslColor,{ hex : hexColor}, {lgtHex : lgtHexColor});
			});

    this.getNirColor = function(nirTitle) {
      var riskGroupObj = _.find(otherData, {name : nirTitle});
      return { hex:  riskGroupObj.color.hex, lgtHex : riskGroupObj.color.lgtHex,
          title: riskGroupObj.narrative };
    };


  });
