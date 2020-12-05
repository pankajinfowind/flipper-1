import { Injectable, EventEmitter } from '@angular/core'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

@Injectable()
export class PouchDBService2 {
  private isInstantiated: boolean
  private database: any
  public listener: EventEmitter<any> = new EventEmitter()
  public listenerLogin: EventEmitter<any> = new EventEmitter()

  public constructor() {}

  public connect(dbName: string, canSync: boolean = false) {
    if (!this.isInstantiated && dbName) {
      this.database = new PouchDB(dbName)
      this.isInstantiated = true
    }
    if (canSync) {
      this.database.sync('http://64.227.5.49:4984/' + dbName)
    }
  }
  public fetch() {
    return this.database.allDocs({ include_docs: true })
  }

  public get(id: string) {
    return this.database.get(id)
  }

  public find(id) {
    return this.get(id).then(
      result => {
        return result
      },
      error => {
        if (error.status === '404' || error.status === 404) {
          throw new Error(`ERROR:${error}`)
        } else {
          return new Promise((resolve, reject) => {
            reject(error)
          })
        }
      }
    )
  }

  getResponse(result, isArray) {
    if (!Array.isArray(result) && isArray) {
      return [result]
    }
    if (Array.isArray(result) && !isArray) {
      return result[0]
    }
    return result
  }

  makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  public put(id: string, document: any) {
    document._id = id
    document.uid = this.makeid(6)
    return this.get(id).then(
      result => {
        document._rev = result._rev
        return this.database.put(document)
      },
      error => {
        if (error.status === '404') {
          return this.database.put(document)
        } else {
          return new Promise((resolve, reject) => {
            reject(error)
          })
        }
      }
    )
  }

  public sync(remote: string) {
    const remoteDatabase = new PouchDB(remote)
    this.database
      .sync(remoteDatabase, {
        live: true,
        retry: true,
      })
      .on('change', change => {
        if (change) {
          this.listener.emit(change)
        }
      })
      .on('paused', change => {
        if (change) {
          this.listener.emit(change)
        }
      })
      .on('active', change => {
        if (change) {
          this.listener.emit(change)
        }
      })
      .on('denied', change => {
        if (change) {
          this.listener.emit(change)
        }
      })
      .on('complete', change => {
        if (change) {
          this.listener.emit(change)
        }
      })
      .on('error', error => {
        console.error(JSON.stringify(error))
      })
  }

  public getChangeListener() {
    return this.listener
  }
  public getChangeListenerLogin() {
    return this.listenerLogin
  }
}
