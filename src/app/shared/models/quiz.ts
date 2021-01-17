export interface Quiz {
    title: string;
    category: string;
    imageUrls: string[];
    quizUrl: string;
    quizId: string;
    assignedTime: number;
    startTime: number;
    endTime: number;
    timeLimit: number;
    answerUrls: string[];
    isSubmitted: boolean;
    isReviewed: boolean;
    isStarted: boolean;
    quizKey: string;
    teacherComments: string;
    points: number;
}
