let reach = document.querySelector("#reach");
let divs = reach.children;
// reach.innerText = "hellow";
console.log(divs);

let first = divs[0].children[0].children[1];;
let second = divs[1].children[0].children[1];
let third = divs[2].children[0].children[1];


for(let i = 0; i <= 5; i++) {
    for(let j = 0; j <= 100; j++) {
        for(let k = 0; k <= 100; k++) {
            let jth = j == 100 ? "00" : j;
            let kth = k == 100 ? "00" : k;
            setTimeout(function() {
                first.innerText = `${i},${jth}${jth%10},${jth%10}${kth}+`;
                third.innerText = `${j},${jth%10}${kth}+`;
                if(i == 2) {
                    second.innerText = `1 CRORE+`;
                }
                if(i == 5) {
                    second.innerText = `2 CRORE+`;
                }
            }, 1500);
        }
    }
}