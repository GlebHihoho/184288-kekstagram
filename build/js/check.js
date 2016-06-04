function getMessage(a, b) {
	var sum = 0;
	var square = 0;

	if (typeof a === "boolean") {
		if (typeof a === true) {
			return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
		} else {
			return "Переданное GIF-изображение не анимировано";
		}
	} else {
		if (typeof a === "number") {
			return "Переданное SVG-изображение содержит " + a + "объектов и " + b * 4 + "атрибутов";
		} else {
			if (Array.isArray(a)) {
				for (var i = 0; i < a.length; i++) {
					sum = sum + a[i];
				}
				return "Количество красных точек во всех строчках изображения:  " + sum;
			} else {
				if (Array.isArray(b)) {
					for (var i = 0; i < a.length && i < b.length; i++) {
						square = square + a[i]*b[i];
					}
					return "Общая площадь артефактов сжатия: " + square + "  пикселей";
				}
			}
		}
	}
}
