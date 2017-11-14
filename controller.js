
var repeatedName = function(name, list) {
	var found = false;
	for(var i = 0; i < list.length; i++) {
		if(list[i].name == name) {
			found = true;
		}
	}
	return found;
}

var findByName = function(name, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].name == name) {
			return list[i];
		}
	}
}