// 구글 지도 초기화 함수
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7156502, lng: 126.6978231 }, // 지도 중심 좌표
        zoom: 17
    });

    // 마커 추가
    var marker = new google.maps.Marker({
        position: { lat: 37.7156502, lng: 126.6978231 }, // 마커 위치
        map: map,
        title: "만수옥"
    });
}

// 슬라이더 초기화 함수
function initSlider() {
    var targetEle = $("#autoplay");
    targetEle.find("img").css("width", targetEle.width() + "px");

    targetEle.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        variableWidth: true
    });

    targetEle.css("display", "block");

    // 슬라이더 높이 설정
    var tmpHeight = 0;
    targetEle.find("img").each(function() {
        var _this = $(this);
        if (tmpHeight === 0 || tmpHeight > _this.height()) {
            tmpHeight = _this.height();
        }
    });
    $(".slide_wrap").height(tmpHeight);
}

// gmp-map 초기화 함수
async function initCustomMap() {
    await customElements.whenDefined('gmp-map');

    const map = document.querySelector('gmp-map');
    const marker = document.querySelector('gmp-advanced-marker');
    const placePicker = document.querySelector('gmpx-place-picker');
    const infowindow = new google.maps.InfoWindow();

    map.innerMap.setOptions({
        mapTypeControl: false
    });

    placePicker.addEventListener('gmpx-placechange', () => {
        const place = placePicker.value;

        if (!place.location) {
            window.alert("No details available for input: '" + place.name + "'");
            infowindow.close();
            marker.position = null;
            return;
        }

        if (place.viewport) {
            map.innerMap.fitBounds(place.viewport);
        } else {
            map.center = place.location;
            map.zoom = 17;
        }

        marker.position = place.location;
        infowindow.setContent(
            `<strong>${place.displayName}</strong><br>
             <span>${place.formattedAddress}</span>`
        );
        infowindow.open(map.innerMap, marker);
    });
}

// DOMContentLoaded 시 실행되는 코드
$(document).ready(function() {
    initMap();
    initSlider();
    initCustomMap();
});
