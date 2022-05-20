

module.exports = {
    //content
   apps : [
     {
       name          : 'Timetracker-dashboard',
       script        : 'npx',
       interpreter   : 'none',
       args          : 'serve build -s',
       env_production : {
         NODE_ENV: 'production'
       }
     }]
};
