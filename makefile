dev: 
	make -j2 watch

watch: tar1 tar2

tar1:
	npx tailwindcss -i ./css/input.css -o ./static/main.css --watch

tar2:
	zola serve

build: tar3

tar3:
	npx tailwindcss -i ./css/input.css -o ./static/main.css --minify
	zola build
	
