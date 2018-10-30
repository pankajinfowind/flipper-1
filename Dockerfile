FROM php:7.2.10-apache

LABEL key="flipper" 

COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

VOLUME [ "/var/www/html" ]

RUN apt-get update && apt-get install -y zip libzip-dev libpng-dev \
    && docker-php-ext-install pdo_mysql gd zip \
    && rm -rf /var/lib/apt/lists/*

# # Composer installation.


COPY . /var/www/html/


# # Authorize these folders to be edited
RUN chmod -R 777 /var/www/html/storage
RUN chmod -R 777 /var/www/html/storage/logs
RUN chmod -R 777 /var/www/html/bootstrap/cache
RUN chmod -R 777 /var/www/html

# Allow rewrite
RUN a2enmod rewrite
