

export const globalError = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).json({ mesage: err.message }); 
  
}