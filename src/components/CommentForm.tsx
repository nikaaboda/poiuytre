import '../style/comment-form.css'

interface CommentFormProps {
    input: string
    setInput: (input: string) => void
    handleAddComment: () => void
}

export const CommentForm = ({ input, setInput, handleAddComment }: CommentFormProps) => {
    return (
        <div className="comment-form">
            <div>
                <h2>Comments:</h2>
                <div className="inputContainer">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                </div>
            </div>

            <button
                style={{ height: 45, alignSelf: 'flex-end', marginLeft: 10, marginBottom: 12 }}
                onClick={handleAddComment}
            >
                Add Comment
            </button>
        </div>
    )
}
