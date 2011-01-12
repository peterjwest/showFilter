# showFilter - A jQuery plugin #

## Introduction ##
showFilter allows you to filter a live (or static) set of jQuery elements based on a form field. It's case insensitive and matches each word separately. Here's a simple example:

	<input type="text" id="input">
	<ul class="foods">
		<li>Brown bread</li>
		<li>White bread</li>
		<li>Milk</li>
		<li>Eggs</li>
	</ul>
	<script>
		$("#input").showFilter($(".foods li"));
	</script>
	
This adds a filter to the list of shopping ingredients. As you type, the list is filtered dynamically according to the terms you enter. The search "brown bread" will filter elements unless they contain "brown" and "bread".

You can specify elements using a jQuery object or a selector string. Using a jQuery object has better performance, while using a selector string will create a "live" filter which will work on all current and future elements which match it, [similar to .live()](http://api.jquery.com/live/):

	$("#input1").showFilter($(".foods li"));
	$("#input2").showFilter(".foods li");

You can add multiple filters to the same set of elements, and even to the same input:

	<input type="text" id="input">
	<ul class="foods">
		<li>Brown bread</li>
		<li>White bread</li>
		<li>Milk</li>
		<li>Eggs</li>
	</ul>
	<ul class="pets">
		<li>Tibbles</li>
		<li>Mr Whiskers</li>
		<li>Fluffy</li>
	</ul>
	<script>
		$("#input").showFilter($(".foods li")).showFilter($(".pets li"));
	</script>

## Features ##
You can specify a number of options by passing an options object as a second parameter.

### Criteria ###
You can use a custom criteria to specify exactly which content to match against:

	<input type="text" id="name">
	<input type="text" id="description">
	<ul class="people">
		<li><h1>Fred</h1><p>Has 6 cats</p></li>
		<li><h1>John</h1><p>Enjoys pizza</p></li>
		<li><h1>Bob</h1><p>Hates rocks!!!</p></li>
	</ul>
	<script>
		$("#name").showFilter(".people li", {criteria: function(e) { return [e.children("h1").text()]; }});
		$("#description").showFilter(".people li", {criteria: function(e) { return [e.children("p").text()]; }});
	</script>
	
This allows you to filter by name and description separately. The default criteria function is: 

	function(e) { return [e.children("h1").text()]; }

This function should return an array of strings, for example:

	function(e) { return [e.text(), e.attr("value")]; }
	
### Filter action ###
You can specify a custom filter and unfilter action, for animations and effects:

	$("#input").showFilter($(".people li"), {filter: function(e) { e.slideToggle(); }, unfilter: function(e) { e.slideToggle(); }});

### Filter class ###
showFilter needs to add a class to each filter input, by default this is "showFilter1", "showFilter2" etc. You can change this to something else if you want:

	$("#input").showFilter($(".people li"), {filterClass: "something_else"});
	
### Examples ###
See some more examples in [examples.htm](/peterjwest/showFilter/blob/master/examples.htm).

## Bugs / TODO ##
There's nothing on my TODO list right now, feel free to email me any bugs or suggestions at peterjwest3@gmail.com