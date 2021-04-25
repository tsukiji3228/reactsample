# reactsample
Reactの練習用

# セットアップ
```
npm init
npm install express --save
npm install @vendia/serverless-express
yarn add aws-sdk
```

# local dynamodb
```
sudo service docker start
docker run -d -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
dynamodb-admin
```

