export const userInsertQuery = `
    INSERT INTO "user".users (user_id,first_name,last_name,sur_name, email, phone, address, password_hash, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`


export const deleteUserQuery = `
    DELETE FROM "user".users
    WHERE user_id = $1
`
