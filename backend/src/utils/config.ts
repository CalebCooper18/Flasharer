import 'dotenv/config';

const PORT: number = Number(process.env.PORT)

const MONGODB_URI: string = process.env.MONGODB_URI as string


export default {
    PORT,
    MONGODB_URI
}