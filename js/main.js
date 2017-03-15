// Поп-ап с приветствием
document.querySelector('body').onclick = function() {

	var welcome = document.querySelector('.welcome');
	var shadow = document.querySelector('.shadow');

	welcome.style.opacity = 0;
	shadow.style.opacity = 0;

	setTimeout(function() {
		welcome.style.display = 'none';
		shadow.style.display = 'none';
	}, 500);

};



// Клик по первому темплейту
document.querySelector('.item').onclick = function() {

	var template = 1;
	var list = document.querySelector('.list-image');
	var editor = document.querySelector('.edit-image');

	list.style.display = 'none';
	editor.style.display = 'block';

};



// Отображение текста в предпросмотре
document.querySelector('.button--change').onclick = function(event) {
	event.preventDefault();

	var text = document.querySelector('#inputText').value;

	// Если поле с текстом не пустое - работаем с ним
	if(text) {
		document.querySelector("p").style.display = 'none';
		document.querySelector('#text').style.height = '150px';

		var canvas = document.querySelector('#text');
		var context = canvas.getContext('2d');

		context.clearRect(0, 0, 400, 400);

		var maxWidth = 280;
		var lineHeight = 25;

		var marginLeft = 20;
		var marginTop = 20;
		context.font = '12px "TheMixArab-Regular", sans-serif';
		context.fillStyle = '#2e3192';
		wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight);

	} else {

		document.querySelector('p').style.display = 'block';
		document.querySelector('#text').style.height = '0';

	}

};



// Сохранение картинки с текстом (поп-ап с подверждением) к себе на ПК
document.querySelector('#savePhoto').onclick = function(event) {
	event.preventDefault();

	var text = document.querySelector('#inputText').value;
	var img = new Image();

	img.setAttribute('crossOrigin', 'anonymous');
	img.src = 'img/paper/1.jpg';
	img.onload = function() {
		var canvas = document.querySelector('#picture'),
			 context = canvas.getContext('2d');

		canvas.width = 1000;
		canvas.height = 1000;

		var maxWidth = 1000;
		var lineHeight = 25;

		var marginLeft = 620;
		var marginTop = 200;

		context.drawImage(img,0,0);
		context.textAlign = 'center';
		context.font = '12px "TheMixArab-Regular", sans-serif';
		context.fillStyle = '#2e3192';
		wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight);

		var canvasdata = canvas.toDataURL('image/jpg');
		var a = document.createElement('a');

		a.textContent = 'save';
		a.download = 'template-1.png';
		a.href = canvasdata;
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
	};
};



// Функция разбиения текста на строки, исходя из ширины канвас
function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {

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
// Сделать JSON-файл для каждого шаблона со своими кординатами для размещения на нем текста
// Добавить возможно форматирования текста
// Расшаривание картинки в WhatsApp, Facebook и Instagram
// Мобильную версию
