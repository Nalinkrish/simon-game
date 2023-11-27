// intial reference
// assigning varuables

const countValue=document.querySelector(".count");
const colorPart =document.querySelectorAll(".color-part");
const container = document.querySelector(".container");
const startButton = document.querySelector("#start-btn");
const result = document.querySelector("#result");
const wrapper =document.querySelector(".wrapper");


// change the color when user clickc

const colors ={
    color1:{
        current: "#008000",
        new: "#11e711",
    },
    
    color2:{
        current: "#ff0000",
        new: "#fd2a2a",
    },

    color3:{
        current: "#ffff00",
        new: "#fafa18",

    },

    color4:{
        current: "#0000ff",
        new: "#2062fc",

    },
};

let randomColors =[];
let pathGeneratorBool = false;
let count, 
    clickCount = 0;
     

// functions to start Game

startButton.addEventListener("click", () =>{
    count =0;
    clickCount = 0;
    randomColors = [];
    pathGeneratorBool = false;
    wrapper.classList.remove("hide");
    container.classList.add("hide");
    pathGenerate();
});

// functions to decide the sequence

const pathGenerate =()=> {
    randomColors.push(generateRandomValue(colors));
    count = randomColors.length;
    pathGeneratorBool = true;
    pathDecide(count);
};


//functions to get a random value from Object

const generateRandomValue =(obj) =>{
    let arr = Object.keys(obj);
    return arr[Math.floor(Math.random() * arr.length)];

};

//function to play the sequence
const pathDecide = async (count) =>{
    countValue.innerText = count;
    for (let i of randomColors){
        let currentColor = document.querySelector(`.${i}`);
        await delay (500);
        currentColor.style.backgroundColor = `${colors[i]["new"]}`;
        await delay(600);
        currentColor.style.backgroundColor = `${colors[i]["current"]}`;
        await delay(600);

    }
 pathGeneratorBool = false;
};

// delay for blink effect
async function delay(time){
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

// when user click the colors
colorPart.forEach((element) =>{
    element.addEventListener ("click", async (e) =>{
// if user clicks the same color then next level
    if (pathGeneratorBool) {
        return false;
    }
    if (e.target.classList[0] == randomColors[clickCount]) {
        e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["new"]}`;
        await delay(500);
        e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["current"]}`;
    };
    

        //user click
    clickCount += 1;

        //Next level if number of valid clicks 
        if (clickCount == count) {
            clickCount = 0;
            pathGenerate();
        } else {
            lose();
        }
    });
});

// function when player executes wrong sequence 
const lose =() =>{ 
    result.innerHTML = `<span> Your Score: </span> ${count}`;
    result.classList.remove ("hide");
    container.classList.remove("hide");
    wrapper.classList.add("hide");
    startButton.innerText = "Play again";
    startButton.classList.remove("hide");
};




