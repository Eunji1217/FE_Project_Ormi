const imageList = document.querySelector(".img-container");
let pageToFetch = 1;

loadMap();

async function fetchImages(pageNum) {
    try {
        const imgNum = 9;
        const response = await fetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${imgNum}`);
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        const createLineNum = imgNum / 3;    // 생성할 이미지 라인 수

        makeImageList(datas, pageNum, imgNum, createLineNum);
    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas, pageNum, imgNum, createLineNum) {
    let addImgList = "";
    for (let i = 0; i < createLineNum; i++) {
        addImgList += "<ul>";
        for (let j = 0; j < 3; j++) {
            addImgList += `<li><img class="img-common" src='${datas[i * 3 + j].download_url}' alt='이미지${imgNum * (pageNum - 1) + i * 3 + j + 1}'></li>`
        }
        addImgList += "</ul>";
    }
    imageList.innerHTML += addImgList;
}

// 스크롤 버튼 요소
const infScrollBtn = document.querySelector("#btn-more-hodu");
infScrollBtn.addEventListener('click', function () {

    fetchImages(pageToFetch++);
})
//모달
function toggleSubscribeModal() {
    const  modal = document.querySelector("#modal");
    const modalOpenBtn = document.querySelector("#btn_subscribe");
    const modalCloseBtn = document.querySelector("#btn_modalClose");

    // 모달 열기 버튼 클릭 이벤트
    modalOpenBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 화면 새로고침 동작 제거
        modal.classList.remove("display-none");
    });

    // 모달 닫기 버튼 클릭 이벤트
    modalCloseBtn.addEventListener("click", function () {
        modal.classList.add("display-none");
    });
}

//카카오맵
function loadMap() {
    const mapContatiner = document.getElementById('hodu-map');
    const option = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContatiner, option);
    const marker = new kakao.maps.Marker({
        position: option.center
    });

    marker.setMap(map);
}