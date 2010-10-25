(function($){
	$.fn.showFilter = function(selectors, criteria, options) {
		this.data("lastVal",this.val());
		var input = this;
		var test = function() {
			var c = criteria($(this));
			var terms = $.trim(input.val()).toLowerCase().split(/\s+/);
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
			if ($(this).val() === $(this).data("lastVal")) return;
			$(this).data("lastVal", $(this).val());
			$(selectors).each(test);
		}
		this.bind("keyup keydown change paste", filter);
	};
})(jQuery);