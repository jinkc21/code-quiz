const highScores = JSON.parse(window.localStorage.getItem('User Initials and Score') || '[]')

let topScores = document.getElementById("top-scores");

function saveScores() {
    highScores.sort(function(a, b) {
        return b.score - a.score;
      });
  for (var i=0; i<highScores.length; i++) {
    let li = document.createElement('li')
    li.textContent = highScores[i].initials + " " + highScores[i].score;
    topScores.appendChild(li);
  }
  
}
saveScores();

// if(!localStorage.getItem('initData')){
//     $window.localStorage.setItem('initData', JSON.stringify($scope.initData));
// }
// if(!localStorage.getItem('initData') || JSON.parse(localStorage.getItem('initData')).length === 0){
//     $window.localStorage.setItem('initData', JSON.stringify($scope.initData));
// }