module.exports = {
  apps: [
    {
      name: "owlog-web",
      script: "../the-antman-web/bin/www",
      instances: 1,
      autorestart: true,
      watch: "./",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        "api-host-search": "http://localhost:3001",
        "api-host-comm": "http://localhost:3002",
        "api-host-token": "http://localhost:3002/v1/tokens",
        "dashboard-url":
          "https://kibana.owlog.io:3000/d/AcghHDTmz/owlog-dashboard?refresh=10s&orgId=1&from=now%2Fd&to=now%2Fd&kiosk",
        "metric-dashboard-url":
          "https://kibana.owlog.io:3000/d/kYSESzWmk/multi-system-metrics?orgId=1from=now-15m&to=now&refresh=5s&kiosk",
        "search-monitor-url":
          "https://kibana.owlog.io:9000/#/overview?host=http:%2F%2Felastic.antman.internal:9200",
        "queue-monitor-url": "https://kibana.owlog.io:8080/#/"
      },
      error_file: "../logs/owlog-web-err.log",
      out_file: "../logs/owlog-web-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    },
    {
      name: "owlog-search",
      script: "../the-antman-service-search/bin/www",
      instances: 1,
      autorestart: true,
      watch: "./",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        "elastic-host": "http://13.125.169.52:9200",
        "search-max-count": 500
      },
      error_file: "../logs/owlog-service-search-err.log",
      out_file: "../logs/owlog-service-search-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    },
    {
      name: "owlog-user",
      script: "../the-antman-service-user/bin/www",
      instances: 1,
      autorestart: true,
      watch: "./",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        secret: "AnTtMmAaNnSsEeCcRrEeTt",
        issuer: "tzrpOKqjKMdobMO58whsu5gJ8ycm9XvG",
        expireTime: 30 * 60 * 1000, //30분동안 동작하지 않으면 세션 끊김
        /*DB Config*/
        "db-config": {
          host: "13.125.233.115",
          port: "3306",
          user: "antman",
          database: "antman",
          password: "antmanadmin",
          connectionLimit: 20,
          waitForConnections: false
        },
       "db-config-blogBoard": {
          host: "127.0.0.1",
          port: "3306",
          user: "root",
          database: "blogBoard",
          password: "1234",
          connectionLimit: 20,
          waitForConnections: false
        }
      },
      error_file: "../logs/owlog-service-user-err.log",
      out_file: "../logs/owlog-service-user-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    }
  ]
};
