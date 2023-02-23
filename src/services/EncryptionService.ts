import bcrypt from 'bcrypt'
export async function encryptPass(password: string): Promise<string | null | unknown> {
    if (!password) return null
    const saltRounds = 10
    const encryptedPass: Promise<unknown> = new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (_err, salt) {
            if (_err) reject
            bcrypt.hash(password, salt, function (_err, hash) {
                if (_err) reject
                if (hash) resolve(hash)
            })
        })
    })
    if (encryptedPass) return encryptedPass
    else return null
}

export async function checkPass(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) return false
    return bcrypt.compare(password, hash)
}
