const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const qs = require('query-strings-parser')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const poisonsRouter = require('./routes/poisons');

const app = express();
const port = 3000; // change this to dynamic use case later

// app.use(cors);
app.use(logger('dev'));
app.use(express.json());
// app.use(qs);
app.use(express.urlencoded({ extended: false }));

// setup routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/poisons', poisonsRouter);

//  Some more gi-up work needed here


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
});



