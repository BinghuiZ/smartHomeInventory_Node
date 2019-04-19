const frisby = require('frisby');

it('should register', () => {
    return frisby.post('http://localhost:3000/users/register',{
        first_name: 'frisby',
        last_name: 'frisby',
        email: 'frisby@frisby.com',
        password: '123456'
    })
    .expect('status', 200)
    .then(() => {
        return frisby.post('http://localhost:3000/users/register',{
            first_name: 'frisby',
            last_name: 'frisby',
            email: 'frisby@frisby.com',
            password: '123456'
        })
        .expect('status', 400)
    })
    .then( () => {
        return frisby.post('http://localhost:3000/users/login',{
            email: 'frisby@frisby.com',
            password: '123456' 
        })
        .expect('status', 200)
        .then( (res) =>{
            return frisby.post('http://localhost:3000/users/profile',{
                token: res.data 
            })
        })
        .expect('status', 200)
        

    })
})

