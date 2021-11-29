import sqlite3 from 'sqlite3';

export interface Interface {
    props:any
}

export class MemoryDatabase implements Interface {
    // const db open db file or create a new one if it doesn't exist
    db: sqlite3.Database;
    props: any;

    constructor() {
        this.open();
        this.createTable();
    }

    open() {
        this.db = new sqlite3.Database('./db/database.db');
    }
    dbClose() {
        this.db.close();
    }

    createTable() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            this.db.run(`CREATE TABLE IF NOT EXISTS measurements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                PlantID TEXT,
                moisture TEXT,
                humidity TEXT,
                light TEXT,
                temperature TEXT
            )`)
        });
    }

    get(sql, params:any = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    };


    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insertUser(name, email, password) {
        return new Promise<void>((resolve, reject) => {
            this.db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private insertMeasurement(PlantID, moisture, humidity, light, temperature): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(`INSERT INTO measurements (PlantID, moisture, humidity, light, temperature) 
                VALUES (?, ?, ?, ?, ?)`, [PlantID, moisture, humidity, light, temperature], (err,row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();

                }
            });
        });
    }

    private updateMeasurement(PlantID, moisture, humidity, light, temperature): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(`UPDATE measurements SET moisture = ?, humidity = ?, light = ?, temperature = ? WHERE PlantID = ?`, [moisture, humidity, light, temperature, PlantID], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public measurements(PlantID: any, moisture: any, humidity: any, light: any, temperature: any) {
        let n
        this.db.get(`SELECT * FROM measurements WHERE PlantID = ? LIMIT 1`, [PlantID], (err: any, row: { moisture: any; humidity: any; light: any; temperature: any; }) => {
            if (err) {
                console.log(err);
            } else {
                if (row) {
                    if (row.moisture != moisture || row.humidity != humidity || row.light != light || row.temperature != temperature) {
                        this.updateMeasurement(PlantID, moisture, humidity, light, temperature)
                            .catch(err => console.log(err));

                        n = {
                            PlantID: PlantID,
                            moisture: moisture,
                            humidity: humidity,
                            light: light,
                            temperature: temperature
                        }
                        return row
                    } else {
                        return;
                    }
                } else {
                    this.insertMeasurement(PlantID, moisture, humidity, light, temperature)
                        .then(r => {
                            console.log(r);
                            n = {
                                PlantID: PlantID,
                                moisture: moisture,
                                humidity: humidity,
                                light: light,
                                temperature: temperature
                            }
                        }).catch(e => console.log(e));

                }
            }
        });
        return n
    }

}

export default new MemoryDatabase();