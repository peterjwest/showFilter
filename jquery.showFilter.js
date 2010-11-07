(function($){
	$.fn.showFilter = function(selectors, options) {
		var settings = {
			filterClass: 'showFilter', 
			criteria: function(e) { return [e.text()]; },
			filter: function(e) { e.hide(); }, 
			unfilter: function(e) { e.show(); }
		};
		if (options) $.extend(settings, options);
		this.data("lastVal", "");
		var id = 1;
		while($("."+settings.filterClass+id).length > 0) id++;
		this.addClass(settings.filterClass+id);
		var input = this;
		var filterInput = function(input) { return $.trim(input.toLowerCase().replace(/[,\s]+/, " ")); }
		var test = function() {
			var filters = $(this).data("showFilter");
			if (!filters) filters = $(this).data("showFilter", {}).data("showFilter");
			var filtered = false;
			for (i in filters) if (filters[i] && i != id) filtered = true;
			var terms = filterInput(input.val()).split(/[,\s]+/);
			var matched = true;
			var criteria = settings.criteria($(this));
			for (j in terms) {
				var matches = false;
				for (i in criteria) if ((criteria[i].toLowerCase().indexOf(terms[j]) > -1)) matches = true;
				if (!matches) matched = false;
			}
			if (matched) {
				filters[id] = false;
				if (!filtered) settings.unfilter($(this));
			}
			else {
				filters[id] = true;
				if (!filtered) settings.filter($(this));
			}
		}
		var filter = function() {
			if (filterInput($(this).val()) === filterInput($(this).data("lastVal"))) return;
			$(this).data("lastVal", $(this).val());
			$(selectors).each(test);
		}
		this.bind("keyup keydown input change paste", filter);
		this.each(filter);
	};
})(jQuery);