FROM alekzonder/puppeteer:latest
COPY . /app
RUN cd /app && npm install && npm install --save-dev puppeteer
EXPOSE 3000
WORKDIR /app
CMD npm start