## SQL Injection

I. Issues queries sql

1.`SELECT * FROM users;-- WHERE id = ${3}` => `SELECT * FROM users`

```sql
`SELECT * FROM users;-- WHERE id = ${3}`
```

2.`SELECT * FROM users WHERE id = 1;-- OR id = 3` => `SELECT * FROM users WHERE id = 1`

```sql
`SELECT * FROM users WHERE id = 1;-- OR id = 3`
```

3.Multiple statements

```sql
`SELECT * FROM users WHERE id = 1; UPDATE users SET name = 'DungU' WHERE id = 1`
```

II. Fix issues sql injection

1.Don’t allow multiple statements

```js
const conn = mysql.createConnection({
    host: 'host',
    user: 'username',
    database: 'database_name',
    multipleStatements: false,
});
```

2.Use placeholders instead of variable interpolation

```sql
`SELECT * FROM users WHERE id = ?`
```

3. Input validation
4. Allowlisting
