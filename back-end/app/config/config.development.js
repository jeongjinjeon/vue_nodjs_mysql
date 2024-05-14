module.exports = {
    appPort: 3000,    // 앱 구동 포트
    secretKey: 'supermanisdead', // 암호화를 위해 특정한 키 입력
    // 데이타베이스 관련 설정
    database: {
        host: 'localhost',
        username: 'admin',
        password: 'devops6115!',
        port: 3306,
        database: 'jjjsins_db'
    },
    // CORS관련 설정
    cors: {
        origin: true,
        credentials: true
    },
    jwt: {
        accessTokenExpire: '1m',	// accessToken 의 만료시간 (1분)
        refreshTokenExpire: '14d',	// refreshToken 의 만료시간 (14일)
    }
}
