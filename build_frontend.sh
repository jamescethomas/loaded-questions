#/bin/bash
cd frontend;
cp .env_prod .env
npm run build
cp .env_dev .env
cd ..
