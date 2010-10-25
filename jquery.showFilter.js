(function( $ ){
	$.fn.showFilter = function(selectors, criteria, options) {
		this.data("lastVal",this.val());
		var search = this.val();
		var test = function() {
			var c = criteria($(this));
			var matched = false;
			for (i in c) if (c[i].toLower.indexOf(search.toLower) > -1) matched = true;
			if (matched) $(this).show();
			else $(this).hide();
		}
		var filter = function() {
			if ($(this).val() === $(this).data("lastVal")) return;
			$(this).data("lastVal", $(this).val());
			$(selectors).each(test);
		}
		this.bind("keyup keydown change paste", filter);
	};
})( jQuery );