"use strict";

const path = require("path");
const fs = require("fs");
/**
 * App 개발환경 정의
 * ------------------------------------------------------------------------------------
 * 정의되지 않은 경우 자동으로 false 처리
 * 어플리케이션을 실행할때 입력한 추가 argument를 통해 dev와 prod 상태를 구분합니다.
 * package.json 에서 서버 구동 npm script를 작성할때 뒤에 붙인 --dev 옵션입니다.
 */
global.isDev = ( process.argv.length > 2 && process.argv[2] === '--dev' )

/**
 * App Document Root 지정
 * ------------------------------------------------------------------------------------
 * back-end 루트를 절대경로 구해와서 root 라는 글로벌 변수에 할당합니다.
 * 우리가 주로 로드해서 사용할 모듈폴더 (modules) 역시 글로벌 변수에 할당합니다.
 */
global.root = path.resolve(__dirname + '/../../app');
global.modulePath = root + '/modules'

/**
 * 사용 환경에 따른 APP 개발 환경설정 불러오기
 * ------------------------------------------------------------------------------------
 * 위의 개발환경에 따라 config폴더에서 각각 다른 파일을 불러오도록 합니다.
 * config.development.js , config.production.js 파일 두파일로 분리됩니다.
 * 불러온 환경설정은 그로벌 변수 appConfig에 할당됩니다.
 */
global.appConfig = require(path.resolve(root + '/config/config.' + (isDev?'development':'production') + '.js'));


/**
 * 모듈 불러오기
 * @param moduleName 모듈 이름
 * @param moduleType 모듈 타입
 * @returns {*}
 */
global.loadModule = ( moduleName, moduleType = 'controller') => {
    const modulePath = `${root}/modules/${moduleName}/${moduleName}.${moduleType}.js`
    if (!fs.existsSync(modulePath)) {
        throw Error('로드하려는 모듈이 존재하지 않습니다')
    }
    const t =require(modulePath);

    return t;
}
/**
 * 데이타베이스 객체 불러오기
 * @returns {*}
 */
global.database = () => {
    return require(`${root}/core/database.js`)
}
