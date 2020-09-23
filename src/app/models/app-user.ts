import { Quiz } from './quiz';

export class AppUser {
    userId: string;
    userName: string;
    email: string;
    photoUrl: string;
    group: string;
    quizzes: {[id: string] : Quiz};
    isAdmin: boolean;
    quizKeys = [];

    constructor(init?: Partial<AppUser>) {
        Object.assign(this, init);
        if (this.quizzes) this.quizKeys = Object.keys(this.quizzes);
    }
    
    get quizzesArr() {
        let assignedQuizzes, submittedQuizzes, reviewedQuizzes;
        [assignedQuizzes, submittedQuizzes, reviewedQuizzes] = [[], [], []];
        for (let key in this.quizzes) {
            this.quizzes[key].quizKey = key;
            if (!this.quizzes[key].isSubmitted) assignedQuizzes.push(this.quizzes[key]);
            if (this.quizzes[key].isSubmitted && (!this.quizzes[key].isReviewed)) submittedQuizzes.push(this.quizzes[key]);
            if (this.quizzes[key].isReviewed) reviewedQuizzes.push(this.quizzes[key]);
        }
        return [assignedQuizzes, submittedQuizzes, reviewedQuizzes]
    }



    
}