import { CommentType } from '../components/Comment'
import { usePersistentState } from './usePersistentState'

const addReplyRecursive = (
    commentsList: CommentType[],
    parentId: number,
    replyText: string,
): CommentType[] =>
    commentsList.map(comment => ({
        ...comment,
        replies:
            comment.id === parentId
                ? [...comment.replies, { id: Date.now(), text: replyText, replies: [] }]
                : addReplyRecursive(comment.replies, parentId, replyText),
    }))

const deleteRecursive = (commentsList: CommentType[], id: number): CommentType[] =>
    commentsList
        .map(comment =>
            comment.id === id
                ? null
                : {
                      ...comment,
                      replies: deleteRecursive(comment.replies, id),
                  },
        )
        .filter(comment => comment !== null) as CommentType[]

export const usePersistentComments = () => {
    const [comments, setComments] = usePersistentState<CommentType[]>('comments', [])

    const addComment = (text: string) => {
        if (text.trim()) {
            setComments([...comments, { id: Date.now(), text, replies: [] }])
        }
    }

    const addReply = (parentId: number, replyText: string) => {
        setComments(addReplyRecursive(comments, parentId, replyText))
    }

    const deleteComment = (id: number) => {
        setComments(deleteRecursive(comments, id))
    }

    return { comments, addComment, addReply, deleteComment }
}
