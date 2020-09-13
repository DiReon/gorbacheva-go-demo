export interface Group {
    title: string;
    assignedQuizzes: [{
        dateTime: number,
        quizId: string,
        title: string,
    }];
}