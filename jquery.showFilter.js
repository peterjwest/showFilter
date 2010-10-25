(function($){
	$.fn.showFilter = function(selectors, criteria, options) {
		this.data("lastVal", this.val());
		var input = this;
		var filterInput = function(input) { return $.trim(input).toLowerCase().replace(/\s+/, " ") }
		var test = function() {
			var c = criteria($(this));
			var terms = filterInput(input.val()).split(/\s+/);
			var matched = false;
			for (i in c) {
				var matches = true;
				for (j in terms) if (!(c[i].toLowerCase().indexOf(terms[j]) > -1)) matches = false;
				if (matches) matched = true;
			}
			if (matched) $(this).show();
			else $(this).hide();
		}
		var filter = function() {
			if (filterInput($(this).val()) === filterInput($(this).data("lastVal"))) return;
			alert();
			$(this).data("lastVal", $(this).val());
			$(selectors).each(test);
		}
		this.bind("keyup keydown input change paste", filter);
	};
})(jQuery);