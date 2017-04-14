
Playing around with chatbots at "Hacking Health" hackathon in Berlin

## Set up

### AWS
Add AWS credentials to `~/.aws/credentials`
```
[claudia]
aws_access_key_id = XXXX
aws_secret_access_key = xxxxx
```
Then set AWS profile in your shell to claudia with `export AWS_PROFILE=claudia`

### Claudia
```
npm install claudia -g
npm install
```
To update the Bot on AWS:
```
claudia update
```
!!! Files in `.gitignore` will not be included!

### Run bot locally, not with Claudia
```
node localBot.js
```

### Project
```
npm install
```

Create a file `bot/secretsVault.js` with this content:
```
exports.secrets = {
  telegram: '<secret-telegram-bot-token>'
};
```
