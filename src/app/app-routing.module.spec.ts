import { AdminGroupsComponent } from './admin/components/admin-groups/admin-groups.component'
import { AdminQuizzesComponent } from './admin/components/admin-quizzes/admin-quizzes.component'
import { AdminComponent } from './admin/components/admin/admin.component'
import { QuizFormComponent } from './admin/components/quiz-form/quiz-form.component'
import { ReviewQuizComponent } from './admin/components/review-quiz/review-quiz.component'
import { ReviewedQuizzesComponent } from './admin/components/reviewed-quizzes/reviewed-quizzes.component'
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service'
import { routes } from './app-routing.module'
import { HomeComponent } from './core/components/home/home.component'
import { LoginComponent } from './core/components/login/login.component'
import { RegisterComponent } from './core/components/register/register.component'
import { UserProfileComponent } from './core/components/user-profile/user-profile.component'
import { AuthGuard } from './shared/services/auth-guard.service'
import { SolveQuizComponent } from './student/components/solveQuiz/solve-quiz.component'

describe('routes', () => {
    it('should contain route for HomeComponent', () => {
        expect(routes).toContain({path: '', component: HomeComponent, canActivate: [AuthGuard]})
    })

    it('should contain route for /login', () => {
        expect(routes).toContain({path: 'login', component: LoginComponent})
    })

    it('should contain route for /register', () => {
        expect(routes).toContain({path: 'register', component: RegisterComponent})
    })

    it('should contain route for /user-profile', () => {
        expect(routes).toContain({path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]})
    })

    it('should contain route for SolveQuizComponent', () => {
        expect(routes).toContain({path: 'quiz/:quizKey', component: SolveQuizComponent, canActivate: [AuthGuard]})
    })

    it('should contain route for new QuizForm', () => {
        expect(routes).toContain({path: 'admin/quizzes/new', component: QuizFormComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for QuizForm with quizID', () => {
        expect(routes).toContain({path: 'admin/quizzes/:id', component: QuizFormComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for AdminQuizzesComponent', () => {
        expect(routes).toContain({path: 'admin/quizzes', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for AdminQuizzesComponent with group, studentID and category', () => {
        expect(routes).toContain({path: 'admin/groups/:group/:studentId/:category', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for AdminQuizzes with group and category', () => {
        expect(routes).toContain({path: 'admin/groups/:group/:category', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for AdminGroups', () => {
        expect(routes).toContain({path: 'admin/groups', component: AdminGroupsComponent, canActivate: [AdminAuthGuard]})
    })

    it('should contain route for admin/reviewed/:student', () => {
        expect(routes).toContain({path: 'admin/reviewed/:student', component: ReviewedQuizzesComponent, canActivate: [AdminAuthGuard]})
    })
    
    it('should contain route for review/:student/:quizKey', () => {
        expect(routes).toContain({path: 'review/:student/:quizKey', component: ReviewQuizComponent, canActivate: [AuthGuard]})
    })
    
    it('should contain route for admin', () => {
        expect(routes).toContain({path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]})
    })
      
})