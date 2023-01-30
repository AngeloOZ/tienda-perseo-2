// @mui
import { Box, List } from '@mui/material';
// @types
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

type Props = {
  comments: any[];
};

export default function BlogPostCommentList({ comments }: Props) {
  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replyComment, name, users, message, avatarUrl, postedAt } = comment;

        const hasReply = replyComment.length > 0;

        return (
          <Box key={id}>
            <BlogPostCommentItem
              name={name}
              message={message}
              postedAt={postedAt}
              avatarUrl={avatarUrl}
            />
            {hasReply &&
              replyComment.map((reply: any) => {
                const userReply = users.find((user: any) => user.id === reply.userId);

                return (
                  <BlogPostCommentItem
                    key={reply.id}
                    name={userReply?.name || ''}
                    message={reply.message}
                    postedAt={reply.postedAt}
                    avatarUrl={userReply?.avatarUrl || ''}
                    tagUser={reply.tagUser}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}
