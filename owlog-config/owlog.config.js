module.exports = {
  apps : [{
        name: 'owlog-web',
        script: '../app/bin/www',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
          'NODE_ENV': 'production',
          'api-host-search': 'https://api.owlog.io/search',
          'api-host-comm': 'https://api.owlog.io/comm'
      },
      "error_file"      : "../logs/owlog-web-err.log",
      "out_file"        : "../logs/owlog-web-out.log",
      "merge_logs"      : true,
      "log_date_format" : "YYYY-MM-DD HH:mm Z"
    },
    {
        name: 'owlog-search',
        script: '../the-antman-service-search/bin/www',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
            'NODE_ENV': 'production',
            'elastic-host':'http://elastic.antman.internal:9200',
            'search-max-count': 500
        },
        "error_file"      : "../logs/owlog-service-search-err.log",
        "out_file"        : "../logs/owlog-service-search-out.log",
        "merge_logs"      : true,
        "log_date_format" : "YYYY-MM-DD HH:mm Z"
    },
    {
        name: 'owlog-user',
        script: '../the-antman-service-user/bin/www',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
            'NODE_ENV': 'production',
            'secret': 'AnTtMmAaNnSsEeCcRrEeTt',
            'issuer': 'tzrpOKqjKMdobMO58whsu5gJ8ycm9XvG',
            'expireTime': 30*60*1000, //30분동안 동작하지 않으면 세션 끊김
            /*DB Config*/
            'db-config': {
                'host'      : '13.125.228.160',
                'port'      : '3306',
                'user'      : 'antman',
                'database'  : 'antman',
                'password'  : 'antmanadmin',
                'connectionLimit' :20,
                'waitForConnections':false
            }
        },
        "error_file"      : "../logs/owlog-service-user-err.log",
        "out_file"        : "../logs/owlog-service-user-out.log",
        "merge_logs"      : true,
        "log_date_format" : "YYYY-MM-DD HH:mm Z"
    }]
};
