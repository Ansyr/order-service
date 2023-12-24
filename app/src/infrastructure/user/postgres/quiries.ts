export const userInsertQuery = `
    INSERT INTO "user".users (user_id,first_name,last_name,sur_name, email, phone, address, password_hash, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`


export const deleteUserQuery = `
    DELETE FROM "user".users
    WHERE user_id = $1
`


export const findUserQuery = `
    SELECT * FROM "user".users
    WHERE user_id = $1
`

export const updateUserInfoQuery = `UPDATE "user".users SET first_name = $2, last_name = $3, sur_name = $4, email = $5, phone = $6, address = $7, password_hash = $8 WHERE user_id = $1;`
