import App from './app';

const app = App(Number(process.env.PORT) || 8080);

app.listen();
