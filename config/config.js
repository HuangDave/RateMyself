
module.exports = {
    secret: "ECv7L96pXn1IbqdWC69wU4W71suk5dRx",
    production: {
        db: {
            connection: './database.db',
            username: 'username',
            password: 'password'
        }
    },
    test: {
        db: {
            connection: './test/test.db',
            username: 'username',
            password: 'password'
        }
    }
}
