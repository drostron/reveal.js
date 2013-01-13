function updateSlideContent(transition) {
	function slidesPath() {
		var queryString = document.URL.split('?')[1];
		if (queryString) {
			return queryString.split(/[;&]/).reduce(function(accum, i) {
					var pair = i.split('=');
					return pair[0] == 'slides' ? accum + pair[1] : accum;
				}, "");
		}
	}

	var path = slidesPath();

	$.get(path, function(data) {
		var content = $("#content");
		if (content.data('data') != data) {
			content.html(data);
			content.data('data', data);

			// Full list of configuration options available here:
			// https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: false,
				progress: true,
				history: true,
				center: true,
				rollingLinks: true,


				theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
				transition: Reveal.getQueryHash().transition || transition || 'linear', // default/cube/page/concave/zoom/linear/none

				// Optional libraries used to extend on reveal.js
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
					{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
					// { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
				]
			});
		}
	});
}

updateSlideContent();

// enable live updates
// $.ajaxSetup({cache: false});
// window.setInterval(updateSlideContent, 50, 'none');