import { Quiz } from './quiz';

export class AppUser {
    userId: string;
    name: string;
    email: string;
    photoUrl: string;
    group: string;
    quizzes: Quiz[];
    isAdmin: boolean;

    constructor(init?: Partial<AppUser>) {
        Object.assign(this, init);
    }
}