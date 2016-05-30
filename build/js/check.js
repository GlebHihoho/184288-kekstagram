var a;
var b;
var sum;
var square;

function getMessage(a, b) {
	if (typeof a == "boolean") {
		if (typeof a == "true") {
			return("Переданное GIF-изображение анимировано и содержит " + b + " кадров");
		} else {
			return("Переданное GIF-изображение не анимировано");
		}
	} else {
		if (typeof a == "number") {
			return("Переданное SVG-изображение содержит " + a + "объектов и " + b * 4 + "атрибутов");
		} else {
			if (typeof a == "object") {
				return("Количество красных точек во всех строчках изображения:  " + sum);
			} else {
				if (typeof b == "object") {
					return("Общая площадь артефактов сжатия: " + square + " пикселей");
				}
			}
		}
	}
}