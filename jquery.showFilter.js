(function($){
	$.fn.showFilter = function(elements, options) {
		var settings = {
			filterClass: 'showFilter', 
			criteria: function(e) { return [e.text()]; },
			filter: function(e) { e.hide(); }, 
			unfilter: function(e) { e.show(); }
		};
		if (options) $.extend(settings, options);
		var lastVals = this.data('showFilter');
		if (!lastVals) lastVals = this.data('showFilter', {}).data('showFilter');
		var id = 1;
		while ($("."+settings.filterClass+id).length > 0) id++;
		this.addClass(settings.filterClass+id);
		if (lastVals[id] === undefined) lastVals[id] = '';
		var input = this;
		var filterInput = function(input) { return $.trim(input.toLowerCase().replace(/[,\s]+/, " ")); }
		var test = function() {
			var filters = $(this).data('showFilter');
			if (!filters) filters = $(this).data('showFilter', {}).data('showFilter');
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
			if (filterInput($(this).val()) === filterInput(lastVals[id])) return;
			lastVals[id] = $(this).val();
			if (elements instanceof jQuery) elements.each(test);
			else $(elements).each(test);
		}
		this.bind("keyup keydown input change paste", filter);
		this.each(filter);
		return this;
	};
})(jQuery);