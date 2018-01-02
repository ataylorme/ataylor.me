#!/bin/bash

# Bail if missing the access key
if [ -z "$S3_ACCESS_KEY" ]; then
 echo -e "\n S3_ACCESS_KEY is not defined. Please setup environment variables."
 exit 1
fi

# Bail if missing the access secret
if [ -z "$S3_ACCESS_SECRET" ]; then
 echo -e "\n S3_ACCESS_SECRET is not defined. Please setup environment variables."
 exit 1
fi

# Upload media to S3
echo -e "\n-> Uploading media in public/static to S3..."
s3cmd \
--access_key=$S3_ACCESS_KEY \
--secret_key=$S3_ACCESS_SECRET \
sync \
--acl-public \
--delete-removed \
--guess-mime-type \
--no-mime-magic \
--cf-invalidate \
--exclude='.DS_Store' \
--exclude='CNAME' \
--add-header="Cache-Control: max-age=31556926"  \
public/static/ s3://www.ataylor.me/static/

# Upload site to S3
echo -e "\n-> Uploading site, excluding media and CSS/JS, to S3..."
s3cmd \
--access_key=$S3_ACCESS_KEY \
--secret_key=$S3_ACCESS_SECRET \
sync \
--acl-public \
--delete-removed \
--no-mime-magic \
--guess-mime-type \
--cf-invalidate \
--exclude='.DS_Store' \
--exclude='CNAME' \
--exclude='static/*' \
--exclude='*.css' \
--exclude='*.js' \
--add-header="Cache-Control: max-age=31556926"  \
public/ s3://www.ataylor.me/

# Upload CSS to S3
echo -e "\n-> Uploading CSS to S3..."
s3cmd \
--access_key=$S3_ACCESS_KEY \
--secret_key=$S3_ACCESS_SECRET \
sync \
--acl-public \
--delete-removed \
--cf-invalidate \
--mime-type="text/css" \
--exclude='*.*' \
--include='*.css' \
--add-header="Cache-Control: max-age=31556926"  \
public/ s3://www.ataylor.me/

# Upload JS to S3
echo -e "\n-> Uploading JS to S3..."
s3cmd \
--access_key=$S3_ACCESS_KEY \
--secret_key=$S3_ACCESS_SECRET \
sync \
--acl-public \
--delete-removed \
--cf-invalidate \
--mime-type="text/javascript" \
--exclude='*.*' \
--include='*.js' \
--add-header="Cache-Control: max-age=31556926"  \
public/ s3://www.ataylor.me/