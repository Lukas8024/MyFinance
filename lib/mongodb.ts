// import { MongoClient } from 'mongodb'

// const MONGODB_URI = process.env.MONGODB_URI as string
// const MONGODB_DB = process.env.MONGODB_DB as string

// if (!MONGODB_URI) {
// 	throw new Error('Brak URI MongoDB w pliku .env')
// }

// let client: MongoClient
// let clientPromise: Promise<MongoClient>

// // eslint-disable-next-line no-var
// declare global {
// 	var _mongoClientPromise: Promise<MongoClient> | undefined
//   }

// if (process.env.NODE_ENV === 'development') {
// 	// W trakcie developmentu używaj globalnego klienta
// 	if (!globalThis._mongoClientPromise) {
// 		client = new MongoClient(MONGODB_URI)
// 		globalThis._mongoClientPromise = client.connect()
// 	}
// 	clientPromise = globalThis._mongoClientPromise
// } else {
// 	// W produkcji twórz nowego klienta dla każdego żądania
// 	client = new MongoClient(MONGODB_URI)
// 	clientPromise = client.connect()
// }

// export async function getDb() {
// 	const client = await clientPromise
// 	return client.db(MONGODB_DB)
// }

import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI as string
const MONGODB_DB = process.env.MONGODB_DB as string

if (!MONGODB_URI) {
	throw new Error('Brak URI MongoDB w pliku .env')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Używanie globalThis w kodzie, zamiast var
if (process.env.NODE_ENV === 'development') {
	if (!globalThis._mongoClientPromise) {
		client = new MongoClient(MONGODB_URI)
		globalThis._mongoClientPromise = client.connect()
	}
	clientPromise = globalThis._mongoClientPromise
} else {
	client = new MongoClient(MONGODB_URI)
	clientPromise = client.connect()
}

export async function getDb() {
	const client = await clientPromise
	return client.db(MONGODB_DB)
}
