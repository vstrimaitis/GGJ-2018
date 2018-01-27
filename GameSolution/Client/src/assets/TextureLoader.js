import waffle from "../imgs/waffle.png";
import blue25 from "../imgs/jelly_blue_25.png";
import blue50 from "../imgs/jelly_blue_50.png";
import blue100 from "../imgs/jelly_blue_100.png";
import red25 from "../imgs/jelly_red_25.png";
import red50 from "../imgs/jelly_red_50.png";
import red100 from "../imgs/jelly_red_100.png";
import green25 from "../imgs/jelly_green_25.png";
import green50 from "../imgs/jelly_green_50.png";
import green100 from "../imgs/jelly_green_100.png";
import orange25 from "../imgs/jelly_orange_25.png";
import orange50 from "../imgs/jelly_orange_50.png";
import orange100 from "../imgs/jelly_orange_100.png";
import blueCrown from "../imgs/crown_blue.png";
import redCrown from "../imgs/crown_red.png";
import greenCrown from "../imgs/crown_green.png";
import orangeCrown from "../imgs/crown_orange.png";
import main from "../imgs/main.png";
import button from "../imgs/button.png";


export const getCell = (color, size) => {
    if(color && color.toLowerCase() === "red") {
        if(size === 25) return red25;
        else if(size === 50) return red50;
        else if (size === 100) return red100;
    }
    else if(color && color.toLowerCase() === "blue") {
        if(size === 25) return blue25;
        else if(size === 50) return blue50;
        else if(size === 100) return blue100;
    }
    
    else if(color && color.toLowerCase() === "green") {
        if(size === 25) return green25;
        else if(size === 50) return green50;
        else if(size === 100) return green100;
    }

    else if(color && color.toLowerCase() === "orange") {
        if(size === 25) return orange25;
        else if(size === 50) return orange50;
        else if(size === 100) return orange100;
    }
    return waffle;
}

export const getCrown = (color) => {
    if(color && color.toLowerCase() === "red") return redCrown;
    else if(color && color.toLowerCase() === "blue") return blueCrown;
    else if(color && color.toLowerCase() === "green") return greenCrown;
    else if(color && color.toLowerCase() === "orange") return orangeCrown;
} 

export const getMainImage = () => main;

export const getButton = () => button;