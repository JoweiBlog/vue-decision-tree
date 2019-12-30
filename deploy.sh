# deploy.sh
set -e

# build
npm run build

# dot
cd dist

# commit
git init
git add -A
git commit -m 'deploy'

# push
git push -f git@github.com:JoweiBlog/vue-decision-tree.git master:gh-pages