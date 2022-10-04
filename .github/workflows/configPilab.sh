#!/bin/bash
echo $PWD


#config pilab
#name
sed -i 's/"https://stage-api.salamislicing.in/"/"https://api.salamislicing.in/"/g' ./App/Config/AppConfig.ts
# sed -i 's/"runtimeVersion": "1.0.0",//g' app.json
# set serverurl
#sed -i 's/manage.thepiquelab.com\/api/manage.thepilab.com\/api/g' ./src/config.ts
#sed -i 's/manage.piquehosted.com\/api/manage.thepilab.com\/api/g' ./src/config.ts

# set auth0
#sed -i 's/"0V8JQjumIxNbLCLSSNUrIewAy04N1fHP"/"9LuzZ279PN6onEWdq0zFwnu164wYuiZk"/g' ./src/config.ts
#sed -i 's/"qCcxHqXSPGac1nCHBfWmKBPxiabOEZ9u"/"9LuzZ279PN6onEWdq0zFwnu164wYuiZk"/g' ./src/config.ts

# sed -i 's/erp.piquehosted.com/erp.thepilab.com/g' ./src/config.ts
# sed -i 's/secure.thepiquelab.com/thepilab.au.auth0.com/g' ./src/config.ts
# sed -i 's/thepiquelab-dev.au.auth0.com/thepilab.au.auth0.com/g' ./src/config.ts

