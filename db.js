const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gaurishsharma',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

 pool.connect();

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

const getUsersById = (req, res) => {
    const id = Number(req.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id] , (error,results) => {
        if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
    });
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const createUser = (request, response) => {
    const id = parseInt(req.params.id)
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User added with ID: ${id}`)
    })
  }

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser
  };