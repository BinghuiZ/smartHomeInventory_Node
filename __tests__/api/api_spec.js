const frisby = require('frisby');

it('should register', () => {
    return frisby.post('https://apismarthomeinventory.herokuapp.com/users/register',{
        first_name: 'frisby',
        last_name: 'frisby',
        email: 'frisby@frisby.com',
        password: '123456'
    })
    .expect('status', 200)
    .then(() => {
        return frisby.post('https://apismarthomeinventory.herokuapp.com/users/register',{
            first_name: 'frisby',
            last_name: 'frisby',
            email: 'frisby@frisby.com',
            password: '123456'
        })
        .expect('status', 400)
    })
    .then( () => {
        return frisby.post('https://apismarthomeinventory.herokuapp.com/users/login',{
            email: 'frisby@frisby.com',
            password: '123456' 
        })
        .expect('status', 200)
        .then( (res) => {
            console.log('login result')
            console.log(res)
        })
    })
})

