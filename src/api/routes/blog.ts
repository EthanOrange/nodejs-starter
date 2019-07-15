import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import BlogService from '../../services/blog';
import { IBlogInputDTO, IBlogUpdateDTO } from '../../interfaces/IBlog';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/blog', route);

  route.post(
    '/create',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        content: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      logger.debug('Calling Blog create endpoint with body: %o', req.body )
      try {
        const blogServiceInstance = Container.get(BlogService);
        const blog = await blogServiceInstance.Create(req.body as IBlogInputDTO, req.currentUser._id);
        return res.json({ msg: 'create success', type: 1, data: blog });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/edit',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
        content: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      logger.debug('Calling Blog update endpoint with body: %o', req.body )
      try {
        const options = { 
          user_id: req.currentUser._id,
          ...req.body 
        } as IBlogUpdateDTO
        const blogServiceInstance = Container.get(BlogService);
        const blog = await blogServiceInstance.Update(options);
        return res.json({ msg: 'update success', type: 1, data: blog });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/delete',
    middlewares.isAuth,
    celebrate({
      body: Joi.object({
        _id: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      logger.debug('Calling Blog delete endpoint with body: %o', req.body )
      try {
        const blogServiceInstance = Container.get(BlogService);
        const deleteRes = await blogServiceInstance.Delete(req.body._id);
        return res.json({ msg: 'delete success', type: 1, data: deleteRes });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  
  route.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    const logger:any = Container.get('logger');
    try {
      const { limit=10, page=1, ...filter } = req.query
      const blogServiceInstance = Container.get(BlogService);
      const blogs = await blogServiceInstance.List({ limit, page, ...filter });
      return res.json({ msg: 'get detail success', type: 1, data: blogs })
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  route.get(
    '/jobs/create/:length',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      logger.debug(`blog create job: ${req.params.length}`)
      try {
        const { length=1 } = req.params
        const blogServiceInstance = Container.get(BlogService);
        console.time('test')
        const blog = await blogServiceInstance.JobsCreate(length, req.currentUser._id)
        console.timeEnd('test')
        return res.json({ msg: 'get detail success', type: 1, data: blog })
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
  route.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      try {
        const { id } = req.params
        const blogServiceInstance = Container.get(BlogService);
        const blog = await blogServiceInstance.Detail(id);
        return res.json({ msg: 'get detail success', type: 1, data: blog })
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
};
