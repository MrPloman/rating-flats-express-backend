export class User {
    constructor(
        public readonly _id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly information: {
            username: string
            name: string
            surname: string
            avatar: string
        },
        public readonly creationDate: Date,
        public readonly updatingDate: Date,
        public readonly enabled: boolean,
        public readonly ratings: unknown[]
    ) {}
}
