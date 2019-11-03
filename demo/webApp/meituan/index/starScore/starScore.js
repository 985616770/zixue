(function() {
  'use strict';
  let itemTmol = `<div class="star-score">$starstr</div>`;

  function _getStars() {
    let _score = this.score.toString();
    let scoreArray = _score.split('.');
    // fullStar
    let fullStar = parseInt(scoreArray[0]);
    // halfStar
    let halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
    // nullStar
    let nullStar = 5 - fullStar - halfStar;

    let starStr = '';
    for (let i = 0; i < fullStar; i++) {
      starStr += '<div class="star fullStar"></div>';
    }
    for (let i = 0; i < halfStar; i++) {
      starStr += '<div class="star halfStar"></div>';
    }
    for (let i = 0; i < nullStar; i++) {
      starStr += '<div class="star nullStar"></div>';
    }

    return itemTmol.replace('$starstr', starStr);
  }
  window.StarScore = function(score) {
    this.score = score || '';
    this.getStars = _getStars;
  };
})();
