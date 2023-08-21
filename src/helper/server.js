const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const qs = require('query-strings-parser')

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const poisonsRouter = require('../routes/poisons');


const rigupServer = () => {
	const app = express();

	// app.use(cors);
	// app.use(logger('dev'));
	app.use(express.json());
	// app.use(qs);
	app.use(express.urlencoded({ extended: false }));

	// setup routes
	app.use('/api/', indexRouter);
	app.use('/api/users', usersRouter);
	app.use('/api/poisons', poisonsRouter);
	//  Some more rig-up work needed here
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
	return app;
};


module.exports = rigupServer;
