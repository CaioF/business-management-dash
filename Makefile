.PHONY: build up stop front

build:
	docker compose up -d --build

up:
	docker compose up -d

stop:
	docker compose stop

restart: stop up

front: up
	docker compose exec front sh

back: up
	docker compose exec back sh
