import request from "supertest";
import app from '../index';

describe('/users routes', () => {
    let idUserTest = "toBeDefined";
    const postUserTest = {
        name: "Laura",
        photo: "https://www.marketingmuses.com/wp-content/uploads/2018/01/invis-user.png",
        email: "laura123@gmail.com",
        password: "12345"
    }
    const patchUserTest = {
        name: "Lucas",
        password: "qwerty"
    }

    describe('/users GET', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/users').send();
            expect(response.statusCode).toBe(200);
        });

        test('should respond with an array of users', async () => {
            const response = await request(app).get('/users').send();
            expect(response.body).toBeInstanceOf(Array);
        });
    })

    describe('/users POST', () => {
        test('should respond with a 201 status code & content-type:application/json', async () => {
            const response = await request(app).post('/users').send(postUserTest);

            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));

            idUserTest = response.body['id'];
        });
    })

    describe('/users PATCH', () => {
        test('should respond with a 200 status code & content-type:application/json', async () => {
            const response = await request(app).patch(`/users/${idUserTest}`).send(patchUserTest);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));
        });
    })

    describe('/users DELETE', () => {
        test('should respond with a 200 status code & content-type:application/json', async () => {
            const response = await request(app).delete(`/users/${idUserTest}`).send();
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));
        });
    })
})

describe('/childs routes', () => {
    let idChildTest = "toBeDefined";
    const postChildTest = {
        name: "Roberto",
        photo: "https://www.marketingmuses.com/wp-content/uploads/2018/01/invis-user.png",
        points: 15
    }
    const patchChildTest = {
        name: "Renan",
        points: 25
    }

    describe('/childs GET', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/childs').send();
            expect(response.statusCode).toBe(200);
        });

        test('should respond with an array of users', async () => {
            const response = await request(app).get('/childs').send();
            expect(response.body).toBeInstanceOf(Array);
        });
    })

    describe('/childs POST', () => {
        test('should respond with a 201 status code & content-type:application/json', async () => {
            const response = await request(app).post('/childs').send(postChildTest);

            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));

            idChildTest = response.body['id'];
        });
    })

    describe('/childs PATCH', () => {
        test('should respond with a 200 status code & content-type:application/json', async () => {
            const response = await request(app).patch(`/childs/${idChildTest}`).send(patchChildTest);

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));
        });
    })

    describe('/childs DELETE', () => {
        test('should respond with a 200 status code & content-type:application/json', async () => {
            const response = await request(app).delete(`/childs/${idChildTest}`).send();
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'));
        });
    })
})