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

    // 장소 정보가 없으면 경고 메시지를 띄우고, 마커를 지웁니다.
    if (!place.location) {
        window.alert("No details available for input: '" + place.name + "'");
        infowindow.close();
        marker.setMap(null); // 마커를 지도에서 제거
        return;
    }

    // 장소의 viewport가 있으면 지도 경계에 맞춰줍니다.
    if (place.viewport) {
        map.fitBounds(place.viewport);
    } else {
        // viewport가 없으면 장소의 위치로 중심을 이동하고 줌 레벨을 설정
        map.setCenter(place.location);
        map.setZoom(17);
    }

    // 마커 위치 설정
    marker.setPosition(place.location);

    // 정보창에 내용 설정
    infowindow.setContent(
        `<strong>${place.displayName}</strong><br>
         <span>${place.formattedAddress}</span>`
    );

    // 정보창을 마커와 함께 띄웁니다.
    infowindow.open(map, marker);
});

// DOMContentLoaded 시 실행되는 코드
$(document).ready(function() {
    initMap();
    initSlider();
    initCustomMap();
});
}
