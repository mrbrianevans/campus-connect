FROM node:16-slim

COPY package*.json .

RUN npm install -g npm@7.19.0

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

#RUN git clone https://github.com/vishnubob/wait-for-it.git
# waits for the database to do a build because static generation requires the db
#RUN ./wait-for-it/wait-for-it.sh postbase:5438 -- npm run build

#FROM node:16-slim
#
#COPY package*.json .
#
#RUN npm install --production
#
#COPY --from=compiled /.next /.next
#COPY --from=compiled /.env.local .
#
#CMD ["npm", "run", "start"]