import { Router } from 'express';
const index: Router = Router();

/* GET home page. */
index.get('/', (req, res, next) => {
  res.render('index', {
    page_scope: 'Index',
    title: 'FIMconnect'
  });
});

index.get('/demo', (req, res, next) => {
  res.render('random', {
    page_scope: 'Random',
    title: 'FIMconnect'
  });
});

export default index;
