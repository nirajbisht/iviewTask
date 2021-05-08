import config from 'config';
import { connect, set, connection as db } from 'mongoose'

class Bootstrap {
    private mongoDbUrl = config.get<string>('dbConfig.dbUrl')
    constructor() { }
    async bootstrap(server) {
        try {
            await this.connectMongoDatabase()
            return {}
        } catch (error) {
            console.log(">>>bootstrap>>>>", error)
            Promise.reject(error)
        }
        return;
    }

    async connectMongoDatabase() {
        try {
            set('debug', true)
            db.on('error', err => { console.error('%s', err) })
                .on('close', (error) => {
                    console.log('Database connection closed.', error, false)
                })
            connect(this.mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
                if (err) {
                    console.log('Database connection closed.', err);
                    return Promise.reject(err)
                }
            })
            console.log(`Connected to ${this.mongoDbUrl}`)
            return {}
        } catch (error) {
            Promise.reject(error)
        }
    }
}
export let BootstrapS = new Bootstrap()