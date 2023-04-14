const app=require ('../server')
const request= require('supertest')

TextDecoderStream('test request with valid payload',async function(){
    const testPayload={
        name:'testing',
        email:'testemail@testing.com',
        interests:'test interest'
    }
    const response=await request(app)
    .post('./update-profile')
    .send(testPayload)

    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("info")
    expect(response.body.info).toBe("user profile data updated successfully")

    server.close()


})