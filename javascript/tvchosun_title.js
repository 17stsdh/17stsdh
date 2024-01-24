
const axios = require("axios"); //특정  URL  삽입 시 URL html 태그 가지고
const cheerio = require("cheerio");

const getHTML = async (date) => {
    try {
        const html = (await axios.get(`https://news.tvchosun.com/svc/news/ospc_news_all_list.html?catid=1&source=&indate=${(date)}`)).data; // 주소 갖고옴

        return html;
    } catch(e) {
        console.log(e);
    }
};

const parsing  = async (page) => {
    const $ = cheerio.load(page);
    const courses = [];
    const $courseList = $(".detail");

    $courseList.each((idx, node) => {
        const title = $(node).find(".article_tit").find("a").text().trim();
        courses.push({
            title
        });
    }); 
    return courses;
};

function decreaseDate(inputDate) {
    // 입력된 정수형 날짜를 문자열로 변환
    const dateString = String(inputDate);
  
    // 연, 월, 일 추출
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    const day = parseInt(dateString.substring(6, 8), 10);
  
    // Date 객체 생성
    let date = new Date(year, month, day);
  
    // 하루를 뺌
    date.setDate(date.getDate() - 1);
  
    // 결과를 YYYYMMDD 형식의 정수로 변환
    const result = date.getFullYear() * 10000 +
                   (date.getMonth() + 1) * 100 +
                   date.getDate();
  
    return result;
  }
  
const getCourse = async (date) => {
    for(let i = 1; i < 2; i++){
        date_res = decreaseDate(date);
        date = date_res;
        //console.log(date_res); 날짜 감소 확인
        const html = await  getHTML(date_res);
        const courses = await parsing(html);
        console.log(courses); // 뉴스 헤드라인 출력
        console.log();

    }
    return courses;
};

getCourse(20240123);