

const swaggerJsDocs=require("swagger-jsdoc") ;




module.exports.makeSwagger=()=>{

    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Friend Feed Project',
                version: '1.0.0',
                description: 'A description of your API',
                contact: {
                    name: 'Your Name',
                    url: 'http://your-website.com',
                    email: 'your-email@domain.com'
                },
                /*license: {
                    name: 'MIT',
                    url: 'https://opensource.org/licenses/MIT'
                }*/
            },
            servers: [
                {
                    url: 'http://localhost:3000/',
                    description: 'Local server'
                }
            ]
        },
        apis: ['../apis/*.js'] // Path to your API documentation files
    };
    
    const swaggerDocs = swaggerJsDocs(swaggerOptions);

    
    return swaggerDocs ;



}


