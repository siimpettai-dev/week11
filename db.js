const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const itemsPool = new Pool ({
    connectionString: 'postgresql://myrecipes_beon_user:gDuSwXUJe81Ki7zyi6yO9rIBS0cWU9OC@dpg-d4jiqsmr433s739e95u0-a.oregon-postgres.render.com/myrecipes_beon?ssl=true',
    ssl: {
        rejectUnauthorized: false
    }
});



module.exports = itemsPool;