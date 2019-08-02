import { Service, Inject } from 'typedi';
import { IBlog, IBlogInputDTO, IBlogUpdateDTO } from '../interfaces/IBlog';

@Service()
export default class BlogService {
  constructor(
      @Inject('blogModel') private blogModel,
      @Inject('logger') private logger,
      @Inject('redis') private redis,
    ) {}

  public async Create(blogInputDTO: IBlogInputDTO, user_id: string): Promise<object> {
    try {
      const blogRecord = await this.blogModel.create({...blogInputDTO, author: user_id })
      if (!blogRecord) {
        throw new Error('blog can not be created!')
      }
      return blogRecord.toObject()
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Delete(_id: string): Promise<boolean> {
    try {
      const blogRecord = await this.blogModel.deleteOne({ _id })
      if (!blogRecord) {
        throw new Error('blog can not be deleted!')
      }
      return true
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update({ _id, user_id, content }: IBlogUpdateDTO): Promise<object> {
    try {
      const { author } = await this.blogModel.findOne({ _id })
      if (!author.equals(user_id) ) throw new Error('Permission dedined! you can not edit this blog.')
      const blogRecord = await this.blogModel.updateOne({ _id }, { content })
      if (!blogRecord) {
        throw new Error('blog can not be updated!')
      }
      return blogRecord
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Detail(_id: string): Promise<object> {
    try {
      await this.blogModel.updateOne({ _id }, { view: {  } })
      const blogRecord = await this.blogModel.findOne({ _id }).populate('author', '-password -salt -__v -updatedAt -createdAt');
      if (!blogRecord) {
        throw new Error('blog can not be founded!')
      }
      const blogRecordJson = blogRecord.toObject()
      return blogRecordJson
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
        populate: 'author'
      }
      const list = await this.blogModel.paginate(filter, options)
      if (!list) {
        throw new Error('blog can not be founded!')
      }
      return list
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Like(_id, user_id): Promise<{}> {
    try {
      const blogRecord = await this.blogModel.findByIdAndUpdate({_id}, { $addToSet: { like: user_id }}, { new: true })
      return blogRecord.toObject()
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async UnLike(_id, user_id): Promise<{}> {
    try {
      const blogRecord = await this.blogModel.findByIdAndUpdate({_id}, { $pull: { like: user_id }}, { new: true })
      return blogRecord.toObject()
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async JobsCreate(length, user_id: string): Promise<boolean> {
    try {
      console.time('count')
      const count = await this.blogModel.countDocuments()
      console.timeEnd('count')
      const blogs = Array.from({ length }, (_, index) => ({
          insertOne: {
            document: {
              title: `Eddard Stark ${count} ${index}`,
              desc: 'Warden of the North',
              content: 'Warden of the North Content',
              author: user_id
            }
          }
        }
      ))
      await this.blogModel.bulkWrite(blogs)
      return true
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
