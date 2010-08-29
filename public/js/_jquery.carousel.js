/* jQuery Carousel 0.9.5
Copyright 2008-2009 Thomas Lanciaux and Pierre Bertet.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
(function(c){c.fn.carousel=function(j){var j=c.extend({direction:"horizontal",loop:false,dispItems:1,pagination:false,paginationPosition:"inside",nextBtn:'<a role="button">Next</a>',prevBtn:'<a role="button">Previous</a>',btnsPosition:"inside",nextBtnInsert:"appendTo",prevBtnInsert:"prependTo",nextBtnInsertFn:false,prevBtnInsertFn:false,autoSlide:false,autoSlideInterval:3000,delayAutoSlide:false,combinedClasses:false,effect:"slide",slideEasing:"swing",animSpeed:"normal",equalWidths:"true",verticalMargin:0,callback:function(){},useAddress:false,adressIdentifier:"carousel",tabLabel:function(k){return k},showEmptyItems:true},j);if(j.btnsPosition=="outside"){j.prevBtnInsert="insertBefore";j.nextBtnInsert="insertAfter"}j.delayAutoSlide=j.delayAutoSlide||j.autoSlideInterval;return this.each(function(){var k={$elts:{},params:j,launchOnLoad:[]};k.$elts.carousel=c(this).addClass("js");k.$elts.content=c(this).children().css({position:"absolute",top:0});k.$elts.wrap=k.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow:"hidden",position:"relative"});k.steps={first:0,count:k.$elts.content.children().length};k.steps.last=k.steps.count-1;if(c.isFunction(k.params.prevBtnInsertFn)){k.$elts.prevBtn=k.params.prevBtnInsertFn(k.$elts)}else{k.$elts.prevBtn=c(j.prevBtn)[j.prevBtnInsert](k.$elts.carousel)}if(c.isFunction(k.params.nextBtnInsertFn)){k.$elts.nextBtn=k.params.nextBtnInsertFn(k.$elts)}else{k.$elts.nextBtn=c(j.nextBtn)[j.nextBtnInsert](k.$elts.carousel)}k.$elts.nextBtn.addClass("carousel-control next carousel-next");k.$elts.prevBtn.addClass("carousel-control previous carousel-previous");a(k);if(k.params.pagination){i(k)}h(k);c(function(){var n=k.$elts.content.children();var m=0;n.each(function(){$item=c(this);$itemHeight=$item.outerHeight();if($itemHeight>m){m=$itemHeight}});if(k.params.verticalMargin>0){m=m+k.params.verticalMargin}n.height(m);var l=k.$elts.content.children(":first");k.itemWidth=l.outerWidth();if(j.direction=="vertical"){k.contentWidth=k.itemWidth}else{if(j.equalWidths){k.contentWidth=k.itemWidth*k.steps.count}else{k.contentWidth=(function(){var o=0;k.$elts.content.children().each(function(){o+=c(this).outerWidth()});return o})()}}k.$elts.content.width(k.contentWidth);k.itemHeight=m;if(j.direction=="vertical"){k.$elts.content.css({height:k.itemHeight*k.steps.count+"px"});k.$elts.content.parent().css({height:k.itemHeight*k.params.dispItems+"px"})}else{k.$elts.content.parent().css({height:k.itemHeight+"px"})}d(k);c.each(k.launchOnLoad,function(o,p){p()});if(k.params.autoSlide){window.setTimeout(function(){k.autoSlideInterval=window.setInterval(function(){b(k,e(k,"next"))},k.params.autoSlideInterval)},k.params.delayAutoSlide)}})})};function a(j){j.$elts.nextBtn.add(j.$elts.prevBtn).bind("enable",function(){var k=c(this).unbind("click").bind("click",function(){b(j,e(j,(k.is(".next")?"next":"prev")));g(j)}).removeClass("disabled");if(j.params.combinedClasses){k.removeClass("next-disabled previous-disabled")}}).bind("disable",function(){var k=c(this).unbind("click").addClass("disabled");if(j.params.combinedClasses){if(k.is(".next")){k.addClass("next-disabled")}else{if(k.is(".previous")){k.addClass("previous-disabled")}}}}).hover(function(){c(this).toggleClass("hover")})}function i(j){j.$elts.pagination=c('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((j.params.paginationPosition=="outside")?"insertAfter":"appendTo")](j.$elts.carousel).find("p");j.$elts.paginationBtns=c([]);j.$elts.content.find("li").each(function(k){if(k%j.params.dispItems==0){j.$elts.paginationBtns=j.$elts.paginationBtns.add(c('<a role="button"><span>'+j.params.tabLabel(j.$elts.paginationBtns.length+1)+"</span></a>").data("firstStep",k))}});j.$elts.paginationBtns.each(function(){c(this).appendTo(j.$elts.pagination)});j.$elts.paginationBtns.slice(0,1).addClass("active");j.launchOnLoad.push(function(){j.$elts.paginationBtns.click(function(k){b(j,c(this).data("firstStep"));g(j)})})}function h(j){if(j.params.useAddress&&c.isFunction(c.fn.address)){c.address.init(function(l){var k=c.address.pathNames();if(k[0]===j.params.adressIdentifier&&!!k[1]){b(j,k[1]-1)}else{c.address.value("/"+j.params.adressIdentifier+"/1")}}).change(function(l){var k=c.address.pathNames();if(k[0]===j.params.adressIdentifier&&!!k[1]){b(j,k[1]-1)}})}else{j.params.useAddress=false}}function b(j,k){j.params.callback(k);f(j,k);j.steps.first=k;d(j);if(j.params.useAddress){c.address.value("/"+j.params.adressIdentifier+"/"+(k+1))}}function e(k,j){if(j=="prev"){if(!k.params.showEmptyItems){if(k.steps.first==0){return((k.params.loop)?(k.steps.count-k.params.dispItems):false)}else{return Math.max(0,k.steps.first-k.params.dispItems)}}else{if((k.steps.first-k.params.dispItems)>=0){return k.steps.first-k.params.dispItems}else{return((k.params.loop)?(k.steps.count-k.params.dispItems):false)}}}else{if(j=="next"){if((k.steps.first+k.params.dispItems)<k.steps.count){if(!k.params.showEmptyItems){return Math.min(k.steps.first+k.params.dispItems,k.steps.count-k.params.dispItems)}else{return k.steps.first+k.params.dispItems}}else{return((k.params.loop)?0:false)}}}}function f(j,k){switch(j.params.effect){case"no":if(j.params.direction=="vertical"){j.$elts.content.css("top",-(j.itemHeight*k)+"px")}else{j.$elts.content.css("left",-(j.itemWidth*k)+"px")}break;case"fade":if(j.params.direction=="vertical"){j.$elts.content.hide().css("top",-(j.itemHeight*k)+"px").fadeIn(j.params.animSpeed)}else{j.$elts.content.hide().css("left",-(j.itemWidth*k)+"px").fadeIn(j.params.animSpeed)}break;default:if(j.params.direction=="vertical"){j.$elts.content.stop().animate({top:-(j.itemHeight*k)+"px"},j.params.animSpeed,j.params.slideEasing)}else{j.$elts.content.stop().animate({left:-(j.itemWidth*k)+"px"},j.params.animSpeed,j.params.slideEasing)}break}}function d(j){if(e(j,"prev")!==false){j.$elts.prevBtn.trigger("enable")}else{j.$elts.prevBtn.trigger("disable")}if(e(j,"next")!==false){j.$elts.nextBtn.trigger("enable")}else{j.$elts.nextBtn.trigger("disable")}if(j.params.pagination){j.$elts.paginationBtns.removeClass("active").filter(function(){return(c(this).data("firstStep")==j.steps.first)}).addClass("active")}}function g(j){if(!!j.autoSlideInterval){window.clearInterval(j.autoSlideInterval)}}})(jQuery);