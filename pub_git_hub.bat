
#npm run build

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f https://github.com/Eugenminer/my_store_pub.git master:gh-pages

cd ..
