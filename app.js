//Global selections and variables
const colorsDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type ="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors ;




//Functions

function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColors(){
    colorsDivs.forEach((div,index) => {
        const hexText= div.children[0];
        const randomColor = generateHex();


        //addd the color to  baground

        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //check constract
        checkTextConstract(randomColor , hexText);

        //Initial Colorize Sliders

        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input");
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color , hue ,brightness ,saturation);
    });
}

function checkTextConstract(color, text){
    const luminance = chroma(color).luminance();
    if(luminance > 0.5){
        text.style.color = "black";
    }else{
        text.style.color = "white";
    }


}

function colorizeSliders(color , hue ,brightness ,saturation){
    //Scale Saturation

    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);

    //Scale Brightness
    const midBright = color.set('hsl.l',0.5);
    const scaleBright = chroma.scale(["black",midBright,"white"]);
    ;
    
    //Update Input Colors
    saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(0)},${scaleSat(1)})`;

    brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;

    hue.style.backgroundImage =`linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;

}

randomColors();