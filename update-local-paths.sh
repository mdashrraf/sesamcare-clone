#!/bin/bash

# Update all HTML files in the workspace to use local resources

find . -name "*.html" -type f -exec sed -i '' \
    -e 's|https://cdn\.sesamecare\.com/746c07b10a8873d2282f95696a702c80/public/assets/fonts/|/assets/fonts/|g' \
    -e 's|https://cdn\.sesamecare\.com/ui-kit/2\.97\.3/_/all\.css|/assets/ui-kit/all.css|g' \
    -e 's|https://cdn\.sesamecare\.com/746c07b10a8873d2282f95696a702c80/_next/|/_next/|g' \
    -e 's|https://cdn\.sesamecare\.com"|/assets"|g' \
    -e 's|"NEXT_PUBLIC_ASSETS_BASE_URL":"https://cdn\.sesamecare\.com/746c07b10a8873d2282f95696a702c80/public"|"NEXT_PUBLIC_ASSETS_BASE_URL":""|g' \
    -e 's|"COOKIE_DOMAIN":"sesamecare\.com"|"COOKIE_DOMAIN":"localhost"|g' \
    -e 's|"API_HOST":"https://api\.sesamecare\.com"|"API_HOST":"http://localhost:3000"|g' \
    -e 's|"GRAPHQL_API":"https://api\.sesamecare\.com/v2/graphql"|"GRAPHQL_API":"http://localhost:3000/graphql"|g' \
    -e 's|"WHOAMI":"https://sesamecare\.com"|"WHOAMI":"http://localhost:3000"|g' \
    {} \;
