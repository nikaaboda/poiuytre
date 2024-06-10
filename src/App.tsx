import { CommentList } from './components/CommentList'

export type User = {
    name: string
    interests: string[]
}

const App: React.FC = () => {
    return (
        <div>
            <CommentList />
        </div>
    )
}

export default App
