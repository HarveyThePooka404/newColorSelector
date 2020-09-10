"use strict";

// Getting a selected color from the user

const color = document.querySelector("#inputColor");

color.addEventListener("input", GettingColor);
color.addEventListener("input", ShowingColor);
color.addEventListener("input", ConvertHextoRGB);
color.addEventListener("input", ConvertforCSS);
color.addEventListener("input", ConvertRGBtoHSL);
color.addEventListener("input", ShowingHex);
color.addEventListener("input", ShowingRGB);
color.addEventListener("input", ShowingHSL);
color.addEventListener("input", checkMode);

document.querySelector("#inputMode").addEventListener("change", checkMode);

// Getting the divs - to show colours 

const palette_1 = document.querySelector("#palette_1");
const palette_2 = document.querySelector("#palette_2");
const palette_3 = document.querySelector("#palette_3");
const palette_4 = document.querySelector("#palette_4");
const palette_5 = document.querySelector("#palette_5");

// getting the outputs for Hex 

const hex1 = document.querySelector("#hex1");
const hex2 = document.querySelector("#hex2");
const hex3 = document.querySelector("#hex3");
const hex4 = document.querySelector("#hex4");
const hex5 = document.querySelector("#hex5");

// getting the outputs for RGB

const rgb1 = document.querySelector("#rgb1");
const rgb2 = document.querySelector("#rgb2");
const rgb3 = document.querySelector("#rgb3");
const rgb4 = document.querySelector("#rgb4");
const rgb5 = document.querySelector("#rgb5");

// getting the outputs for HSL

const hsl1 = document.querySelector("#hsl1");
const hsl2 = document.querySelector("#hsl2");
const hsl3 = document.querySelector("#hsl3");
const hsl4 = document.querySelector("#hsl4");
const hsl5 = document.querySelector("#hsl5");

// Starting functions 

function GettingColor() {

    let colorValue = color.value;
    return colorValue;

}

// Showing a selected color (possibly a delegator for the following function calls) => I don't understand... 
// Showing the color as a colored box in CSS

