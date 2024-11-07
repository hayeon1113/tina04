// 구글 지도 초기화 함수
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7156502, lng: 126.6978231 }, // 지도 중심 좌표
        zoom: 17
    });

    // 마커 추가
    var marker = new google.maps.Marker({
        position: { lat: 37.7156502, lng: 126.6978231 }, // 만수옥의 좌표
        map: map,
        title: "만수옥"
    });
}

$(document).ready(function() {
    initMap();

    // 슬라이더 설정
    var targetEle = $("#autoplay");
    targetEle.find("img").css("width", targetEle.width());

    targetEle.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        variableWidth: true
    });

    // 슬라이더 표시
    targetEle.css({"display": "block"});

    // 슬라이더 높이 설정
    var tmpHeight = 0;
    targetEle.find("img").each(function() {
        var _this = $(this);
        if (tmpHeight === 0 || tmpHeight > _this.height()) {
            tmpHeight = _this.height();
        }
    });
    $(".slide_wrap").height(tmpHeight);
});
