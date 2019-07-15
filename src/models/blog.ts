import { IBlog } from '../interfaces/IBlog';
import * as mongoosePaginate from 'mongoose-paginate-v2'
import * as mongoose from 'mongoose';

const Blog = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a post title'],
      index: true,
      unique: true
    },

    meta: {
      view: {
        type: Number,
        default: 0
      },
      like: {
        type: Number,
        default: 0
      },
    },

    desc: String,

    content: {
      type: String,
      required: [true, 'Please enter poster content']
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true },
);

Blog.plugin(mongoosePaginate)

export default mongoose.model<IBlog & mongoose.Document>('Blog', Blog);
