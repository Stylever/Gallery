$( function () {
	var imgsArr = [
			["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
			["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"],
			["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg"]
		];
	var thanksArr = [
		{content: "感谢_DeAth_TrAp提供的图片素材", url: "http://weibo.com/u/1976341311", social: "Weibo"},
		{},
		{}
	];

	var gallery = {
		num: 0, // click num
		rotateYDeg: 0, // rotateY
		transZDistance: 0, // translateZ
		lazyImg: function () { 
			$('.lazy').lazyload({ 
			    effect:'fadeIn' 
			});
		},
		appendImgs: function () {
			var str = ''
			for (var i = 0, lenI = imgsArr.length; i < lenI; i++) {
				str += '<div class="col-xs-6 col-md-4">';
				for (var j = 0, lenJ = imgsArr[i].length; j < lenJ; j++) {
					str += '<div class="photo" arr-index="' + i + '-' + j +'">'
						+	   '<img class="lazy" data-original="images/small/' + imgsArr[i][j] + '" />'
						+  '</div>';
				}
				str += '</div>';
			}console.log(str)
			$(".row").html(str);
			
		},
		appendSpinImg: function (index) {
			var arr = imgsArr[index],
			    str = "",
			    thankStr = "";

			for (var i = 0, len = imgsArr[index].length; i < len; i++) {
				str += '<img src="images/small/' + imgsArr[index][i] + '" />';
			}

			$(".spin").html(str);

			if ("content" in thanksArr[index]) {
				thankStr += thanksArr[index].content
						 +      '<a class="share" href="' + thanksArr[index].url + '" target="_blank">'
						 +		    '<i class="iconfont">&#xe603;</i>' + thanksArr[index].social
						 +		'</a>';	 
			}
			$(".thank").html(thankStr);
		},
		spinImg: function (index) {
			var width = $(".carousel-3d").width(), // carousel's width
				imgsNum = imgsArr[index].length,
				zDistance = 0;

				gallery.rotateYDeg = 360 / imgsNum;
				gallery.transZDistance = Math.round((width / 2) / (Math.tan(Math.PI / imgsNum) ) );	

				zDistance = '-' + gallery.transZDistance + 'px';

			$(".spin").css("transform", "translateZ(" + zDistance + ")");
			$(".spin img").each( function (index, item) {
				var rotYDeg = index * gallery.rotateYDeg;
					cssStyle = {
						transform: 'rotateY(' + rotYDeg + 'deg)' + ' translateZ(' + gallery.transZDistance + 'px)'
					};

				$(this).css(cssStyle);
			});
		},
		selectAction: function () {
			$(".row").on("click", ".photo", function () {
				var arrIndex = $(this).attr("arr-index"), // eg: imgsArr index 1-2 
					arr = arrIndex.split("-"); // [1, 2]

				gallery.num = -arr[1];
				gallery.appendSpinImg(arr[0]);
				gallery.spinImg(arr[0])
				gallery.changeSpin(-arr[1]);

				$(".gallery").hide();
				$(".popup").show();
			});

			// carousel 3D
			$(".popup").on("click", ".prev", function () {
				gallery.num++;

				gallery.changeSpin(gallery.num);
			});
			$(".popup").on("click", ".next", function () {
				gallery.num--;

				gallery.changeSpin(gallery.num);
			});
			$(".popup").on("click", ".close", function () {
				$(".gallery").show();
				$(".popup").hide();
			});

			// large image
			$(".spin").on("click", "img", function () {
				var imgSrc = $(this).attr("src");

				$(".img-large img").attr("src", imgSrc.replace("small", "large"));
				$(".popup").hide();
				$(".popup-large").show();
			});

			$(".popup-large").on("click", ".close", function () {
				$(".popup-large").hide();
				$(".popup").show();
			});
		},	
		changeSpin: function (index) {
			var rotYDeg = index * gallery.rotateYDeg,
				cssStyle = {
					transform: 'translateZ(-' + gallery.transZDistance + 'px)' + ' rotateY(' + rotYDeg + 'deg)'
				};

			$(".spin").css(cssStyle);
		},
		init: function () {
			gallery.appendImgs();
			gallery.lazyImg();
			gallery.selectAction();

		}
	};

	gallery.init();
});