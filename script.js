"use strict";

// Getting a selected color from the user

const color = document.querySelector("#inputColor");
color.addEventListener("input", GettingColor);

function GettingColor() {
    let colorValue = color.value;
    return colorValue;
}

// Showing a selected color (possibly a delegator for the following function calls) => I don't understand... 
// Showing the color as a colored box in CSS

const palette = document.querySelector("body > div > div.outputBox > div");

function ShowingColor() {

    palette.style.backgroundColor = GettingColor();
}

// Showing the color as hex

const hex = document.querySelector("#hex");

function ShowingHex() {
    hex.value = GettingColor();
}

// Showing the color as RGB

const rgb = document.querySelector("#rgb");

function ShowingRGB() {

    let RGB = ConvertHextoRGB();
    rgb.value = `${RGB.r}, ${RGB.b}, ${RGB.g} `;
}

// Showing the color as HSL

function ShowingHSL() {

    let hslValue = ConvertRGBtoHSL();

    let h = hslValue.h;
    let s = hslValue.s;
    let l = hslValue.l;

    hsl.value = `${h}, ${Math.round(s)}%, ${Math.round(l)}%`;
}
// Converting hex to RGB

function ConvertHextoRGB() {

    let colorValue = color.value;

    const firstHex = colorValue[1] + colorValue[2];
    const secondHex = colorValue[3] + colorValue[4];
    const thirdHex = colorValue[5] + colorValue[6];

    let firstR = parseInt(firstHex, 16);
    let firstG = parseInt(secondHex, 16);
    let firstB = parseInt(thirdHex, 16);

    return { r: firstR, g: firstG, b: firstB };
}

// Converting RGB to CSS usable string, like rgb(100, 123, 192);

function ConvertforCSS() {
    let rgbCss = ConvertHextoRGB();
    let CSSvalue = `rgb(${rgbCss.r}, ${rgbCss.g}, ${rgbCss.b})`;

    return CSSvalue;
}

// Converting RGB to HSL

function ConvertRGBtoHSL() {

    let newRGB = ConvertHextoRGB();
    let r = newRGB.r;
    let b = newRGB.g;
    let g = newRGB.g;

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
        if (max === r) {
            h = 60 * (0 + (g - b) / (max - min));
        } else
            if (max === g) {
                h = 60 * (2 + (b - r) / (max - min));
            } else
                if (max === b) {
                    h = 60 * (4 + (r - g) / (max - min));
                }

    if (h < 0) { h = h + 360; }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    return { h, s, l };
    // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
}