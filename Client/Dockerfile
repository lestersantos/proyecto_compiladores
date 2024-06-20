# FROM alpine:3.14

# COPY package*.json /var/www/localhost/htdocs/
# COPY . /var/www/localhost/htdocs/
# RUN apk add --update nodejs npm
# RUN apk add --update npm

# ENTRYPOINT ["tail", "-f", "/dev/null"]

#---------wrapper container for apache and nodejs, npm --------
# FROM ubuntu 
# RUN apt update && apt install -y apache2
# #RUN apt install -y apache2
# #RUN apt-get clean
 
# WORKDIR /var/www/html

# COPY package*.json /var/www/html
# COPY . /var/www/html

# RUN apt install -y nodejs
# RUN apt install -y npm
# RUN npm install
# EXPOSE 80
# ENTRYPOINT [ "/usr/sbin/apachectl","-D","FOREGROUND" ]
#-----------------------------------
#ENTRYPOINT ["docker-entrypoint.sh"]
#CMD service apache2 start
#CMD ["apache2","-DFOREGROUND"]
# ENTRYPOINT [ "/bin/bash/"]
# CMD ["/bin/sh","service","apache2","start"]
# CMD service apache2 start
# FROM httpd:2.4
# COPY . /usr/local/apache2/htdocs/


#------------ wrapper container for nginx and nodejs, npm ----
FROM nginx:alpine

RUN apk add --update npm

WORKDIR /usr/share/nginx/html

COPY package*.json /usr/share/nginx/html

RUN npm install

COPY . /usr/share/nginx/html

#---------------------------------------