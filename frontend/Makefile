docker:
	docker compose build

hub:
	docker image tag cesium-web-app oresat/cesium-web-app:latest
	docker image tag cesium-web-app oresat/cesium-web-app:`grep -i 'version' package.json | xargs | cut -d' ' -f2 | cut -d ',' -f1`
	docker push --all-tags oresat/cesium-web-app

clean:
	rm -rf node_modules
	yarn autoclean