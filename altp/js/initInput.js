function initInput() {

}
initInput.prototype = {
    init: function (_container) {
        this.idArr = [];
        this.containerArr = _container;
        this._element();
    },

    _element: function () {
        var idArr = this.idArr;
		var container = this.containerArr;
        var divInput = document.getElementById('divInput');

        for (var i = 0; i < container.length; i++) {
			var newElement = document.createElement("div");
			newElement.setAttribute("id", "input_"+container[i]);
			newElement.setAttribute("container", container[i]);
			newElement.setAttribute("class", "ip");
			divInput.appendChild(newElement);
        }
    }
}
;
var $initInput = new initInput();