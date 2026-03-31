# How to run?

1. First clone the repo:

```
git clone https://github.com/ritish78/basibasau.git
```

2. Then, go inside the local folder:

```
cd basibasau
```

3. Then, use this docker command to build backend, frontend, postgres, redis and adminer container

```
docker compose build
```

4. Then, run the docker services

```
docker compose up
```

5. After docker services has started run this command to migrate the sql tables

```
docker compose exec basibasaubackend npx drizzle-kit push
```

6. Then, use your keyboard down arrow to select `Yes, I want to execute all statements` and press `Enter`.

7. Then, you can visit `http://localhost:8080` and see Adminer. Use these credentials:

```
System: PostgreSQL
Server: basibasaupostgres
Username: admin
Password: root
Database: basibasau
```

8. You can now see newly created tables in adminer.
9. Create a new user from Frontend on localhost:3000 or send a POST request. Eg.

```
POST http://localhost:5000/api/v1/auth/register
{
    "firstName": "Rajesh",
    "lastName": "Hamal",
    "email": "rajeshhamal@email.com",
    "password": "password123"
}
```

10. Create atleast 4 new accounts and copy their user id into `backend/seed.ts` file.
11. Send a POST request to `http://localhost:5000/api/v1/property/seed-property` to seed properties. Body is not required.
12. You can visit `http://localhost:3000` on browser to see newly added properties.
