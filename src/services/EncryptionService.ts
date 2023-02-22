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
    if (!password) return false
    const isCorrect: Promise<boolean> = new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) reject
            if (result) resolve
        })
    })
    console.log(isCorrect)
    return isCorrect
}
