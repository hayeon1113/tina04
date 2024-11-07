// 구글 지도 초기화 함수
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7156502, lng: 126.6978231 }, // 좌표 설정
        zoom: 17
    });

    // 마커 추가
    var marker = new google.maps.Marker({
        position: { lat: 37.378100, lng: 127.112298 }, // 마커 위치
        map: map,
        title: "만수옥"
    });
}
$(function(e) {
		initMap();
		
		var targetEle = $("#autoplay");
		targetEle.find("img").css("cssText" , "width:" + targetEle.width() + "px !important;");
		targetEle.slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			autoplay : true,
			autoplaySpeed : 2000,
			dots: false,
		  	infinite: true,
		  	variableWidth: true
		});
		targetEle.css({"display" : "block"});
		var tmpHeight = 0;
		targetEle.find("img").each(function(k, v) {
			var _this = $(this);
			if( tmpHeight == 0 || tmpHeight > _this.height() ) {
				tmpHeight = _this.height();
			}
		});
		$(".slide_wrap").height(tmpHeight);
	});
