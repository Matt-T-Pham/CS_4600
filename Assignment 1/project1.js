// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos ) {

    for (let y = 0; y < bgImg.height; y++){
        for(let x = 0; x < bgImg.width; x++){
            if(y - fgPos.y >= 0 & y - fgPos.y < fgImg.width){
                if(x - fgPos.x >= 0 & x - fgPos.x < fgImg.height){
                    var pixel1 = getPixelXY(fgImg,x,y)
                    // checks for a 0 alpha
                    if(pixel1[3]!==0){
                        setPixelXY(bgImg,x,y,pixel1);
                    }
                }
            }


        }
    }
}
function getPixel(imgData, index) {
    let i = index*4, d = imgData.data;
    return [d[i],d[i+1],d[i+2],d[i+3]]
}

function getPixelXY(imgData, x, y) {
    return getPixel(imgData, y*imgData.width+x);
}

function setPixel(imgData,index,pixel){
    let i = index * 4, d = imgData.data;
    d[i] = pixel[0];
    d[i+1]= pixel[1];
    d[i+2]= pixel[2];
}

function setPixelXY(imgData, x,y, pixel) {
    return setPixel(imgData,y*imgData.width+x,pixel)
}