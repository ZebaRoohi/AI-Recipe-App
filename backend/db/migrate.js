import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function run() {
  const sqlPath = path.join(__dirname, 'init.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  try {
    await client.query(sql)
    console.log('Migration applied')
  } catch (err) {
    console.error('Migration failed', err)
  } finally {
    await client.end()
  }
}

run().catch((e) => console.error(e))
