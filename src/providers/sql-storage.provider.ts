const DB_NAME: string = 'flash-cards';
const win: any = window;

export const isFunction = (val: any) => typeof val === 'function';
export const isObject = (val: any) => typeof val === 'object';
export const isArray = Array.isArray;

export class SqlStorage {
    static BACKUP_LOCAL = 2;
    static BACKUP_LIBRARY = 1;
    static BACKUP_DOCUMENTS = 0;

    private _db: any;

    constructor(options = {}) {

        let dbOptions = this.defaults(options, {
            name: DB_NAME,
            backupFlag: SqlStorage.BACKUP_LOCAL,
            existingDatabase: false
        });

        if (win.sqlitePlugin) {
            let location = this._getBackupLocation(dbOptions.backupFlag);

            this._db = win.sqlitePlugin.openDatabase(this.assign({
                name: dbOptions.name,
                location: location,
                createFromLocation: dbOptions.existingDatabase ? 1 : 0
            }, dbOptions));

        } else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');

            this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
        }
        this._tryInit();
    }

    _getBackupLocation(dbFlag: number): number {
        switch (dbFlag) {
            case SqlStorage.BACKUP_LOCAL:
                return 2;
            case SqlStorage.BACKUP_LIBRARY:
                return 1;
            case SqlStorage.BACKUP_DOCUMENTS:
                return 0;
            default:
                throw Error('Invalid backup flag: ' + dbFlag);
        }
    }

    _tryInit() {

        this.query('DROP TABLE Cards');
        this.query('DROP Table Decks');

        this.query('PRAGMA foreign_keys = ON');

        this.query(`CREATE TABLE IF NOT EXISTS Decks
                    (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Name VARCHAR(25) NOT NULL
                    )`);

        this.query(`CREATE TABLE IF NOT EXISTS Cards (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Deck_Id INT NOT NULL,
                        Front TEXT NOT NULL,
                        Back TEXT NOT NULL,
                        FOREIGN KEY (Deck_Id) REFERENCES Decks(Id)
                    )`);


        this.query('INSERT INTO Decks (Name) VALUES (?)', ['Test 01']);
        this.query('INSERT INTO Decks (Name) VALUES (?)', ['Test 02']);
        this.query('INSERT INTO Decks (Name) VALUES (?)', ['Test 03']);
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params = []): Promise<any>{
        return new Promise((resolve, reject) => {
            try {
                this._db.transaction((tx) => {

                    //console.log('query ->' + query)
                    //console.log('params ->' + params)

                    tx.executeSql(query, params,
                        (tx, res) => resolve({ tx: tx, res: res }),
                        (tx, err) => reject({ tx: tx, err: err }));
                },
                    (err) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }


    assign(...args: any[]): any {
        if (typeof Object.assign !== 'function') {
            // use the old-school shallow extend method
            return this._baseExtend(args[0], [].slice.call(args, 1), false);
        }

        // use the built in ES6 Object.assign method
        return Object.assign.apply(null, args);
    }

    /**
     * Apply default arguments if they don't exist in
     * the first object.
     * @param the destination to apply defaults to.
     */
    defaults(dest: any, ...args: any[]) {
        for (var i = arguments.length - 1; i >= 1; i--) {
            var source = arguments[i];
            if (source) {
                for (var key in source) {
                    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                        dest[key] = source[key];
                    }
                }
            }
        }
        return dest;
    }

    _baseExtend(dst: any, objs: any, deep: boolean) {
        for (var i = 0, ii = objs.length; i < ii; ++i) {
            var obj = objs[i];
            if (!obj || !isObject(obj) && !isFunction(obj)) continue;
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var src = obj[key];

                if (deep && isObject(src)) {
                    if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
                    this._baseExtend(dst[key], [src], true);
                } else {
                    dst[key] = src;
                }
            }
        }

        return dst;
    }
}
