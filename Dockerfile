FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

#RUN npm run build

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["./wait-for-it/wait-for-it.sh","postbase:5438","--","npm", "run", "dev"]