// App 객체를 새롭게 생성합니다.
const App = {
    express: null,
    isDev: false,
    config: {}
}

// 주요 의존성패키지
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const cookieParser = require('cookie-parser')

// 서버의 Timezone을 Asia/Seoul로 설정합니다.
process.env.TZ = 'Asia/Seoul';

// Express 를 초기화 하고 App.express에 할당합니다.
App.express = express()

App.express = express()

// 방금 작성한 global.js 파일을 로드합니다.
require('./global')

// CookieParser, bodyParser 를 로드합니다. 
// 여기서 appConfig 변수는 global.js 파일에서 각 환경에 맞는 config파일을 로드하여 할당된 변수입니다.
App.express.use(cookieParser(appConfig.secretKey))
App.express.use(bodyParser.json())
App.express.use(bodyParser.urlencoded({extended: true}))
App.express.use(cors(appConfig.cors))    // CORS 설정

/**
 * Helper에 등록된 helper들 자동으로 불러오기
 */
// helpers 폴더의 파일 목록을 가져옵니다.
let fileList = fs.readdirSync(root + '/helpers');
// 파일들을 전부 로드합니다.
fileList.forEach(async (fileName) => {
    require(root + '/helpers/' + fileName);
});

/**
 * 모듈에 등록된 Router 들 자동으로 불러오기
 */
// 라우터 라이브러리를 로드하고 router 객체에 할당 해줍니다.
const router = require('express').Router();

// modules 폴더에 등록된 디렉토리 목록을 불러옵니다.
let dirList = fs.readdirSync(modulePath)
dirList.forEach((dir) => {
    // 디렉토리가 맞을경우
    if(fs.lstatSync(modulePath + '/' + dir).isDirectory()) {
        // 라우팅 설정파일이 존재할 경우
        const routePath = `${modulePath}/${dir}/${dir}.routes.js`;
        const matchPath = `/${dir}`

		// 파일이 존재한다면 router.use로 해당 라우트를 등록해준다.
        if(fs.existsSync( routePath )) {
            router.use(matchPath, require(routePath))
        }
    }
});

// App.express 객체에 위에 불러온 router 설정을 사용 설정해줍니다.
App.express.use(router);

/**
 * 어플리케이션 실행
 * ------------------------------------------------------------------------------------
 * @param port 실행 포트
 */
App.start = () => {

    // Listen 시작
    App.express.listen(appConfig.appPort, '0.0.0.0', () => {
        console.log(`[${isDev ? '개발 모드':'릴리즈 모드'}] 서버가 작동되었습니다 : port ${appConfig.appPort}`);
    })
}

module.exports = App

