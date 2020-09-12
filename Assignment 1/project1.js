// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos ) {
    console.log("background Image");
    console.log(bgImg);
    console.log("Foreground Image");
    console.log(fgImg);
    console.log("ForeGround Opacity");
    console.log(fgOpac);
    console.log("ForeGround Position");
    console.log(fgPos);

    for (let i = 0; i < bgImg.data.length; i += 4 ){
        if(((fgImg.data[i+3]) !== 0)) {
            bgImg.data[i] = fgImg.data[i];
            bgImg.data[i + 1] = fgImg.data[i + 1];
            bgImg.data[i + 2] = fgImg.data[i + 2];
        }
    }
}