var origBoard;const oPlayer="O",aiPlayer="X",winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]],cells=document.querySelectorAll(".cell");function startGame(){document.querySelector(".endgame").style.display="none",origBoard=Array.from(Array(9).keys());for(var e=0;e<cells.length;e++)cells[e].innerText="",cells[e].style.removeProperty("background-color"),cells[e].addEventListener("click",turnClick,!1)}function turnClick(e){"number"==typeof origBoard[e.target.id]&&(turn(e.target.id,oPlayer),checkTie()||turn(bestSpot(),aiPlayer))}function turn(e,r){origBoard[e]=r,document.getElementById(e).innerText=r;let t=checkWin(origBoard,r);t&&gameOver(t)}function checkWin(e,r){let t=e.reduce((e,t,n)=>t===r?e.concat(n):e,[]),n=null;for(let[e,o]of winCombos.entries())if(o.every(e=>t.indexOf(e)>-1)){n={index:e,player:r};break}return n}function gameOver(e){for(let r of winCombos[e.index])document.getElementById(r).style.backgroundColor=e.player==oPlayer?"blue":"red";for(var r=0;r<cells.length;r++)cells[r].removeEventListener("click",turnClick,!1);declareWinner(e.player==oPlayer?"You win!":"You lose.")}function declareWinner(e){document.querySelector(".endgame").style.display="block",document.querySelector(".endgame .text").innerText=e}function emptySquares(){return origBoard.filter(e=>"number"==typeof e)}function bestSpot(){return minimax(origBoard,aiPlayer).index}function checkTie(){if(0==emptySquares().length){for(var e=0;e<cells.length;e++)cells[e].style.backgroundColor="pink",cells[e].removeEventListener("click",turnClick,!1);return declareWinner("Tie Game!"),!0}return!1}function minimax(e,r){var t=emptySquares();if(checkWin(e,oPlayer))return{score:-10};if(checkWin(e,aiPlayer))return{score:10};if(0===t.length)return{score:0};for(var n,o=[],l=0;l<t.length;l++){var c={};if(c.index=e[t[l]],e[t[l]]=r,r==aiPlayer){var i=minimax(e,oPlayer);c.score=i.score}else{i=minimax(e,aiPlayer);c.score=i.score}e[t[l]]=c.index,o.push(c)}if(r===aiPlayer){var a=-1e4;for(l=0;l<o.length;l++)o[l].score>a&&(a=o[l].score,n=l)}else for(a=1e4,l=0;l<o.length;l++)o[l].score<a&&(a=o[l].score,n=l);return o[n]}startGame();const docStyle=document.documentElement.style,aElem=document.querySelector("a"),boundingClientRect=aElem.getBoundingClientRect();aElem.onmousemove=function(e){const r=e.clientX-boundingClientRect.left,t=e.clientY-boundingClientRect.top,n=r-boundingClientRect.width/2,o=t-boundingClientRect.height/2;docStyle.setProperty("--rx",`${o/-1}deg`),docStyle.setProperty("--ry",`${n/10}deg`)},aElem.onmouseleave=function(e){docStyle.setProperty("--ty","0"),docStyle.setProperty("--rx","0"),docStyle.setProperty("--ry","0")},aElem.onmousedown=function(e){docStyle.setProperty("--tz","-25px")},document.body.onmouseup=function(e){docStyle.setProperty("--tz","-12px")};