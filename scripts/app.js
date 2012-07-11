
// Next two lines for JS-Lint, first a pragma instruction, then global vars specified
"use strict";
var $, iScroll, document, alert, navigator;

// create our own namespace
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = (function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel
	);
}());

RocknCoder.Dimensions = (function () {
	var width, height, headerHeight, footerHeight, contentHeight,
		getContentDimensions = function () {
			return {
				width: width,
				height: contentHeight
			};
		},
		init = function () {
			width = $(document).width();
			height = $(document).height();
			headerHeight = $("header", $.mobile.activePage).height();
			footerHeight = $("footer", $.mobile.activePage).height();
			contentHeight = height - headerHeight - footerHeight;
		};
	return {
		init: init,
		getContent: getContentDimensions
	};
}());

RocknCoder.Pages.scalePage = (function () {
	var init = false,
		$scalePic = $("#scalePic"),
		$panPic = $("#panPic"),
		$hiddenPic = $("#hiddenPic"),

		pageshow = function () {
			var width, height, dim;
			if (!init) {
				init = true;
				RocknCoder.Dimensions.init();
				// determine the dimensions dynamically
				dim = RocknCoder.Dimensions.getContent();
				$("#wrapper").css('height', dim.height);
				$scalePic.attr('src', $hiddenPic.attr('src'));
				$panPic.attr('src', $hiddenPic.attr('src'));

				width = $hiddenPic.width();
				height = $hiddenPic.height();
				$("#scroller").css({
					width: width,
					height: height
				});

				if (width > height) {
					$scalePic.width(dim.width);
				} else {
					$scalePic.height(dim.height);
				}
			}
		};
	return {
		pageshow: pageshow
	};
}());

RocknCoder.Pages.panPage = (function () {
	var myScroll,
		pageshow = function () {
			myScroll = new iScroll('wrapper');
		},
		pagehide = function () {
			myScroll.destroy();
			myScroll = null;
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	};
}());