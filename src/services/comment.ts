import { Service, Inject } from 'typedi';
import { IComment, ICommentInputDTO } from '../interfaces/IComment';

@Service()
export default class CommentService {
  constructor(
      @Inject('commentModel') private commentModel,
      @Inject('logger') private logger,
    ) {}

  public async Create(commentInputDTO: ICommentInputDTO, user_id: string): Promise<object> {
    try {
      const commentRecord = await this.commentModel.create({...commentInputDTO, user: user_id })
      if (!commentRecord) {
        throw new Error('comment can not be created!')
      }
      return commentRecord.toObject()
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Delete(_id: string): Promise<boolean> {
    try {
      const commentRecord = await this.commentModel.deleteOne({ _id })
      if (!commentRecord) {
        throw new Error('comment can not be deleted!')
      }
      return true
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(_id: string, content : string, user_id: string): Promise<object> {
    try {
      const { user } = await this.commentModel.findOne({ _id })
      if (!user.equals(user_id)) throw new Error('Permission dedined! you can not edit this comment~')
      const commentRecord = await this.commentModel.updateOne({ _id }, { content })
      if (!commentRecord) {
        throw new Error('comment can not be updated!')
      }
      return commentRecord
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Detail(_id: string): Promise<object> {
    try {
      const commentRecord = await this.commentModel.findOne({ _id }).populate('user', '-password -salt -__v -updatedAt -createdAt');
      if (!commentRecord) {
        throw new Error('comment can not be founded!')
      }
      return commentRecord.toObject()
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async List({ limit = 10, page = 1, ...filter }: any): Promise<{}> {
    try {
      const options = {
        page, 
        limit, 
        populate: 'user'
      }
      const list = await this.commentModel.paginate(filter, options)
      if (!list) {
        throw new Error('comment can not be founded!')
      }
      return list
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
