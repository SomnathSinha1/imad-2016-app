function init_scroll_header(gutter) {
	jQuery(window).bind('scroll', function() {
		if(jQuery(window).scrollTop() > gutter) jQuery('body').addClass('scrolled');
		else jQuery('body').removeClass('scrolled');
	});

	jQuery(window).trigger('scroll');
}

function init_menu() {
	var timer_in = new Array(),
		timer_out = new Array();
	
	jQuery('#menu li').hover(
		
		function() {
			var _this = this;

			clearTimeout(timer_out[jQuery('#menu > li').index(this)]);
			timer_in[jQuery('#menu > li').index(this)] = setTimeout(function() {
				jQuery(_this).addClass('hover').find('> .sub-menu').fadeIn(300);
			}, 300);
		},
		function() {
			var _this = this;

			clearTimeout(timer_in[jQuery('#menu > li').index(this)]);
			timer_out[jQuery('#menu > li').index(this)] = setTimeout(function() {
				jQuery(_this).removeClass('hover').find('> .sub-menu').fadeOut(300);
			}, 400);
		}
	);
	
	build_responsive_menu();
}

function build_responsive_menu() {
	jQuery('#site-header').after('<div class="block_r_menu_container">\
		<div class="container">\
			<div class="row">\
				<div class="twelve columns">\
					<div class="r_menu"></div>\
				</div>\
			</div>\
		</div>\
	</div>');

	var temp_menu_content = jQuery('#site-navigation #menu').clone().removeAttr('id').removeClass(),
		r_menu_container = jQuery('.block_r_menu_container'),
		r_menu = jQuery('.r_menu', r_menu_container);

	jQuery('> li', temp_menu_content).each(function() {
		var the_item = jQuery(this);

		if(the_item.hasClass('multi_column')) { // if it's a multicolumn
			jQuery('.sub-menu', the_item).prepend('<ul />'); // get the div.sub-menu and add to the beginning an empty ul
			jQuery('.sub-menu > ul:not(:eq(0))', the_item).each(function() { // get the div.sub-menu and select all ul's except the empty one
				var the_submenu_column = jQuery(this), // this ul
					the_column_title = jQuery('li', the_submenu_column).eq(0).text(), // the text of the first li of the this ul, so we remove the h3
					column_container = jQuery('.sub-menu > ul:eq(0)', the_item); // the empty ul

				jQuery('li', the_submenu_column).eq(0).remove(); // remove the first li of the this ul
				column_container.append('<li><a href="#">' + the_column_title + '</a><ul>' + the_submenu_column.html() + '</ul></li>'); // add content to the end of the empty ul, we have a li a with the title text, now without the h3, then we have the this ul html, so the rest of the li's. With the .each, every other this ul content will be formated and added to the end of the empty ul.
			});
			jQuery('.sub-menu > ul:not(:eq(0))', the_item).remove();
		}
	});

	r_menu.html(temp_menu_content);
	r_menu.parent().append('<div class="block_r_search">\
		<form>\
			<input type="search" placeholder="Search&nbsp;&hellip;">\
		</form>\
	</div>');

	jQuery('li', r_menu).each(function() {
		var the_item = jQuery(this);
		if(jQuery('ul', the_item).length > 0) the_item.addClass('has_children').append('<a href="#" class="trigger_slide"><i class="fa fa-angle-down"></i></a>');
	});

	jQuery('#site-navigation > i').on('click', function() {
		r_menu_container.slideToggle(300);
		return false;
	});

	jQuery('.trigger_slide').on('click', function() {
		jQuery(this).parent().find(' > .sub-menu > ul, > ul').slideToggle(300);
		return false;
	});
}

function init_scroll_up() {
	jQuery('.to-top').click( function() {
		jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}

function init_slider_1(target) {
	var timer;

	jQuery(target).flexslider({
		animation : 'fade',
		controlNav : true,
		directionNav : true,
		animationLoop : true,
		slideshow : false,
		animationSpeed : 500,
		useCSS : true,
		start : function(slider) {
			slider.slides.each(function(s) {
				jQuery(this).find('.animate').each(function(n) {
					jQuery(this).addClass('animate' + n);
				});
			});
			slider.slides.eq(slider.currentSlide).find('.animate').each(function(n) {
				var show_animation = jQuery(this).attr('data-animation');
				jQuery(this).addClass(show_animation);
			});
			slider.slides.find('.animate').css('opacity', 1);
		},
		before : function(slider) {

			slider.slides.eq(slider.currentSlide).find('.animate').each(function(n) {
				var show_animation = jQuery(this).attr('data-animation');
				jQuery(this).removeClass(show_animation);
			});
			slider.slides.find('.animate').hide();

		},
		after : function(slider) {

			slider.slides.find('.animate').show();

			slider.slides.eq(slider.currentSlide).find('.animate').each(function(n) {
				var show_animation = jQuery(this).attr('data-animation');
				jQuery(this).addClass(show_animation);
			});

		}
	});
}

function init_block_animation() {
	var diff = 50,
		w_height = jQuery(window).height(),
		sections = jQuery('.animated-section');

	sections.bind('start_animation', function() {
		var section = jQuery(this),
			animated_items = section.find('.scroll_animated_item');

		animated_items.filter(':not(.custom_delay)').each(function(num) {
			var block = jQuery(this);
			block.addClass('animate' + (num + 1));
		});

		animated_items.each(function(num) {
			var block = jQuery(this);
			block.addClass(block.attr('data-scroll-animation'));
		});

		section.css('opacity', 1);
	});

	jQuery(window).scroll(function() {
		sections.each(function() {
			var section = jQuery(this);
			if(!section.hasClass('done_animate') && (w_height + jQuery(window).scrollTop() - section.offset().top - diff > 0)) {
				section.addClass('done_animate').trigger('start_animation');
				if(section.find('.skill').length > 0) init_skills(1000);
				if(section.find('.num').length > 0) init_facts(1000);
			}
		});
	});

	jQuery(window).resize(function() {
		w_height = jQuery(window).height();
	});

	jQuery(window).trigger('scroll');
}

function count_num(num, steps, target, duration, content) {
	var count = 0;
	var speed = parseInt(duration / steps);
	var step = parseInt(num / steps);
	if(step < 1) step = 1;

	var interval = setInterval(function(){
		if(count - 1 < num) {
			target.html(count);
		}
		else {
			target.html(content);
			clearInterval(interval);
		}
		count += step;
	}, speed);
}

function init_facts(duration) {
	jQuery('.num').each(function() {
		var container = jQuery(this);
		var num = container.attr('data-num');
		var content = container.attr('data-content');

		count_num(num, 20, container, duration, content);
	});
}

function init_skills(duration) {
	jQuery('.skill').each(function() {
		var container = jQuery(this),
			num = container.attr('data-level'),
			level = jQuery('.level', container);

		if(duration) {
			level.animate({width : num + '%'}, duration);
		} else {
			level.css({'width' : num + '%'});
		}
	});
}

function exists(e) {
	return $(e).length > 0;
}

function handleResize() {
	var h = $(window).height();
	$('.section-slider_h figure').css({'height':h+'px'});
}
$(function(){
	handleResize();
	$(window).resize(function(){
		handleResize();
	});
});

jQuery(document).ready(function() {
	if(exists(".tabs")) {
		$( ".tabs" ).tabs();
	}
	
	if(exists(".accordion")) {
		$( ".accordion" ).accordion({
			heightStyle: "content"
		});
	}

	init_scroll_header(150);
	init_menu();
	init_scroll_up();
});

jQuery(window).load(function() {
	init_block_animation();
});