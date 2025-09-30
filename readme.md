# Run this project (existing repo)

## Prerequisites

* Node.js >= 16
* Yarn
* MySQL running and reachable

---

## 1) Install dependencies

```bash
yarn install
```

---

## 2) Configure environment

Create a `.env` file at the project root with your database URL:

```bash
DATABASE_URL="mysql://root:root@127.0.0.1:3306/mydb"
```

Ensure the database exists:

```bash
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS mydb;"
```

Connect to MySQL Shell:

```sql
\connect root@localhost:3306;
USE mydb;
SHOW TABLES;
SHOW DATABASES;
SELECT * FROM user;
```

---

## 3) Apply migrations and generate Prisma Client

```bash
yarn prisma migrate dev --name init
```

This applies the SQL in `prisma/migrations/**/migration.sql` and regenerates the Prisma client.

---

## 4) Start the server

```bash
yarn dev    # uses nodemon
# or
yarn start  # plain node
```

---

## 5) Prisma quick commands (Yarn)

```bash
yarn prisma:migrate:dev      # Apply migrations in dev mode
yarn prisma:migrate:deploy   # Apply migrations in production
yarn prisma:generate         # Generate Prisma client
yarn prisma:studio           # Open Prisma Studio
yarn prisma:db:push          # Push schema without migrations
```
