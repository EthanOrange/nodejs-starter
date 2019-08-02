import { IComment } from '../interfaces/IComment';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const Comment = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true
    },
    
    content: {
      type: String,
      required: [true, 'Please enter poster content']
    },
    reply_comment_id: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true },
);

Comment.plugin(mongoosePaginate)

export default mongoose.model<IComment & mongoose.Document>('Comment', Comment);
