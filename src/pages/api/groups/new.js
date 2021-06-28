export default async (req, res) => {
    const validationError = validateInput(req.body.name, req.body.description)
    if (validationError) {
        res.status(400).json({ message: validationError })
    } else {
        // return the group id if successful, else return error message
        createGroup(req.body.name, req.body.description)
            .then((group_id) =>
                res
                    .status(200)
                    .json({ message: 'Successfully created group', group_id })
            )
            .catch((e) => {
                console.log(e)
                res.status(500).json({ message: 'Postgres error ' + e.code })
            })
    }
}

// inserts a group into the database and returns the group ID
const createGroup = async (name, description) => {
    const { getDatabasePool } = require('../../../database/db-connect')
    const pool = getDatabasePool()
    console.log('INSERTING group:', name, description)
    const {
        rows
    } = await pool.query(
        'INSERT INTO groups (groupname, groupdesc) VALUES ($1, $2) RETURNING id;',
        [name, description]
    )
    console.log(rows)
    if (rows.length === 1) return rows[0].id
}

// checks that both the name and description were supplied (cannot be empty)
const validateInput = (name, description) => {
    if (!name) return 'name missing'
    if (!description) return 'description missing'
    return false
}
