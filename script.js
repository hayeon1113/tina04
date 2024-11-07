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
