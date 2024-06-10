import { FC, useCallback, useState } from 'react'
import DeleteIcon from '../assets/delete.svg'
import CancelIcon from '../assets/cancel.svg'
import ReplyIcon from '../assets/reply.png'
import '../style/comment.css'

export interface CommentType {
    id: number
    text: string
    replies: CommentType[]
}

interface CommentProps {
    comment: CommentType
    onDelete: (id: number) => void
    onAddReply: (parentId: number, replyText: string) => void
}

export const Comment: FC<CommentProps> = ({ comment, onDelete, onAddReply }) => {
    const [replyInput, setReplyInput] = useState('')
    const [showReplyForm, setShowReplyForm] = useState(false)

    const handleAddReply = useCallback(() => {
        if (replyInput.trim()) {
            onAddReply(comment.id, replyInput)
            setReplyInput('')
            setShowReplyForm(false)
        }
    }, [replyInput, setShowReplyForm, setShowReplyForm])

    return (
        <div className="comment">
            <div className="comment-label-container">
                <p>{comment.text}</p>
                <div onClick={() => onDelete(comment.id)} style={{ marginLeft: 20 }}>
                    <img src={DeleteIcon} alt="reply" />
                </div>
                <div onClick={() => setShowReplyForm(!showReplyForm)} style={{ marginLeft: 5 }}>
                    <img src={showReplyForm ? CancelIcon : ReplyIcon} alt="reply" />
                </div>
            </div>

            {showReplyForm && (
                <div className="reply-form">
                    <input
                        type="text"
                        value={replyInput}
                        onChange={e => setReplyInput(e.target.value)}
                        placeholder="Add a reply"
                    />
                    <button onClick={handleAddReply}>Add Reply</button>
                </div>
            )}

            <div className="replies">
                {comment.replies.map(reply => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        onDelete={onDelete}
                        onAddReply={onAddReply}
                    />
                ))}
            </div>
        </div>
    )
}
