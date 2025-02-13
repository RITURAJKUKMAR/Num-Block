let boxs = document.querySelectorAll(".box");
let newNum = document.querySelector(".curr");
let nextNum = document.querySelector(".next");
let arr = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
let cols = ['skyblue', 'orange', 'lightcoral', 'deeppink', 'maroon', 'purple', 'aqua', 'darkcyan', 'palegreen', 'pink'];
let difficult = 4;

boxs.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("click");
        if (lossCondition(box) < 8) {
            // console.log("ok");
            let insertNum = document.createElement("div");
            insertNum.className = 'num';
            insertNum.innerText = newNum.innerText;
            insertNum.style.backgroundColor = cols[arr.indexOf(Number(newNum.innerText))];
            box.appendChild(insertNum);
            mergeVertical(box);
            levels();
            let n = Math.floor(Math.random() * 100 % difficult);
            // console.log(arr[n]);
            newNum.innerText = nextNum.innerText;
            newNum.style.backgroundColor = cols[arr.indexOf(Number(newNum.innerText))];
            nextNum.innerText = arr[n];
            nextNum.style.backgroundColor = cols[n];
            // console.log(box);
        }
        else {
            // console.log("You loss");
            let gameBoxs = document.querySelector(".game-boxs");
            gameBoxs.style.backgroundColor = 'yellow';
            gameBoxs.innerHTML = '<h1>You Loss <br> <a class="new-game" href="index.html">New Game</a> </h1>';
        }
    });
});

let sc = 0;
function mergeVertical(currBox) {
    for (i = 1; i < (currBox.children).length; i++) {
        // console.log((currBox.children).length);
        if (currBox.children[i - 1].innerText == currBox.children[i].innerText) {
            currBox.children[i - 1].innerText = currBox.children[i - 1].innerText * 2;
            currBox.children[i - 1].style.backgroundColor = cols[arr.indexOf(Number(currBox.children[i - 1].innerText))];
            let deletBox = document.createElement('div');
            deletBox.appendChild(currBox.children[i]);
            let score = document.querySelector(".score");
            score.innerText = ++sc;
            i = 1;
            if ((currBox.children).length == 2)
                mergeVertical(currBox);
        }
        // console.log(currBox.children[i].innerText);
    }
}

function levels() {
    let levelCount = 0;
    let lavel = document.querySelector(".lavel");
    boxs.forEach((box) => {
        // console.log(box.children.length);
        for (i = 0; i < box.children.length; i++) {
            if (box.children[i].innerText == 128)
                levelCount = 1;
            if (box.children[i].innerText == 256)
                levelCount = 2;
            if (box.children[i].innerText == 512){
                levelCount = 3;
                break;
            }
            if (box.children[i].innerText == 1024) {
                levelCount += 1;
            }
            else if (box.children[i].innerText == 2048) {
                levelCount += 2;
            }
            else if (box.children[i].innerText == 4096) {
                levelCount += 4;
            }
            else if (box.children[i].innerText == 8192) {
                levelCount += 8;
            }
            else if (box.children[i].innerText == 16384) {
                levelCount += 16;
            }
        }
    });
    lavel.innerText = levelCount;
    if (difficult < 9) {
        switch (levelCount) {
            case 10:
                difficult = 6;
                break;
            case 15:
                difficult = 7;
                break;
            case 20:
                difficult = 8;
                break;
            case 25:
                difficult = 9;
                break;
            case 35:
                difficult = 10;
                break;
        }
    }
}

function lossCondition(currBox) {
    // console.log(currBox.children[0].innerText);
    return (currBox.children).length;
}
