import jwt from 'jsonwebtoken'
const SECRET = process.env.TOKEN_SECRET || 'secret'

export function generateAccessToken(email: string) {
    return jwt.sign({ email }, SECRET, { expiresIn: '1h' })
}
