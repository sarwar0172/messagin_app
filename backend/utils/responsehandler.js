
const response=(res,data=null,statusCode,message)=>{
    if(!res) {
        console.error('res not found');
    }
    const responseobject={
        status:statusCode<400?"success":"error",
        message,
        data
    }
    return res.status(statusCode).json(responseobject);
}
module.exports=response