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



# Screensots:
- Adminer on `http://localhost:8080` after filling the above credentials:
<img width="1920" height="1020" alt="Adminer" src="https://github.com/user-attachments/assets/de54d6e8-b9ba-442c-95d9-b5e90b3569e5" />
- Home Page:
<img width="1920" height="1020" alt="Home Page" src="https://github.com/user-attachments/assets/96d9b8d9-d1d8-46ef-9008-06a335188188" />
- Login Page:
<img width="1920" height="1020" alt="Login Page" src="https://github.com/user-attachments/assets/877d0022-2135-4ad6-b7d4-e31ca51f2e3f" />
- Register Page:
<img width="1920" height="1020" alt="Register Page" src="https://github.com/user-attachments/assets/5b48b97b-3fc2-4398-b8b4-b4d18002be06" />
- Filling User Details:
<img width="1920" height="1020" alt="Filling user details" src="https://github.com/user-attachments/assets/8f262ad3-2873-4fc7-aab0-6b4413a1c048" />
- After registering:
<img width="1920" height="1020" alt="After logging in" src="https://github.com/user-attachments/assets/05b8a556-8ed3-4757-83b7-839e4ce342d0" />
- New User in our Postgres DB. Viewed on Adminer.
<img width="1920" height="1020" alt="User info in postgres" src="https://github.com/user-attachments/assets/4efb265f-82ab-400f-86d7-03b1cb304937" />

- Clicking on one of the property listing:
<img width="1533" height="960" alt="Clicking on one of the property listing" src="https://github.com/user-attachments/assets/e23a2d4f-684c-421f-8307-99824e5dbbe2" />
- Clicking on the favourites button and refreshing the page persists the favourites. It also increases the views count.
<img width="942" height="901" alt="Clicking on Favourites button and even after a refresh it persists" src="https://github.com/user-attachments/assets/94869dba-f6a3-4edd-b7d5-f91c2fcf69be" />
- Viewing current user's favourites:
<img width="1920" height="1020" alt="Viewing favourites" src="https://github.com/user-attachments/assets/364256f2-e322-47f6-a242-a10688d5da1c" />

