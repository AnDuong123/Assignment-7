module.exports = function (pgPool) {
    if (!pgPool || !pgPool.pool) {
        throw Error('Missing DB connection!');
    }
    const pool = pgPool.pool;

    function getData(options, limit = 10, offset = 0, callback) {
        console.log('options: ', options);
        const { name, genre } = options;

        let sql = `
            select 	d.data_id,
                    d.name,
                    d.author,
                    d.genre,
                    d.created_date
            from	data d
            where 	1 = 1
        `;

        const params = [];
        if (name) {
            sql += ` and d."name" ilike $${params.length + 1}`;
            params.push(`%${name}%`);
        }
        if (genre) {
            sql += ` and d.genre = $${params.length + 1}`;
            params.push(genre);
        }

        sql += `
            limit ${limit}
            offset ${offset}
        `;
        console.log('sql: ', sql);
        console.log('params: ', params);

        pool.query(sql, params, function(error, data) {
            if (error) {
                throw error;
            }

            console.log('data: ', data.rows);

            return callback(null, data.rows);
        });
    }

    return { getData };
}