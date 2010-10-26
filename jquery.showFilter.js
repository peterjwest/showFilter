(function($){
	$.fn.showFilter = function(selectors, criteria, options) {
		this.data("lastVal", this.val());
		var id = 1;
		while($(".showFilter"+id).length > 0) id++;
		this.addClass("showFilter"+id);
		var input = this;
		var filterInput = function(input) { return $.trim(input).toLowerCase().replace(/\s+/, " ") }
		var test = function() {
			var c = criteria($(this));
			var filters = $(this).data("showFilter");
			if (!filters) filters = $(this).data("showFilter", {}).data("showFilter");
			var filtered = false;
			for (i in filters) if (filters[i] && i != id) filtered = true;
			var terms = filterInput(input.val()).split(/\s+/);
			var matched = false;
			for (i in c) {
				var matches = true;
				for (j in terms) if (!(c[i].toLowerCase().indexOf(terms[j]) > -1)) matches = false;
				if (matches) matched = true;
			}
			if (matched) {
				filters[id] = false;
				if (!filtered) $(this).show();
			}
			else {
				filters[id] = true;
				if (!filtered) $(this).hide();
			}
		}
		var filter = function() {
			if (filterInput($(this).val()) === filterInput($(this).data("lastVal"))) return;
			$(this).data("lastVal", $(this).val());
			$(selectors).each(test);
		}
		this.bind("keyup keydown input change paste", filter);
	};
})(jQuery);