import { AppUser } from './app-user';
import { Quiz } from './quiz';

export let mockAssignedQuiz: Quiz = {
    title: 'quiz title',
    category: 'algebra',
    imageUrls: ['1', '2', '3'],
    quizUrl: '123',
    quizId: 'quizId',
    assignedTime: 123456,
    startTime: 123456,
    endTime: 123457,
    timeLimit: 99999999,
    answerUrls: ['1', '2', '3'],
    isSubmitted: false,
    isReviewed: false,
    isStarted: false,
    quizKey: 'quizKey'
  }
  
export let mockSubmittedQuiz: Quiz = {
    title: 'Submitted quiz title',
    category: 'algebra',
    imageUrls: ['1', '2', '3'],
    quizUrl: '123',
    quizId: 'quizId1',
    assignedTime: 123456,
    startTime: 123456,
    endTime: 123457,
    timeLimit: 99999999,
    answerUrls: ['1', '2', '3'],
    isSubmitted: true,
    isReviewed: false,
    isStarted: true,
    quizKey: 'quizKey1'
  }
  
export let mockUser1 = new AppUser({
    userName: 'Mock User1',
    userId: 'mockId1',
    email: 'mockEmail1',
    photoUrl: 'mockUrl1',
    group: null,
    quizzes: {
      'quizId': mockAssignedQuiz,
      'quizId1': mockSubmittedQuiz
    },
    quizKeys: [],
    isAdmin: true
  });
  
export let mockUser2 = new AppUser({
    userName: 'Mock User2',
    userId: 'mockId2',
    email: 'mockEmail2',
    photoUrl: 'mockUrl2',
    group: null,
    quizzes: {
      'quizId': mockAssignedQuiz,
      'quizId1': mockSubmittedQuiz
    },
    quizKeys: [],
    isAdmin: true
  })
  
export let mockGroup = [mockUser1, mockUser2];
  
export let mockGroups = [
    { title: '9' },
    { title: '10' },
    { title: '11' }
  ]
  

export let mockCategories = [
    {name: 'algebra'},
    {name: 'geometry'},
    {name: 'physics'},
  ]