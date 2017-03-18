// JSON-template
var template = { "use": [
    { 'x': 525, 'y': 210, 'maxWidth': 350, 'degrees': 0 },
    { 'x': 175, 'y': 380, 'maxWidth': 315, 'degrees': -10 * Math.PI / 180 },
    { 'x': 225, 'y': 175, 'maxWidth': 325, 'degrees': 0 },
    { 'x': 300, 'y': 375, 'maxWidth': 325, 'degrees': -10 * Math.PI / 180 },
    { 'x': 350, 'y': 175, 'maxWidth': 600, 'degrees': 10 * Math.PI / 180 },
    { 'x': 350, 'y': 300, 'maxWidth': 550, 'degrees': 0 },
    { 'x': 225, 'y': 325, 'maxWidth': 400, 'degrees': -7 * Math.PI / 180 },
    { 'x': 300, 'y': 330, 'maxWidth': 400, 'degrees': 0 },
    { 'x': 380, 'y': 450, 'maxWidth': 450, 'degrees': -14 * Math.PI / 180 }
]};



// Color, font-size default
var color = '#2e3192';
var fontSize = 12;



// Change color and font-size
document.querySelector('#font-size').addEventListener("change", function() {
    document.querySelector('.edit-image__text').style.fontSize = this.value + 'px';
    fontSize = this.value;
});



// Change color and font-size
document.querySelector('#color').addEventListener("change", function() {
    document.querySelector('.edit-image__text').style.color = this.value;
    color = this.value;
});



// Pop-up 'Welcome', fade-in
document.querySelector('.shadow').onclick = function() {

    var welcome = document.querySelector('.popup--welcome');
    var confirm = document.querySelector('.popup--confirm');
    var shadow = document.querySelector('.shadow');

    welcome.style.opacity = 0;
    confirm.style.opacity = 0;
    shadow.style.opacity = 0;


    setTimeout(function() {
        welcome.style.display = 'none';
        confirm.style.display = 'none';
        shadow.style.display = 'none';
    }, 500);

};



// Function to change screen, from-to
function changeScreen(hideScreen, visibleScreen) {
    hideScreen.style.opacity = 0;
    visibleScreen.style.opacity = 1;

    setTimeout(function() {
        hideScreen.style.zIndex = 0;
        visibleScreen.style.zIndex = 1;
    }, 500);
}



// Select template and change screen
var items = document.querySelectorAll('.item');
var numberOfTemplate;

for (var i = 0; i < items.length; i++) {

    items[i].onclick = function () {

        var listImage = document.querySelector('.list-image');
        var editImage = document.querySelector('.edit-image');

        changeScreen(listImage, editImage);

        numberOfTemplate = this.getAttribute('data-num');
        document.querySelector('.chain__item--template img').src = 'img/paper/' + numberOfTemplate + '-small.jpg';

        var editText = document.querySelector('.edit-image__text');
        editText.style.width = template.use[numberOfTemplate].maxWidth + 'px';
    }
}



// Return to choose another template
document.querySelector('.chain__item--template').onclick = function () {
    var listImage = document.querySelector('.list-image');
    var editImage = document.querySelector('.edit-image');

    changeScreen(editImage, listImage);
};



// Edit text for template
var inputText = document.querySelector('#inputText');
var editText = document.querySelector('.edit-image__text');

inputText.onkeyup = function () {
    if(this.value.length) {
        editText.innerHTML = this.value;
    } else {
        editText.innerHTML = "أدخل النص";
    }
};



// Save template with text (draw canvas and show popup)
document.querySelector('#savePhoto').onclick = function(event) {
    event.preventDefault();

    var text = document.querySelector('#inputText').value;
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');
    console.log(numberOfTemplate );
    img.src = 'img/paper/' + numberOfTemplate + '.jpg';

    img.onload = function() {
        var canvas = document.querySelector('#picture');
        var context = canvas.getContext('2d');

        canvas.width = 1000;
        canvas.height = 1000;

        var maxWidth = template.use[numberOfTemplate].maxWidth;
        var lineHeight = 25;

        var marginLeft = template.use[numberOfTemplate].x + 175;
        var marginTop = template.use[numberOfTemplate].y;

        context.drawImage(img,0,0);
        context.textAlign = 'center';
        context.font = fontSize + 'px "TheMixArab-Regular", sans-serif';
        context.fillStyle = color;

        context.rotate(template.use[numberOfTemplate].degrees);
        multilineCanvasText(context, text, marginLeft, marginTop, maxWidth, lineHeight);

        var confirm = document.querySelector('.popup--confirm');
        var shadow = document.querySelector('.shadow');

        confirm.style.opacity = 1;
        shadow.style.opacity = 1;

        confirm.style.display = 'block';
        shadow.style.display = 'block';
    };
};



// Confirm save template
document.querySelector('.popup__link--yes').onclick = function(event) {
    event.preventDefault();

    var confirm= document.querySelector('.popup--confirm');
    var shadow = document.querySelector('.shadow');

    confirm.style.opacity = 0;
    shadow.style.opacity = 0;

    setTimeout(function() {
        confirm.style.display = 'none';
        shadow.style.display = 'none';
    }, 500);

    var canvas = document.querySelector('#picture');
    var canvasdata = canvas.toDataURL('image/jpg');
    var a = document.createElement('a');

    a.textContent = 'save';
    a.download = 'template-1.jpg';
    a.href = canvasdata;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
};



// Cancel save template
document.querySelector('.popup__link--no').onclick = function(event) {
    event.preventDefault();

    var confirm= document.querySelector('.popup--confirm');
    var shadow = document.querySelector('.shadow');

    confirm.style.opacity = 0;
    shadow.style.opacity = 0;

    setTimeout(function() {
        confirm.style.display = 'none';
        shadow.style.display = 'none';
    }, 500);
};



// Break one-line canvas to multiline
function multilineCanvasText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {

    var words = text.split(' ');
    var countWords = words.length;
    var line = '';

    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + ' ';
        var testWidth = context.measureText(testLine).width;

        if (testWidth > maxWidth) {
            context.fillText(line, marginLeft, marginTop);
            line = words[n] + ' ';
            marginTop += lineHeight;
        } else {
            line = testLine;
        }
    }

    context.fillText(line, marginLeft, marginTop);

}

// TO DO:
// Расшаривание картинки в WhatsApp, Facebook и Instagram
// Мобильную версию
