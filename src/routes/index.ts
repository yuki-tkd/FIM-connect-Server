import { Router } from 'express';
const index: Router = Router();

/* GET home page. */
index.get('/', (req, res, next) => {
  res.render('index', {
    page_scope: 'Index',
    title: 'FIMconnect'
  });
});

export default index;
