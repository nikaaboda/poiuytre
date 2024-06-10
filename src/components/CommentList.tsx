import { FC, useCallback, useState } from 'react'
import { Comment } from './Comment'
import { usePersistentComments } from '../hooks/usePersistentComments'
import { CommentForm } from './CommentForm'

export const CommentList: FC = () => {
    const { comments, addComment, addReply, deleteComment } = usePersistentComments()
    const [input, setInput] = useState('')

    const handleAddComment = useCallback(() => {
        if (input.trim()) {
            addComment(input)
            setInput('')
        }
    }, [input, setInput, addComment])

    return (
        <div>
            <CommentForm handleAddComment={handleAddComment} input={input} setInput={setInput} />

            <div className="comments">
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onDelete={deleteComment}
                        onAddReply={addReply}
                    />
                ))}
            </div>
        </div>
    )
}
