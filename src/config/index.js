var config = {
    development: {
        secret: "j4d893d89457hddkrh8j58j589kd5jk8dj85jj485thhu34d895kd8jd0krimv02==",
        host: "localhost:8000",
        mail: {
            service: "gmail.com",
            user: "aftabaig@gmail.com",
            password: "qicutbrtkdclbwkx",
            from: '"FFD" <aftabaig@gmail.com>',
        }
    },
    staging: {
        secret: "j4d893d89457hddkrh8j58j589kd5jk8dj85jj485thhu34d895kd8jd0krimv02==",
        host: "tabdeeliapp.ssasoft.com:8000",
        mail: {
            service: "gmail.com",
            user: "aftabaig@gmail.com",
            password: "qicutbrtkdclbwkx",
            from: '"Tabdeeli" <aftabaig@gmail.com>',
        }
    },
    production: {
        secret: "j4d893d89457hddkrh8j58j589kd5jk8dj85jj485thhu34d895kd8jd0krimv02==",
        host: "api.tabdeeli.com",
        mail: {
            service: "gmail.com",
            user: "",
            password: "",
            from: '"Tabdeeli" <aftabaig@gmail.com>',
        }
    }
}

module.exports = config;