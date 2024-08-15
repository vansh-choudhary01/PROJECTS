document.addEventListener("DOMContentLoaded", function() {
    // Reset Function
    function reset() {
        let random = Math.floor(Math.random() * 100000) + 10;
        document.querySelector(".per ul").firstElementChild.innerText = 20240707010900 + random;
        document.querySelector(".timer .remainingtime h3").innerText = 20240707010900 + random + 10;
        for(let i = 1; i <= 10; i++) {
            newChoice();
        }
    }
    //Reset the Hole prev Colors and Sizes
    reset();

    
    let time10 = document.getElementById("time10");
    let time1s = document.querySelectorAll("#time1");
    let minute = document.getElementById("minute");


    async function setInnerText(elem, text) {
        return new Promise(resolve => {
            setTimeout(function() {
                elem.innerText = text;
                resolve();
            }, 1000);});
    }

    async function startTimer() {
        try {
            let period = document.querySelector(".timer .remainingtime h3");
            period.innerText = parseInt(period.innerText) + 1;
            setInnerText(minute, 0);
            let last5sec = document.querySelector(".last5sec");

            for(let i = 0; i >= 0; i--) {
                setInnerText(time10, i);
                for(let j = 9; j >= 0; j--) {
                    for(let time1 of time1s) {
                        setInnerText(time1, j);
                    }
                    await setInnerText(time1s[0], j);
                    if(i == 0) {
                        if(j == 5) {
                            last5sec.classList.add("l5s");
                        } else if(j == 0) {
                            newChoice();
                        }
                    }
                }
            }
            await setInnerText(minute, 1);
            last5sec.classList.remove("l5s");
        } catch {

        }
    }

     // Initial delay with setTimeout for the first run
    setTimeout(async () => {
        startTimer();

        // Now setInterval to run every 60 seconds
        setInterval(async ()=> {
            await startTimer();
        }, 13000);
    }, 0);

    function newChoice() {
        let released = document.querySelector(".released");
        let randomNo = Math.floor(Math.random() * 10);

        function setBg(elem, no) {
            elem.classList.add((no % 2 == 0) ? "bgred" : "bggreen");
        }

        function setCol(elem, no) {
            elem.classList.add(no % 2 == 0 ? "fred" : "fgreen");
        }

        //new Period No.
        let periodUl = released.querySelector(".per ul");
        let newPe = document.createElement("li");
        newPe.innerText = parseInt(periodUl.firstElementChild.innerText) + 1;
        // period.insertAdjacentElement("afterbegin", newli);
        //In that time both are working same 
        periodUl.insertBefore(newPe, periodUl.firstChild);

        //new Number
        let numberUl = released.querySelector(".num ul");
        let newNo = document.createElement("li");
        setCol(newNo, randomNo);
        newNo.innerText = randomNo;
        numberUl.insertBefore(newNo, numberUl.firstChild);
        
        //new Big Small
        let bgsmUl = released.querySelector(".bgsm ul");
        let newSize = document.createElement("li");
        newSize.innerText = randomNo >= 5 ? "Big" : "Small";
        bgsmUl.insertBefore(newSize, bgsmUl.firstChild);

        //new Color
        let ColorUl = released.querySelector(".col ul");
        let colLi = document.createElement("li");
        let first = document.createElement("div");
        setBg(first, randomNo);
        colLi.appendChild(first);
        if(randomNo == 0 || randomNo == 5) {
            let second = document.createElement("div");
            colLi.appendChild(second);
            second.classList.add("bgviolet");
        }
        ColorUl.insertBefore(colLi, ColorUl.firstChild);
    };

});