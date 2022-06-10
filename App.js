
var startButton = document.querySelector('#play');
var gameStatus = "on";
const ms = document.querySelector("#modalscore");
const modal = document.querySelector(".modal");
const close = document.querySelector(".closing");

startButton.addEventListener('click', () => {
    if (gameStatus == "on") {
        playGame();
        document.querySelector('#yourscore').textContent = '0';
        document.querySelector('#dur_game').disabled = true;
        document.querySelector('#game_speed').disabled = true;
        document.querySelector('#game_speed').style.cursor = 'auto';
        document.querySelector('.duration').style.cursor = 'auto';
        document.querySelector('#dur_game').style.cursor = 'auto';
        gameStatus = 'Running';
        startButton.style.background = '#2980b9';
        document.querySelector('#play_txt').textContent = 'Game is ON!!';
    }

})

function playGame() {
    var grid = document.querySelectorAll('.block');
    var hitPosition;
    var score = 0;
    var gameSpeed = 750;

    var timer_html = document.querySelector('#timer');
    var timeLeft = document.querySelector('#dur_game').value;
    gameSpeed = document.querySelector('#game_speed').value;

    var timerID = setInterval(function () {
        if (timeLeft < 1) {
            clearInterval(timerID);
            gameStatus = "on";
            document.querySelector('#play_txt').textContent = 'Play Again';
            startButton.style.background = '#27ae60';
            startButton.style.fontWeight = 'Initial';
            document.querySelector('#dur_game').disabled = false;
            document.querySelector('#game_speed').disabled = false;
            document.querySelector('#game_speed').style.cursor = 'pointer';
            document.querySelector('.duration').style.cursor = 'pointer';
            document.querySelector('#dur_game').style.cursor = 'pointer';
        }

        timer_html.textContent = timeLeft;
        timeLeft--;

        if (timeLeft === -1){
            modal.style.display = "block";
            ms.innerText = "Score : " + score;
        }

    }, 1000);

    function popJerry(randomBLockNo) {

        grid[randomBLockNo].classList.add("jerry");
        grid[randomBLockNo].classList.add("jerry2");
    }

    function removeJerry() {
        grid.forEach(element => {
            element.classList.remove("jerry");
            element.classList.remove("jerry2");
        });
    }

    grid.forEach(element => {
        element.addEventListener('click', () => {
            if (element.id == hitPosition + 1 && timeLeft > 0) {
                score++;
                document.querySelector('#yourscore').textContent = score;
            }
        })
    });

    var jerryTimer = setInterval(() => {
        if (timeLeft < 1) {
            clearInterval(jerryTimer)
        }
        removeJerry();
        let randomBLockNo = Math.floor((Math.random()) * 16);
        hitPosition = randomBLockNo;
        popJerry(randomBLockNo);
        
    }, gameSpeed);
    
}

close.addEventListener('click' , () => {
    modal.style.display = "none";
})