function ShowingColor() {

    palette_3.style.backgroundColor = GettingColor();
}
// Showing the color as hex
function ShowingHex() {
    hex3.value = GettingColor();
}
// Showing the color as RGB
function ShowingRGB() {

    let RGB = ConvertHextoRGB();
    rgb3.value = `rgb(${RGB.r}, ${RGB.b}, ${RGB.g})`;
}
// Showing the color as HSL
function ShowingHSL() {


    let hslValue = ConvertRGBtoHSL();

    let h = hslValue.h;
    let s = hslValue.s;
    let l = hslValue.l;

    hsl3.value = `${h}, ${Math.round(s)}%, ${Math.round(l)}%`;
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
// Converting HSL to RGB;
function HSLToRGB(h, s, l) {

    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
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
function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
// Adding new features 
function checkMode() {
    const modes = document.querySelector("#inputMode");
    if (modes.value == "Analogous") {

        let h_adjusted1 = 20;
        let h_adjusted2 = 40;
        let h_adjusted4 = 60;
        let h_adjusted5 = 80;

        let s_adjusted1 = 0;
        let s_adjusted2 = 0;
        let s_adjusted4 = 0;
        let s_adjusted5 = 0;

        let l_adjusted1 = 0;
        let l_adjusted2 = 0;
        let l_adjusted4 = 0;
        let l_adjusted5 = 0;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
    else if (modes.value == "Monochromatic") {
        let h_adjusted1 = 0;
        let h_adjusted2 = 0;
        let h_adjusted4 = 0;
        let h_adjusted5 = 0;

        let s_adjusted1 = 20;
        let s_adjusted2 = 40;
        let s_adjusted4 = 0;
        let s_adjusted5 = 0;

        let l_adjusted1 = 0;
        let l_adjusted2 = 0;
        let l_adjusted4 = 40;
        let l_adjusted5 = 20;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
    else if (modes.value == "Triad") {

        let h_adjusted1 = 60;
        let h_adjusted2 = 60;
        let h_adjusted4 = 120;
        let h_adjusted5 = 120;

        let s_adjusted1 = 0;
        let s_adjusted2 = 0;
        let s_adjusted4 = 0;
        let s_adjusted5 = 0;

        let l_adjusted1 = 20;
        let l_adjusted2 = 0;
        let l_adjusted4 = 0;
        let l_adjusted5 = 20;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
    else if (modes.value == "Complementary") {

        let h_adjusted1 = 0;
        let h_adjusted2 = 0;
        let h_adjusted4 = -90;
        let h_adjusted5 = -180;

        let s_adjusted1 = -10;
        let s_adjusted2 = 10;
        let s_adjusted4 = 20;
        let s_adjusted5 = -20;

        let l_adjusted1 = 20;
        let l_adjusted2 = 0;
        let l_adjusted4 = 0;
        let l_adjusted5 = 40;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
    else if (modes.value == "Coumpound") {

        let h_adjusted1 = 0;
        let h_adjusted2 = 0;
        let h_adjusted4 = 60;
        let h_adjusted5 = 80;

        let s_adjusted1 = -10;
        let s_adjusted2 = 10;
        let s_adjusted4 = 0;
        let s_adjusted5 = 0;

        let l_adjusted1 = 20;
        let l_adjusted2 = 0;
        let l_adjusted4 = 0;
        let l_adjusted5 = 0;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
    else {
        let h_adjusted1 = 0;
        let h_adjusted2 = 0;
        let h_adjusted4 = 0;
        let h_adjusted5 = 0;

        let s_adjusted1 = 0;
        let s_adjusted2 = 0;
        let s_adjusted4 = 0;
        let s_adjusted5 = 0;

        let l_adjusted1 = 10;
        let l_adjusted2 = 20;
        let l_adjusted4 = 30;
        let l_adjusted5 = 40;

        const h_adjusted = [h_adjusted1, h_adjusted2, h_adjusted4, h_adjusted5];
        const s_adjusted = [s_adjusted1, s_adjusted2, s_adjusted4, s_adjusted5];
        const l_adjusted = [l_adjusted1, l_adjusted2, l_adjusted4, l_adjusted5];

        ShowNewColors(h_adjusted, s_adjusted, l_adjusted);
    }
}
function ShowNewColors(h_adjusted, s_adjusted, l_adjusted) {

    const hslColor = ConvertRGBtoHSL();

    let h_adjusted1 = h_adjusted[0];
    let h_adjusted2 = h_adjusted[1];
    let h_adjusted4 = h_adjusted[2];
    let h_adjusted5 = h_adjusted[3];

    let s_adjusted1 = s_adjusted[0];
    let s_adjusted2 = s_adjusted[1];
    let s_adjusted4 = s_adjusted[2];
    let s_adjusted5 = s_adjusted[3];

    let l_adjusted1 = l_adjusted[0];
    let l_adjusted2 = l_adjusted[1];
    let l_adjusted4 = l_adjusted[2];
    let l_adjusted5 = l_adjusted[3];

    let h = hslColor.h;
    let s = hslColor.s;
    let l = hslColor.l;


    console.log(h_adjusted);

    let h1 = h + h_adjusted1;
    let h2 = h + h_adjusted2;
    let h4 = h + h_adjusted4;
    let h5 = h + h_adjusted5;

    let s1 = s + s_adjusted1;
    let s2 = s + s_adjusted2;
    let s4 = s + s_adjusted4;
    let s5 = s + s_adjusted5;

    let l1 = l + l_adjusted1;
    let l2 = l + l_adjusted2;
    let l4 = l + l_adjusted4;
    let l5 = l + l_adjusted5;

    let hsltoRGB1 = HSLToRGB(h1, s1, l1);
    let hsltoRGB2 = HSLToRGB(h2, s2, l2);
    let hsltoRGB4 = HSLToRGB(h4, s4, l4);
    let hsltoRGB5 = HSLToRGB(h5, s5, l5);

    let hslColor1 = `${h1}, ${Math.round(s1)}%, ${Math.round(l1)}%`;
    let hslColor2 = `${h2}, ${Math.round(s2)}%, ${Math.round(l2)}%`;
    let hslColor4 = `${h4}, ${Math.round(s4)}%, ${Math.round(l4)}%`;
    let hslColor5 = `${h5}, ${Math.round(s5)}%, ${Math.round(l5)}%`;

    hex1.value = HSLToHex(h1, s1, l1);
    hex2.value = HSLToHex(h2, s2, l2);
    hex4.value = HSLToHex(h4, s4, l4);
    hex5.value = HSLToHex(h5, s5, l5);

    hsl1.value = hslColor1;
    hsl2.value = hslColor2;
    hsl4.value = hslColor4;
    hsl5.value = hslColor5;

    palette_1.style.backgroundColor = hsltoRGB1;
    palette_2.style.backgroundColor = hsltoRGB2;
    palette_4.style.backgroundColor = hsltoRGB4;
    palette_5.style.backgroundColor = hsltoRGB5;

    rgb1.value = hsltoRGB1;
    rgb2.value = hsltoRGB2;
    rgb4.value = hsltoRGB4;
    rgb5.value = hsltoRGB5;
}