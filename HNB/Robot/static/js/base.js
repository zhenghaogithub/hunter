Array.prototype.remove = function(dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (i != dx) {
			this[n++] = this[i]
		}
	}
	this.length -= 1
}

function GetRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
function preImage(url,callback){
	 var img = new Image(); 
     img.src = url;   
    if (img.complete) { 
         callback.call(img);
        return; 
     }
     img.onload = function () { 
         callback.call(img);
     };
}