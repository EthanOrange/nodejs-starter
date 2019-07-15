import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import CommentService from '../../services/comment';
import { ICommentInputDTO } from '../../interfaces/IComment';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/comment', route);

  route.post(
    '/create',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        blog_id: Joi.string().required(),
        content: Joi.string().required(),
        reply_coment_id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      logger.debug('Calling Blog create endpoint with body: %o', req.body )
      try {
        const CommentServiceInstance = Container.get(CommentService);
        const blog = await CommentServiceInstance.Create(req.body as ICommentInputDTO, req.currentUser._id);
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
        const CommentServiceInstance = Container.get(CommentService);
        const blog = await CommentServiceInstance.Update(req.body._id, req.body.content, req.currentUser._id);
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
        const CommentServiceInstance = Container.get(CommentService);
        const deleteRes = await CommentServiceInstance.Delete(req.body._id);
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
      const CommentServiceInstance = Container.get(CommentService);
      const blogs = await CommentServiceInstance.List({ limit, page, ...filter });
      return res.json({ msg: 'get detail success', type: 1, data: blogs })
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  route.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:any = Container.get('logger');
      try {
        const { id } = req.params
        const CommentServiceInstance = Container.get(CommentService);
        const blog = await CommentServiceInstance.Detail(id);
        return res.json({ msg: 'get detail success', type: 1, data: blog })
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
};
