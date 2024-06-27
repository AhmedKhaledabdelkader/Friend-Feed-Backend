

class ApiError extends Error{


constructor(message,statusCode){

    super(message) // instead of saying this.msg=msg i call the constructor of super class

    this.statusCode=statusCode

    this.status=`${statusCode}`.startsWith(4)?"fail":"error";




}





}


module.exports=ApiError