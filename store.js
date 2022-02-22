// Configuration for IPFS instance
const ipfsConfig = {
    repo: './ipfs',
    EXPERIMENTAL: {
        pubsub: true,
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
                '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
                '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
                '/ip4/127.0.0.1/tcp/4001/',
                '/ip4/192.168.9.56/tcp/60824/',
                '/ip4/192.168.3.98/tcp/4001/',
                '/ip4/127.0.0.1/tcp/4001/'
            ]
        },
    }
}

// Configuration for the database
const dbConfig = {
    // If database doesn't exist, create it
    create: true,
    // Don't wait to load from the network
//    sync: false,
    // Load only the local version of the database
    // localOnly: true,
    // Allow anyone to write to the database,
    // otherwise only the creator of the database can write
    accessController: {
        write: ['*'],
    }
}

const createStore = async (Ipfs, OrbitDB) => {
    const Node = await Ipfs.create(ipfsConfig)
    const orbitdb = await OrbitDB.createInstance(Node) 
    window.Node = Node
    window.OrbitDB = orbitdb 
    return async (name = 'users', type = 'feed') => {
        // Open (or create) database
        let db = null;
        switch (type) {
            case 'log':
                db = await orbitdb.log(name, dbConfig)
                break
            case 'feed':
                db = await orbitdb.feed(name, dbConfig)
                break
            case 'docstore':
                db = await orbitdb.docstore(name, dbConfig)
                break
            case 'keyvalue':
                db = await orbitdb.keyvalue(name, dbConfig)
                break
            default:
                db = await orbitdb.counter(name, dbConfig)
                break
        }
        // Done
        return db
    }
}

window.Store = createStore