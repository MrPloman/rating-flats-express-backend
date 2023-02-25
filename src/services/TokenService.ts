import jwt from 'jsonwebtoken'
const SECRET = process.env.TOKEN_SECRET || 'secret'

export function generateAccessToken(email: string) {
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
    return jwt.sign({ exp: expirationTime, data: email }, SECRET)
}

export function verifyAccessToken(token: string): any {
    if (!token) return { status: false, email: undefined }
    else {
        try {
            const decoded: any = jwt.verify(token, SECRET, (_error, validation: any): any => {
                if (_error && !validation) return { status: false, email: undefined }
                if (validation) return { status: true, email: validation.data }
            })
            return decoded
        } catch (error) {
            return { status: false, email: undefined }
        }
    }
}
